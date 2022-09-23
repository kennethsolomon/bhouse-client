import Parse from 'parse'
// import { ErrorHandler } from '@/helpers/ErrorHandler'

var user = {
  cloud: {
    list: (args = {}) => {
      return new Parse.Cloud.run('users', args)
    },
    get: (id) => {
      return new Parse.Cloud.run('users', {id:id, keyword:''})
    },
  },
  login (args = {}) {
    const { email, pass } = args
    if(!pass) throw {message: 'Password is required'}
    if(!email) throw {message: 'Email is required'}

    return Parse.User.logIn(email, pass)
  },
  pointer (id) {
    const object = new Parse.User()
    object.id = id
    return object
  },
  current () {
    const currentUser = Parse.User.current()
    return currentUser
  },
  get (id) {
    const q = new Parse.Query(Parse.User)
    return q.get(id)
  },
  getRole: async function () {
    const currentUser = Parse.User.current()
    const q = await new Parse.Query(Parse.Role).equalTo('users', currentUser).first()
    return q
  },
  updateSession (args = {}) {
    const { token, deviceInfo,ipAddress } = args
    Parse.Session.current().then(function(session) {
      session.set("FCMToken", token)
      session.set("deviceInfo", deviceInfo)
      session.set("ipAddress", ipAddress)
      session.save().then(function() {
        console.log('Token registered')
      });
    });
  },
  async save (args = {}) {
    const { username, fname, lname, avatar, email, password, createdByAdmin, type } = args
    let parseAvatar = null
    const currentUser = createdByAdmin ? new Parse.User() : Parse.User.current()

    if(avatar){
      const image = avatar[0]
      parseAvatar = new Parse.File(image.name, image, image.type)
      await parseAvatar.save()
    }

    if(parseAvatar) currentUser.set('avatar', parseAvatar)
    if(createdByAdmin) currentUser.set('password', password)
    if(createdByAdmin) currentUser.set('createdByAdmin', true)
    currentUser.set('username', username)
    currentUser.set('fname', fname)
    currentUser.set('lname', lname)
    // currentUser.set('type', type)
    if(currentUser?.get('email')!=email) currentUser.set('email', email)
    return currentUser.save()
  },
  createUser (args = {}) {
    return Parse.Cloud.run('createUser', args)
  },
  updatePassword (args = {}) {
    const currentUser = Parse.User.current()
    const { password } = args

    currentUser.setPassword(password)
    return currentUser.save()
  },
  saveSettings (args = {}) {
    const currentUser = Parse.User.current()
    const { settings } = args

    currentUser.set('settings', settings)
    return currentUser.save()
  },
  requestPasswordRequest () {
    const currentUser = Parse.User.current()
    return Parse.User.requestPasswordReset(currentUser.getEmail())
  },
  search (args = {}) {
    const { keyword = '', exclude, limit = 10 } = args
    const currentUser = Parse.User.current()

    const username = new Parse.Query(Parse.User)
    username.matches('username', keyword, 'i')

    const fname = new Parse.Query(Parse.User)
    fname.matches('fname', keyword, 'i')

    const lname = new Parse.Query(Parse.User)
    lname.matches('lname', keyword, 'i')

    const q = Parse.Query.or(fname, lname, username)
    q.limit(limit)
    // q.notEqualTo('objectId', currentUser.id)
    if (exclude) q.notContainedIn('objectId', exclude)
    return q.find()
  },
  deactivate (id) {
    const object = new Parse.User()
    object.id = id
    object.set('status', 'disabled')
    return object.save()
  },
  reactivate (id) {
    const object = new Parse.User()
    object.id = id
    object.set('status', 'active')
    return object.save()
  },
  list (args = {}) {
    const { status } = args
    const q = new Parse.Query(Parse.User)
    q.include('unit')
    q.descending('createdAt')
    q.equalTo('status', status)
    return q.find()
  },
}

// export { user, ErrorHandler }
export {user}

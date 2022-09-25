import Parse from 'parse'

const Room = Parse.Object.extend('room')

var room = {
//   cloud: {
//     list: (args = {}) => {
//       return new Parse.Cloud.run('travelAuthorities', args)
//     },
//     get: (id) => {
//       return new Parse.Cloud.run('travelAuthorities', {id:id, keyword:''})
//     },
//   },
  list: function () {
    const query = new Parse.Query(Room);
    return query.find()
  },
  get: function (id) {
    const query = new Parse.Query(Room);
    return query.get(id)
  },
  pointer: function (id) {
    const object = new Room()
    object.id = id
    return object
  },
  save: function (args = {}) {
    const { id, fname, mname, lname, address, contact_number, office, incase_of_emergency } = args
    const object = new Room()
    if (id) object.set('id', id)
    object.set('name', name)
    object.set('province', province)
    object.set('type', type)
    return object.save()
  },
}

export { room }
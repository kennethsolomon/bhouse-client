import Parse from 'parse'

const Boarder = Parse.Object.extend('boarder')
const Room = Parse.Object.extend('room')

var boarder = {
//   cloud: {
//     list: (args = {}) => {
//       return new Parse.Cloud.run('travelAuthorities', args)
//     },
//     get: (id) => {
//       return new Parse.Cloud.run('travelAuthorities', {id:id, keyword:''})
//     },
//   },

  list: function () {
    const query = new Parse.Query(Boarder);
    query.equalTo('status', 'active')
    query.include('roomPointer')
    return query.find()
  },
  get: function (id) {
    const query = new Parse.Query(Boarder);
    return query.get(id)
  },
  pointer: function (id) {
    const object = new Boarder()
    object.id = id
    return object
  },
  save: function (args = {}) {
    const { id, fname, mname, lname, address, contact_number, office, incase_of_emergency, room, status } = args
    const object = new Boarder()

    const room_pointer = Room.createWithoutData(room)

    if (id) {
      object.set('id', id)
    }

    object.set('fname', fname)
    object.set('mname', mname)
    object.set('lname', lname)
    object.set('address', address)
    object.set('contact_number', contact_number)
    object.set('office', office)
    object.set('incase_of_emergency', incase_of_emergency)
    object.set('status', status)
    object.set('roomPointer', room_pointer)


    return object.save()
  },
}

export { boarder }
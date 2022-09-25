import Parse from 'parse'

const Payment = Parse.Object.extend('payment')
const Boarder = Parse.Object.extend('boarder')
const Room = Parse.Object.extend('room')

var payment = {
//   cloud: {
//     list: (args = {}) => {
//       return new Parse.Cloud.run('travelAuthorities', args)
//     },
//     get: (id) => {
//       return new Parse.Cloud.run('travelAuthorities', {id:id, keyword:''})
//     },
//   },
  list: function () {
    const query = new Parse.Query(Payment);
    return query.find()
  },
  get: function (id) {
	const query = new Parse.Query(Payment);
	return query.get(id)
  },
  pointer: function (id) {
    const object = new Payment()
    object.id = id
    return object
  },
  checkPayment: function (boarder_id) {
	const query = new Parse.Query(Payment)
	query.equalTo('boarderPointer', new Boarder({id: boarder_id}))
	return query.find()
  },
  save: function (args = {}) {
    const { id, boarder, room, date,remarks } = args
    const object = new Payment()
	const newDate = new Date(date);

	const boarderPointer = Boarder.createWithoutData(boarder);
	const roomPointer = Room.createWithoutData(room);

    if (id) object.set('id', id)
    object.set('date', newDate)
    object.set('remarks', remarks)
    object.set('boarderPointer', boarderPointer)
    object.set('roomPointer', roomPointer)
    return object.save()
  },
}

export { payment }
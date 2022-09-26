import Parse from 'parse'

const Payment = Parse.Object.extend('payment')
const Boarder = Parse.Object.extend('boarder')
const Room = Parse.Object.extend('room')

var payment = {
  cloud: {
    chartPayment: (args = {}) => {
      return new Parse.Cloud.run('chartPayment', {year: 2022})
    },
    list: (args = {}) => {
      return new Parse.Cloud.run('travelAuthorities', args)
    },
    get: (id) => {
      return new Parse.Cloud.run('travelAuthorities', {id:id, keyword:''})
    },
  },
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

    const query = new Parse.Query(Boarder);
    query.get(boarder).then((current_boarder) => {
      const current_date = current_boarder.get('next_payment') ? current_boarder.get('next_payment') : new Date()
      const boarder_data = new Boarder()
      const add_day = addDays(new Date(current_date), 30)
      const five_days_before_deadline =
        addDays(new Date(current_date), 30)
        .setDate(addDays(new Date(current_date), 30)
        .getDate()-5)
      const formated_deadline = new Date(five_days_before_deadline)

      boarder_data.set('id', boarder)
      boarder_data.set('next_payment', add_day.toDateString())
      boarder_data.set('remind_date', formated_deadline.toDateString())
      boarder_data.save()
    })

    if (id) object.set('id', id)
    object.set('date', newDate)
    object.set('remarks', remarks)
    object.set('boarderPointer', boarderPointer)
    object.set('roomPointer', roomPointer)
    return object.save()
  },
}
function addDays(date, days) {
  const copy = new Date(Number(date))
  copy.setDate(date.getDate() + days)
  return copy
}
export { payment }
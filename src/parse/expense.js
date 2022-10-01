import Parse from 'parse'
import moment from 'moment'

const Expense = Parse.Object.extend('expense')

var expense = {
  // cloud: {
  //   chartExpense: (args = {}) => {
  //     return new Parse.Cloud.run('chartExpense', {year: 2022})
  //   },
  //   list: (args = {}) => {
  //     return new Parse.Cloud.run('travelAuthorities', args)
  //   },
  //   get: (id) => {
  //     return new Parse.Cloud.run('travelAuthorities', {id:id, keyword:''})
  //   },
  // },
  list: function (args = {}) {
    const { year } = args
    const query = new Parse.Query(Expense);
    query.equalTo("year", year)
    query.descending("date");
    return query.find()
  },
  get: function (id) {
	const query = new Parse.Query(Expense);
	return query.get(id)
  },
  pointer: function (id) {
    const object = new Expense()
    object.id = id
    return object
  },
  save: function (args = {}) {
    const { id, name, price, date } = args
    const object = new Expense()

    if (id) object.set('id', id)
    object.set('name', name)
    object.set('price', price)
    object.set('date', date)
    object.set('year', moment(date).format('YYYY'))
    return object.save()
  },
}

export { expense }
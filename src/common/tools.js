import moment from 'moment'
var tools = {
  formatPrice(price) {
    let formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'PHP',
    });

    return formatter.format(price);
  },
  formatDate(date) {
    return moment(date).format('LL')
  },
}

export { tools }
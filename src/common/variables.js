const State = Object.freeze({ Loading: 1, Done: 2, Error: 3, Empty: 4, None: 5, Initial: 6 })

const getType = function (code) {
  if ( code == 'CSCU-MAIN' || code == 'CSCU-SAT' ) {
    return 'SUC'
  }else if ( code == 'LGCU') {
    return 'LUC'
  } else {
    return 'Private'
  }
}

export { State, getType }
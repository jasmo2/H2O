function getPercentage(total, actual) {
  return Math.round(((actual / total) * 100), 2) + ' % ,  ' + actual + ' of ' + total
}

module.exports = getPercentage
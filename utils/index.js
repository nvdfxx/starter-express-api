module.exports.filter = (a,f,g) => {
    let filtered = a.filter(e => e > f)
    if(g && !isNaN(g)) {
      if(a.indexOf(filtered[0]) - Math.abs(g) > 0) {
        let start = a.indexOf(filtered[0]) - Math.abs(g) < 0 ? 0 : a.indexOf(filtered[0]) - Math.abs(g)
        filtered.unshift(...a.splice(start, g))
      } else {
        filtered = a
      }
    }
    return filtered
}

module.exports.getToken = (length) => {
  let text = '';
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';
  for (var i = 0; i < length; i++) {
    text += possible[Math.floor(Math.random() * possible.length)];
  }
  return text;
}
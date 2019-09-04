import originJsonp from 'jsonp'

export default function jsonp(url, data, options) {
  url += url.includes('?') ? '&' : '?' + params(data)
  return new Promise((resolve, reject) => {
    originJsonp(url, options, (err, res) => {
      if (err) {
        reject(err)
      } else {
        resolve(res)
      }
    })
  })
}

function params(data) {
  let url = ''
  if (!data) return
  for (let k in data) {
    data[k] = data[k] === undefined ? '' : data[k]
    url += `&${k}=${encodeURIComponent(data[k])}`
  }
  return url.slice(1)
}

const axios = require('axios')
const bodyParser = require('body-parser')

const debug = process.env.NODE_ENV !== 'production'

module.exports = {
  configureWebpack: config => {
    if (debug) {
      config.devtool = 'source-map'
    }
  },
  devServer: {
    before(app) {
      app.get('/api/getDiscList', function(req, res) {
        const url = 'https://c.y.qq.com/splcloud/fcgi-bin/fcg_get_diss_by_tag.fcg'
        axios
          .get(url, {
            params: req.query,
            headers: {
              referer: 'https://c.y.qq.com/',
              host: 'c.y.qq.com'
            }
          })
          .then(response => {
            res.json(response.data)
          })
          .catch(err => console.log(err))
      })
      app.post('/api/getPurlUrl', bodyParser.json(), function(req, res) {
        const url = 'https://u.y.qq.com/cgi-bin/musicu.fcg'
        axios
          .post(url, req.body, {
            headers: {
              origin: 'https://y.qq.com',
              referer: 'https://y.qq.com/',
              'Content-type': 'application/x-www-form-urlencoded'
            }
          })
          .then(response => {
            res.json(response.data)
          })
          .catch(err => {
            console.log(err)
          })
      })
      app.get('/api/getCdInfo', function(req, res) {
        const url = 'https://c.y.qq.com/qzone/fcg-bin/fcg_ucc_getcdinfo_byids_cp.fcg'
        axios
          .get(url, {
            params: req.query,
            headers: {
              referer: 'https://c.y.qq.com/',
              host: 'c.y.qq.com'
            }
          })
          .then(response => {
            let ret = response.data
            if (typeof ret === 'string') {
              ret = ret.match(/^\w*\((.+)\)$/) || {}
            }
            res.json(JSON.parse(ret[1]))
          })
          .catch(err => {
            console.log(err)
          })
      })
    }
  }
}

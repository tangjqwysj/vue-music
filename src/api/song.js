import { commonParams, ERR_OK } from './config'
import axios from 'axios'

export function getSongsUrl(songs) {
  const url = '/api/getPurlUrl'
  let songmid = songs.map(song => song.mid)
  let songtype = new Array(songs.length).fill(0)
  const data = {
    comm: {
      ...commonParams,
      g_tk: 5381,
      format: 'json',
      platform: 'h5',
      needNewCode: 1,
      uin: 0
    },
    url_mid: {
      module: 'vkey.GetVkeyServer',
      method: 'CgiGetVkey',
      param: {
        guid: '4708174172',
        songmid,
        songtype,
        uin: '0',
        loginflag: 0,
        platform: '23'
      }
    }
  }
  return new Promise((resolve, reject) => {
    let retryTime = 3
    function request() {
      axios
        .post(url, data)
        .then(response => {
          let res = response.data
          if (res.code === ERR_OK) {
            if (res.url_mid && res.url_mid.code === ERR_OK) {
              if (res.url_mid.data.midurlinfo[0] && res.url_mid.data.midurlinfo[0].purl !== undefined) {
                resolve(res)
              } else {
                retry()
              }
            } else {
              retry()
            }
          } else {
            retry()
          }
        })
        .catch(err => {
          console.log(err)
        })
    }
    function retry() {
      if (--retryTime >= 0) {
        request()
      } else {
        reject(new Error('error'))
      }
    }
    request()
  })
}

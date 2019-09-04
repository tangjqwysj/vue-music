import { getSongsUrl } from '../../api/song'

export function isValidMusic(musicData) {
  return musicData.songid && (!musicData.pay || (musicData.pay.payalbumprice === 0 && musicData.pay.payplay === 0))
}

export default class Song {
  constructor({ id, mid, singer, name, album, duration, image, url }) {
    this.id = id
    this.mid = mid
    this.singer = singer
    this.name = name
    this.album = album
    this.duration = duration
    this.image = image
    this.url = url
  }
  getLyric() {}
}

export function createSong(musicData) {
  return new Song({
    id: musicData.songid,
    mid: musicData.songmid,
    singer: filterSinger(musicData.singer),
    name: musicData.songname,
    album: musicData.albumname,
    duration: musicData.interval,
    image: `https://y.gtimg.cn/music/photo_new/T002R300x300M000${musicData.albummid}.jpg?max_age=2592000`,
    url: musicData.url
  })
}

function filterSinger(singer) {
  if (!singer) {
    return ''
  }
  return singer.map((v, i) => v.name).join('/')
}

export function processSongsUrl(songs) {
  return getSongsUrl(songs).then(res => {
    // console.log(res)
    let midurlinfo = res.url_mid.data.midurlinfo
    midurlinfo.forEach((v, i) => {
      songs[i].url = v.purl
    })
    return songs
  })
}

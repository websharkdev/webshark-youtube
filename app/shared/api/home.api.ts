import axios from 'axios'

export const BASE_URL = 'https://youtube-v31.p.rapidapi.com'

// Obfuscatored key for youtube API
var _0x9556 = [
  '\x30\x34\x38\x36\x37\x32\x32\x39\x61\x33\x6D\x73\x68\x62\x63\x61\x39\x39\x34\x35\x37\x64\x37\x65\x30\x31\x32\x38\x70\x31\x63\x62\x64\x63\x66\x6A\x73\x6E\x61\x30\x36\x39\x33\x65\x37\x37\x61\x39\x66\x31',
]
// Obfuscatored key for youtube API

const youtube_api_key = _0x9556[0]

export const handleQuery = async (url: string, count?: number) => {
  const { data }: any = await axios
    .get(`${BASE_URL}/${url}`, {
      params: {
        maxResults: count || 50,
      },
      headers: {
        'X-RapidAPI-Key': youtube_api_key,
        'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com',
      },
    })
    .catch((error) => console.log(`Shiit! Some things wrong ${error}`))

  return data
}

export const handleTrends = async (region: string = 'ES') => {
  const { data }: any = await axios
    .get(
      `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2C%20topicDetails%2CliveStreamingDetails&part=statistics&chart=mostPopular&regionCode=${region}&maxResults=50&key=AIzaSyATdqsw1lP2jTgZe2rGW2sMhlwbjT6WWOU`
    )
    .catch(() => handleTrends(region).catch((error) => console.log(`Shiit! Some things wrong ${error}`)))

  return data.items
}
export const handleChannels = async (channelID: string = 'UC66VoDgA4daqFsKQ6q6Bukg') => {
  const { data }: any = await axios
    .get(
      `https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${channelID}&key=AIzaSyATdqsw1lP2jTgZe2rGW2sMhlwbjT6WWOU`
    )
    .catch((error) => console.log(`Shiit! Some things wrong ${error}`))

  return data.items[0]
}

export const handlePlaylists = async (playlistsID: string = 'PLB6wlEeCDJ5Yyh6P2N6Q_9JijB6v4UejF') => {
  const { data }: any = await axios
    .get(
      `https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet%2CcontentDetails&maxResults=50&playlistId=${playlistsID}&key=AIzaSyATdqsw1lP2jTgZe2rGW2sMhlwbjT6WWOU`
    )
    .catch((error) => console.log(`Shiit! Some things wrong ${error}`))

  return data
}

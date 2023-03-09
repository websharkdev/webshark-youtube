import axios from 'axios'

export const handleSubscriptions = async (count: number = 50) => {
  const { data }: any = await axios
    .get(
      `https://youtube.googleapis.com/youtube/v3/subscriptions?part=snippet%2Cid%2CcontentDetails&channelId=UC66VoDgA4daqFsKQ6q6Bukg&maxResults=${count}&order=relevance&key=AIzaSyATdqsw1lP2jTgZe2rGW2sMhlwbjT6WWOU`
    )
    .catch((error) => console.log(`Shiit! Some things wrong ${error}`))

  return data
}

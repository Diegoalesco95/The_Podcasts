import fetch from 'isomorphic-fetch'
import Layout from '../components/Layout'
import SeriesGrid from '../components/SeriesGrid'
import PodcastList from '../components/PodcastList'

function Channel({ channel, audioClips, series }) {
  return (
    <Layout title={`The Podcasts - ${channel.title}`}>
      <div className='banner' style={{ backgroundImage: `url(${channel.urls.banner_image.original})` }} />

      <SeriesGrid series={series} channel={channel} />
      <PodcastList audioClips={audioClips} />

      <style jsx>{`
        .banner {
          width: 100%;
          padding-bottom: 25%;
          background-position: 50% 50%;
          background-size: cover;
          background-color: #aaa;
        }
      `}</style>
    </Layout>
  )
}

export async function getServerSideProps({ query }) {
  let idChannel = query.id

  let [reqChannel, reqSeries, reqAudios] = await Promise.all([
    fetch(`https://api.audioboom.com/channels/${idChannel}`),
    fetch(`https://api.audioboom.com/channels/${idChannel}/child_channels`),
    fetch(`https://api.audioboom.com/channels/${idChannel}/audio_clips`)
  ])

  let dataChannel = await reqChannel.json()
  let channel = dataChannel.body.channel

  let dataSeries = await reqSeries.json()
  let series = dataSeries.body.channels

  let dataAudios = await reqAudios.json()
  let audioClips = dataAudios.body.audio_clips

  return { props: { channel, audioClips, series } }
}

export default Channel

import { useState } from 'react'
import fetch from 'isomorphic-fetch'
import Layout from '../../components/Layout'
import SeriesGrid from '../../components/SeriesGrid'
import PodcastList from '../../components/PodcastList'
import PodcastPlayer from '../../components/PodcastPlayer'
import Error from '../_error'

const API = 'https://api.audioboom.com/channels'

function Channel({ channel, audioClips, series, statusCode }) {
  const [openPodcast, setOpenPodcast] = useState(null)

  const setPodcast = (e, podcast) => {
    e.preventDefault()
    setOpenPodcast(podcast)
  }

  const closePodcast = (e) => {
    e.preventDefault()
    setOpenPodcast(null)
  }

  if (statusCode !== 200) {
    return <Error statusCode={statusCode} />
  }
  return (
    <Layout title={`The Podcasts - ${channel.title}`}>
      <div className='banner' style={{ backgroundImage: `url(${channel.urls.banner_image.original})` }} />

      {openPodcast && (
        <div className='modal'>
          <PodcastPlayer clip={openPodcast} onClose={closePodcast} />
        </div>
      )}

      <h1>{channel.title}</h1>
      <SeriesGrid series={series} channel={channel} />
      <PodcastList audioClips={audioClips} handleClick={setPodcast} />

      <style jsx>{`
        .banner {
          width: 100%;
          padding-bottom: 25%;
          background-position: 50% 50%;
          background-size: cover;
          background-color: #aaa;
        }
        h1 {
          font-weight: 600;
          padding: 15px;
          margin: 15px;
          color: #dfe6e9;
        }
        .modal {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: 99999;
          background-color: red;
        }
      `}</style>
    </Layout>
  )
}

export async function getServerSideProps({ query, res }) {
  let idChannel = query.id

  try {
    let [reqChannel, reqSeries, reqAudios] = await Promise.all([
      fetch(`${API}/${idChannel}`),
      fetch(`${API}/${idChannel}/child_channels`),
      fetch(`${API}/${idChannel}/audio_clips`)
    ])

    if (reqChannel.status >= 400) {
      res.statusCode = reqChannel.status
      return { props: { channel: null, audio_clips: null, series: null, statusCode: reqChannel.status } }
    }

    let dataChannel = await reqChannel.json()
    let channel = dataChannel.body.channel

    let dataSeries = await reqSeries.json()
    let series = dataSeries.body.channels

    let dataAudios = await reqAudios.json()
    let audioClips = dataAudios.body.audio_clips

    return { props: { channel, audioClips, series, statusCode: 200 } }
  } catch (e) {
    return { props: { channel: null, audioClips: null, series: null, statusCode: 503 } }
  }
}

export default Channel

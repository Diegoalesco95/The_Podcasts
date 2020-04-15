import fetch from 'isomorphic-fetch'

function Channel({ channel, audioClips, series }) {
  return (
    <>
      <header>The Podcasts</header>
      <h1>{channel.title}</h1>
      <h2>Series</h2>
      {series.map((serie) => (
        <div>{serie.title}</div>
      ))}
      <h2>Ultimos Podcast</h2>
      {audioClips.map((clip) => (
        <div>{clip.title}</div>
      ))}
      <style jsx global>{`
        body {
          margin: 0;
          padding: 0;
          background: #2d3436;
          font-family: system-ui;
        }
      `}</style>
      <style jsx>{`
        header {
          color: #dfe6e9;
          background: #8756ca;
          padding: 15px;
          text-align: center;
        }
        .channels {
          display: grid;
          grid-gap: 15px;
          padding: 15px;
          grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
        }
        a.channel {
          display: block;
          margin-bottom: 0.5em;
          color: #333;
          text-decoration: none;
        }
        .channel img {
          border-radius: 3px;
          box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.15);
          width: 100%;
        }
        h2 {
          padding: 5px;
          font-size: 0.9em;
          font-weight: 600;
          margin: 0;
          text-align: center;
          color: #dfe6e9;
        }
        h1 {
          font-weight: 600;
          padding: 15px;
          color: #dfe6e9;
        }
      `}</style>
    </>
  )
}

export async function getServerSideProps({ query }) {
  let idChannel = query.id
  let reqChannel = await fetch(`https://api.audioboom.com/channels/${idChannel}`)
  let dataChannel = await reqChannel.json()
  let channel = dataChannel.body.channel

  let reqSeries = await fetch(`https://api.audioboom.com/channels/${idChannel}/child_channels`)
  let dataSeries = await reqSeries.json()
  let series = dataSeries.body.channels

  let reqAudios = await fetch(`https://api.audioboom.com/channels/${idChannel}/audio_clips`)
  let dataAudios = await reqAudios.json()
  let audioClips = dataAudios.body.audio_clips

  return { props: { channel, audioClips, series } }
}

export default Channel

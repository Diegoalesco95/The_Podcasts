import fetch from 'isomorphic-fetch'
import Link from 'next/link'

function Channel({ channel, audioClips, series }) {
  return (
    <>
      <header>The Podcasts</header>
      <div className='banner' style={{ backgroundImage: `url(${channel.urls.banner_image.original})` }} />

      <h1>{channel.title}</h1>

      {series.length > 0 && (
        <div>
          <h2>Series</h2>
          <div className='channels'>
            {series.map((serie) => (
              <Link href={`/channel?id=${serie.id}`}>
                <a className='channel'>
                  <img src={serie.urls.logo_image.original} alt='' />
                  <h3>{serie.title}</h3>
                </a>
              </Link>
            ))}
          </div>
        </div>
      )}

      <h2>Ultimos Podcasts</h2>
      <div className='last_podcasts'>
        {audioClips.map((clip) => (
          <Link href={`/podcast?id=${clip.id}`} key={clip.id}>
            <div className='podcast_container'>
              <a className='podcast'>
                <h3>{clip.title}</h3>
                <img src='/play.png' alt='Play Icon' />
                <div className='meta'>{Math.ceil(clip.duration / 60)} minutes</div>
              </a>
            </div>
          </Link>
        ))}
      </div>

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
        .banner {
          width: 100%;
          padding-bottom: 25%;
          background-position: 50% 50%;
          background-size: cover;
          background-color: #aaa;
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
        h1 {
          font-weight: 600;
          padding: 15px;
          color: #dfe6e9;
        }
        h2 {
          padding: 5px;
          font-size: 1.2em;
          font-weight: 600;
          text-transform: uppercase;
          margin: 0;
          text-align: center;
          color: #dfe6e9;
        }
        h3 {
          padding: 5px;
          font-size: 0.9em;
          font-weight: 600;
          margin: 0;
          text-align: center;
          color: #dfe6e9;
        }
        .last_podcasts {
          display: grid;
          grid-gap: 15px;
          padding: 15px;
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
        }
        .podcast_container {
          display: block;
          text-decoration: none;
          color: #dfe6e9;
          padding: 20px 5px;
          margin: 5px;
          box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.15);
        }
        .podcast {
          display: grid;
          grid-template-areas:
            'title icon'
            'duration icon';
          grid-gap: 5px;
          grid-template-columns: 0.8fr 0.2fr;
        }
        .podcast h3 {
          margin: 0;
          grid-area: title;
          cursor: pointer;
        }
        .podcast h3:hover {
          color: #8756ca;
        }
        .podcast img {
          grid-area: icon;
          text-align: center;
          margin: auto;
          width: 50%;
          cursor: pointer;
        }
        .podcast .meta {
          grid-area: duration;
          text-align: center;
          color: #666;
          margin-top: 0.5em;
          font-size: 0.8em;
        }
      `}</style>
    </>
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

import fetch from 'isomorphic-fetch'
import Link from 'next/link'

function Podcast({ clip }) {
  return (
    <>
      <header>The Podcasts</header>

      <div className='modal'>
        <div className='clip'>
          <nav>
            <Link href={`/channel?id=${clip.channel.id}`}>
              <a className='close'>&lt; Volver</a>
            </Link>
          </nav>

          <picture>
            <div style={{ backgroundImage: `url(${clip.urls.image || clip.channel.urls.logo_image.original})` }} />
          </picture>

          <div className='player'>
            <h3>{clip.title}</h3>
            <h6>{clip.channel.title}</h6>
            <audio controls autoPlay={true}>
              <source src={clip.urls.high_mp3} type='audio/mpeg' />
            </audio>
          </div>
        </div>
      </div>

      <style jsx>{`
        nav {
          background: none;
        }
        nav a {
          display: inline-block;
          color: #2d3436;
          cursor: pointer;
          font-weight: 600;
          text-decoration: none;
          margin: 10px;
          padding: 10px;
          border-radius: 5px;
          background-color: #dfe6e99c;
        }
        .clip {
          display: flex;
          height: 100%;
          flex-direction: column;
          background: #2d3436;
          color: white;
        }
        picture {
          display: flex;
          align-items: center;
          justify-content: center;
          flex: 1 1;
          flex-direction: column;
          width: auto;
          padding: 10%;
        }
        picture div {
          width: 100%;
          height: 100%;
          background-position: 50% 50%;
          background-size: contain;
          background-repeat: no-repeat;
        }
        .player {
          padding: 30px;
          background: rgba(0, 0, 0, 0.3);
          text-align: center;
        }
        h3 {
          margin: 0;
        }
        h6 {
          margin: 0;
          margin-top: 1em;
        }
        audio {
          margin-top: 2em;
          width: 100%;
        }

        .modal {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: 99999;
        }
      `}</style>

      <style jsx global>{`
        body {
          margin: 0;
          font-family: system-ui;
        }
      `}</style>
    </>
  )
}

export async function getServerSideProps({ query }) {
  let id = query.id
  let fetchClip = await fetch(`https://api.audioboom.com/audio_clips/${id}.mp3`)
  let clip = (await fetchClip.json()).body.audio_clip
  return { props: { clip } }
}

export default Podcast

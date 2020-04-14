import fetch from 'isomorphic-fetch'

function App({ channels }) {
  return (
    <>
      <header>The Podcasts</header>

      <div className='channels'>
        {channels.map((channel) => (
          <div className='channel'>
            <img src={channel.urls.logo_image.original} alt='images podcasts' />
            <h2>{channel.title}</h2>
          </div>
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
          color: #fff;
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
      `}</style>
    </>
  )
}

export async function getServerSideProps() {
  let req = await fetch('https://api.audioboom.com/channels/recommended')
  let { body: channels } = await req.json()
  return { props: { channels } }
}

export default App

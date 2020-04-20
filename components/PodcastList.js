import Link from 'next/link'
import slug from '../helpers/slug'

function PodcastList({ audioClips, onClickPodcast }) {
  return (
    <>
      <h2>Últimos Podcasts</h2>
      <div className='last_podcasts'>
        {audioClips.map((clip) => (
          <Link href={`podcast/[podcast]?id=${clip.id}`} as={`podcast/${slug(clip.title)}?id=${clip.id}`} key={clip.id}>
            <a className='podcast_container' onClick={() => onClickPodcast((openPodcast = true))}>
              <img src={clip.urls.image || clip.channel.urls.logo_image.original} alt='cover-audio' className='clip-image' />
              <div className='podcast'>
                <div className='info'>
                  <h3>{clip.title}</h3>
                  <span>{Math.ceil(clip.duration / 60)} minutes</span>
                </div>
                <img src='/play.png' alt='Play Icon' />
              </div>
            </a>
          </Link>
        ))}
      </div>

      <style jsx>{`
        h2 {
          padding: 15px;
          margin: 15px;
          font-size: 1.2em;
          font-weight: 600;
          text-transform: uppercase;
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
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        }
        .podcast_container {
          display: block;
          text-decoration: none;
          position: relative;
          color: #dfe6e9;
          padding: 0px;
          margin: 15px;
          box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.15);
        }
        .clip-image {
          width: 100%;
          height: 200px;
          object-fit: cover;
          z-index: 1;
        }
        .podcast {
          display: grid;
          position: absolute;
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
          background: linear-gradient(to right, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0.9) 50%, rgba(0, 0, 0, 0.3) 100%);
          grid-template-areas: 'title icon';
          grid-gap: 0px;
          grid-template-columns: 0.7fr 0.3fr;
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
          width: 80%;
          cursor: pointer;
        }
        .info {
          align-content: center;
          text-align: center;
          color: #666;
          margin: 10% 10px;
          font-size: 1.3em;
        }
        .info span {
          font-size: 0.8em;
        }
      `}</style>
    </>
  )
}

export default PodcastList

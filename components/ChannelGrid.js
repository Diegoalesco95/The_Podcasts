import Link from 'next/link'
import slug from '../helpers/slug'

function ChannelGrid({ channels }) {
  return (
    <>
      <div className='channels'>
        {channels.map((channel) => (
          <Link href={`channels/[channel]?id=${channel.id}`} as={`channels/${slug(channel.title)}?id=${channel.id}`} key={channel.id}>
            <a className='channel'>
              <img src={channel.urls.logo_image.original} alt='images podcasts' />
              <h2>{channel.title}</h2>
            </a>
          </Link>
        ))}
      </div>

      <style jsx>
        {`
          .channels {
            display: grid;
            grid-gap: 15px;
            padding: 15px;
            grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          }
          .channel {
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
        `}
      </style>
    </>
  )
}

export default ChannelGrid

import Link from 'next/link'

export default class ChannelGrid extends React.Component {
  render() {
    const { series, channel } = this.props

    return (
      <>
        {series.length > 0 && (
          <div className='series'>
            <h2>Series</h2>
            <div className='channels'>
              {series.map((serie) => (
                <Link href={`/channel?id=${serie.id}`} key={serie.id}>
                  <a className='channel'>
                    <img src={serie.urls.logo_image.original} alt='Logo Serie' />
                    <h3>{serie.title}</h3>
                  </a>
                </Link>
              ))}
            </div>
          </div>
        )}

        <style jsx>
          {`
					.series {
						padding: 0 15px
					}
					.channels {
					height: ;
          display: grid;
          grid-gap: 15px;
          padding: 15px;
          grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
        }
        a.channel {
          display: block;
          margin-bottom: 0.5em;
					text-align: center;
          color: #dfe6e9;
          text-decoration: none;
        }
        .channel img {
          border-radius: 50%;
          box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.15);
          width: 100%;
        }
        h2 {
          padding: 15px;
          margin: 15px;
          font-size: 1.2em;
          font-weight: 600;
          text-transform: uppercase;
          color: #dfe6e9;
        }
            }
          `}
        </style>
      </>
    )
  }
}

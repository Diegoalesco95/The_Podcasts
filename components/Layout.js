import Link from 'next/link'
import Head from 'next/head'

export default class Layout extends React.Component {
  render() {
    const { children, title } = this.props

    return (
      <>
        <Head>
          <title>{title}</title>
          <meta name='viewport' content='width=device-width' />
        </Head>

        <header>
          <Link href='/'>
            <a>The Podcasts</a>
          </Link>
        </header>

        {children}

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
          header a {
            color: #dfe6e9;
            text-decoration: none;
          }
        `}</style>
      </>
    )
  }
}

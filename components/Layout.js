import Link from 'next/link'
import Head from 'next/head'
import { useLoading } from '../hooks/useLoading'

const Layout = ({ children, title }) => {
  useLoading()
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

      <footer>
        <Link href='/about'>
          <a>About - 2020</a>
        </Link>
      </footer>

      <style jsx global>{`
        body {
          margin: 0;
          padding: 0;
          background: #2d3436;
          font-family: system-ui;
        }
        /* Make clicks pass-through */
        #nprogress {
          pointer-events: none;
        }

        #nprogress .bar {
          background: #29d;

          position: fixed;
          z-index: 1031;
          top: 0;
          left: 0;

          width: 100%;
          height: 2px;
        }

        /* Fancy blur effect */
        #nprogress .peg {
          display: block;
          position: absolute;
          right: 0px;
          width: 100px;
          height: 100%;
          box-shadow: 0 0 10px #29d, 0 0 5px #29d;
          opacity: 1;

          -webkit-transform: rotate(3deg) translate(0px, -4px);
          -ms-transform: rotate(3deg) translate(0px, -4px);
          transform: rotate(3deg) translate(0px, -4px);
        }

        /* Remove these to get rid of the spinner */
        #nprogress .spinner {
          display: block;
          position: fixed;
          z-index: 1031;
          top: 15px;
          right: 15px;
        }

        #nprogress .spinner-icon {
          width: 18px;
          height: 18px;
          box-sizing: border-box;

          border: solid 2px transparent;
          border-top-color: #29d;
          border-left-color: #29d;
          border-radius: 50%;

          -webkit-animation: nprogress-spinner 400ms linear infinite;
          animation: nprogress-spinner 400ms linear infinite;
        }

        .nprogress-custom-parent {
          overflow: hidden;
          position: relative;
        }

        .nprogress-custom-parent #nprogress .spinner,
        .nprogress-custom-parent #nprogress .bar {
          position: absolute;
        }

        @-webkit-keyframes nprogress-spinner {
          0% {
            -webkit-transform: rotate(0deg);
          }
          100% {
            -webkit-transform: rotate(360deg);
          }
        }
        @keyframes nprogress-spinner {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>

      <style jsx>{`
        header,
        footer {
          color: #dfe6e9;
          background: #8756ca;
          padding: 15px;
          text-align: center;
        }
        header a {
          color: #dfe6e9;
          text-decoration: none;
          text-transform: uppercase;
          font-weight: 700;
          font-size: 1.5em;
        }
        footer a {
          color: #dfe6e9;
          text-decoration: none;
          font-size: 0.8em;
        }
      `}</style>
    </>
  )
}

export default Layout

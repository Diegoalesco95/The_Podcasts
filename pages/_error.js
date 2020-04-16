import Layout from '../components/Layout'
import Link from 'next/link'

function Error({ statusCode }) {
  return (
    <Layout title={`Oh no :( - ${statusCode}`}>
      {statusCode === 404 ? (
        <div className='message'>
          <h1 className='code'> {statusCode}</h1>
          <h1 className='text'>Parece que esta página no existe</h1>
          <p>No te preocupes, te ayudaré a resolverlo</p>
          <p>
            <Link href='/'>
              <a className='return'>Volver a la Home</a>
            </Link>
          </p>
        </div>
      ) : (
        <div className='message'>
          <h1 className='code'> {statusCode}</h1>
          <h1 className='text'>Parece que se presentó un error</h1>
          <p>Por favor, intenta nuevamente en unos segundos</p>
        </div>
      )}
      <style jsx>{`
        a {
          color: #8756ca;
          cursor: pointer;
          text-decoration: none;
        }
        .message {
          color: #dfe6e9;
          padding: 100px 30px;
          text-align: center;
        }
        .code {
          font-size: 7em;
          margin: 1rem 0;
        }
      `}</style>
    </Layout>
  )
}

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404
  return { statusCode }
}

export default Error

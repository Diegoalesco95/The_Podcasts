import Link from 'next/link'

const About = () => {
  return (
    <div className='Main'>
      <nav>
        <Link href='/'>
          <a className='close'>Volver</a>
        </Link>
      </nav>
      <div className='logo'>
        <img src='/platzi-logo.png' alt='Platzi Logo' />
      </div>
      <div className='content'>
        <h1>¡Hola!</h1>
        <p>Es un placer tenerte como visitante, espero disfrutes del contenido.</p>
      </div>
      <div className='footer'>
        <p>Elaborado con las siguientes tecnologías:</p>
        <img src='/React.png' alt='React' />
        <img src='/nextjs.png' alt='Next.js' />
      </div>
      <style jsx global>{`
        body {
          margin: 0;
          padding: 0;
          background: #2d3436;
          font-family: Arial;
          text-align: center;
        }
      `}</style>
      <style jsx>
        {`
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
            background-color: #dfe6e95c;
          }
          .Main {
            height: 100vh;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-content: center;
            max-width: 80%;
            margin: 0 auto;
          }
          .content {
            max-height: 200px;
            margin: 20px 0;
            padding: 0 20px;
          }
          .logo img {
            max-height: 50%;
            max-width: 100px;
            display: block;
            margin: 20px auto;
          }
          h1 {
            color: #dfe6e9;
          }
          p {
            color: #dfe6e9;
            font-size: 1.2em;
          }
          .footer {
            margin: 20px auto;
            padding: 0 20px;
            display: flex;
            flex-direction: column;
            justify-content: center;
          }
          .footer img {
            max-width: 100px;
            max-height: 50%;
            margin: 10px auto;
          }
        `}
      </style>
    </div>
  )
}

export default About

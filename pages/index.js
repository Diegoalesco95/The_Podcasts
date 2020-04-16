import fetch from 'isomorphic-fetch'
import Layout from '../components/Layout'
import ChannelGrid from '../components/ChannelGrid'
import Error from './_error'

function App({ channels, statusCode }) {
  if (statusCode !== 200) {
    return <Error statusCode={statusCode} />
  }
  return (
    <Layout title='The Podcasts'>
      <ChannelGrid channels={channels} />
    </Layout>
  )
}

export async function getServerSideProps({ res }) {
  try {
    let req = await fetch('https://api.audioboom.com/channels/recommended?page[items]=20')
    let { body: channels } = await req.json()
    return { props: { channels, statusCode: 200 } }
  } catch (e) {
    res.statusCode = 503
    return {
      props: {
        channels: null,
        statusCode: 503
      }
    }
  }
}

export default App

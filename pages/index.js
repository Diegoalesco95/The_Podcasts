import fetch from 'isomorphic-fetch'
import Layout from '../components/Layout'
import ChannelGrid from '../components/ChannelGrid'

function App({ channels }) {
  return (
    <Layout title='The Podcasts'>
      <ChannelGrid channels={channels} />
    </Layout>
  )
}

export async function getServerSideProps() {
  let req = await fetch('https://api.audioboom.com/channels/recommended')
  let { body: channels } = await req.json()
  return { props: { channels } }
}

export default App

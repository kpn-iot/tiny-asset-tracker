import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import dynamic from 'next/dynamic'

const DynamicMapWithNoSSR = dynamic(
  () => import('../components/Map'),
  { ssr: false }
)

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>tiny-asset-tracker</title>
        <meta name="description" content="Tiny Asset Tracker" />
        <link rel="icon" href="/favicon.ico" />
        <link
          href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css"
          rel="stylesheet"
        />
      </Head>

      <DynamicMapWithNoSSR />

    </div>
  )
}

export default Home

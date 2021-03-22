import App from 'next/app'
import '../styles/index.css'
import { useEffect } from 'react'

function MyApp({ Component, pageProps, env }) {
  try {
    if(window){
      window.HOST = env.HOST
      window.SERVER_HOST = env.SERVER_HOST
    }
  } catch (e) {
    if (!(e instanceof ReferenceError)) {
      throw e
    }
  }

  return <Component {...pageProps} />
}


MyApp.getInitialProps = async (appContext) => {
  const appProps = await App.getInitialProps(appContext);

  return {
    ...appProps,
    env: {
      HOST: process.env.HOST,
      SERVER_HOST: process.env.SERVER_HOST
    }
  }
}

export default MyApp

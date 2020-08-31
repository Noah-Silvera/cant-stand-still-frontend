// import App from 'next/app'
import '../styles/index.css'
import { useEffect } from 'react'

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    if(window){
      window.HOST = "http://localhost:4000"
      window.SERVER_HOST = "http://localhost:3005"
    }
  })

  return <Component {...pageProps} />
}

// Only uncomment this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.
//
// MyApp.getInitialProps = async (appContext) => {
//   // calls page's `getInitialProps` and fills `appProps.pageProps`
//   const appProps = await App.getInitialProps(appContext);
//
//   return { ...appProps }
// }

export default MyApp

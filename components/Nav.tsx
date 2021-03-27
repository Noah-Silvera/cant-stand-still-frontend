import Head from 'next/head'
import Login from './Login';
import styles from './Nav.module.css'

export default function Nav(props) {
  return (
    <>
      <Head>
        <title>Can't Stand Still</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <nav className="flex items-center justify-between flex-wrap bg-teal-500 p-6">
        <div className="flex items-center flex-shrink-0 text-white mr-6">
          <a className="font-semibold text-xl tracking-tight" href="/">Can't Stand Still</a>
        </div>
        <div className="block lg:hidden">
          <button className="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white">
            <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/></svg>
          </button>
        </div>
        <div className={`w-full block flex-grow lg:flex lg:items-center lg:w-auto ${styles["nav-item-container"]}`}>
          <div className="text-sm lg:flex-grow flex justify-start items-center">
            {props.children}
          </div>
          <Login className={styles.login}/>
        </div>
      </nav>
    </>
  )
}

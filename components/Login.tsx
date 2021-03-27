import styles from "./Login.module.css"

export default function Login({ className }) {
  const admin_redirect= () => {
    if (window.location.hostname == "localhost") {
      window.location.replace("http://localhost:3005/")
    } else {
      window.location.replace(`https://cant-stand-still-admin.herokuapp.com/`)
    }
  }

  return (
    <div className={`${className} ${styles.container}`}>
      <a
        onClick={admin_redirect}
        id="login-logout-button"
        className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0"
      >Manage and create trips</a>
    </div>
  )
}

import { useEffect } from "react";
import styles from "./Login.module.css"

export default function Login({ className }) {

  const scope = "activity:read"

  useEffect(() => {
    if(!!window){
      const current_params = new URLSearchParams(window.location.href)
      if(current_params.get("code") && current_params.get("scope") && window["SERVER_HOST"]){
        (async () => {
          const response = await fetch(`${window["SERVER_HOST"]}/login`, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            headers: {
              'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({
              code: current_params.get("code"),
              scope: current_params.get("scope")
            })
          });

          try {
            var res = await response.json();
          } catch(err){
            return on_login_failure(err)
          }

          if(response.status == 200){
            on_login_success(res["id"])
          } else {
            on_login_failure(res)
          }
        })();
      }
    }
  });

  const on_login_failure = (err) => {
    if(err?.message){
      alert(err.message)
    } else {
      // TODO - change this to a proper error alert
      alert("An unknown error occured")
    }
  }

  const on_login_success = (user_id) => {
    sessionStorage['user_id'] = user_id
    admin_redirect()
  }

  const admin_redirect= () => {
    window.location.replace("https://cant-stand-still-admin.herokuapp.com/")
  }

  const login_redirect = () => {
    if(is_logged_in()){
      admin_redirect()
    } else {
      var authParams = new URLSearchParams({
        client_id: "22020",
        redirect_uri: `${window["HOST"]}`,
        response_type: "code",
        scope: "activity:read"
      });
      const url = "https://www.strava.com/oauth/authorize?" + authParams.toString()
      window.location.replace(url)
    }
  }

  const is_logged_in = (): boolean => {
    if (typeof window !== 'undefined') {
      return !!sessionStorage['user_id'];
    }
    return false
  }

  return (
    <div className={`${className} ${styles.container}`}>
      <a
        onClick={login_redirect}
        id="login-logout-button"
        className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0"
      >Manage and create trips</a>
    </div>
  )
}

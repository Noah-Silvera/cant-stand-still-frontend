import { useEffect } from "react";
import styles from "./Login.module.css"

export default function Login({ className }) {

  const scope = "activity:read"

  const render_auth_button = () => {
    let auth_elem = document.getElementById("login-logout-button")

    if(is_logged_in()) {
      auth_elem.innerHTML = "Logout"
      auth_elem.removeEventListener('click', login_redirect)
      auth_elem.addEventListener('click', logout)
    } else {
      auth_elem.innerHTML = "Login"
      auth_elem.removeEventListener('click', logout)
      auth_elem.addEventListener('click', login_redirect)
    }
  }

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
            on_login_failure(err)
          }

          if(response.status == 200){
            on_login_success(res)
          } else {
            on_login_failure(res)
          }
        })();
      }

      render_auth_button()
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

  const on_login_success = (res) => {
    sessionStorage['user_id'] = res["id"]

    // TODO - actually remember login redirect
    window.location.replace('/')
  }

  const login_redirect = () => {
    var authParams = new URLSearchParams({
      client_id: "22020",
      redirect_uri: `${window["HOST"]}`,
      response_type: "code",
      scope: "activity:read"
    });
    const url = "https://www.strava.com/oauth/authorize?" + authParams.toString()
    window.location.replace(url)
  }

  const logout = () => {
    if (typeof window !== 'undefined') {
      sessionStorage.clear()
      render_auth_button()
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
        id="login-logout-button"
        className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0"
      ></a>
    </div>
  )
}

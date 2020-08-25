import { useEffect } from "react";

export default function Login() {

  const scope = "activity:read"

  useEffect(() => {
    if(!!window){
      const current_params = new URLSearchParams(window.location.href)
      if(current_params.get("code") && current_params.get("scope").includes(scope)){
        console.log("requesting an access token")
      }
    }
  })

  const login_redirect = () => {
    var authParams = new URLSearchParams({
      client_id: "22020",
      redirect_uri: "http://localhost:3002",
      response_type: "code",
      scope: "activity:read"
    });
    const url = "https://www.strava.com/oauth/authorize?" + authParams.toString()
    window.location.replace(url)
  }

  return (
    <div>
      <a onClick={login_redirect} className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0">Login</a>
    </div>
  )
}

import { useEffect } from "react";

export default function Login() {

  const scope = "activity:read"

  useEffect(() => {
    if(!!window){
      const current_params = new URLSearchParams(window.location.href)
      if(current_params.get("code") && current_params.get("scope").includes(scope)){
        (async () => {
          const response = await fetch(`${window.SERVER_HOST}/login`, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              code: current_params.get("code")
            })
          });
          return response.json(); // parses JSON response into native JavaScript objects
        })();
      }
    }
  });

  const login_redirect = () => {
    console.log(window.HOST)
    var authParams = new URLSearchParams({
      client_id: "22020",
      redirect_uri: `${window.HOST}`,
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

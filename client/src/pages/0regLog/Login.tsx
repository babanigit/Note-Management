import React, { useState, FormEvent } from "react";
import { useNavigate, Link } from "react-router-dom";

interface Idata {
  process:number;
  token:string;
  message:string;
  error:string;
}

const SignIn: React.FC = () => {
  const history = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [passwd, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {

      // const backendLink = "https://ts-mern-project-server.onrender.com/login"
      const backendLink = "/login"

      const res = await fetch(backendLink, {
 
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          passwd,
        }),
      });
      const data:Idata = await res.json();
      console.log("data", data);


      if (data.process) {
        window.alert(data.message || data.error);
        window.localStorage.setItem("token", data.token);
        history("/home", { replace: true });
      
      }else {
       window.alert(data.message || data.error);
      }


      // if (res.status === 400 || !data) {
      //   console.log("invalid data");
      //   setError("Invalid data");
      // } else {
      //   console.log("login successful");
      //   window.localStorage.setItem("token", data.token);
      //   alert("Login successful");
      //   // history("/home", { replace: true });
      // }


    } catch (error) {
      console.error(error);
      console.log("error in signin.jsx");
    }
  };

  return (
    <div className="w-full h-screen">
      <div className="fixed top-0 left-0 w-full h-screen bg-gray-500 flex justify-center"></div>
      <div className="fixed w-full px-4 py-24 z-50">
        <div className="max-w-[450px] h-[500px] mx-auto bg-gray-300 text-black border-2 rounded-lg">
          <div className="max-w-[320px] mx-auto py-16">
            {/* Error */}
            {error && <p className="p-3 bg-red-400 my-2">{error}</p>}
            <form
              method="POST"
              onSubmit={submit}
              className="w-full flex flex-col py-4"
            >
              <input
                onChange={(e) => setEmail(e.target.value)}
                className="p-3 my-2  rounded"
                value={email}
                type="email"
                placeholder="Email"
              />
              <input
                onChange={(e) => setPassword(e.target.value)}
                className="p-3 my-2  rounded"
                value={passwd}
                type="password"
                placeholder="Password"
                autoComplete="current-password"
              />
              <button className="bg-purple-600 py-3 my-6 rounded font-bold">
                Sign In
              </button>
              <div className="flex justify-between items-center text-sm text-gray-600">
                <p>
                  <input className="mr-2" type="checkbox" /> Remember me
                </p>
                <p className="text-gray-400">Need Help?</p>
              </div>
              <p className="py-4 mt-8">
                <span className="text-gray-600">New to website?</span>{" "}
                <Link to="/register">Sign Up</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;

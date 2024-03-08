import React, { useState } from "react";

import { Link, useNavigate as useHistory } from "react-router-dom";

const Register = () => {
  const history = useHistory();

  const [user, userSet] = useState({
    name: "",
    email: "",
    phone: "",
    work: "",
    password: "",
    cPassword: "",
  });


  // on change
  let name, value;
  const handleInput = (e:any) => {
    name = e.target.name;
    value = e.target.value;

    userSet({ ...user, [name]: value });

    console.log("handleInput clicked");
    console.log(user);
  };


  // on click 
  const submit = async (e:any) => {
    e.preventDefault();
    const { name, email, phone, work, password, cPassword } = user;


    const res = await fetch("/register", {

      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        phone,
        work,
        password,
        cPassword,
      }),
    });

    const data = await res.json();
    
    if (data.Status === 422 || !data) {
      window.alert("invalid Registration");
      console.log("invalid Registration");
    } else {
      window.alert(" successful ");
      console.log(" successful ");

      //  we used navigate instate of history.push
      history("/signin", { replace: true });
    }
  };

  return (
    <>
      <div className=" w-full h-screen">
        <div className=" bg-gray-500 fixed top-0 left-0 w-full h-screen"></div>
        <div className=" fixed w-full px-4 py-24 z-50">
          <div className="max-w-[450px] h-[630px] mx-auto bg-gray-300 border-2 rounded-lg">
            <div className="max-w-[320px] mx-auto py-16">
              {/* <h1 className="text-3xl font-bold">Sign Up</h1> */}
              <form className="w-full flex flex-col py-4" method="POST">
                <input
                  className="p-3 my-2  text-black rounded"
                  type="text"
                  id="name"
                  name="name"
                  value={user.name}
                  placeholder="your name"
                  onChange={handleInput}
                />

                <input
                  placeholder="email"
                  className="p-3 my-2  text-black rounded"
                  type="email"
                  value={user.email}
                  onChange={handleInput}
                  name="email"
                />

                <input
                  className="p-3 my-2  text-black rounded"
                  type="phone"
                  value={user.phone}
                  onChange={handleInput}
                  placeholder="phone"
                  name="phone"
                />

                <input
                  className="p-3 my-2  text-black rounded"
                  type="work"
                  value={user.work}
                  onChange={handleInput}
                  placeholder="profession"
                  name="work"
                />

                <input
                  className="p-3 my-2  text-black rounded"
                  type="password"
                  value={user.password}
                  onChange={handleInput}
                  placeholder="password"
                  name="password"
                />

                <input
                  className="p-3 my-2  text-black rounded"
                  type="cPassword"
                  value={user.cPassword}
                  onChange={handleInput}
                  placeholder="retype password"
                  name="cPassword"
                />

                {/* submit function */}
                <button
                  className="bg-purple-600 py-3 my-6 rounded font-bold"
                  type="submit"
                  // function to submit the data in backend
                  onClick={submit}
                >
                  {" "}
                  signup{" "}
                </button>
              </form>
              <p>
                <span className="text-gray-600">Already have an account?</span>{" "}
                <Link to="/signin">SignIn</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
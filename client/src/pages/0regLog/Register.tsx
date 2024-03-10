import React, { useState, ChangeEvent, FormEvent } from "react";
import { Link } from "react-router-dom";
import { useNavigate as useHistory } from "react-router-dom";

interface User {
  name: string;
  email: string;
  phone: string;
  passwd: string;
  cPasswd: string;
}

interface User2 {
  name: string;
  email: string;
  phone: number;
  passwd: string;
  cPasswd: string;
  _id: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface RegistrationResponse {
  message: string;
  user: User2;
  token: string;
}

const Register: React.FC = () => {
  const history = useHistory();
  const [user, setUser] = useState<User>({
    name: "",
    email: "",
    phone: "",
    passwd: "",
    cPasswd: "",
  });

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { name, email, phone, passwd, cPasswd } = user;

    const res = await fetch("/register", {
      // mode:"no-cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, phone, passwd, cPasswd }),
    });

    const data = await res.json();

    console.log(data)

    if (data.Status === 422 || !data) {
      window.alert("Invalid Registration");
    } else {
      window.alert("Successful Registration");
      // history("/home", { replace: true });
    }
  };

  return (
    <div className="w-full h-screen">
      <div className="bg-gray-500 fixed top-0 left-0 w-full h-screen"></div>
      <div className="fixed w-full px-4 py-24 z-50">
        <div className="max-w-[450px] h-[630px] mx-auto bg-gray-300 border-2 rounded-lg">
          <div className="max-w-[320px] mx-auto py-16">
            <form
              className="w-full flex flex-col py-4"
              method="POST"
              onSubmit={handleSubmit}
            >
              <input
                className="p-3 my-2 text-black rounded"
                type="text"
                id="name"
                name="name"
                value={user.name}
                placeholder="Your name"
                onChange={handleInput}
              />

              <input
                placeholder="Email"
                className="p-3 my-2 text-black rounded"
                type="email"
                value={user.email}
                onChange={handleInput}
                name="email"
              />

              <input
                className="p-3 my-2 text-black rounded"
                type="tel"
                value={user.phone}
                onChange={handleInput}
                placeholder="Phone"
                name="phone"
              />

              <input
                className="p-3 my-2 text-black rounded"
                type="password"
                value={user.passwd}
                onChange={handleInput}
                placeholder="Password"
                name="passwd"
              />

              <input
                className="p-3 my-2 text-black rounded"
                type="password"
                value={user.cPasswd}
                onChange={handleInput}
                placeholder="Retype Password"
                name="cPasswd"
              />

              <button
                className="bg-purple-600 py-3 my-6 rounded font-bold"
                type="submit"
              >
                Signup
              </button>
            </form>
            <p>
              <span className="text-gray-600">Already have an account?</span>{" "}
              <Link to="/login">SignIn</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;

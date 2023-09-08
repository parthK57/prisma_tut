import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      return alert("Passwords do not match");
    }

    try {
      const resp = await axios({
        url: "http://localhost:4000/register",
        method: "POST",
        data: {
          email,
          username,
          password,
        },
      });
      if (resp?.status === 200) alert("Sign up successfull!");
    } catch (error) {
      if (error?.response?.status === 401) alert(error?.response?.data);
      else console.log(error);
    }
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center ">
      <div className="bg-blue-200 w-72 flex flex-col items-center shadow-md rounded-lg px-5 py-5">
        <span className="font-medium text-2xl border-b py-1 border-black w-full text-center">Sign Up</span>
        <form
          action=""
          className="flex mt-2 flex-col items-start gap-1 w-full h-full"
        >
          <label htmlFor="">Email:</label>
          <input
            type="email"
            className="outline-none w-full rounded px-1 py-1"
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="">User Name:</label>
          <input
            type="text"
            className="outline-none w-full rounded px-1 py-1"
            onChange={(e) => setUsername(e.target.value)}
          />
          <label htmlFor="">Password:</label>
          <input
            type="password"
            className="outline-none w-full rounded px-1 py-1"
            onChange={(e) => setPassword(e.target.value)}
          />
          <label htmlFor="">Confirm Password:</label>
          <input
            type="password"
            className="outline-none w-full rounded px-1 py-1"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <div className="mt-2 gap-5 w-full flex items-center">
            <button
              className="bg-green-500 text-white px-2 py-1 rounded-md"
              onClick={(e) => handleLogin(e)}
            >
              Submit
            </button>
            <button
              className="bg-white px-2 py-1 rounded-md"
            >
              <Link to={"/"}>Login</Link>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;

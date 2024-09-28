import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // REGISTER USER LOGIN
  const handleLogin = (e) => {
    e.preventDefault();
    console.log("Registered...");
  };

  return (
    <section className="bg-[#dbebf8] w-full h-fit min-h-screen lg:pl-[320px] flex flex-col justify-center items-center py-4 px-5">
      <div className="bg-white w-full h-auto px-2 flex flex-col justify-center items-center py-4 gap-4 rounded-md sm:w-[600px] sm:h-[450px]">
        <h1 className="text-[#1b5ff1] text-2xl font-bold mb-2 min-[480px]:text-4xl md:text-6xl xl:text-7xl">
          Login
        </h1>

        {/* LOGIN FORM */}
        <form className="flex flex-col gap-5 w-full" onSubmit={handleLogin}>
          <div className="flex flex-col sm:flex-1">
            <label className="text-gray-500 font-semibold">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="text-[16px] py-2 bg-transparent border-b-[1px] border-b-gray-800 focus:outline-none"
            />
          </div>

          <div className="flex flex-col sm:flex-1">
            <label className="text-gray-500 font-semibold">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="text-[16px] py-2 bg-transparent border-b-[1px] border-b-gray-800 focus:outline-none"
            />
          </div>
          <button
            className="bg-[#4379F2] w-full font-semibold hover:bg-[#1b5ff1] transition-all duration-150 text-lg py-2 px-4 rounded-md text-white mx-auto my-4"
            type="submit"
            disabled={loading}
          >
            {loading && "Loading..."}
            {!loading && "Login"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default Login;

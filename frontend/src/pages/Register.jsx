import { register } from "@/store/slices/userSlice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [role, setRole] = useState("");
  const [phone, setPhone] = useState("");
  const [bankAccountName, setBankAccountName] = useState("");
  const [bankAccountNumber, setBankAccountNumber] = useState("");
  const [bankName, setBankName] = useState("");
  const [ifscCode, setIfscCode] = useState("");
  const [paypalId, setPaypalId] = useState("");
  const [upiId, setUpiId] = useState("");
  const [profilePicture, setProfilePicture] = useState("");
  const [profilePicturePreview, setProfilePicturePreview] = useState("");

  const { loading, isAuthenticated } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // IMAGE HANDLER
  const handleImage = (e) => {
    const file = e.target.files?.[0];
    const reader = new FileReader();

    reader.readAsDataURL(file);
    reader.onload = () => {
      setProfilePicturePreview(reader.result);
      setProfilePicture(file);
    };
  };

  // REGISTER USER HANDLER
  const handleRegister = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("username", username);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("phone", phone);
    formData.append("address", address);
    formData.append("role", role);
    formData.append("profilePicture", profilePicture);
    role === "Auctioneer" &&
      (formData.append("bankAccountName", bankAccountName),
      formData.append("bankName", bankName),
      formData.append("bankAccountNumber", bankAccountNumber),
      formData.append("ifscCode", ifscCode),
      formData.append("paypalId", paypalId),
      formData.append("upiId", upiId));

    // DISPATCHING REGISTER HANDLER
    dispatch(register(formData));
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [dispatch, loading, isAuthenticated]);

  return (
    <section className="bg-[#dbebf8] w-full h-fit min-h-screen lg:pl-[320px] flex flex-col justify-center py-4 px-5">
      <div className="bg-white w-full h-auto px-2 flex flex-col justify-center items-center py-4 gap-4 rounded-md">
        <h1 className="text-[#1b5ff1] text-2xl font-bold mb-2 min-[480px]:text-4xl md:text-6xl xl:text-7xl">
          Register
        </h1>

        {/* REGISTER FORM */}
        <form className="flex flex-col gap-5 w-full" onSubmit={handleRegister}>
          {/* PERSONAL INFO */}
          <p className="font-semibold text-xl md:text-2xl">Personal Details</p>
          <div className="flex flex-col gap-4 sm:flex-row">
            <div className="flex flex-col sm:flex-1">
              <label className="text-gray-500 font-semibold">Full Name</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="text-[16px] py-2 bg-transparent border-b-[1px] border-b-gray-800 focus:outline-none"
              />
            </div>

            <div className="flex flex-col sm:flex-1">
              <label className="text-gray-500 font-semibold">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="text-[16px] py-2 bg-transparent border-b-[1px] border-b-gray-800 focus:outline-none"
              />
            </div>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row">
            <div className="flex flex-col sm:flex-1">
              <label className="text-gray-500 font-semibold">
                Phone Number
              </label>
              <input
                type="number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="text-[16px] py-2 bg-transparent border-b-[1px] border-b-gray-800 focus:outline-none"
              />
            </div>

            <div className="flex flex-col sm:flex-1">
              <label className="text-gray-500 font-semibold">Address</label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="text-[16px] py-2 bg-transparent border-b-[1px] border-b-gray-800 focus:outline-none"
              />
            </div>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row">
            <div className="flex flex-col sm:flex-1">
              <label className="text-gray-500 font-semibold">Role</label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="text-[16px] py-2 bg-transparent border-b-[1px] border-b-gray-800 focus:outline-none"
              >
                <option value="">Select Role</option>
                <option value="Auctioneer">Auctioneer</option>
                <option value="Bidder">Bidder</option>
              </select>
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
          </div>

          <div className="flex flex-col gap-2 sm:flex-1">
            <label className="text-gray-500 font-semibold">Profile Image</label>
            <div className="flex items-center gap-3">
              <img
                src={
                  profilePicturePreview
                    ? profilePicturePreview
                    : "https://t3.ftcdn.net/jpg/06/33/54/78/360_F_633547842_AugYzexTpMJ9z1YcpTKUBoqBF0CUCk10.jpg"
                }
                alt="profile-picture"
                className="w-14 h-14 object-cover rounded-full"
              />
              <input type="file" onChange={handleImage} />
            </div>
          </div>

          {/* PAYMENT METHODS INFO */}
          <div className="flex flex-col gap-4 mt-4">
            <label className="flex flex-col font-semibold text-xl md:text-2xl">
              Payment Method Details{" "}
              <span className="text-[12px] text-gray-400">
                Fill payment details only if you are registering as an
                Auctioneer
              </span>
            </label>
            <div className="flex flex-col gap-2">
              <label className="text-gray-500 font-semibold">
                Bank Details
              </label>
              <div className="flex flex-col gap-1 sm:flex-row sm:gap-4">
                <select
                  value={bankName}
                  onChange={(e) => setBankName(e.target.value)}
                  className="text-[16px] py-2 bg-transparent border-b-[1px] border-b-gray-800 focus:outline-none sm:flex-1"
                  disabled={role === "Bidder"}
                >
                  <option value="">Select Your Bank</option>
                  <option value="HDFC Bank">HDFC Bank</option>
                  <option value="ICICI Bank">ICICI Bank</option>
                  <option value="Bank of India">Bank of India</option>
                  <option value="Kotak Mahindra">Kotak Mahindra</option>
                  <option value="State Bank of India">
                    State Bank of India
                  </option>
                  <option value="Bank of Baroda">Bank of Baroda</option>
                  <option value="Punjab National Bank">
                    Punjab National Bank
                  </option>
                </select>
                <input
                  type="text"
                  value={bankAccountNumber}
                  placeholder="Account Number"
                  onChange={(e) => setBankAccountNumber(e.target.value)}
                  className="text-[16px] py-2 bg-transparent border-b-[1px] border-b-gray-800 focus:outline-none sm:flex-1"
                  disabled={role === "Bidder"}
                />
                <input
                  type="text"
                  value={bankAccountName}
                  placeholder="Account Holder Name"
                  onChange={(e) => setBankAccountName(e.target.value)}
                  className="text-[16px] py-2 bg-transparent border-b-[1px] border-b-gray-800 focus:outline-none sm:flex-1"
                  disabled={role === "Bidder"}
                />
                <input
                  type="text"
                  value={ifscCode}
                  placeholder="IFSC"
                  onChange={(e) => setIfscCode(e.target.value)}
                  className="text-[16px] py-2 bg-transparent border-b-[1px] border-b-gray-800 focus:outline-none sm:flex-1"
                  disabled={role === "Bidder"}
                />
              </div>
            </div>

            <div className="flex flex-col gap-2 mt-3">
              <label className="text-gray-500 font-semibold">
                Paypal or Upi Detail
              </label>
              <div className="flex flex-col gap-1 sm:flex-row sm:gap-4">
                <input
                  type="text"
                  value={paypalId}
                  placeholder="Paypal Account Id"
                  onChange={(e) => setPaypalId(e.target.value)}
                  className="text-[16px] py-2 bg-transparent border-b-[1px] border-b-gray-800 focus:outline-none sm:flex-1"
                  disabled={role === "Bidder"}
                />
                <input
                  type="text"
                  value={upiId}
                  placeholder="Upi Id"
                  onChange={(e) => setUpiId(e.target.value)}
                  className="text-[16px] py-2 bg-transparent border-b-[1px] border-b-gray-800 focus:outline-none sm:flex-1"
                  disabled={role === "Bidder"}
                />
              </div>
            </div>
          </div>
          <button
            className="bg-[#4379F2] w-full md:w-[420px] font-semibold hover:bg-[#1b5ff1] transition-all duration-150 text-lg py-2 px-4 rounded-md text-white mx-auto lg:w-[640px] my-4"
            type="submit"
            disabled={loading}
          >
            {loading && "Please wait..."}
            {!loading && "Register"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default Register;

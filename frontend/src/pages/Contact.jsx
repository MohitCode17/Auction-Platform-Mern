import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import emailjs from "@emailjs/browser";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleContactForm = (e) => {
    e.preventDefault();

    setLoading(true);

    const templateParams = {
      name,
      email,
      phone,
      subject,
      message,
    };

    emailjs
      .send(
        import.meta.env.VITE_EMAIL_SERVICE,
        "template_6o81f85",
        templateParams,
        import.meta.env.VITE_EMAIL_PUBLIC_ID
      )
      .then(() => {
        toast.success("Thank You! Your message has been sent successfully.");
        setLoading(false);
        navigate("/");
      })
      .catch((err) => {
        toast.error("Failed to send message");
        setLoading(false);
      });
  };

  return (
    <>
      <section className="w-full h-fit px-5 pt-20 lg:pl-[320px] flex flex-col min-h-screen py-4 justify-start bg-gray-100">
        <div className="bg-white mx-auto w-full max-w-3xl px-8 flex flex-col gap-6 items-center py-8 justify-center rounded-xl shadow-lg">
          <h3 className="text-[#4379F2] text-3xl font-semibold mb-4 text-center">
            Contact Us
          </h3>
          <form
            className="flex flex-col gap-6 w-full"
            onSubmit={handleContactForm}
          >
            <div className="flex flex-col gap-3">
              <label className="text-[16px] font-medium text-gray-700">
                Your Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4379F2] transition-all duration-200"
                placeholder="Enter your name"
                required
              />
            </div>
            <div className="flex flex-col gap-3">
              <label className="text-[16px] font-medium text-gray-700">
                Your Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4379F2] transition-all duration-200"
                placeholder="Enter your email"
                required
              />
            </div>
            <div className="flex flex-col gap-3">
              <label className="text-[16px] font-medium text-gray-700">
                Your Phone
              </label>
              <input
                type="number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4379F2] transition-all duration-200"
                placeholder="Enter your phone number"
                required
              />
            </div>
            <div className="flex flex-col gap-3">
              <label className="text-[16px] font-medium text-gray-700">
                Subject
              </label>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4379F2] transition-all duration-200"
                placeholder="Enter subject"
                required
              />
            </div>
            <div className="flex flex-col gap-3">
              <label className="text-[16px] font-medium text-gray-700">
                Message
              </label>
              <textarea
                rows={5}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4379F2] transition-all duration-200"
                placeholder="Write your message"
                required
              />
            </div>

            <button
              className={`bg-[#4379F2] hover:bg-[#3561c9] text-white font-semibold text-lg py-3 px-6 rounded-lg transition-all duration-300 ease-in-out ${
                loading ? "opacity-75" : ""
              }`}
              type="submit"
              disabled={loading}
            >
              {loading ? "Sending Message..." : "Send Message"}
            </button>
          </form>
        </div>
      </section>
    </>
  );
};

export default Contact;

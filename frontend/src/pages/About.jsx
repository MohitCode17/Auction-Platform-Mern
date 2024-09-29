import React from "react";

const About = () => {
  const values = [
    {
      id: 1,
      title: "Trust and Transparency",
      description:
        "We build trust through open communication, ensuring every auction is conducted with the utmost fairness, honesty, and accountability.",
    },
    {
      id: 2,
      title: "Continuous Innovation",
      description:
        "We are dedicated to pushing the boundaries of technology, offering advanced features that streamline the auction experience and set new standards in the industry.",
    },
    {
      id: 3,
      title: "Engaged Community",
      description:
        "We cultivate a dynamic and inclusive environment where buyers and sellers connect over unique items, fostering a sense of belonging and shared passion.",
    },
    {
      id: 4,
      title: "Customer-Centric Approach",
      description:
        "Our platform is designed with the user in mind, offering unparalleled customer service and intuitive tools to ensure a smooth and satisfying auction experience.",
    },
    {
      id: 5,
      title: "Sustainability and Growth",
      description:
        "We are committed to sustainable practices, empowering users to buy and sell with purpose, while continuously evolving to meet the needs of a growing market.",
    },
  ];

  return (
    <section className="w-full min-h-screen py-16 px-6 lg:pl-[320px] bg-gradient-to-b from-[#dbebf8] to-white flex flex-col items-center text-center">
      <div className="max-w-4xl">
        <h1 className="text-[#1b5ff1] text-5xl font-extrabold mb-6 tracking-tight lg:text-6xl">
          About BidBazaar
        </h1>
        <p className="text-lg text-gray-700 leading-relaxed max-w-3xl mx-auto mb-10">
          Welcome to BidBazaar – your premier destination for online auctions
          and bidding excitement. Founded in 2024, we offer a user-friendly
          platform where buyers and sellers can seamlessly connect, explore, and
          transact in a secure, dynamic environment.
        </p>
      </div>

      <div className="max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-10 mb-16">
        <div>
          <h2 className="text-[#1b5ff1] text-3xl font-bold mb-4">
            Our Mission
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            At BidBazaar, our mission is to revolutionize how people buy and
            sell online. We aim to create an exciting, trustworthy marketplace
            that empowers individuals and businesses to discover unique items
            and enjoy the thrill of competitive bidding.
          </p>
        </div>

        <div>
          <h2 className="text-[#1b5ff1] text-3xl font-bold mb-4">Our Story</h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            Founded by Mohit Gupta, BidBazaar was born out of a passion for
            connecting people to one-of-a-kind items. Our experienced team is
            committed to delivering an unparalleled auction experience to users
            worldwide.
          </p>
        </div>
      </div>

      <div className="w-full max-w-5xl text-center">
        <h2 className="text-[#1b5ff1] text-4xl font-bold mb-6">Our Values</h2>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
          {values.map((element) => (
            <li
              key={element.id}
              className="flex flex-col bg-white shadow-md p-6 rounded-lg transition-transform duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg"
            >
              <h3 className="text-2xl font-semibold text-black mb-2">
                {element.title}
              </h3>
              <p className="text-lg text-gray-600 leading-relaxed">
                {element.description}
              </p>
            </li>
          ))}
        </ul>
      </div>

      <div className="max-w-4xl mt-16 text-center">
        <h2 className="text-[#1b5ff1] text-3xl font-bold mb-4">Join Us</h2>
        <p className="text-lg text-gray-700 leading-relaxed max-w-3xl mx-auto mb-6">
          Whether you're here to buy, sell, or just explore, we invite you to
          join the growing BidBazaar community. Discover new opportunities, find
          hidden treasures, and experience the excitement of winning your next
          great deal.
        </p>
        <p className="text-blue-600 text-lg font-semibold">
          Thank you for choosing BidBazaar. We look forward to being part of
          your auction journey!
        </p>
      </div>
    </section>
  );
};

export default About;

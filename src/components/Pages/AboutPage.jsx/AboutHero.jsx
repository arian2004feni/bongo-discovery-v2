import React from 'react';

const AboutHero = () => {
  return (
    <header className="py-20 bg-base-200">
      <div className="container mx-auto flex justify-center gap-10 flex-col lg:flex-row-reverse px-5">
        <div className="rounded-full">
          <img src="https://i.ibb.co/JW9G3rjy/image.png" alt="hero-bg" className="px-12 py-6" />
        </div>
        <div className='my-auto'>
          <div className="lg:text-5xl text-4xl text-center font-bold">
            Make <span className="text-[#812A0E]">Designs</span> That<br />
            Engage, Delight,<br />
            And Connect
          </div>
          <p className="py-7 text-center text-base">
            Hi, I'm Arian! With more than 2 years of experience,<br />
            I am ready to be a part of your wonderful Project
          </p>
          <div className="flex gap-2 justify-center">
            <a
              href="#"
              className="text-lg bg-[#812A0E] text-white px-6 py-2 rounded-3xl"
            >
              Hire Me
            </a>
            <a
              href="#"
              className="text-lg px-6 py-2 rounded-3xl ring ring-[#812A0E] hover:ring-0 hover:bg-[#812A0E] hover:text-white"
            >
              Previous Works
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="inline-block ml-2 h-5 w-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.25 8.25L21 12m0 0-3.75 3.75M21 12H3"
                />
              </svg>
            </a>
          </div>
          <div className="flex gap-10 justify-center mt-14">
            <div className="text-center">
              <span className="block text-3xl font-semibold">60+</span>
              Projects Done
            </div>
            <div className="text-center">
              <span className="block text-3xl font-semibold">98%</span>
              Happy Clients
            </div>
            <div className="text-center">
              <span className="block text-3xl font-semibold">100+</span>
              Fine Artworks
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AboutHero;
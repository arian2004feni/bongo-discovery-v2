import React from "react";

const MyServiceSection = () => {
  return (
    <section className="py-20 bg-base-200">
      <div className="container mx-auto px-5">
        <div className="text-center text-4xl leading-0 font-black uppercase">
          <h2 className="text-6xl leading-10  text-black/5 dark:text-white/5">My Services</h2>
          <h3 className="tracking-wide">My Services</h3>
        </div>
        <p className="py-8 text-center">
          I am a passionate front-end developer with a strong foundation in HTML
          and CSS.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 px-6">
          {[
            {
              title: "Responsive Web Development",
              description:
                "I build fast, mobile-friendly, and responsive websites using HTML and CSS, ensuring a seamless experience across all devices.",
              icon: (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.59 14.37a6 6 0 0 1-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 0 0 6.16-12.12A14.98 14.98 0 0 0 9.631 8.41m5.96 5.96a14.926 14.926 0 0 1-5.841 2.58m-.119-8.54a6 6 0 0 0-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 0 0-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 0 1-2.448-2.448 14.9 14.9 0 0 1 .06-.312m-2.24 2.39a4.493 4.493 0 0 0-1.757 4.306 4.493 4.493 0 0 0 4.306-1.758M16.5 9a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z"
                />
              ),
            },
            {
              title: "Custom Web Design Implementation",
              description:
                "I turn designs into functional websites with clean, structured code, ensuring they look great and perform well.",
              icon: (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z"
                />
              ),
            },
            {
              title: "Website Optimization",
              description:
                "I enhance website performance by optimizing code, improving loading speed, and ensuring a smooth user experience.",
              icon: (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75"
                />
              ),
            },
            {
              title: "Bug Fixing & Maintenance",
              description:
                "I troubleshoot and fix website issues, ensuring your site runs smoothly and stays up-to-date.",
              icon: (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M11.42 15.17 17.25 21A2.652 2.652 0 0 0 21 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 1 1-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 0 0 4.486-6.336l-3.276 3.277a3.004 3.004 0 0 1-2.25-2.25l3.276-3.276a4.5 4.5 0 0 0-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437 1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008Z"
                />
              ),
            },
          ].map((service, index) => (
            <div
              key={index}
              className="card bg-base-100 shadow-sm *:place-items-center"
            >
              <div className="card-body">
                <div className="*:size-10 p-2 rounded-full text-[#812A0E]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                  >
                    {service.icon}
                  </svg>
                </div>
                <h2 className="card-title text-center justify-center">{service.title}</h2>
                <p className="text-center">{service.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
export default MyServiceSection;

import React from "react";

const AboutUsSection = () => {
  return (
    <section className="py-20 bg-base-100">
      <div className="container mx-auto px-5">
        <div className="text-center text-4xl leading-0 font-black uppercase">
          <h2 className="text-6xl leading-10 text-black/5 dark:text-white/5">About Me</h2>
          <h3 className="tracking-wide">About Me</h3>
        </div>

        <div className="mt-24 flex justify-center flex-col lg:flex-row gap-10">
          <div className="px-12 max-w-xl h-full">
            <img
              className="rounded-2xl h-full"
              src="https://i.ibb.co/JWXbgyqB/image.png"
              alt="about-bg"
            />
          </div>

          <div className="max-w-2xl">
            <div className="">
              <h3 className="mb-4 font-black text-xl">
                About Me
                <span className="block w-30 h-[2px] bg-gradient-to-r from-[#3AB5B2] to-[#42E498] mb-1" />
              </h3>
              <p>
                I am a front-end developer passionate about building clean,
                responsive, and functional websites using HTML and CSS. I strive
                to create seamless web experiences.
              </p>
            </div>

            <div className="my-10">
              <h3 className="mb-4 font-black text-xl">
                Goals
                <span className="block w-30 h-[2px] bg-gradient-to-r from-[#3AB5B2] to-[#42E498] mb-1" />
              </h3>
              <p>
                I am currently working towards becoming a{" "}
                <span className="text-[#812] underline font-black tracking-wider">
                  front-end engineer
                </span>
                , continuously learning and improving my skills to build
                high-quality web solutions.
              </p>
            </div>

            <div>
              <h3 className="mb-12 font-black text-xl">
                Skills
                <span className="block w-30 h-[2px] bg-gradient-to-r from-[#3AB5B2] to-[#42E498] mb-1" />
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-14">
                {[
                  { name: "HTML", percent: "100%" },
                  { name: "CSS", percent: "90%" },
                  { name: "JavaScript", percent: "75%" },
                  { name: "Tailwind CSS", percent: "95%" },
                  { name: "Bootstrap", percent: "90%" },
                  { name: "Wordpress", percent: "80%" },
                ].map((skill, idx) => (
                  <div
                    key={idx}
                    className="h-3 relative bg-gradient-to-r from-[#3AB5B2] to-[#42E498]"
                    style={{
                      backgroundImage: `linear-gradient(to right, #3AB5B2, #42E498 ${parseInt(
                        skill.percent
                      )}%, #D1D5DB ${100 - parseInt(skill.percent)}%)`,
                    }}
                  >
                    <span className="absolute top-[-30px]">{skill.name}</span>
                    <span className="absolute top-[-30px] right-0">
                      {skill.percent}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUsSection;

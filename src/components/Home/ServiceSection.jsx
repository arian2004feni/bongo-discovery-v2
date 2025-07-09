import React from "react";
import { BiSolidOffer } from "react-icons/bi";
import { GiMapleLeaf } from "react-icons/gi";
import { RiRoadMapLine } from "react-icons/ri";

const ServiceSectionData = [
  {
    title: "Authentic Cultural Immersion",
    description:
      "Go beyond tourist trails. Connect genuinely with local communities. Participate in crafts, enjoy home-cooked meals, and experience vibrant festivals for profound cultural insights.",
    icon: <GiMapleLeaf className="text-5xl" />,
  },
  {
    title: "Expert Local Guides",
    description:
      "Journey confidently with our passionate, knowledgeable local guides. Fluent in multiple languages, they offer unique perspectives, insider access, and ensure your safety and comfort.",
    icon: <RiRoadMapLine className="text-5xl" />,
  },
  {
    title: "Tailored Tour Packages",
    description:
      "We create custom itineraries for your interests. Explore serene river cruises, thrilling wildlife encounters, cultural immersions, or bustling cityscapes. Your dream Bangladeshi adventure comes alive!",
    icon: <BiSolidOffer className="text-5xl" />,
  },
];

const ServiceSection = () => {
  return (
    <div className="bg-dark-prime dark:bg-third py-12">
      <div className="mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-0 xl:gap-8 ">
          {ServiceSectionData.map((service, index) => (
            <div
              key={index}
              className="py-6 px-6 dark:text-black transition-shadow duration-300"
            >
              <div className="flex flex-col gap-2 mb-4">
                {service.icon}
                <h3 className="text-3xl font-heading">{service.title}</h3>
              </div>
              <p className="">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServiceSection;

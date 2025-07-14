import React from 'react';

const testimonials = [
  {
    image: 'https://i.ibb.co/sJN1dgWp/item1-min.jpg',
    quote:
      '"Working with Arian was an amazing experience. They delivered high-quality work on time and were incredibly professional throughout."',
    name: 'James William',
    title: 'Project Manager, TechCorp',
  },
  {
    image: 'https://i.ibb.co/8DcK536W/item2-min.jpg',
    quote:
      '"Creative, efficient, and a great communicator. I’d highly recommend Arian for any web development project!"',
    name: 'Ben Lee',
    title: 'CEO, BrightSolutions',
  },
  {
    image: 'https://i.ibb.co/9HhhFvHb/item6-min.jpg',
    quote:
      '"Arian not only met our expectations but exceeded them. The project was smooth and the results were outstanding."',
    name: 'Alicia Gomez',
    title: 'Freelance Designer',
  },
  {
    image: 'https://i.ibb.co/vxrqQYsb/item4-min.jpg',
    quote:
      '"Arian brought our ideas to life with clean, modern code and a great eye for detail. Truly a valuable team player!"',
    name: 'Liam Patel',
    title: 'Lead Developer, WebVerse',
  },
  {
    image: 'https://i.ibb.co/HfvLqP5x/item5-min.jpg',
    quote:
      '"From start to finish, the entire process was smooth. Arian\'s skills in front-end development are top-notch."',
    name: 'Liam Chen',
    title: 'UX Strategist, DesignMint',
  },
  {
    image: 'https://i.ibb.co/YFT20kWx/item3-min.jpg',
    quote:
      '"Super reliable and always on point. Arian helped us hit our tight deadlines without compromising on quality."',
    name: "Michael O'Connor",
    title: 'CTO, NovaApps',
  },
];

const MyTestimonialSection = () => {
  return (
    <section
      id="MyTestimonialSection"
      className="py-20 bg-base-200"
    >
      <div className="container mx-auto">
        <div className="text-center mb-10 text-4xl leading-0 font-black uppercase">
          <h2 className="text-6xl leading-10 text-black/5 dark:text-white/5">Testimonials</h2>
          <h3 className="tracking-wide">What People Say</h3>
        </div>
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-600 text-md mb-10 text-base">
            Here’s what clients and collaborators have to say about working with me.
          </p>
          <div className="grid gap-8 md:grid-cols-2 2xl:grid-cols-3">
            {testimonials.map((t, index) => (
              <div
                key={index}
                className="bg-base-100 shadow-md rounded-2xl p-6 grid grid-cols-3 gap-4"
              >
                <div>
                  <img
                    src={t.image}
                    alt={`testimonial-${index + 1}`}
                    className="h-full w-full object-cover object-center"
                  />
                </div>
                <div className="text-left col-span-2">
                  <p className="text-black/60 dark:text-white/50 italic">{t.quote}</p>
                  <div className="mt-4">
                    <h4 className="font-semibold text-gray-900 dark:text-teal-100">{t.name}</h4>
                    <span className="text-sm text-gray-500">{t.title}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MyTestimonialSection;
import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

// Fake project data (you can replace these with your actual project details)
const projects = {
  all: [
    {
      image: 'https://i.ibb.co/cPqnwjy/Iy-Qxar-OMTl-WRGEm-Ipg90zg.webp',
      title: 'Safar e-Ticket System',
      description: 'An online railway ticket booking system with Firebase auth and payment integration.',
      link: '#',
    },
    {
      image: 'https://i.ibb.co/xShCr7jC/a-dashboard-webpage-snapshot-for-a-touri-i66s-TB1-RJapdh-CSF1mug-Q-YOv-VJIXf-SYapc61fq-UIy-Ow.jpg',
      title: 'Tourism Management System',
      description: 'Tour booking, guide listing, and dashboards for users, guides, and admins.',
      link: '#',
    },
    {
      image: 'https://i.ibb.co/fzLyFMYf/a-dashboard-webpage-showcasing-a-react-b-ZNrl-EBFq-S52-EQo1r-Q8a-Ceg-5ohh-TT-GQ3-GLMBUqe-p-Gtg.jpg',
      title: 'React Task Manager',
      description: 'A modern task management app with drag-and-drop and real-time sync.',
      link: '#',
    },
  ],
  react: [
    {
      image: 'https://i.ibb.co/fzLyFMYf/a-dashboard-webpage-showcasing-a-react-b-ZNrl-EBFq-S52-EQo1r-Q8a-Ceg-5ohh-TT-GQ3-GLMBUqe-p-Gtg.jpg',
      title: 'React Task Manager',
      description: 'A modern task management app with drag-and-drop and real-time sync.',
      link: '#',
    },
  ],
  fullstack: [
    {
      image: 'https://i.ibb.co/xShCr7jC/a-dashboard-webpage-snapshot-for-a-touri-i66s-TB1-RJapdh-CSF1mug-Q-YOv-VJIXf-SYapc61fq-UIy-Ow.jpg',
      title: 'Tourism Management System',
      description: 'Tour booking, guide listing, and dashboards for users, guides, and admins.',
      link: '#',
    },
  ],
};

const MyPortfolioSection = () => {
  return (
    <section id="MyPortfolioSection" className="py-20 bg-base-100">
      <div className="container mx-auto">
        {/* Section Title */}
        <div className="text-center mb-10 text-4xl leading-0 font-black uppercase">
          <h2 className="text-6xl leading-10 text-black/5 dark:text-white/5">Portfolio</h2>
          <h3 className="tracking-wide">Portfolio</h3>
        </div>

        {/* Section Subtitle */}
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-600 text-md mb-10 text-base">
            A glimpse of some projects I’ve built with React, Firebase, and other modern web technologies.
          </p>

          {/* Tabs */}
          <Tabs>
            <TabList className="flex flex-wrap justify-center gap-4 mb-8 font-semibold text-base">
              <Tab className="px-4 py-2 bg-base-100 rounded-full cursor-pointer focus:outline-none focus:ring hover:bg-base-200">
                All Projects
              </Tab>
              <Tab className="px-4 py-2 bg-base-100 rounded-full cursor-pointer focus:outline-none focus:ring hover:bg-base-200">
                React
              </Tab>
              <Tab className="px-4 py-2 bg-base-100 rounded-full cursor-pointer focus:outline-none focus:ring hover:bg-base-200">
                Fullstack
              </Tab>
            </TabList>

            {/* Tab Panels */}
            <TabPanel>
              <ProjectGrid projects={projects.all} />
            </TabPanel>
            <TabPanel>
              <ProjectGrid projects={projects.react} />
            </TabPanel>
            <TabPanel>
              <ProjectGrid projects={projects.fullstack} />
            </TabPanel>
          </Tabs>
        </div>
      </div>
    </section>
  );
};

// Reusable grid component
const ProjectGrid = ({ projects }) => {
  return (
    <div className="grid gap-8 md:grid-cols-2 2xl:grid-cols-3">
      {projects.map((project, idx) => (
        <div
          key={idx}
          className="bg-base-100 shadow-md rounded-2xl overflow-hidden transition-all hover:shadow-xl"
        >
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-48 object-cover"
          />
          <div className="p-4 text-left">
            <h4 className="font-bold text-lg text-gray-900 dark:text-teal-100">
              {project.title}
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400 my-2">
              {project.description}
            </p>
            <a
              href={project.link}
              className="text-sm text-teal-600 dark:text-teal-400 hover:underline"
            >
              View Project →
            </a>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MyPortfolioSection;

import React from "react";
const teamMembers = [
  {
    name: "Adarsh Dubey",
    role: "Founder & Frontend Developer",
    imageUrl: "https://avatars.githubusercontent.com/u/107687438?v=4",
    bio: "Adarsh is passionate about building modern web experiences. He blend logic and creativity to craft beautiful, high-performance web apps. With React in his toolbox and Tailwind in his palette, he create digital experiences that feel as good as they look.",
    linkedin: "https://www.linkedin.com/in/adarsh14dubey/",
    github: "https://github.com/Adarsh2014",
  },
  {
    name: "Prashant Gupta",
    role: "Full Stack Developer",
    imageUrl: "https://avatars.githubusercontent.com/u/88385550?v=4",
    bio: "Prashant Singh is a passionate and results-driven Full Stack Developer with a strong foundation in modern web technologies. With hands-on experience in both front-end and back-end development, Prashant enjoys building scalable, efficient, and user-centric applications from scratch.",
    linkedin: "https://in.linkedin.com/in/prashant-singh31",
    github: "https://github.com/manku31",
  },
  {
    name: "Amitkumar Yadav",
    role: "Backend Engineer",
    imageUrl: "https://avatars.githubusercontent.com/u/60211282?v=4",
    bio: "Amit Yadav ensures that the APIs run smoothly and securely. With Node.js and MongoDB, he handles the data that powers your shopping cart. Proficient in Node.js, Express, and PostgreSQL. Focused on performance, security, and clean architecture.",
    linkedin: "https://linkedin.com/in/amit-kumar-yadav-077932206",
    github: "https://github.com/yadavamitk221",
  },
];
const Team = () => {
  return (
    <div className="bg-white py-20 px-6 sm:px-12 lg:px-24">
      <div className="max-w-4xl mx-auto text-center mb-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-3">Meet the Team</h1>
        <p className="text-lg text-gray-600">
          We're a small group of passionate creatives and engineers working
          together to build smooth shopping experiences.
        </p>
      </div>

      <div className="max-w-6xl mx-auto grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
        {teamMembers.map((member) => (
          <div
            key={member.name}
            className="bg-gray-50 p-6 rounded-xl shadow-sm text-center hover:shadow-md transition"
          >
            <img
              className="mx-auto mb-4 size-28 rounded-full object-cover border-2 border-indigo-100"
              src={member.imageUrl}
              alt={member.name}
            />
            <h3 className="text-xl font-semibold text-gray-900">
              {member.name}
            </h3>
            <p className="text-sm text-indigo-600">{member.role}</p>
            <p className="text-sm text-gray-600 mt-2">{member.bio}</p>
            <div className="mt-4 flex justify-center gap-4 text-gray-500">
              <a
                href={member.linkedin}
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg
                  className="size-5 hover:text-indigo-600 transition"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-9h3v9zm-1.5-10.29c-.97 0-1.75-.78-1.75-1.75s.78-1.75 1.75-1.75 1.75.78 1.75 1.75-.78 1.75-1.75 1.75zm13.5 10.29h-3v-4.5c0-1.1-.9-2-2-2s-2 .9-2 2v4.5h-3v-9h3v1.29c.84-1.18 2.66-1.29 3.5 0v-1.29h3v9z" />
                </svg>
              </a>

              <a href={member.github} target="_blank" rel="noopener noreferrer">
                <svg
                  className="size-5 hover:text-indigo-600 transition"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 0a12 12 0 00-3.79 23.39c.6.11.82-.26.82-.58v-2.23c-3.34.73-4.04-1.6-4.04-1.6a3.18 3.18 0 00-1.34-1.76c-1.1-.75.08-.74.08-.74a2.51 2.51 0 011.83 1.23 2.53 2.53 0 003.45 1 2.53 2.53 0 01.76-1.6c-2.67-.3-5.47-1.34-5.47-5.97a4.67 4.67 0 011.24-3.24 4.34 4.34 0 01.12-3.2s1-.32 3.3 1.23a11.45 11.45 0 016 0c2.28-1.55 3.28-1.23 3.28-1.23a4.34 4.34 0 01.12 3.2 4.67 4.67 0 011.24 3.24c0 4.64-2.8 5.67-5.48 5.97a2.84 2.84 0 01.82 2.2v3.26c0 .32.22.69.83.57A12 12 0 0012 0z" />
                </svg>
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Team;

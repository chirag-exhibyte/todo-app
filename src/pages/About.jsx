import React from "react";

const About = () => {
  return (
    <div className="flex flex-col h-screen">
      <div className="h-16 bg-blue-500">Navbar</div>
      <div className="h-12 bg-gray-200">Search Bar</div>
      <div className="flex-1 overflow-auto bg-white border-2">
        Main content here
      </div>
    </div>
  );
};

export default About;

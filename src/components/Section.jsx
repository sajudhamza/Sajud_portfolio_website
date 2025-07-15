import React from 'react';

const Section = React.forwardRef(({ id, title, icon, children }, ref) => (
  <section id={id} ref={ref} className="py-20 px-6 md:px-12 lg:px-24 relative z-10">
    <div className="max-w-6xl mx-auto bg-gray-900/90 backdrop-blur-sm p-8 md:p-12 rounded-2xl shadow-2xl">
      <h2 className="text-4xl md:text-5xl font-extrabold text-center mb-12 flex items-center justify-center">
        {icon}
        <span className="ml-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">{title}</span>
      </h2>
      {children}
    </div>
  </section>
));

export default Section;
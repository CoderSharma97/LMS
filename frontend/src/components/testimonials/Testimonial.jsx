import React from 'react';
import './testimonial.css';

const Testimonial = () => {
  const testimonialsData = [
    {
      id: 1,
      name: "Alex Johnson",
      position: "Software Engineer",
      message:
        "I've grown professionally through this platform. The practical approach and real-world examples have truly enriched my skills.",
      image: "https://th.bing.com/th?q=Current+Bachelor&w=120&h=120&c=1&rs=1&qlt=90&cb=1&dpr=1.3&pid=InlineBlock&mkt=en-IN&cc=IN&setlang=en&adlt=moderate&t=1&mw=247",
    },
    {
      id: 2,
      name: "Emily Carter",
      position: "Designer",
      message:
        "A transformative experience! The design courses here are thorough and creatively inspiring. I've learned more here than anywhere else.",
      image:"https://th.bing.com/th/id/OIP.GKAiW3oc2TWXVEeZAzrWOAHaJF?w=135&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7",
    },
    {
      id: 3,
      name: "Mark Thompson",
      position: "Data Scientist",
      message:
        "The data science tutorials were in-depth and engaging. I now feel more confident tackling complex problems in my job.",
      image: "https://th.bing.com/th?q=Current+Bachelor&w=120&h=120&c=1&rs=1&qlt=90&cb=1&dpr=1.3&pid=InlineBlock&mkt=en-IN&cc=IN&setlang=en&adlt=moderate&t=1&mw=247",
    },
    {
      id: 4,
      name: "Sarah Williams",
      position: "Digital Marketer",
      message:
        "Fantastic learning experience! The marketing insights have been pivotal in advancing my career.",
      image:  "https://th.bing.com/th/id/OIP.GKAiW3oc2TWXVEeZAzrWOAHaJF?w=135&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7",
    },
  ];

  return (
    <section className="testimonials">
      <h2>What Our Students Say</h2>
      <div className="testimonials-cards">
        {testimonialsData.map((e) => (
          <div className="testimonials-card" key={e.id}>
            <div className="student-image">
              <img src={e.image} alt={e.name} />
            </div>
            <p className="message">{e.message}</p>
            <div className="info">
              <p className="name">{e.name}</p>
              <p className="position">{e.position}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonial;

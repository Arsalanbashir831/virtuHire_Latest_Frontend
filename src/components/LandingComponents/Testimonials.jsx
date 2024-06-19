import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const testimonials = [
  {
    quote: "This AI recruitment system has revolutionized our hiring process!",
    name: "Jane Doe",
    position: "HR Manager",
    company: "Tech Corp"
  },
  {
    quote: "An amazing tool for finding the right candidates quickly.",
    name: "John Smith",
    position: "Recruiter",
    company: "Hiring Solutions"
  },
  {
    quote: "The AI mock interviews saved us so much time!",
    name: "Sara Lee",
    position: "Talent Acquisition",
    company: "Innovatech"
  }
];

const Testimonials = () => {
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className="bg-white py-8 rounded-lg shadow-md">
      <div className="max-w-3xl mx-auto px-4">
        <Slider {...sliderSettings}>
          {testimonials.map((testimonial, index) => (
            <div key={index} className="p-6 bg-gradient-to-r from-blue-500 to-teal-500 rounded-lg shadow-md text-center text-white">
              <p className="text-xl italic mb-4">"{testimonial.quote}"</p>
              <p className="font-bold">{testimonial.name}</p>
              <p className="text-gray-200">{testimonial.position}, {testimonial.company}</p>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Testimonials;

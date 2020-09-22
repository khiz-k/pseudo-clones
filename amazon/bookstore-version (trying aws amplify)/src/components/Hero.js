import React from 'react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="hero">
      <h2>Amazon Books</h2>
      <h3>
        A room without books is like a <br />
        body without a soul
      </h3>
      <Link className="btn" to="/books">
        View All Books
      </Link>
    </section>
  );
};

export default Hero;

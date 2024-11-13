import React from 'react';
import Header from './header/Header';
import Hero from './hero-section/Hero-section';
import About from './about/About';
import Service from './service/Service';
import Footer from './footer/Footer';

function Home() {
  return (
    <div>
      <Header />
      <Hero />
      <About />
      <Service />
      <Footer />
    </div>
  );
}

export default Home;

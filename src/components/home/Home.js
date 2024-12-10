import React from 'react';
import Header from './header/Header.js';
import Hero from './hero-section/Hero-section.js';
import About from './about/About.js';
import Service from './service/Service.js';
import Footer from './footer/Footer.js';
import './Home.css';

function Home() {
  return (
    <div id='home'>
      <Header />
      <Hero />
      <About />
      <Service />
      <Footer />
    </div>
  );
}

export default Home;

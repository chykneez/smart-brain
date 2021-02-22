import React from 'react';
import Particles from 'react-particles-js';
import './App.css';

import Navigation from './Components/Navigation/Navigation';
import Logo from './Components/Logo/Logo';
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm';
import Entry from './Components/Entry/Entry';

const particlesOptions = {
  particles: {
    number: {
      value: 150,
      density: {
        enable: true,
        value_area: 800,
      },
    },
    shape: {
      type: 'circle',
      stroke: {
        width: 0,
        color: '#000000',
      },
      polygon: {
        nb_sides: 5,
      },
    },
    color: {
      value: '#ffffff',
    },
    opacity: {
      value: 1,
      random: false,
      anim: {
        enable: false,
        speed: 1,
        opacity_min: 1,
        sync: true,
      },
    },
  },
  interactivity: {
    detect_on: 'window',
    events: {
      onhover: {
        enable: true,
        mode: 'repulse',
      },
      resize: true,
    },
    modes: {
      repulse: {
        distance: 100,
        duration: 0.4,
      },
    },
  },
};

const App = () => {
  return (
    <div className="App">
      <Particles id="particles" params={particlesOptions} />
      <Navigation />
      <Logo />
      <Entry />
      <ImageLinkForm />
    </div>
  );
};

export default App;

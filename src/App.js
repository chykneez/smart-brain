import React, { useState } from 'react';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';
import './App.css';

import Navigation from './Components/Navigation/Navigation';
import Logo from './Components/Logo/Logo';
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm';
import Entry from './Components/Entry/Entry';
import FaceRecognition from './Components/FaceRecognition/FaceRecognition';
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';

const app = new Clarifai.App({ apiKey: '39f6a75609484f5da7c5bc7860d4ae48' });

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
  const [input, setInput] = useState('');
  const [imageURL, setImageURL] = useState('');
  const [box, setBox] = useState({});
  const [route, setRoute] = useState('login');
  const [isSignedIn, setIsSignedIn] = useState(false);

  // useEffect(() => {
  //   fetch('http://localhost:3000/')
  //     .then((response) => response.json())
  //     .then(console.log);
  // }, []);

  const onInputChange = (event) => {
    setInput(event.target.value);
  };

  const onButtonSubmit = () => {
    setImageURL(input);

    app.models
      .predict(Clarifai.FACE_DETECT_MODEL, input)
      .then((response) => setFaceBox(getFaceBox(response)))
      .catch((err) => console.log(err));
  };

  const getFaceBox = (data) => {
    const border = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputImage');
    const width = Number(image.width);
    const height = Number(image.height);

    return {
      left: border.left_col * width,
      top: border.top_row * height,
      right: width - border.right_col * width,
      bottom: height - border.bottom_row * height,
    };
  };

  const setFaceBox = (box) => {
    setBox(box);
  };

  const onRouteChange = (route) => {
    if (route === 'home') setIsSignedIn(true);
    else if (route === 'login' || route === 'register') setIsSignedIn(false);
    setRoute(route);
  };

  return (
    <div className="App">
      <Particles id="particles" params={particlesOptions} />
      <Navigation onRouteChange={onRouteChange} isSignedIn={isSignedIn} />

      {route === 'home' ? (
        <div>
          <Logo />
          <Entry />
          <ImageLinkForm
            onInputChange={onInputChange}
            onButtonSubmit={onButtonSubmit}
          />
          <FaceRecognition box={box} imageURL={imageURL} />
        </div>
      ) : route === 'login' ? (
        <Login onRouteChange={onRouteChange} />
      ) : (
        <Register onRouteChange={onRouteChange} />
      )}
    </div>
  );
};

export default App;

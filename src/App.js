import React, { useState, useReducer } from 'react';
import Particles from 'react-particles-js';
import './App.css';

import Navigation from './Components/Navigation/Navigation';
import Logo from './Components/Logo/Logo';
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm';
import Entry from './Components/Entry/Entry';
import FaceRecognition from './Components/FaceRecognition/FaceRecognition';
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';
import { particlesOptions } from './constants';

const initialAppState = {
  input: '',
  imageURL: '',
  box: '',
  route: 'signin',
  isSignedIn: false,
};

const initialUserState = {
  id: '',
  name: '',
  email: '',
  entries: 0,
  createdAt: '',
};

const reducer = (appState, action) => {
  switch (action.type) {
    case 'resetAppState':
      return initialAppState;
    case 'resetUserState':
      return initialUserState;
    default:
      const result = { ...appState };
      result[action.type] = action.value;

      return result;
  }
};

const App = () => {
  const [appState, dispatch] = useReducer(reducer, initialAppState);
  const { input, imageURL, box, route, isSignedIn } = appState;
  const [user, setUser] = useState(initialUserState);

  const getUser = data => {
    setUser({
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      createdAt: data.createdAt,
    });
  };

  const onInputChange = event => {
    const { value } = event.target;
    dispatch({ type: 'input', value });
  };

  const onButtonSubmit = () => {
    dispatch({ type: 'imageURL', value: input });

    fetch('https://ancient-everglades-62319.herokuapp.com/imageURL', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ input }),
    })
      .then(response => response.json())
      .then(response => {
        if (response) {
          fetch('https://ancient-everglades-62319.herokuapp.com/entry', {
            method: 'put',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: user.id }),
          })
            .then(response => response.json())
            .then(count => {
              setUser(prevUser => {
                return {
                  ...prevUser,
                  entries: count,
                };
              });
            })
            .catch(console.log);
        }
        setFaceBox(getFaceBox(response), dispatch);
      })
      .catch(err => console.log(err));
  };

  const getFaceBox = data => {
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

  const setFaceBox = (boxBorder, dispatch) => {
    dispatch({ type: 'box', value: boxBorder });
  };

  const onRouteChange = route => {
    if (route === 'home') dispatch({ type: 'isSignedIn', value: true });
    else if (route === 'login' || route === 'register') {
      dispatch({ type: 'resetUserState' });
      dispatch({ type: 'resetAppState' });
    }
    dispatch({ type: 'route', value: route });
  };

  return (
    <div className="App">
      <Particles id="particles" params={particlesOptions} />
      <Navigation onRouteChange={onRouteChange} isSignedIn={isSignedIn} />

      {route === 'home' ? (
        <div>
          <Logo />
          <Entry name={user.name} entries={user.entries} />
          <ImageLinkForm
            onInputChange={onInputChange}
            onButtonSubmit={onButtonSubmit}
          />
          <FaceRecognition box={box} imageURL={imageURL} />
        </div>
      ) : route === 'login' ? (
        <Login onRouteChange={onRouteChange} getUser={getUser} />
      ) : (
        <Register onRouteChange={onRouteChange} getUser={getUser} />
      )}
    </div>
  );
};

export default App;

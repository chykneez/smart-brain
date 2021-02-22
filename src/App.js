import React from 'react';
import './App.css';

import Navigation from './Components/Navigation/Navigation';
import Logo from './Components/Logo/Logo';
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm';
import Entry from './Components/Entry/Entry';

const App = () => {
  return (
    <div className="App">
      <Navigation />
      <Logo />
      <Entry />
      <ImageLinkForm />
    </div>
  );
};

export default App;

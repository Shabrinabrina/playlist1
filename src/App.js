import logo from './logo.svg';
import './App.css';
import React, { component } from 'react';
import SearchBar from './feature/SearchBar';
import ContainerSong from './feature/Song';


function App() {
  return (
    <div className="APP">
      <SearchBar/>
      <ContainerSong/>
      <button class="btnsSelect">Select</button>
    </div>
  );
}

export default App;

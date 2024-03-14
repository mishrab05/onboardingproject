import React, { useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Wallpaper from '../components/Wallpaper';
import Footer from '../components/Footer';
import sunIcon from '../assets/sunicon.png'; 
import '../App.css'; 
import uvIndexIcon from '../assets/uvindex.png'; // Placeholder icon path
import coverUpIcon from '../assets/sunprotection.png'; // Placeholder icon path
import { Link } from 'react-router-dom';


const Home = () => {
  return (
    <div>
      <Navbar />
      <Wallpaper />
      <div className='App'>
        <div className="centered-container">
          <h1 className="centered-title">What is UV Smart?</h1>
          <p className="centered-description">
          Discover the ultimate defense tool for your skin: this website equips you with the know-how that shields you from harmful UV rays, so you can bask in the sun worry-free. Your one stop shop to combat skin cancer. All the information you need packaged in one place that makes it simple! UV smart is about being equipped before you go outdoors! UV smart is protecting your family from damaged skin. UV smart is being smart about your lifestyle. 
          </p>
        </div>
        <div className="card-container">
          <div className="info-card">
            <img src={uvIndexIcon} alt="UV Index" className="card-icon" />
            <div className="card-content">
              <h2>What is Ultraviolet index (UVI)?</h2>
              <p>The UVI is a measure used to quantify how intensely UV radiation affects human skin and causes skin cancer. UV radiation is affected by clouds, elevation, latitude, weather, the reflection of the sun, the time of year. It is riskier to stay outdoors without protection when the UVI is high as your skin is likely to burn and become damaged!
              </p>
              <Link to="/uvindex" className="card-link-button">Check UV index for your location</Link>
            </div>
          </div>
          <div className="info-card">
            <img src={coverUpIcon} alt="Cover Up" className="card-icon" />
            <div className="card-content">
              <h2>Cover up when the index hits 3!</h2>
              <p>Sun is bright, it is a great day to be outdoors with your family and friends. However, we are exposed to some of the strongest and most hazardous UV rays when we are outside.What about those who suffer from itchy rashes, irritations, or even breakouts from using sunscreen? It is important to know how your skin reacts to sunscreen. Every skin type has the right to be protected safely and comfortably.  </p>
              <Link to="/measures" className="card-link-button">Learn how to cover up</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

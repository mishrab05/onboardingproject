import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import '../App.css'; // Ensure this path is correct or adjust as needed
import UVwallpaper from '../assets/childplay.jpg'
import sunIcon from '../assets/sunicon.png'; 
import axios from 'axios';
import low from '../assets/low.png';
import moderate from '../assets/moderate.png';
import high from '../assets/high.png';
import vhigh from '../assets/vhigh.png';
import extreme from '../assets/extreme.png';

const UVIndex = () => {
    
  const [currentUvIndex, setCurrentUvIndex] = useState('0');
  const [uvIndexLevel, setUvIndexLevel] = useState('0');
  const [maxUvIndex, setMaxUvIndex] = useState('0');
  const [lat, setLat] = useState('');
  const [lon, setLon] = useState('');
  const [suburb, setSuburb] = useState(''); 
  const [temperature, setTemperature] = useState('0');
  const [forecastData, setForecastData] = useState(Array.from({ length: 13 }, (_, i) => ({
    uv_time: new Date(new Date().setHours(i + 7, 0, 0, 0)).toISOString(), // Starts from 7 AM to 7 PM
    uv: "0" // Default value set to "0"
  })));

  const fetchLatLonBySuburb = async () => {
    try {
      // Replace with your actual Flask backend URL
      const response = await axios.get(`http://54.253.200.247:5000/get_data_by_suburb?suburb=${suburb}`);
      if (response.data.length > 0) {
        const { latitude, longitude } = response.data[0];
        setLat(latitude.toString());
        setLon(longitude.toString());
        // Once lat and lon are set, call the existing APIs
        fetchUvData(latitude,longitude);
        fetchTemperature(latitude,longitude);
      } else {
        alert('Suburb not found');
      }
    } catch (error) {
      console.error('Error fetching latitude and longitude:', error);
    }
  };


  const fetchUvData = async () => {
    // Your existing try-catch blocks for fetching UV data
    const url = `https://api.openuv.io/api/v1/uv?lat=${lat}&lng=${lon}&alt=100&dt=`;
    const forecastUrl = `https://api.openuv.io/api/v1/forecast?lat=${lat}&lng=${lon}&alt=100&dt=`;
    const options = {
      headers: {
        'x-access-token': 'openuv-derltnklrgu-io', // Replace with your actual token
        'Content-Type': 'application/json',
      },
    };

    try {
      const response = await axios.get(url, options);
      const uvData = response.data.result;
    
      // Convert UV times to Australian time zone
      uvData.uv_time = convertToAustralianTime(uvData.uv_time);
  
    
      setCurrentUvIndex(Math.round(uvData.uv).toString()); // Convert to string for consistent state type
      setMaxUvIndex(Math.round(uvData.uv_max).toString()); // Convert to string
      setUvIndexLevel(updateUvIndexLevel(uvData.uv)); // Update UV index level based on current UV index
    } catch (error) {
      console.error('Error fetching the current UV data:', error);
      setCurrentUvIndex('Error');
      setMaxUvIndex('Error');
      setUvIndexLevel('Error');
    }
    
    try {
      const forecastResponse = await axios.get(forecastUrl, options);
      const formattedForecastData = forecastResponse.data.result.map(data => ({
        ...data,
       // uv_time: convertToAustralianTime(data.uv_time) // Convert each forecast time to Australian time
       uv_time: data.uv_time,
      }));
      setForecastData(formattedForecastData);
    } catch (error) {
      console.error('Error fetching the UV forecast:', error);
    }};
      

  const fetchTemperature = async () => {
    const apiKey = '13cf145adbf6a130853dbc1a47f773fb'; // Replace with your actual API key
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;
  
    try {
      const response = await axios.get(weatherUrl);
      const tempInKelvin = response.data.main.temp;
      const tempInCelsius = tempInKelvin - 273.15; // Convert from Kelvin to Celsius
      setTemperature(tempInCelsius.toFixed(2) + ' °C'); // Round to 2 decimal places and add °C
    } catch (error) {
      console.error('Error fetching temperature data:', error);
      setTemperature('Error');
    }
  };
  


  const convertToAustralianTime = (utcDate, timeZone = 'Australia/Sydney') => {
    const date = new Date(utcDate);
    return new Intl.DateTimeFormat('en-AU', {
      timeZone,
      hour: '2-digit',
      minute: '2-digit',
      hour12: true, // Ensure 12-hour format
    }).format(date).toUpperCase(); // Returns only the time part with AM/PM
  };
  
   

  const updateUvIndexLevel = (index) => {
    if (index <= 2) return 'Low';
    else if (index <= 5) return 'Moderate';
    else if (index <= 7) return 'High';
    else if (index <= 10) return 'Very High';
    else return 'Extreme';
  };

  const renderTimeline = () => {
    return forecastData.map((data, index) => {
      // Directly use the formattedTime since it now correctly formats to "HH:MM AM/PM"
      const formattedTime = convertToAustralianTime(data.uv_time, 'Australia/Sydney');
  
      return (
        <div key={index} className={`timeline-segment ${data.uv >= 7 ? "high-uv" : ""}`}>
          <div className="uv-value">{Math.round(data.uv)}</div>
          <div className="time">{formattedTime}</div> 
        </div>
      );
    });
  };
  
  
  
  const UvIndexLevelsGuide = () => {
    const levels = [
      { level: 'Low', range: '0-2', color: '#4CAF50' }, // Green
      { level: 'Moderate', range: '3-5', color: '#FFEB3B' }, // Yellow
      { level: 'High', range: '6-7', color: '#FF9800' }, // Orange
      { level: 'Very High', range: '8-10', color: '#F44336' }, // Light Red
      { level: 'Extreme', range: '11+', color: '#B71C1C' }, // Dark Red
    ];
  
    return (
      <div className="uv-index-levels-guide">
        {levels.map((item) => (
          <div className="uv-index-level" key={item.level} style={{ backgroundColor: item.color }}>
            <span className="uv-index-level-text">{item.level}</span>
            <span className="uv-index-level-range">{item.range}</span>
          </div>
        ))}
      </div>
    );
  };
  

  const handleSearchClick = () => {
    if (!suburb) {
      alert('Please enter a suburb name');
      return;
    }
    fetchLatLonBySuburb(); // This will subsequently call fetchUvData() and fetchTemperature() upon success
  };




    return (
      <div>
        <Navbar/>
        <div className='wallpaper-style'>
        <img src={UVwallpaper} alt="UV Index Wallpaper" className="background-image" />
        </div>
        <div className='App'>
        <div className="centered-container">
          <h1 className="centered-title">Check UV Index in your area</h1>
          <p className="centered-uvdescription">  
          Knowing the UV index is essential for safeguarding against sun exposure. Explore the UV index for your location to make informed decisions about outdoor activities. Ensure your family's safety by planning ahead and equipping yourselves with adequate sun protection.
          </p>
        </div>
        <p className="description">Enter a suburb below and search for its UV Index.</p>
      <div className="input-group">
        <input type="text" value={suburb} onChange={(e) => setSuburb(e.target.value)} placeholder="Please enter Suburb" />
        {/* <input type="text" value={lon} onChange={(e) => setLon(e.target.value)} placeholder="Longitude" /> */}
        <button onClick={handleSearchClick}>Search</button>
      </div>
      <div className="tile-container">
        <div className="tile">
          <img src={sunIcon} alt="Sun" className="sun-icon" />
          <p className="tile-title">Current UV Index</p>
          <p className="tile-value">{currentUvIndex}</p>
        </div>
        <div className="tile">
          <img src={sunIcon} alt="Sun" className="sun-icon" />
          <p className="tile-title">Max UV Index</p>
          <p className="tile-value">{maxUvIndex}</p>
        </div>
        <div className="tile">
          <img src={sunIcon} alt="Sun" className="sun-icon" />
          <p className="tile-title">UV Index Level</p>
          <p className="tile-value">{uvIndexLevel}</p>
        </div>
        <div className="tile">
          <img src={sunIcon} alt="Temperature" className="sun-icon" />
          <p className="tile-title">Temperature</p>
          <p className="tile-value">{temperature}</p>
          </div>
          <div className="uv-index-levels-sidebar">
            <h3>UV Index levels</h3>
            <UvIndexLevelsGuide />
          </div>
      </div>
      <h2> Hourly forecast</h2>
      <div className="timeline-container">
        {renderTimeline()}
      </div>
     </div>
    </div>
    );
  };
  
  export default UVIndex;
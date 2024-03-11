import React, { useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Wallpaper from '../components/Wallpaper';
import Footer from '../components/Footer';
import sunIcon from '../assets/sunicon.png'; 
import '../App.css'; 

const Home = () => {

  const [currentUvIndex, setCurrentUvIndex] = useState('Loading...');
  const [uvIndexLevel, setUvIndexLevel] = useState('Loading...');
  const [maxUvIndex, setMaxUvIndex] = useState('Loading...');
  const [lat, setLat] = useState('');
  const [lon, setLon] = useState('');
  const [suburb, setSuburb] = useState(''); 
  const [temperature, setTemperature] = useState('Loading...');
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
        fetchUvData();
        fetchTemperature();
      } else {
        alert('Suburb not found');
      }
    } catch (error) {
      console.error('Error fetching latitude and longitude:', error);
    }
  };
  
  const convertToAustralianTime = (utcDate, timeZone = 'Australia/Sydney') => {
    const date = new Date(utcDate);
    return new Intl.DateTimeFormat('en-AU', {
      timeZone,
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    }).format(date);
  };
   

  const updateUvIndexLevel = (index) => {
    if (index <= 2) return 'Low';
    else if (index <= 5) return 'Moderate';
    else if (index <= 7) return 'High';
    else if (index <= 10) return 'Very High';
    else return 'Extreme';
  };

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
  

  const fetchUvData = async () => {
    // Your existing try-catch blocks for fetching UV data
    const url = `https://api.openuv.io/api/v1/uv?lat=${lat}&lng=${lon}&alt=100&dt=`;
    const forecastUrl = `https://api.openuv.io/api/v1/forecast?lat=${lat}&lng=${lon}&alt=100&dt=`;
    const options = {
      headers: {
        'x-access-token': 'openuv-2qrbaqrltgul9lk-io', // Replace with your actual token
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
        uv_time: convertToAustralianTime(data.uv_time) // Convert each forecast time to Australian time
      }));
      setForecastData(formattedForecastData);
    } catch (error) {
      console.error('Error fetching the UV forecast:', error);
    }};
      

  // try {
  //     const response = await axios.get(url, options);
  //     const uvData = response.data.result;
  //     setCurrentUvIndex(Math.round(uvData.uv).toString()); // Convert to string for consistent state type
  //     setMaxUvIndex(Math.round(uvData.uv_max).toString()); // Convert to string
  //     setUvIndexLevel(updateUvIndexLevel(uvData.uv)); // Update UV index level based on current UV index
  //   } catch (error) {
  //     console.error('Error fetching the current UV data:', error);
  //     setCurrentUvIndex('Error');
  //     setMaxUvIndex('Error');
  //     setUvIndexLevel('Error');
  //   }

  // try {
  //     const forecastResponse = await axios.get(forecastUrl, options);
  //     setForecastData(forecastResponse.data.result);
  //     const labels = forecastData.map(f => `${new Date(f.uv_time).getHours()}:00`);
  //     const uvValues = forecastData.map(f => f.uv);
  //   }
  //   catch (error) {
  //     console.error('Error fetching the UV forecast:', error);
  // }};

  const renderTimeline = () => {
    return forecastData.map((data, index) => {
      const timeString = new Date(data.uv_time).getHours(); // If needed, parse back to Date to extract hours
      return (
        <div key={index} className={`timeline-segment ${data.uv >= 7 ? "high-uv" : ""}`}>
          <div className="uv-value">{Math.round(data.uv)}</div>
          <div className="time">{`${timeString}:00`}</div>
        </div>
      );
    });
  };
  

    

  // const renderTimeline = () => {
  //   return forecastData.map((data, index) => (
  //     <div key={index} className={`timeline-segment ${data.uv >= 7 ? "high-uv" : ""}`}>
  //       <div className="uv-value">{Math.round(data.uv)}</div>
  //       <div className="time">{`${new Date(data.uv_time).getHours()}:00`}</div>
  //     </div>
  //   ));
  // };


  const handleSearchClick = () => {
    if (!suburb) {
      alert('Please enter a suburb name');
      return;
    }
    fetchLatLonBySuburb(); // This will subsequently call fetchUvData() and fetchTemperature() upon success
  };


  return (
    <div>
        <Navbar />
        <Wallpaper/>
    <div className='App'>
        <h1>UV Index</h1>
        <p className="description">Enter a suburb below and search for its UV Index.</p>
      <div className="input-group">
        <input type="text" value={suburb} onChange={(e) => setSuburb(e.target.value)} placeholder="Please enter Suburb" />
        {/* <input type="text" value={lon} onChange={(e) => setLon(e.target.value)} placeholder="Longitude" /> */}
        <button onClick={handleSearchClick}>Search</button>
        <p className="selected-suburb">Suburb: {suburb}</p>
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
      </div>
      <div className="timeline-container">
        {renderTimeline()}
      </div>
     </div>
      <Footer />
    </div>
  )
}

export default Home
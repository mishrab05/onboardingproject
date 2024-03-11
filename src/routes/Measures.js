import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import '../App.css'; // Ensure this path is correct or adjust as needed
import shirtImage from '../assets/shirt.png';
import sunscreenImage from '../assets/sunscreen.png';
import hatImage from '../assets/hat.png';
import sunglassesImage from '../assets/sunglasses.png';

const Measures = () => {
  const [selectedUVIndex, setSelectedUVIndex] = useState(null);
  const [active, setActive] = useState(false);

  const uvInformation = {
    Low: ["You are good to wear anything !", "No need to wear sunscreen !", "Safe to wear based on you choice", "Safe to wear based on your choice"],
    Moderate: ["Light weight, closely woven and dark coloured with a UPF of 15", "Wear sunscreen indicating at least 30 SPF", "Wear a Broad-brimmed hat", "Sunglasses with Lens category 2,3,4 and EPF (if applicable) 9 or 10"],
    High: ["Light weight, closely woven and dark coloured with a UPF of 30", "Wear sunscreen indicating 30+ SPF", "Wear a Broad-brimmed hat", "Sunglasses with Lens category 2,3,4 and EPF (if applicable) 9 or 10"],
    VeryHigh: ["Light weight, closely woven and dark coloured with a UPF of 50", "Wear sunscreen indicating 30+ SPF", "Wear a Broad-brimmed hat", "Sunglasses with Lens category 2,3,4 and EPF (if applicable) 9 or 10"],
    Extreme: ["Light weight, closely woven and dark coloured with a UPF of 60", "Wear sunscreen indicating 30+ SPF", "Wear a Legionnaire hat", "Sunglasses with Lens category 2,3,4 and EPF (if applicable) 9 or 10"],
  };

  const imagePaths = [
    shirtImage,
    sunscreenImage,
    hatImage,
    sunglassesImage
  ];


  const handleClick = (uvLevel) => {
    setSelectedUVIndex(uvLevel);
    setActive(false); 
    
    setTimeout(() => {
      setActive(true);
    }, 10);
  };

  return (
    <div>
        <Navbar />
        <div className="Appmeasures" >
          <div className="button-container">
            {/* UV Index Level Buttons */}
            <button className="uv-button low" onClick={() => handleClick('Low')}>Low(1-2)</button>
            <button className="uv-button moderate" onClick={() => handleClick('Moderate')}>Moderate(3-5)</button>
            <button className="uv-button high" onClick={() => handleClick('High')}>High(6-7)</button>
            <button className="uv-button very-high" onClick={() => handleClick('VeryHigh')}>Very High(8-10)</button>
            <button className="uv-button extreme" onClick={() => handleClick('Extreme')}>Extreme(11+)</button>
          </div> 

          {/* Conditional Rendering for UV Information */}
          {selectedUVIndex && (
            <div className="image-grid">
              {imagePaths.map((path, index) => (
                <div key={index} className={`image-container ${active ? 'active' : ''}`}>
                  <img src={path} alt={`UV Level ${selectedUVIndex}`} />
                  <p>{uvInformation[selectedUVIndex][index]}</p>
                </div>
              ))}
            </div>
          )}
          
          <div className="information-text-section">
            <p>Additional information related to the selected UV index will be shown here...</p>
          </div>
        </div>
    </div>
  );
}

export default Measures;

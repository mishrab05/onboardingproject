import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import '../Measures.css'; // Ensure this path is correct or adjust as needed
import shirtImage from '../assets/shirt.png';
import sunshineIcon from '../assets/sunshine.png';
import lightBulb from '../assets/light-bulb.png';
import sunscreenImage from '../assets/sunscreen.png';
import hatImage from '../assets/hat.png';
import sunglassesImage from '../assets/sunglasses.png';

function Measures() {
  const [selectedUVIndex, setSelectedUVIndex] = useState('Low');
  const [active, setActive] = useState(true);

  // Sunscreen Calculator State
  const [uvIndex, setUvIndex] = useState(0);
  const [gender, setGender] = useState('');
  const [age, setAge] = useState('');
  const [skinType, setSkinType] = useState('low');
  const [exposureTime, setExposureTime] = useState(0.5);
  const [result, setResult] = useState('');
  const [tips, setTips] = useState('UV index is low. A moderate amount of sunscreen is advisable.');
  const [error, setError] = useState('');

  const uvInformation = {
    Low: ["You are good to wear anything!", "No need to wear sunscreen!", "Safe to wear based on you choice", "Safe to wear based on your choice"],
    Moderate: ["Lightweight, closely woven and dark coloured with a UPF of 15", "Wear sunscreen indicating at least 30 SPF", "Wear a Broad-brimmed hat", "Sunglasses with Lens category 2,3,4 and EPF (if applicable) 9 or 10"],
    High: ["Lightweight, closely woven and dark coloured with a UPF of 30", "Wear sunscreen indicating 30+ SPF", "Wear a Broad-brimmed hat", "Sunglasses with Lens category 2,3,4 and EPF (if applicable) 9 or 10"],
    VeryHigh: ["Lightweight, closely woven and dark coloured with a UPF of 50", "Wear sunscreen indicating 30+ SPF", "Wear a Broad-brimmed hat", "Sunglasses with Lens category 2,3,4 and EPF (if applicable) 9 or 10"],
    Extreme: ["Lightweight, closely woven and dark coloured with a UPF of 60", "Wear sunscreen indicating 30+ SPF", "Wear a Legionnaire hat", "Sunglasses with Lens category 2,3,4 and EPF (if applicable) 9 or 10"],
  };

  const imagePaths = [
    shirtImage,
    sunscreenImage,
    hatImage,
    sunglassesImage,
  ];

  const handleUVClick = (uvLevel) => {
    setSelectedUVIndex(uvLevel);
    setActive(false);
    setTimeout(() => {
      setActive(true);
    }, 10);
  };

  const calculateSunscreenAmount = () => {
    if (uvIndex >= 0 && uvIndex <= 15 && gender && age > 0 && exposureTime > 0) {
      setError('');
      let baseAmount = uvIndex * 2; // Base calculation
      let multiplier = 1;

      multiplier *= gender === 'male' ? 1.1 : gender === 'female' ? 1.2 : 1.3;
      multiplier *= age <= 18 ? 1.25 : 1;
      multiplier *= skinType === 'low' ? 1.2 : skinType === 'moderate' ? 1.1 : 1;
      multiplier *= exposureTime <= 2 ? 1 : exposureTime <= 4 ? 1.5 : 2;

      const totalAmount = baseAmount * multiplier;
      const scoops = Math.ceil(totalAmount / 10);
      setResult(`Apply ${scoops} teaspoon of sunscreen.`);

      if (uvIndex < 3) {
        setTips('UV index is low. Less amount of sunscreen is advisable if needed.');
      } else if (uvIndex < 7) {
        setTips('UV index is moderate to high. Use sunscreen liberally and consider reapplying every 2 hours.');
      } else {
        setTips('UV index is very high! Apply a generous amount of sunscreen and reapply every 2 hours.');
      }
    } else {
      setError('Please ensure all fields are filled out correctly.');
      setResult('');
      setTips('');
    }
  };

  return (
    <div>
        <Navbar />
        <div className="App">
      {/* Clothing protection part */}
      <h1 className="section-title">Clothing Protection Measures</h1>
      <div className="button-container">
        <button className="uv-button low" onClick={() => handleUVClick('Low')}>Low(1-2)</button>
        <button className="uv-button moderate" onClick={() => handleUVClick('Moderate')}>Moderate(3-5)</button>
        <button className="uv-button high" onClick={() => handleUVClick('High')}>High(6-7)</button>
        <button className="uv-button very-high" onClick={() => handleUVClick('VeryHigh')}>Very High(8-10)</button>
        <button className="uv-button extreme" onClick={() => handleUVClick('Extreme')}>Extreme(11+)</button>
      </div>
      {selectedUVIndex && (
        <div className="image-grid">
          {imagePaths.map((path, index) => (
            <div key={index} className={`image-container ${active ? 'active' : ''}`}>
              <img src={process.env.PUBLIC_URL + path} alt={`UV Level ${selectedUVIndex}`} />
              <p>{uvInformation[selectedUVIndex][index]}</p>
            </div>
          ))}
        </div>
      )}
      {/* Sunscreen calculator part */}
      <h1 className="section-title">Sunscreen Protection Measures</h1>
      <div className="sunscreen-calculator">
      <h2><img src={sunshineIcon} alt="Sun Icon" style={{ height: '24px', width: '24px' }} /> Sunscreen Calculator</h2>
        <div className="form-group">
          <label htmlFor="uvIndexInput">Enter UV Index (1 to 15):</label>
          <input type="number" id="uvIndexInput" min="0" max="15" step="1" value={uvIndex} onChange={(e) => setUvIndex(parseFloat(e.target.value))} />
        </div>
        <div className="form-group gender">
          <span className="gender-label">Gender:</span>
          <div className="gender-options">
            <label className="gender-option">
              <input type="radio" name="gender" value="male" checked={gender === 'male'} onChange={() => setGender('male')} /> Male
            </label>
            <label className="gender-option">
              <input type="radio" name="gender" value="female" checked={gender === 'female'} onChange={() => setGender('female')} /> Female
            </label>
            <label className="gender-option">
              <input type="radio" name="gender" value="other" checked={gender === 'other'} onChange={() => setGender('other')} /> Other
            </label>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="ageInput">Enter Age:</label>
          <input type="number" id="ageInput" min="0" step="1" value={age} onChange={(e) => setAge(parseInt(e.target.value, 10))} />
        </div>
        <div className="form-group">
          <label htmlFor="skinType">Skin Sensitivity:</label>
          <select id="skinType" value={skinType} onChange={(e) => setSkinType(e.target.value)}>
            <option value="low">Low</option>
            <option value="moderate">Moderate</option>
            <option value="high">High</option>
          </select>
          <p className="skin-sensitivity-description">
            {skinType === 'low' && "Low: Rarely burns, can tolerate more sun exposure."}
            {skinType === 'moderate' && "Moderate: Sometimes burns, requires regular sun protection."}
            {skinType === 'high' && "High: Burns easily, needs extra protection against the sun."}
          </p>
        </div>
        <div className="form-group">
          <label htmlFor="exposureTime">Sun Exposure Time (Hours):</label>
          <input type="number" id="exposureTime" min="0.5" step="0.5" value={exposureTime} onChange={(e) => setExposureTime(parseFloat(e.target.value))} />
        </div>
        <button id="calculateButton" onClick={calculateSunscreenAmount}>Calculate</button>
        <div id="inputError" className="error">{error}</div>
        <div id="sunscreenResult">Result: {result}</div>
        <div id="sunscreenTips">Additional instructions: {tips}</div>
      </div>
      {/* Text area to display information related to Sun protection */}
      <div className="tips-container">
        <h2>
          Here are some Additional Protection Tips<img 
            src={lightBulb} 
            alt="Lightbulb Icon" 
            style={{ height: '24px', width: '24px', verticalAlign: 'middle' }} 
          />:
        </h2>
        <textarea 
          readOnly 
          className="additional-info"
          value={`
            1. Wear sunscreen with SPF 30 on sunny days.
            2. Reapply sunscreen every two hours, or more often if swimming or sweating.
            3. Apply Sunscreen to all exposed areas.
            4. Skin colour doesn't change the fact that sunlight will affect you or not, sun exposure has an effect on both skin and eyes.
            5. Avoid getting out in the sun if the UV index exceeds 7.`}
        />
      </div>

    </div>
    </div>
  );
}

export default Measures;

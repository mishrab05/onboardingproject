import React from 'react'
import Navbar from '../components/Navbar';
import Wallpaper from '../components/Wallpaper';
import coverUpIcon from '../assets/sunprotection.png'; // Placeholder icon path
import uvi from '../assets/uvi.jpg';
import melanoma from '../assets/melanoma.jpg';

const UVImpact = () => {
  return (
    <div>
      <Navbar />
      <div className='App'>
        <div className="centered-container">
          <h1 className="centered-title"> </h1>
          <h1 className="centered-title">What are the impacts of UV radiation?</h1>
          <p className="centered-description">   </p>
        </div>

        <div className="card-container">
          <div className="info-card">
            <div className="card-content">
              <h2>CLIMATE CHANGE</h2>
              <p>
              Although the impact on skin cancer risk has not been a major focus of climate change research, changing levels of UV radiation and warming temperatures may affect skin cancer incidence.
Australia has experienced a gradual increase in temperature since Australia's climate warning in 1910. It is important to note that UV levels are not related to temperature. With warmer temperatures may result in Australians increasing their sun exposure and wearing less covering clothing, resulting in an increased in skin cancer.
              </p>
            </div>
          </div>
          <div className="info-card">
            <div className="card-content">
              <h2>Average UV index by Hours in January</h2>
              <img src={uvi} alt="Cover Up" className="card-image" />
            </div>
          </div>
          <div className="info-card">
            <div className="card-content">
              <p>
              It is recommended that when UV levels hit 3 (Moderate) or above, cover up and use sun protection. Cover up and use sun protection during the hours of 10 a.m. to 4 p.m. as data suggest that the highest level of UV occur during those times. So it is safer during the late morning and late afternoons. However, it is also common for people to be outdoors or have outdoor activities during that time and with the current rise in temperature, it would mean more skin is exposed without sun protection. Therefore it is becoming increasingly important for Australians to be UVSmart and prevent skin damage. 
              </p>
            </div>
          </div>
        </div>

        <div className="card-container">
          <div className="info-card">
            <div className="card-content">
              <h2>Sunscreen reduces risk of Melanoma</h2>
              <p>
              Through continuing education, today’s population should be better informed about how to identify and prevent melanoma than populations of the past. Data suggest that incidence risk of melanoma by the age of 30 has been at a downward trend. Studies have shown that sunscreen use, at a younger age, can reduce the risk of melanoma risk by 40%. However, it is estimated in 2023 that every 1 out of 17 persons is at a risk of being diagnosed with melanoma of the skin by 85 years old. Accordingly to the graph above, the number of new cases increased by a considerable amount since 1982. The reason for the continued increase is driven by the ageing population. Incidence rates for melanoma are predicted to rise with age. The ageing populations lived in times when skin cancer awareness was less. With life expectancy continuing to rise, there is a higher chance of diagnosis in current times. In conclusion, the incidence risk by a younger age group shows a more accurate representation on skin cancer awareness because sun protection habits have been taught at a young age.
              </p>
            </div>
          </div>
          <div className="info-card">
            <div className="card-content">
              <h2>Number of Yearly Melanoma Cases</h2>
              <img src={melanoma} alt="Cover Up" className="card-image" />
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default UVImpact
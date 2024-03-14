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
              </p>

              <ul style={{ listStyleType: 'disc' }}>
                    <li>Australia has experienced a gradual increase in temperature since Australia's climate warning in 1910.</li>
                    <li>It is important to note that UV levels are not related to temperature.</li>
                    <li>With warmer temperatures may result in Australians increasing their sun exposure and wearing less covering clothing, resulting in an increase in skin cancer.</li>
                    <li>It is recommended that when UV levels hit 3 (Moderate) or above, cover up and use sun protection.</li>
                    <li>Cover up and use sun protection during the hours of 10 a.m. to 4 p.m. as data suggest that the highest level of UV occurs during those times.</li>
              </ul>

            </div>
          </div>
          <div className="info-card">
            <div className="card-content">
              <h2>Trend of heat in Australia</h2>
              <img src={uvi} alt="Cover Up" className="card-image" />
              <p>The graph shows the average hourly UV index in January 2022 in Australia.</p>
              <p>Data source: Dataset with Cancer Incidence and Mortality by State and territory from 1982 to 2019</p>
            </div>
          </div>
        </div>

        <div className="card-container">
          <div className="info-card">
            <div className="card-content">
              <h2>Sunscreen reduces risk of Melanoma</h2>
              <ul style={{ listStyleType: 'none' }}>
                    <p>Melanoma is a form of skin cancer that often affects body areas that have had excessive sun exposure.
                    Accordingly to the graph above, the number of new cases increased by a considerable amount since 1982.
                    The reason for the continued increase is driven by the ageing population.
                    Incidence rates for melanoma are predicted to rise with age. 
                    However, data suggest that incidence risk of melanoma by the age of 30 has been at a downward trend.
                    Studies have shown that sunscreen use, at a younger age, can reduce the risk of melanoma risk by 40%.</p>
              </ul>
            </div>
          </div>
          <div className="info-card">
            <div className="card-content">
              <h2>Impact of skin cancer</h2>
              <img src={melanoma} alt="Cover Up" className="card-image" />
              <p>The graph shows the number of melanoma cases in Australia from 1982 to 2019.</p>
              <p>Data source: UV index - Data 13 cities in Australia</p>
            </div>
          </div>

          <div className="info-card">
            <div className="card-content">
              <h2>Conclusion</h2>
                    <p>The ageing populations lived in times when skin cancer awareness was less. With life expectancy continuing to rise, there is a higher chance of diagnosis in current times.
                    In conclusion, the incidence risk by a younger age group shows a more accurate representation on skin cancer awareness because sun protection habits have been taught at a young age.
                    Through continued education, today’s population should be better informed about how to identify and prevent melanoma than populations of the past.</p>
            </div>
          </div>

        </div>

      </div>
    </div>
  )
}

export default UVImpact
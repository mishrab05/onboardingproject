import React from 'react';
import './WallpaperStyles.css';

import sunWallpaper from '../assets/sun_wallpaper.jpg';

const Wallpaper = () => {
  return (
    <div className='hero'>
        <img src={sunWallpaper} alt="Sun Wallpaper" className="background-image" />
    </div>
  );
}

export default Wallpaper;


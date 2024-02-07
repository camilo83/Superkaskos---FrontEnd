import { useState, useEffect } from 'react';
import './home_images.scss';

export function HomeImages() {
  const [currentImage, setCurrentImage] = useState(true);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImage((prevState) => !prevState);
    }, 5000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
      <div className="home-images">
        <img
          src={currentImage ? './banner.png' : './migente.png'}
          alt="superkaskos images"
          className="image"
        />
      </div>
    </>
  );
}

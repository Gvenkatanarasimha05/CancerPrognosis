import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';

const images = [
  '/images/slide1.jpeg',
  '/images/slide2.jpg',
  '/images/slide3.jpg',
];

export default function Slideshow() {
  return (
    <Slide
      autoplay
      duration={5000}
      transitionDuration={1000}
      arrows={false}
      infinite
      easing="ease"
    >
      {images.map((image, index) => (
        <div key={index}>
          <div
            style={{
              backgroundImage: `url(${image})`,
              height: '100vh',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
        </div>
      ))}
    </Slide>
  );
}

import Carousel from 'react-bootstrap/Carousel';
import Image from 'react-bootstrap/Image';
import { banners } from '../data/banners';

function CarouselBanner() {
  return (
    <div className="carousel-banner mb-5">
      <Carousel fade interval={2000} controls={true} indicators={true}>
        {banners.map((banner) => (
          <Carousel.Item key={banner.id}>
            <Image
              className="d-block w-100"
              src={banner.image}
              alt={banner.title}
              style={{ objectFit: 'cover', maxHeight: '450px' }}
            />
            <Carousel.Caption style={{ background: 'rgba(0,0,0,0.4)', borderRadius: '10px' }}>
              <h3>{banner.title}</h3>
              <p>{banner.description}</p>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
}

export default CarouselBanner;

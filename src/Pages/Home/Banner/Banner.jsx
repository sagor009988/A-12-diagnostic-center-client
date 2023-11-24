import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import banner1 from '../../../assets/iclinic-healthcare-launches-mobi-d10919fa49.jpg'
import banner2 from '../../../assets/images (16).jpg'
import banner3 from '../../../assets/download (13).jpg'

const Banner = () => {
    return (
        <Carousel >
        <div >
            <img src={banner1}/>
            
        </div>
        <div>
            <img src={banner2} />
            
        </div>
        <div>
            <img src={banner3} />
           
        </div>
    </Carousel>
    );
};

export default Banner;
import Advertise from "../Advertise";
import Banner from "../Banner/Banner";
import Review from "../Review/Review";
import Slider from "../Slider/Slider";
import Recomendation from "./Recomendation";


const Home = () => {
    return (
        <div>
           <Banner></Banner>
           <Slider></Slider>
           <Recomendation></Recomendation>
           <Advertise></Advertise>
           <Review></Review>
        </div>
    );
};

export default Home;
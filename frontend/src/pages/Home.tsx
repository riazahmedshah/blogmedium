import FeatureCategory from "../components/FeatureCategory";
import CarasoulCard from "../components/landing/CarasoulCard";
import Header from "../components/landing/Header";
import Footer from "../components/Footer";



const Home = () => {
  return (
    <div className="bg-gray-300">
      <Header/>
      <FeatureCategory/>
      <CarasoulCard/>
      <Footer/>
    </div>
  );
};

export default Home;

import FeatureCategory from "../components/landing/FeatureCategory";
import CarasoulCard from "../components/landing/CarasoulCard";
import Header from "../components/landing/Header";
import Footer from "../components/Footer";
import FeatureArticle from "../components/landing/FeatureArticle";



const Home = () => {
  return (
    <div className="bg-gray-300">
      <Header/>
      <FeatureCategory/>
      <FeatureArticle/>
      <CarasoulCard/>
      <Footer/>
    </div>
  );
};

export default Home;

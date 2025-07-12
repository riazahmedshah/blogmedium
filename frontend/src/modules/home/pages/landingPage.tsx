import Footer from "@/components/Footer";
import { CarasoulCard, FeatureArticle, FeatureCategory, Header } from "../components/index";

const LandingPage = () => {
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

export default LandingPage;

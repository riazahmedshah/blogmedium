import Footer from "@/components/Footer";
import { CarasoulCard, FeatureArticle, FeatureCategory } from "../components/index";
import { Appbar } from "@/components/Appbar";

const LandingPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-100 to-gray-200">
      <Appbar/>
      <main className="flex-1">
        <FeatureCategory/>
        <FeatureArticle/>
        <CarasoulCard/>
      </main>
      <Footer/>
    </div>
  );
};
export default LandingPage;
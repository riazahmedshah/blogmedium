import { CarasoulCard, FeatureArticle } from "../components/index";

const LandingPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-100 to-gray-200">
      <main className="flex-1">
        <FeatureArticle/>
        <CarasoulCard/>
      </main>
    </div>
  );
};
export default LandingPage;
import "./App.css";
import Banner from "./components/Banner";
import HomePromotion from "./components/HomePromotion";
import HomeSearch from "./components/HomeSearch";
import HomeBusLine from "./components/HomeBusLine";
import Navbar from "./components/Navbar";
import HomeFutaInfo from "./components/HomeFutaInfo";
import HomeNews from "./components/HomeNews";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Banner />
      <HomeSearch />
      <HomePromotion />
      <HomeBusLine />
      <HomeFutaInfo />
      <HomeNews />
      <Footer />
    </div>
  );
}

export default App;

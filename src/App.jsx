import { useState } from "react";
import "./App.css";
import Home from "./pages/Home";
import AnimePage from "./pages/anime-page";
import { Route, Routes } from "react-router-dom";
import Header from "./components/header/header";
import Footer from "./components/footer/footer";
import CurrentSeasonalPage from "./pages/current-season";
import SeasonalAnime from "./pages/season-anime";

function App() {
  return (
    <div className="flex flex-col justify-between h-full">
      <Header />
      <Routes>
        <Route exect path="/" element={<Home />} />
        <Route exect path="/:animeid" element={<AnimePage />} />
        <Route exect path="/season" element={<CurrentSeasonalPage/>}/>
          <Route exect path="/season/:year/:season" element={<SeasonalAnime/>}/>
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;

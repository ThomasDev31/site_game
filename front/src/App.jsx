
import { BrowserRouter, Routes, Route } from "react-router";
import { useEffect, useState } from "react";

import Number from "./components/Number";
import Home from "./layout/Home";
import Mot from "./components/Mot";
import Header from "./layout/Header";
import Flag from "./components/Flag";
import Tusmo from "./components/Tusmo";
import Error404 from "./layout/Error404";
import "./app.css"
function App() {

  const [isDisplay, setIsDisplay] = useState(false)
  useEffect(() => {
    const body = document.getElementById("root")
    if(isDisplay){
      body.style.overflow = "hidden"
    }else{
      body.style.overflow = "auto"
    }
  },[isDisplay])

  
    return (
        <>
            <BrowserRouter>
              <Header setIsDisplay={setIsDisplay} isDisplay={isDisplay}/>
              <Routes>
                <Route path="/" element={<Home setIsDisplay={setIsDisplay} isDisplay={isDisplay}/>} />
                <Route path="/jeu/mot" element={<Mot setIsDisplay={setIsDisplay}/>} />
                <Route path="/jeu/number" element={<Number />} />
                <Route path="/jeu/flag" element={<Flag />} />
                <Route path="/jeu/tusmo" element={<Tusmo />} />
                <Route path="*" element={< Error404/>} />
              </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;

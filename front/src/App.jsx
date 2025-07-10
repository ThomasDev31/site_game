
import { BrowserRouter, Routes, Route } from "react-router";

import Number from "./components/Number";
import Home from "./layout/Home";
import Mot from "./components/Mot";
import Header from "./layout/Header";
import Flag from "./components/Flag";

function App() {

    return (
        <>
            <BrowserRouter>
              <Header/>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/jeu/mot" element={<Mot />} />
                <Route path="/jeu/number" element={<Number />} />
                <Route path="/jeu/flag" element={<Flag />} />
              </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;

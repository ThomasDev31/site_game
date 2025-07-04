
import { BrowserRouter, Routes, Route } from "react-router";

import Number from "./components/Number";
import Home from "./layout/Home";
import Mot from "./components/Mot";
function App() {

    return (
        <>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/jeu/mot" element={<Mot />} />
                <Route path="/jeu/number" element={<Number />} />
              </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;

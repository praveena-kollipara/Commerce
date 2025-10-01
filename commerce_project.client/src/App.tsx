import React, { useState } from 'react';
import './App.css';
import './index.css'
import MainMenu from "../src/common/MainMenu/MainMenu"
import NavTabs from './common/MainMenu/NavTabs';
import FindProduct from "./components/FindProducts"
import { Routes, Route } from "react-router-dom"


const App: React.FC = () => {
    // const [showTabs, setShowTabs] = useState(false);

    return (
        <div>
            <MainMenu />
            <NavTabs />
            <Routes>
                <Route path="/Products" element={<FindProduct />} />
            </Routes>
        </div>
    );
};


export default App;
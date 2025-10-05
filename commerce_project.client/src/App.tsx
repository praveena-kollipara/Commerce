import React, { useState } from 'react';
import './App.css';
import './index.css'
import MainMenu from "../src/common/MainMenu/MainMenu"
import NavTabs from './common/MainMenu/NavTabs';
import FindProducts from "./components/FindProducts"
import { Routes, Route } from "react-router-dom"
import ProductDetails from './components/ProductDetails';





const App: React.FC = () => {
    // const [showTabs, setShowTabs] = useState(false);
    const [productInfo, setProductInfo] = useState<number|null>(null);

    return (
        <div>
            <MainMenu />
            <NavTabs />
            <Routes>
                <Route path="/Products" element={<FindProducts onSelect={setProductInfo} />} />
                <Route path="/ProductDetails" element={<ProductDetails id={productInfo} />} />
            </Routes>
        </div>
    );
};


export default App;
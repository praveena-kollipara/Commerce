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
    const [productInfo, setProductInfo] = useState<number | null>(null);
    const [isCategoryId, setIsCategoryId] = useState<number |null>(null);
    const [showNavTabs, setShowNavTabs] = useState(false);
    return (
        <div>
            <MainMenu onSelect={() => setShowNavTabs(true)} />
            {showNavTabs && (
                <>
                    <NavTabs />
                </>
            )}
            
            <Routes>

                <Route path="/Products" element={<FindProducts onSelect={setProductInfo} onCategorySelect={setIsCategoryId} />} />
                <Route path="/ProductDetails" element={<ProductDetails id={productInfo} cat_Id={isCategoryId} />} />
            </Routes>
        </div>
    );
};


export default App;
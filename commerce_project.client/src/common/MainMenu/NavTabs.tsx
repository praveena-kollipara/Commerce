import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { useNavigate, useLocation } from 'react-router-dom'

const tabs = [{ label: "Products", path : "/Products" }, { label : "Product Details", path :"/ProductDetails" } ]
function NavTabs() {

    const navigate = useNavigate();
    const location = useLocation();

    const currentTab = tabs.findIndex((tab) => tab.path === location.pathname);

    const handleChange = (_: React.SyntheticEvent, newValue: number) => {
        navigate(tabs[newValue].path);;  
    };
   
    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={currentTab === -1 ? 0 : currentTab} onChange={handleChange} aria-label="basic tabs example">
                    {tabs.map((tab,index) => (
                        <Tab key={tab.path} value={index} label={tab.label}/>
                    )) }    
                </Tabs>
            </Box>
           
        </Box>
  );
}

export default NavTabs;











import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import logo from "../../assets/logo.png"
import { useNavigate } from "react-router-dom"

interface menuItem {
    name: string;
    path: string;
}

const menuItems = [
    { name: "Home", path: "/Home" }
 
]

interface MainMenuProps {
    onSelect: () => void;
}
export default function MainMenu({ onSelect }: MainMenuProps ) {
    const navigate = useNavigate();
    const handleChange = (item: menuItem) => {
        navigate(item.path);
        if (item.name === "Home") {
            navigate("/Products");
            onSelect();
        }
        
    }
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar disableGutters>
                    <Box sx={{ m: "0", p: "0" }}>
                        <img src={logo} alt="logo" style={{ height: '90px', width: '100px', display: "block", margin: "0", padding:"0" }}/>  
                    </Box>

                    {/*<Box sx={{ m: "0", p: "5" }}>*/}
                    {/*   <h3>Digital Shopping System</h3>*/}
                    {/*</Box>*/}
                    
                    <Box>
                        {menuItems.map((item) => (
                            <Button color="inherit" key={item.path} onClick={() => handleChange(item)}>{item.name}</Button>  
                             
                        ))}
                       
                    </Box>
                </Toolbar>
            </AppBar>
        </Box>
    );
}

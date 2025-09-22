import  React, {useState, useEffect} from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import type { SelectChangeEvent } from '@mui/material/Select';
import axios from "axios";



export default function FindProduct() {

    const [Categories, setCategories] = useState<string[]>([]);

    const [selectedCategory, setSelectedCategory] = React.useState<string>('');

    const handleChange = (event: SelectChangeEvent) => {
        setSelectedCategory(event.target.value);
    };

    useEffect(() => {
        axios.get("https://localhost:7142/api/Category/ListOfCategories")
            .then(response => setCategories(response.data))
         
        .catch ((err)=> {
            console.log("Error fecthing categories", err);
        })
    }, []);

   


    return (
        <div>
            <FormControl sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="demo-simple-select-autowidth-label">Categories</InputLabel>
                <Select
                    labelId="demo-simple-select-autowidth-label"
                    id="demo-simple-select-autowidth"
                    value={selectedCategory}
                    onChange={handleChange}
                    autoWidth
                    label="Category"
                >
                    {Categories.map((item, index) => (
                        <MenuItem value={item} key={index}>{item}</MenuItem>
                    ))}
                </Select>
            </FormControl>
       </div>
    )
}
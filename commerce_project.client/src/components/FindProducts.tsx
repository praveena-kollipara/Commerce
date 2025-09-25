import  React, {useState, useEffect} from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Box from '@mui/material/Box'
import type { SelectChangeEvent } from '@mui/material/Select';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import type { IProducts } from '../common/Inteface'

import axios from "axios";



export default function FindProduct() {

    const [Categories, setCategories] = useState<string[]>([]);

    const [selectedCategory, setSelectedCategory] = React.useState<string>('');

    const [rows, setRows] = useState<IProducts[]>([]);

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

    useEffect(() => {
        const getRows = async () => {
            await axios.get("https://localhost:7142/api/Category/ProductsBasedOnCategory", {
                params: { categoryname: selectedCategory }
                })
              .then(res => setRows(res.data))
              .catch((err) => {
                    console.log("Error fetching Data", err)
              })
        }
        getRows();
    }, [selectedCategory])

   

   

    const columns: GridColDef<(typeof rows)[number]>[] = [
        { field: 'name', headerName: 'Name', width: 90 },
        { field: 'price', headerName: 'Price', width: 90 },
        { field: 'description', headerName: 'Description', width: 90 }
    ];


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
            <Box sx={{ height: 400, width: '100%' }}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: {
                                pageSize: 5,
                            },
                        },
                    }}
                    pageSizeOptions={[5]}
                    checkboxSelection
                    disableRowSelectionOnClick
                />
            </Box>
       </div>
    )
}
import React, { useState, useEffect } from 'react';

import MenuItem from '@mui/material/MenuItem';
import '../index.css'
import Select from '@mui/material/Select';
import Box from '@mui/material/Box'
import type { SelectChangeEvent } from '@mui/material/Select';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import type { IProducts, ICategories } from '../common/Inteface'
import axios from "axios";
import { TextField } from '@mui/material';
import type { GridRowParams } from '@mui/x-data-grid';

import type { GridRowSelectionModel } from '@mui/x-data-grid';
interface FindProductsProps {
    onSelect: (id: number | null) => void
    onCategorySelect: (cat_Id: number | null) =>void
}

const FindProducts: React.FC<FindProductsProps> = ({ onSelect, onCategorySelect }) => {

    const [Categories, setCategories] = useState<string[]>([]);

    const [selectedCategory, setSelectedCategory] = React.useState<string>("");

    const [rows, setRows] = useState<IProducts[]>([]);
    const [searchItem, setSearchItem] = useState('');
    const [selectedItem, setSelectedItem] = useState<GridRowSelectionModel>();
    const [categoriesInfo, setCategoriesInfo] = useState<ICategories[]>([])
    const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);

    const handleChange = (event: SelectChangeEvent) => {
        setSelectedCategory(event.target.value);
    };


    useEffect(() => {
        axios.get("https://localhost:7142/api/Category/ListOfCategories")
            .then(response => {
                const categoryList = response.data;
                setCategories(categoryList);

              
                if (categoryList.length > 0) {
                    setSelectedCategory(categoryList[0]);
                }
            })
            .catch((err) => {
                console.log("Error fetching categories", err);
            });
    }, []);

    const getRows = async () => {
        try {
            const res = await axios.get("https://localhost:7142/api/Category/ProductsBasedOnCategory", {
                params: { categoryname: selectedCategory, searchparam: searchItem }
            })
            
            setRows(res.data);

        }
        catch (err) {
            console.log("Error fetching Data", err)
        }

    }

    const selectedCategoryInfo = async () => {
        try {
            const res = await axios.get(`https://localhost:7142/api/Category/GetCategoryInfo`);
            const result: ICategories[] = res.data;
            setCategoriesInfo(result);

            const details = result.find(item => item.name === selectedCategory);
            if (details) {
                const categoryid = details.id;
                setSelectedCategoryId(categoryid);
               
                onCategorySelect(categoryid); 
            }
        } catch (err) {
            console.log("Error fetching Data", err);
        }
    };


    useEffect(() => {
        getRows();
        selectedCategoryInfo();
    }, [selectedCategory]);

    
    const handleSearch = async () => {
        await getRows();
    }




    const columns: GridColDef<(typeof rows)[number]>[] = [
        { field: 'name', headerName: 'Name', width: 150 },
        { field: 'price', headerName: 'Price', width: 90 },
        { field: 'description', headerName: 'Description', width: 250 }
    ];


    return (
        <div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-start", gap: "5px", marginTop: "10px", marginLeft: "10px" }}>
                <label id="selectCategory">Product Categories</label>
                <Select
                    id="selectCategory"
                    value={selectedCategory}
                    onChange={handleChange}
                    style={{ width: "250px", height: "50px" }}


                >
                    <MenuItem value="">
                        <em >Select</em>
                    </MenuItem>
                    {Categories.map((item) => (
                        <MenuItem value={item} key={item}>{item}</MenuItem>
                    ))}
                </Select>
            </div>



            <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", marginRight: "15px", marginBottom: "10px" }}>
                <TextField onChange={(e) => setSearchItem(e.target.value)}
                    sx={{
                        width: '300px',     // wider field
                        height: '40px',     // controls outer height
                        input: {
                            padding: '8px 12px', // controls inner input padding
                            fontSize: '14px'     // optional: smaller text
                        },
                        marginRight: '15px'
                    }}
                    placeholder="Search products..." />
                <button onClick={handleSearch} style={{ marginBottom: "10px" }} >Search</button>
            </div>

            <Box sx={{ height: 400, width: '100%' }}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    checkboxSelection
                    onRowClick={(params: GridRowParams) => {
                       
                        onSelect(params.row.id);
                    }}

                    onRowSelectionModelChange={(newSelection) => {
                        setSelectedItem(newSelection);

                        const selectedId = newSelection?.ids?.values?.().next?.().value;

                        if (typeof selectedId === 'number') {
                            onSelect(selectedId);
                        } else {
                            onSelect(null);
                        }
                    }}



                />
            </Box>
        </div>
    )
}
export default FindProducts; 
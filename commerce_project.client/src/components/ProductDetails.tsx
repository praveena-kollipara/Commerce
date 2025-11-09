import type { IProducts } from "../common/Inteface";
import React, { useState, useEffect } from "react"
import axios from 'axios'
import { TextField, Checkbox } from "@mui/material";
import { useNavigate } from "react-router-dom"

interface ProductDeatilsProps {
    id: number | null
    cat_Id: number | null
}

const ProductDetails: React.FC<ProductDeatilsProps> = ({ id, cat_Id }) => {

    const [productsData, setProductsData] = useState<IProducts | null>(null)
    const navigate = useNavigate();

    const fetchData = async () => {
        try {
            const result = await axios.get(`https://localhost:7142/api/Product/productById/${id}`)
                .then(result => result.data)
            if (result.success) {
                console.log(result.data);
                setProductsData(result.data)
            }
        }
        catch (err) {
            console.log(err)
        }
    }
        useEffect(() => {
            fetchData();
        }, [])

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target
        setProductsData((prev) => {
            if (!prev)  return prev;
            return {
                ...prev, [name]: type === "checkbox" ? checked: value 
            }

        })
       
    }
    const handleSave = async () => {
        try {
            const response = await axios.put(`https://localhost:7142/api/Product/update/${id}`, productsData)
            const result = response.data
            if (result.success) {
                setProductsData(result.data)
            }
        }
        catch (err) {
            console.log("error is :", err);
        }
    }
    const handleDelete = async (id: number | undefined) => {
        if (id === undefined) {
            return;
        }
        try {
            const response = await axios.delete(`https://localhost:7142/api/Product/delete/${id}`);
            const result = response.data
            if (result.success) {
                navigate("/Products")
            }
        }
        catch (err) {
            console.error("error deleting record",err)
        }
    }
    return (
        <div style={{ display: "flex", flexDirection: "column", gap: "20px", padding: "25px" }}>
            <p>{cat_Id}</p>
            {/* Brand and Product Name */}
            <div style={{ display: "flex", gap: "80px" }}>
                <div style={{ display: "flex", flexDirection: "column" }}>
                    <label htmlFor="Brandname">Brand name</label>
                    <TextField
                        id="Brandname"
                        name="brand"
                        variant="outlined"
                        onChange={handleInputChange }
                        style={{ marginTop: "5px" }}
                        value={productsData?.brand || ''}
                    />
                </div>
                <div style={{ display: "flex", flexDirection: "column" }}>
                    <label htmlFor="productname">Product Name</label>
                    <TextField
                        id="productname"
                        variant="outlined"
                        name="name"
                        onChange={handleInputChange}
                        style={{ marginTop: "5px" }}
                        value={productsData?.name || ''}
                    />
                </div>
            </div>
           
            {/* Price and Rating */}
            <div style={{ display: "flex", gap: "80px" }}>
                <div style={{ display: "flex", flexDirection: "column" }}>
                    <label htmlFor="Price">Price</label>
                    <TextField
                        id="Price"
                        variant="outlined"
                        fullWidth
                        name="price"
                        onChange={handleInputChange}
                        style={{ marginTop: "5px" }}
                        value={productsData?.price || ''}
                    />
                </div>
                <div style={{ display: "flex", flexDirection: "column" }}>
                    <label htmlFor="Rating">Rating</label>
                    <TextField
                        id="Rating"
                        variant="outlined"
                        fullWidth
                        name="rating"
                        onChange={handleInputChange}
                        style={{ marginTop: "5px" }}
                        value={productsData?.rating || ''}
                    />
                </div>
            </div>

            {/* Description */}
            <div style={{ display: "flex", flexDirection: "column" }}>
                <label htmlFor="Description">Description</label>
                <TextField
                    id="Description"
                    variant="outlined"
                    multiline
                    name="description"
                    onChange={handleInputChange}
                    rows={4 }
                    style={{ marginTop: "5px", width:"600px" }}
                    value={productsData?.description || ''}
                />
            </div>

            {/* Availability and Quantity */}
            <div style={{ display: "flex", gap: "60px" }}>
                
                <div style={{ marginTop: "30px" }}>
                    <Checkbox id="availability" name="isActive" checked={productsData?.isActive ?? false} onChange={handleInputChange} />
                   <label htmlFor="availability">Availability</label>
                   
                </div>
                    
               
                <div style={{ display: "flex", flexDirection: "column", marginTop:"12px"}}>
                    <label htmlFor="QuantityAvailable">Quantity Available</label>
                    <TextField
                        id="QuantityAvailable"
                        variant="outlined"
                        fullWidth
                        name="stockQuantity"
                        onChange={handleInputChange}
                        style={{ marginTop: "5px" }}
                        value={productsData?.stockQuantity || ''}
                    />
                </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "5px" }}>
                <button onClick={() => setProductsData(null)}>Add</button>
                <button onClick={handleSave }>Save</button>
                <button onClick={()=>handleDelete(productsData?.id)}>Delete</button>
            </div>
        </div>
  ); 
}

export default ProductDetails;
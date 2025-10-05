import type { IProducts } from "../common/Inteface";
import { useState, useEffect } from "react"
import axios from 'axios'
import { TextField } from "@mui/material";

interface ProductDeatilsProps {
    id: number | null
}

const ProductDetails: React.FC<ProductDeatilsProps> = ({ id }) => {

    const [productsData, setProductsData] = useState<IProducts | null>(null)

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
        },[])
  return (
      <div>
          <div>
              <label htmlFor="">Brand name</label>
              <TextField
                  value={productsData?.brand || ''}
              />
              <label htmlFor="productname">Product Name</label>
              <TextField
                  value={productsData?.name || ''}
              />

          </div>
          <div>
              <label htmlFor="Price">Price</label>
              <TextField
                  value={productsData?.name || ''}
              />
              <label htmlFor="PublishedDate">PublishedDate</label>
              <TextField
                  value={productsData?.publishedDate || ''}
              />
              <label htmlFor="Rating">Rating</label>
              <TextField
                  value={productsData?.rating || ''}
              />

          </div>
          <div>
              <label htmlFor="Description">Description</label>
              <TextField
                  value={productsData?.description || ''}
              />
          </div>
          <div>
              <label htmlFor="Availability">Availability</label>
              <TextField
                  value={productsData?.isActive || ''}
              />
              <label htmlFor="QuantityAvailable">Quantity Available</label>
              <TextField
                  value={productsData?.stockQuantity || ''}
              />
          </div>

      </div>
  );
}

export default ProductDetails;
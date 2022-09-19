import * as React from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import { ProductContext } from '../../context/product.context';
import { apiGetAllProducts, apiGetProductByKeyword } from '../../remote/e-commerce-api/productService';
import { Icon } from '@material-ui/core';

export default function SearchbarProducts() {
  const {productList, setProductList} = React.useContext(ProductContext)
  const [keyword, setKeyword] = React.useState<string>("")
  
  const searchProduct = async (keyword:string) =>{
    setKeyword(keyword);
    if(keyword==="") {
      const result = await apiGetAllProducts()
      console.log(result)
      setProductList(result.payload)
    } else {
      const result = await apiGetProductByKeyword(keyword)
      console.log(result)
      setProductList(result.payload)
    }
    

  }

  return (
    <Paper
      // component="form"
      sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
    >
      <InputBase
        onChange={(event) => {searchProduct(event.target.value)}}
        sx={{ ml: 1, flex: 1 }}
        placeholder="Search Products"
        inputProps={{ 'aria-label': 'search products' }}
      />
      <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
        <SearchIcon />
      </IconButton>
    </Paper>
  );
}
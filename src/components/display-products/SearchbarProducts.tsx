import * as React from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import { ProductContext } from '../../context/product.context';
import { apiGetAllProducts, apiGetProductByKeyword } from '../../remote/e-commerce-api/productService';
import ClearIcon from '@mui/icons-material/Clear';
import { Button, Container } from '@mui/material';

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

  const searchOnEnter = async (e: any, keyword:string) =>{
    if(e.keyCode === 13) searchProduct(keyword)
  }

  return (
    <Paper
      sx={{ p: '10px', display: 'flex', height:"40px", width: 400, borderRadius:"20px" }}
    > 
      <IconButton onClick={() => {searchProduct(keyword)}} type="button" sx={{ p: '10px'}} aria-label="search">
        <SearchIcon />
      </IconButton>

      <InputBase
        onChange={(event) => {setKeyword(event.target.value)}}
        onKeyDownCapture={(e: any) => {searchOnEnter(e, keyword)}}
        sx={{ ml: 1, flex: 1 }}
        placeholder="Search Products"
        inputProps={{ 'aria-label': 'search products' }}
        value={keyword}
      />

      <IconButton onClick={() => {searchProduct("")}} type="button" sx={{ p: '10px' }} aria-label="clear">
        <ClearIcon />
      </IconButton>
    </Paper>
  );
}
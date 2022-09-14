import { Button, Paper, TextField, Typography } from "@material-ui/core"
import React, { useEffect, useState } from 'react';


export const CreateProduct = () => {

const [formData , setFormData] = useState ({
    productName: "",
    productDescription: "",
    imageURL: "",
    productPrice: 0
})
function onsubmit () {
    console.log (formData)
}
    return <>
     <Paper elevation={3}>
        <Typography variant = "h4"> create product </Typography>
        <TextField
          required
          id="outlined-required"
          label="Product Name"
          onChange = {(event: React.ChangeEvent<HTMLInputElement>
            )=> {setFormData({...formData, productName: event.target.value})}} 
        />
         <TextField
          required
          id="outlined-required"
          label="Product Description"
          onChange = {(event: React.ChangeEvent<HTMLInputElement>
            )=> {setFormData({...formData, productDescription: event.target.value})}} 
        />
         <TextField
          required
          id="outlined-required"
          label="Image URL"
          onChange = {(event: React.ChangeEvent<HTMLInputElement>
            )=> {setFormData({...formData, imageURL: event.target.value})}} 
        />
         <TextField
          required
          id="outlined-required"
          label="Product Price"
          type="number"
          onChange = {(event: React.ChangeEvent<HTMLInputElement>
            )=> {setFormData({...formData, productPrice: event.target.valueAsNumber})}} 
        />
        <Button variant = "contained" onClick = {onsubmit}>
            
        create product
        </Button>
     </Paper>
     </>
}


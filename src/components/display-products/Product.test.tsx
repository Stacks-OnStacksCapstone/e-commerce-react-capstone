import { ProductCard } from "./ProductCard"
import { render, screen } from "@testing-library/react"
import { apiGetAllProducts } from "../../remote/e-commerce-api/productService";
import ReactDOM from 'react-dom'
import { DisplayProducts } from "./DisplayProducts";
import Product from "../../models/Product";

const products = [
    {
        "id": 2,
        "quantity": 5,
        "price": 45.0,
        "description": "A nice TeeShirt",
        "image": "https://d3o2e4jr3mxnm3.cloudfront.net/Mens-Jake-Guitar-Vintage-Crusher-Tee_68382_1_lg.png",
        "name": "TeeShirt",
        "active": true
    },
    {
        "id": 3,
        "quantity": 20,
        "price": 2.5,
        "description": "A reusable shopping bag",
        "image": "https://images.ctfassets.net/5gvckmvm9289/3BlDoZxSSjqAvv1jBJP7TH/65f9a95484117730ace42abf64e89572/Noissue-x-Creatsy-Tote-Bag-Mockup-Bundle-_4_-2.png",
        "name": "Shopping Bag",
        "active": true
    },
    {
        "id": 5,
        "quantity": 2,
        "price": 80.0,
        "description": "A nice coat",
        "image": "https://www.pngarts.com/files/3/Women-Jacket-PNG-High-Quality-Image.png",
        "name": "Coat",
        "active": true
    },
    {
        "id": 4,
        "quantity": 19,
        "price": 10.0,
        "description": "A fancy cap for a fancy person",
        "image": "https://d3o2e4jr3mxnm3.cloudfront.net/Rocket-Vintage-Chill-Cap_66374_1_lg.png",
        "name": "Baseball Cap",
        "active": true
    },
    {
        "id": 1,
        "quantity": 8,
        "price": 20.0,
        "description": "- Lightweight 1.38 in neodymium dynamic drivers deliver a punchy, rhythmic response to even the most demanding tracks. Driver Unit: Dome type",
        "image": "https://i.insider.com/54eb437f6bb3f7697f85da71?width=1000&format=jpeg&auto=webp",
        "name": "Headphones",
        "active": true
    }
]

it('gets all products', async () => {
    expect.assertions(1);
    const response = await apiGetAllProducts();
    expect(response.payload).toEqual(expect.arrayContaining(products))
})


it('renders DisplayProduct without crashing', ()=>{
    const div = document.createElement('div')
    ReactDOM.render(<DisplayProducts></DisplayProducts>, div)
})

// it('checks if response is a Product', async()=>{
//     const response = await apiGetAllProducts()

//     for(let i = 0; i < products.length; i++){
//         const product = new Product(response.payload[i])
//         expect(response.payload[i]).toBeInstanceOf(Product)
//     }
// })
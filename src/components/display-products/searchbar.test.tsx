import { render, screen } from "@testing-library/react"
import { apiGetProductByKeyword } from "../../remote/e-commerce-api/productService"
import { ProductCard } from "./ProductCard"

const tshirt =  {
    id: 2,
    quantity: 5,
    price: 45.0,
    description: "A nice TeeShirt",
    image: "https://d3o2e4jr3mxnm3.cloudfront.net/Mens-Jake-Guitar-Vintage-Crusher-Tee_68382_1_lg.png",
    name: "TeeShirt",
    active: true
}

const bag = {
    id: 3,
    quantity: 20,
    price: 2.5,
    description: "A reusable shopping bag",
    image: "https://images.ctfassets.net/5gvckmvm9289/3BlDoZxSSjqAvv1jBJP7TH/65f9a95484117730ace42abf64e89572/Noissue-x-Creatsy-Tote-Bag-Mockup-Bundle-_4_-2.png",
    name: "Shopping Bag",
    //active: true
}

it('searches for bag',async () => {
    // Search for bag
    const product = await apiGetProductByKeyword("bag")

    // Render product
    render(<ProductCard product={bag} key={bag.id}></ProductCard>)

    // Check if product was properly rendered
    const linkElement = screen.getByText(product.payload[0].name)
    expect(linkElement).toBeInTheDocument()
})

it('works with searchbar',async () => {
    expect.assertions(1);
    return apiGetProductByKeyword("shirt").then(data => expect(data.payload[0]).toEqual(tshirt));
})
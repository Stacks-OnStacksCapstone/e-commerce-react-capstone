import internal from "stream";
import Product from "./Product";

export default class ProductReview {
    id: number;
    rating: number;
    comment: string;
    product: Product;
    user: any;

    constructor (id: number, rating: number, comment: string, product: Product, user: any) {
        this.id = id;
        this.rating = rating;
        this.comment = comment;
        this.product = product;
        this.user = user;
    }
}
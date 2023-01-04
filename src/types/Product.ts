type Product = {
    name: string;
    category: string;
    price?: string;
    image: string;
    alt: string;
    liked: Boolean;
    id: Number;
    site: string;
    otherFields?: any;
}

export default Product;
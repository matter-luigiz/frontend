type Product = {
    name: string;
    category: string;
    price?: string;
    description?: string;
    image: string;
    link: string;
    alt: string;
    liked: boolean;
    certifications?: string[];
    id: Number;
    site: string;
    otherFields?: any;
}

function convertToProduct(item: any): Product {
    let src = item[1];
    let prod: Product = {
        name: item[0],
        image: src.Image.slice(6),
        category: src.category || src.Category || src['Commodity type'],
        price: src['Price per tons'] || src.Cost,
        site: src.Site,
        id: src.id || src['ID'],
        link: src.Link,
        description: src.description,
        liked: false,
        certifications: src.Certifications,
        alt: ''
    }

    if (src.Site.includes('Cradle')) {
        prod.certifications = ['Cradle to Cradle Certified'];
    }

    let otherFields = {...src};

    delete otherFields.Image;
    delete otherFields.Category;
    delete otherFields['Commodity type'];
    delete otherFields['Price per tons'];
    delete otherFields['Cost'];
    delete otherFields.Site;
    delete otherFields.id;
    delete otherFields['ID'];
    delete otherFields.Link;
    delete otherFields.description;
    delete otherFields.Certifications;

    prod.otherFields = {...otherFields};

    return prod;
}

export default Product;
export {convertToProduct};
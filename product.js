let products = [];
let id = 0;


function resetProducts() {
    products = [];
    id = 0;
}


function getProducts() {
    return products;
}


function addProduct(name, price) {
    if (!name) throw new Error("Name is required");
    if (price === undefined) throw new Error("Price is required");
    if (products.some(p => p.name === name)) throw new Error("Product already exists");

    const product = { id: id++, name, price };
    products.push(product);
    return product;
}


function removeProduct(productId) {
    const index = products.findIndex(p => p.id === productId);
    if (index === -1) throw new Error("Product does not exist");
    return products.splice(index, 1)[0];
}


function getProduct(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) throw new Error("Product does not exist");
    return product;
}


function updateProduct(productId, name, price) {
    const product = products.find(p => p.id === productId);
    if (!product) throw new Error("Product does not exist");

    if (name !== undefined) product.name = name;
    if (price !== undefined) product.price = price;

    return product;
}

module.exports = {
    resetProducts,
    addProduct,
    removeProduct,
    getProducts,
    getProduct,
    updateProduct
};

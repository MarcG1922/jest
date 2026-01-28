const {
    resetProducts,
    addProduct,
    removeProduct,
    getProducts,
    getProduct,
    updateProduct
} = require('./product');

beforeEach(() => resetProducts());

describe("Adding Products", () => {
    test("should add a product", () => {
        const product = addProduct("Laptop", 1000);
        expect(product).toEqual({ id: 0, name: "Laptop", price: 1000 });
        expect(getProducts()).toHaveLength(1);
    });

    test("should fail when adding a repeated product", () => {
        addProduct("Laptop", 1000);
        expect(() => addProduct("Laptop", 1200)).toThrow("Product already exists");
    });

    test("should fail when adding a product with no name", () => {
        expect(() => addProduct(undefined, 1000)).toThrow("Name is required");
    });

    test("should fail when adding a product with no price", () => {
        expect(() => addProduct("Laptop")).toThrow("Price is required");
    });
});

describe("Removing Products", () => {
    test("should remove a product", () => {
        const p = addProduct("Laptop", 1000);
        const removed = removeProduct(p.id);
        expect(removed).toEqual(p);
        expect(getProducts()).toHaveLength(0);
    });

    test("should fail if the product does not exist", () => {
        expect(() => removeProduct(999)).toThrow("Product does not exist");
    });
});

describe("Getting a single product", () => {
    test("should get a product", () => {
        const p = addProduct("Laptop", 1000);
        expect(getProduct(p.id)).toEqual(p);
    });

    test("should fail if the product does not exist", () => {
        expect(() => getProduct(999)).toThrow("Product does not exist");
    });
});

describe("Updating Products", () => {
    test("should update a product", () => {
        const p = addProduct("Laptop", 1000);
        const updated = updateProduct(p.id, "Laptop Pro", 1200);
        expect(updated).toEqual({ id: p.id, name: "Laptop Pro", price: 1200 });
    });

    test("should fail when updating a product that does not exist", () => {
        expect(() => updateProduct(999, "Laptop Pro", 1200)).toThrow("Product does not exist");
    });

    test("should only update the price", () => {
        const p = addProduct("Laptop", 1000);
        const updated = updateProduct(p.id, undefined, 1500);
        expect(updated).toEqual({ id: p.id, name: "Laptop", price: 1500 });
    });

    test("should only update the name", () => {
        const p = addProduct("Laptop", 1000);
        const updated = updateProduct(p.id, "Laptop Pro");
        expect(updated).toEqual({ id: p.id, name: "Laptop Pro", price: 1000 });
    });
});

type Product = {
    uid?: string,
    name: string,
    amount: Int16Array,
    amountType: string,
    price: Float32Array,
    category: string,
    created: Date,
    modified?: Date,
    deleted?: Date,
}

export default Product;
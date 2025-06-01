
function isProduct(maybeProduct) {
    if (typeof maybeProduct !== 'object' || maybeProduct === null ) {
        return false
    } else if (
        typeof maybeProduct.id !== 'number' || 
        typeof maybeProduct.name !== 'string' || 
        typeof maybeProduct.price !== 'number'
    ) {
        return false
    }
    return true
}

function isCartItem(maybeCartItem) {
    if (typeof maybeCartItem !== "object" || maybeCartItem === null) {
    return false;
    } else if (
        typeof maybeCartItem.id !== "number" ||
        typeof maybeCartItem.amount !== "number" ||
        typeof maybeCartItem.item !== "object" 
    ) {
        return false;
    }
    return true;
}



export { isCartItem, isProduct }

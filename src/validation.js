// Remember to use RED, GREEN, REFACTOR
// 1. pick one test case in validation.test.js
// 2. write the code, verify that the test is RED
// 3. write code in this file so that the test case becomes GREEN
// 4. refactor as neccessary before you move on to the next
// 5. repeat

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



function isCartItem(maybeCartItem) {}



export { isCartItem, isProduct }

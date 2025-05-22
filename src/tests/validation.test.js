import { isCartItem, isProduct } from "../validation.js"
// Examples of a valid product and a valid cart item. You may use these when testing below.
const exampleProduct = {
	id: 1001,
	name: 'Badanka',
	price: 500
}

const exampleCartObject = {
	id: 2001,
	amount: 1,
	item: exampleProduct
}
//isProduct
//A1. Om produkten är ett objekt, retunera true
//A2. Om produkten inte är ett objekt, returnera false
//A3. Om produkten är ett objekt men saknar giltig egenskap, returnera false 

describe('isProduct', () => {
		test('Om produkten är ett objekt, retunera true', () => {
				const input = exampleProduct
				const expected = true
				const actual = isProduct(input)
				expect(actual).toBe(expected)

		});

		//täck alla utfall där det inte är ett objekt.
		const objCases = [
			[false, 'är inte ett objekt'],
			[false, null],
			[false, 0]
		];

		test.each(objCases)('Om produkten inte är ett objekt, returnera false', (expected, input) => {
				const actual = isProduct(input)
				expect(actual).toBe(expected)
		});

		//täck alla utfall där en giltig egenskap saknas/tomt objekt.
		const objIncorrect = [
			[{}],
			[{ name: 'Badanka', price: 500}],
			[{ id: 1001, price: 500}],
			[{ id: 1001, name: 'Badanka'}]
		];

		test.each(objIncorrect)('Om produkten är ett objekt men saknar giltig egenskap, returnera false', (input) => {
			expect(isProduct(input)).toBe(false)
		});

})



	// Använd en "test" eller "it" (de är synonymer) för varje testfall
	/* Exempel på syntax:
	test('beskriv testfallet', () => {
		// här skriver du testkoden
		// avsluta alltid med "expect"
	})
	*/


	// ---------------------------------------------
	// Följande testfall ska du implementera. Det är tillåtet att använda Joi. Gör i så fall ett schema för varje sorts objekt du vill kunna validera. Du får även ändra texten och du t.ex. vill skriva på svenska i stället för engelska.
	// (Ta bort dessa kommentarer när du är klar)

	// 1. it returns true for a valid cart object
	// 2. it returns false for invalid cart objects

	// 3. it returns true for a valid product
	// 4. it returns false for invalid cart objects
/*
TDD - Test-Driven developement med testramverk Jest.
Från kravspecifikation(userstories) till acceptanskriterier till testmetod. 

ÖV i sommar - ekvivalensklasser.

Ekvivalent säger vi om två saker som är lika.
En ekvivalensklass är mängden av alla värden som ger samma resultat vid en jämförelse.
if( x <= 20 )
Villkoret blir true för alla tal från och med 20 och mindre. Talen 20, 19, 18, … tillhör en ekvivalensklass.
Villkoret blir false för alla tal strikt större än 20. Talen 21, 22, … osv.

*/

import { addToCart, getCartItemCount, getItem, getTotalCartValue, removeFromCart, editCart, clearCart } from "../cart"

describe('Cart', () => {

  beforeEach(() => {

    clearCart()
  })
  
  // A1. clearCart ska ta bort alla produkter oavsett antal i kundvagnen
  test('clearCart tömmer hela kundvagnen', () => {
    const expected = 0

    addToCart({ id: 1006, name: 'Dragkampsrep', price: 23 })
    addToCart({ id: 1007, name: 'Lego', price: 59 })
    clearCart()

    const actual = getCartItemCount()
    expect(actual).toBe(expected)
  });

	// A1. Om en giltig produkt läggs till, ökar antalet produkter i kundvagnen med 1
	// A2. Öka endast mängd om samma produkt läggs till igen
  	// A3. kastar ett fel om produkten är ogiltig/saknad av diverse obligatoriska egenskaper/datatyper.
  
	describe('addToCart', () => {
		
		test('Om en giltig produkt läggs till, ökar antalet produkter i kundvagnen med 1', () => {
			const input = { id: 1002, name: 'Boule', price: 70 }
			const expected = 1

			addToCart(input)
			const actual = getCartItemCount()

			expect(actual).toBe(expected)
		});

		
		test('ökar mängden om samma produkt läggs till igen', () => {
			const input = { id: 1001, name: "Backgammon", price: 22 }

			addToCart(input)
			addToCart(input)

			const actual = getItem(0).amount
			expect(actual).toBe(2)
		});

		describe('addToCart - ogiltiga produkter', () => {
			const invalidProducts = [
				[{ id: 1, price: 10 }],
				[{ id: 2, name: 123, price: 10 }],
				[{ id: "fel", name: "Boll", price: 30 }],
				[{ id: 3, name: "Keps" }],
				[{ id: 4, name: "Fisk", price: "gratis" }],
			]

			test.each(invalidProducts)(
				'kastar fel om produkten är ogiltig (%s)',
				(input) => {
				expect(() => {
					addToCart(input)
				}).toThrow("Ogiltig produkt")
				}
			)
		})

	})


	// A1. Om olika produkter läggs till, ska summan av priserna returneras korrekt 
	// A2. Om samma produkt läggs till förväntas korrekt summa.
	// A3. Om man lägger till samma produkt igen så ökar amount endast, inga dubbletter.

	describe('getTotalCartValue', () => {

		test('Om flera/olika produkter läggs till, ska summan av priserna returneras korrekt', () => {
			const expected = 200

			addToCart({ id: 1001, name: 'Frisbee', price: 80 })
			addToCart({ id: 1002, name: 'Basketboll', price: 120 })

			const actual = getTotalCartValue()
			expect(actual).toBe(expected)
		});

		test('getTotalCartValue räknar med amount för varje produkt', () => {
			const input = { id: 1001, name: "Badboll", price: 25 }

			addToCart(input)
			addToCart(input)

			const expected = 50
			const actual = getTotalCartValue()
			expect(actual).toBe(expected)
		});

	})



	// A1. Om editCart anropas med ett giltigt ID och nytt amount, ska mängden uppdateras
	// A2. editCart ska kasta fel om ID inte finns i kundvagnen
	// A3. editCart ska kasta fel om amount inte är ett giltigt nummer

	describe('editCart', () => {

		test('editCart ändrar mängden av en vara', () => {
			const input = { id: 1005, name: 'Kubb', price: 169 }
			const expected = 3

			addToCart(input)
			const item = getItem(0)

			editCart(item.id, { amount: expected })
			const actual = getItem(0).amount
			expect(actual).toBe(expected)
		});

		test('editCart kastar fel om ID inte finns', () => {

			expect(() => {

			editCart(-1, { amount: 2 })

			}).toThrow("Produkt hittades inte")
  		});

		test('editCart kastar fel om amount är ogiltigt (text)', () => {
			const input = { id: 1008, name: "Simring", price: 90 }

			addToCart(input)
			const item = getItem(0)

			expect(() => {

			editCart(item.id, { amount: "två" })

			}).toThrow("Ogiltigt antal")
  		});

	})


	// A1. Om en produkt tas bort med korrekt ID, ska antalet i kundvagnen minska
	//A2. removeFromCart ska kasta fel om produkten inte finns i kundvagnen
	test('removeFromCart - tar bort rätt vara', () => {
		const input = { id: 1004, name: 'Paddelrack', price: 120 }
		const expected = 0

		addToCart(input)
		const item = getItem(0)
		removeFromCart(item.id)

		const actual = getCartItemCount()
		expect(actual).toBe(expected)
	});

	test('removeFromCart - kastar fel om produkten inte finns', () => {
		expect(() => {

		removeFromCart(-1)
		
		}).toThrow("Produkten finns inte i kundkorgen")
	});


  
	// A1. Om en produkt lagts till, ska getItem returnera ett cartItem med rätt produktinfo
	// A2. getItem ska returnera undefined om index är utanför arrayens längd, tex om cart innehåller 3 objekt och man anropar getItem(5)

	test('getItem - om en produkt lagts till, ska getItem(index) returnera ett cartItem med rätt produktinfo', () => {
		const input = { id: 1003, name: 'Paraply', price: 40 }
		const expected = 'Paraply'

		addToCart(input)
		const actual = getItem(0).item.name
		expect(actual).toBe(expected)
	});

	test('getItem - returnerar undefined om index är utanför arrayen', () => {
		const expected = undefined
		const actual = getItem(0) 

		expect(actual).toBe(expected)
	});

})

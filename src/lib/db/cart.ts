import { prisma } from "./prisma"
import { cookies } from "next/dist/client/components/headers"
import { Prisma } from "@prisma/client"

// database operations used in different places
// these are not server functions, just functions
export type CartWithProducts = Prisma.CartGetPayload<{
	include: { items: { include: { product: true } } }
}>

export type CartItemWithProducts = Prisma.CartItemGetPayload<{
	include : { product: true }
}>

export type ShoppingCart = CartWithProducts & {
	size: number,
	subtotal: number
}

export async function getCart (): Promise<ShoppingCart | null> {
	const localCartId = cookies().get("localCartId")?.value
	const cart = localCartId ?
		await prisma.cart.findUnique({
			where: { id: localCartId },
			include: { items: { include: { product: true } } }
		})
		: null

	if (!cart) {
		return null
	}

	return {
		...cart,
		size: cart.items.reduce((acc, item) => acc + item.quantity, 0),
		subtotal: cart.items.reduce((acc, item) => acc + item.quantity * item.product.price, 0),
	}
}

export async function createCart (): Promise<ShoppingCart> {
	const newCart = await prisma.cart.create({
		data: {}
	})

	// newCart.id must be encrypted
	// the cookies function also ask for other securities
	cookies().set("localCartId", newCart.id)

  return {
    ...newCart,
    items: [],
    size: 0,
    subtotal: 0
  }
}

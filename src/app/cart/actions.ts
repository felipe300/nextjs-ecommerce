"use server"

import { createCart, getCart } from "@/lib/db/cart"
import { prisma } from "@/lib/db/prisma"
import { revalidatePath } from "next/cache"

export default async function setProductQuantity (productId: string, quantity: number) {
  const cart = await getCart() ?? await createCart()
  const articleInCart = cart.items.find(item => item.productId === productId)

  if(quantity === 0) {
    // if set quantity to 0, remove the item form cart
    if (articleInCart) {
      await prisma.cartItem.delete({
        where: {id: articleInCart.id}
      })
    }
  } else {
    // if set to positive, and items is in the cart update quantity
    if (articleInCart){
      await prisma.cartItem.update({
        where: {id: articleInCart.id},
        data : { quantity }
      })
    } else {
      // if item is not in the cart, then create a new cart
      await prisma.cartItem.create({
        data: {
          cartId: cart.id,
          productId,
          quantity
        }
      })
    }
  }


  revalidatePath("/cart")
}

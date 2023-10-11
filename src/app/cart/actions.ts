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
      // if the user is not login & the cart remains after some time
      await prisma.cart.update({
        where: { id: cart.id },
        data: {
          items: {
            delete: { id: articleInCart.id }
          }
        }
      })
    }
  } else {
    // if set to positive, and items is in the cart update quantity
    if (articleInCart){
      await prisma.cart.update({
        where: { id: cart.id },
        data: {
          items: {
            update: {
              where: { id: articleInCart.id },
              data: { quantity }
            }
          }
        }
      })
    } else {
      // if item is not in the cart, then create a new cart
      await prisma.cart.update({
        where: { id: cart.id },
        data: {
          items: {
            create: {
              productId,
              quantity
            }
          }
        }
      })
    }
  }

  revalidatePath("/cart")
}

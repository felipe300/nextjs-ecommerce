"use server"

import { createCart, getCart } from "@/lib/db/cart"
import { prisma } from "@/lib/db/prisma"
import { revalidatePath } from "next/cache"

export async function incrementProductQuantity(productId: string) {
 const cart = await getCart() ?? await createCart()

  const articleInCart = cart.items.find(item => item.productId === productId)

  if(articleInCart) {
    await prisma.cart.update({
      where: { id: cart.id },
      data: {
        items: {
          update: {
            where: { id: articleInCart.id },
            data: { quantity: { increment: 1 }}
          }
        }
      }
    })
  } else {
    await prisma.cart.update({
      where: { id: cart.id },
      data: {
        items: {
          create: {
            productId,
            quantity: 1
          }
        }
      }
    })
  }

  // refresh to see the latest number of items of the cart
  // we cannot do this in a server component
  // instead we will refresh the whole screen fro our file structure
  revalidatePath("/products/[id]")
}

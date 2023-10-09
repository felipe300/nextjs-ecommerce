import { getCart } from "@/lib/db/cart"
import CartEntry from "./CartEntry"
import setProductQuantity from "./actions"
import { formatPrice } from "@/lib/format"

export const metadata = {
  title: "Your Cart - Flowmazon"
}

export default async function CartPage () {
  const cart = await getCart()

  return (
    <section>
      <h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>
      {cart?.items.map((item) => (
        <CartEntry key={item.id} cartItem={item} setProductQuantity={setProductQuantity} />
      ))}
      {!cart?.items.length && <p>your car is empty!</p>}
      <div className="flex flex-col items-end sm:items-center">
        <p className="font-bold mb-3">
          Total: { formatPrice(cart?.subtotal || 0)}
        </p>
        {/* Add paypal or other */}
        <button className="btn btn-primary sm:w-[200px]">Checkout</button>
      </div>
    </section>
  )
}

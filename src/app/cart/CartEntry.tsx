"use client"

import { useTransition } from "react"
import { CartItemWithProducts } from "@/lib/db/cart"
import { formatPrice } from "@/lib/format"
import Image from "next/image"
import Link from "next/link"

type CartItemProps = {
  cartItem: CartItemWithProducts,
  setProductQuantity: (productId: string, quantity: number) => Promise<void>
}

export default function CartEntry ({ cartItem : { product, quantity}, setProductQuantity} : CartItemProps) {
  const [isPending, startTransition] = useTransition()

  const quantityOptions: JSX.Element[] = []
  for (let i = 1; i <= 99; i++){
    quantityOptions.push(
      <option value={i} key={i}>{i}</option>
    )
  }

  return (
    <div>
      <div className="flex flex-wrap items-center gap-3">
        <Image src={product.imageUrl} alt={product.name} width={200} height={200} className="rounded-lg" />
      </div>
      <div>
        <Link href={`/products/${product.id}`} className="font-bold">{product.name}</Link>
        <p className="">{formatPrice(product.price)}</p>
        <div className="flex items-center gap-2 my-1">
          Quantity:
          <select
            className="select select-primary w-full max-w-[80px]"
            defaultValue={quantity}
            onChange={e => {
              const newQuantity = parseInt(e.currentTarget.value)
              startTransition(async () => {
                await setProductQuantity(product.id, newQuantity)
              })
            }}
          >
            <option value={0}>0 (Remove)</option>
            {quantityOptions}
          </select>
        </div>
        <p className="flex items-center gap-3">
          Total: {formatPrice(product.price * quantity)}
          {isPending && <span className="loading loading-spinner loading-md" />}
        </p>
      </div>
      <div className="divider"></div>
    </div>
  )
}

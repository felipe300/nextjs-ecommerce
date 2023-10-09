import { Product } from "@prisma/client"
import Link from 'next/link'
import Image from 'next/image'
import PriceTag from "./PriceTag"

type ProductCardProps = {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const { id, name, description, price, imageUrl, createdAt } = product
  const oneWeek: number = 1000 * 60 * 60 * 24 * 7
  const isNew: boolean = Date.now() - new Date(createdAt).getTime() < oneWeek

  return (
    <Link href={`/products/${id}`} className="card w-full bg-base-200 hover:shadow-xl transition-shadow">
      <figure>
        <Image src={imageUrl} alt={name} width={800} height={400} className="h-48 object-cover" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{name}</h2>
        {isNew && <div className="badge badge-secondary">NEW</div>}
        <p>{description}</p>
        <PriceTag price={price}/>
      </div>
    </Link>
  )
}

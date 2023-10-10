import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/logo.png"
import { redirect } from "next/navigation";
import { getCart } from "@/lib/db/cart";
import ShoppingCartBtn from "./ShoppingCartBtn";
import UserMenuBtn from "./UserMenuBtn";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";

async function searchProducts (formData: FormData) {
"use server"
  const searchQuery = formData.get("searchQuery")?.toString()

  if(searchQuery) {
    redirect(`/search?query=${searchQuery}`)
  }
}

export default async function Navbar() {
  const session = await getServerSession(authOptions)
  const cart = await getCart()

  return (
    <section className="bg-base-200">
      <div className="navbar max-w-7xl m-auto flex-col sm:flex-row gap-2">
        <div className="flex-1">
          <Link href="/" className="btn btn-ghost text-xl normal-case">
            <Image src={logo} alt="Flowmazon logo" width={40} height={40} />
            Flowmazon
          </Link>
        </div>
        <div className="flex-none gap-2">
          <form action={searchProducts}>
            <div className="form-control">
              <input name="searchQuery" className="input input-bordered w-full min-w-[200px]" />
            </div>
          </form>
          <ShoppingCartBtn cart={cart} />
          <UserMenuBtn session={session} />
        </div>
      </div>
    </section>
  )
}

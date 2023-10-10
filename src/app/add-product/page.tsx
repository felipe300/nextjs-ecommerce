import FormSubmitBtn from "@/components/FormSubmitBtn";
import { prisma } from "@/lib/db/prisma"
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

export const metadata = {
  title: "Add Product - Flowmazon"
}

// "addProduct" is a server component, U need to use "action" in form
// the loading in the button is a "use client" component, it needs js
// this may conflict with your knowledge use only one, client or server component
async function addProduct (formData: FormData) {
  "use server";

  const session = await getServerSession(authOptions)

  if(!session) {
    redirect("/api/auth/signin?callbackUrl=/add-produc")
  }

  const name = formData.get("name")?.toString()
  const description = formData.get("description")?.toString()
  const imageUrl = formData.get("imageUrl")?.toString()
  const price = Number(formData.get("price") || 0)

  if(!name || !description || !imageUrl || !price) {
    throw new Error("Missing required fields!")
  }

  await prisma.product.create({
    data: {
      name,
      description,
      imageUrl,
      price
    }
  })

  redirect("/")
}

export default async function AddProductPage() {
  const session = await getServerSession(authOptions)

  if(!session) {
    redirect("/api/auth/signin?callbackUrl=/add-product")
  }
  return (
    <div>
      <h1 className="text-lg mb-3 font-bold">Add product</h1>
      <form action={addProduct}>
        <input type="text" name="name" placeholder="Product name" className="input input-bordered w-full mb-3" required />
        <textarea name="description" placeholder="Description" className="textarea textarea-bordered mb-3 w-full" required></textarea>
        <input type="url" name="imageUrl" placeholder="Image Url" className="input input-bordered w-full mb-3" required />
        <input type="number" name="price" placeholder="Price" className="input input-bordered w-full mb-3" required />
        <FormSubmitBtn className="btn-block">Add Product</FormSubmitBtn>
      </form>
    </div>
  )
}

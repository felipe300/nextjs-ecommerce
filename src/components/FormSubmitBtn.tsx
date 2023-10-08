"use client"

import { ComponentProps } from "react"
import { experimental_useFormStatus as useFormStatus } from "react-dom"

type FormSubmitBtnProps = {
  children: React.ReactNode,
  className?: string,
} & ComponentProps<"button">

export default function FormSubmitBtn ({ children, className, ...props } : FormSubmitBtnProps) {
  const { pending } = useFormStatus()

  return (
    <button {...props} type="submit" disabled={pending} className={`btn btn-primary ${className}`}>
      {pending && <span className="loading loading-spinner text-primary" />}
      {children}
    </button>
  )
}

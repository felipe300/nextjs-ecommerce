export function formatPrice(price: number) {
  // cents to dollar (price / 100)
  // format to US dollar .toLocaleString
  return (price / 100).toLocaleString("en-US", {
    style: "currency",
    currency: "USD"
  })
}

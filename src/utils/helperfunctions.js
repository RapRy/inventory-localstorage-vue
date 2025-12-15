export const formatCurrency = (value) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'PHP' }).format(Number(value || 0))

export const calculatePriceKg = (weightInKg, pricePerKg) => {
  if (weightInKg <= 0 || pricePerKg <= 0) {
    return 0
  }

  return Number((weightInKg * pricePerKg).toFixed(2))
}

export const formatPrice = (price: number): string => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2
    }).format(price)
}

export const formatCompactPrice = (price: number): string => {
    if (price >= 1000000) {
        return `$${(price / 1000000).toFixed(1)}M`
    } else if (price >= 1000) {
        return `$${(price / 1000).toFixed(1)}K`
    }
    return formatPrice(price)
}

export const calculateDiscount = (originalPrice: number | undefined | null, salePrice: number): number => {
    if (!originalPrice || originalPrice <= salePrice) return 0
    return Math.round(((originalPrice - salePrice) / originalPrice) * 100)
}

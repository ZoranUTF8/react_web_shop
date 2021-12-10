//? FORMAT THE PRICE
export const formatPrice = (number) => {
    return new Intl.NumberFormat('bih-BA', {
        style: 'currency',
        currency: "BAM"
    }).format(number / 100);

}

export const getUniqueValues = () => {}
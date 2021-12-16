//? FORMAT THE PRICE
export const formatPrice = (number) => {
  return new Intl.NumberFormat("bih-BA", {
    style: "currency",
    currency: "BAM",
  }).format(number / 100);
};
//? return unique categories for the items
export const getUniqueValues = (data, type) => {
  let unique = data.map((item) => item[type]);

  if (type === "colors") {
    unique = unique.flat();
  }

  return ["all", ...new Set(unique)];
};

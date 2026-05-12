export const cn = (...classes) => classes.filter(Boolean).join(' ');

export const formatPrice = (price) =>
  new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(price);

export const clamp = (val, min, max) => Math.min(Math.max(val, min), max);

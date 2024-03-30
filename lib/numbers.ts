export const defaultCurrency = 'INR';
const defaultLocale = 'en';
const currencyStyle = {
  style: 'currency',
  currency: '',
  minimumFractionDigits: 0,
  maximumFractionDigits: 2,
};

export const getCurrencySymbol = (
  currency: string = defaultCurrency,
  locale: string = defaultLocale,
): String | undefined => {
  try {
    const options: any = { ...currencyStyle, currency };
    return new Intl.NumberFormat(locale, options)?.formatToParts(1)?.find((x) => x.type === 'currency')?.value;
  } catch {
    return '';
  }
};

export const formatNumber = ({
  currency = defaultCurrency,
  locale = defaultLocale,
  value,
}: {
  currency?: string;
  locale?: string;
  value: number;
}): string => {
  try {
    const options: any = { ...currencyStyle, currency };
    return new Intl.NumberFormat(locale, options).format(value);
  } catch {
    return '';
  }
};

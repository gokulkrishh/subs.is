import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getFirstLetters = (name: string) => {
  if (!name.length) return '';

  return name
    ?.split(' ')
    ?.map((word) => word[0])
    ?.slice(0, 2)
    ?.join('');
};

// https://stackoverflow.com/questions/11867545/change-text-color-based-on-brightness-of-the-covered-background-area
export const contrastColor = (c: string) =>
  ['black', 'white'][
    ~~([0.299, 0.587, 0.114].reduce((r, v, i) => parseInt(c.substr(i * 2 + 1, 2), 16) * v + r, 0) < 128)
  ];

//https://stackoverflow.com/questions/5092808/how-do-i-randomly-generate-html-hex-color-codes-using-javascript
export const randomColor = () => {
  return '#000000'.replace(/0/g, function () {
    return (~~(Math.random() * 16)).toString(16);
  });
};

const isProduction = process.env.NODE_ENV === 'production';

const domain = 'subs.is';
const local = 'localhost:3000';
const protocol = isProduction ? 'https://' : 'http://';
const home = `${protocol}${isProduction ? domain : local}`;
const homeWithoutProtocol = `${protocol}${isProduction ? domain : local}`;

export const urls = {
  homeWithoutProtocol,
  authCallback: `${home}/auth/callback/`,
  settings: `${home}/settings`,
  home,
  error: `${home}/error`,
  api: `${home}/api`,
};

export const socialUrls = {
  github: 'https://github.com/gokulkrishh/subs.is',
  help: 'mailto:support@subs.is',
  twitter: 'https://twitter.com/gokul_i',
};

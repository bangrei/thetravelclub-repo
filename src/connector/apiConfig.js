export const MockAPI = {
  url: "localhost:3000",
};

export const EUNOIA_CONFIG = {
  baseUrl: process.env.VUE_APP_EU_BE_API,
  brandCode: process.env.VUE_APP_EU_BE_BRAND_CODE,
  app: process.env.VUE_APP_EU_BE_APP_CODE,
  gateway: process.env.VUE_APP_API_GATEWAY,
};

export const BFM_CONFIG = {
  baseUrl: process.env.VUE_APP_BFM_BE_API,
  accountCode: process.env.VUE_APP_BFM_BE_ACCOUNT_CODE,
  gateway: process.env.VUE_APP_API_GATEWAY,
};

export const CLOUDINARY_CONFIG = {
  baseUrl:
    //"https://res.cloudinary.com/savantdegrees/image/upload/q_auto:good,f_auto,fl_lossy,c_scale/",
    "https://res.eunoia.asia/images/",
};

export const HOST = {
  baseUrl: "https://localhost:8080",
};

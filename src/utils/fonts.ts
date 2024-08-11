import localFont from "next/font/local";

export const hatton = localFont({ 
  src: [
    {
      path: '../../public/fonts/hatton-font-family/PP-Hatton-Ultralight-200.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/hatton-font-family/PP-Hatton-Medium-500.otf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../../public/fonts/hatton-font-family/PP-Hatton-Bold-700.otf',
      weight: '700',
      style: 'normal',
    },
  ], 
  variable: '--font-hatton',
});

export const atten_new = localFont({ 
  src: [
    {
      path: '../../public/fonts/atten-new/AttenNewRegular.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/atten-new/AttenNewMedium.otf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../../public/fonts/atten-new/AttenNewBold.otf',
      weight: '700',
      style: 'normal',
    },
  ], 
  variable: '--font-atten_new',
});

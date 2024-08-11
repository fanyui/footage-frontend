## Getting Started

Steps to start development server:

1. Create a copy of `env.example` and Rename it to `.env`
2. For the `NEXT_PUBLIC_API_URL=http://localhost:8080` You need need to serve the api server locally using ngrok or any other service to simulate a live server, i haven't been able to configure `next-auth` to run with local servers yet.
3. `$ yarn install`
4. `$ yarn dev`

## App structure

This is a Next.js app setup with Typescript, Tailwind CSS.

```bash
root
|_ app (different pages go here)
  |_ home
    |_ page
  |_ Who we Are (...etc)
  |_ layout (root layout) (contains the header, footer, and any other providers or theming configs in the future)
|_ public (contains all public assets)
  |_ fonts
  |_ images
  |_ icons
|_ src
  |_ api (will contains any future api requests we will have)
  |_ components
    |_ ui (here we will have all the relatively small component [building blocks], like buttons, selects, inputs etc)
    |_ footer
    |_ header (and other larger components)
  |_ feature (this folder will contain all the different pages and their various components above in (app) directory we only define the page and SEO configs)
    |_ home
      |_ component (components related to the home page go here like the different sections, hero, about etc)
      |_ home-page-body (the actually component which is imported in the app directory)
    |_ who-we-are
  |_ hooks
  |_ styles (other style configs and utils, ideally we will not add more files here since we are using tailwind css)
    |_ globals.css
  |_ utils (for different things we will use in the app, constants, general functions etc)
```

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

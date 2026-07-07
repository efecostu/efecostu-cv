# efecostu.space

Personal portfolio of Efe Costu — Industrial Engineer & Business Manager.

Live at [efecostu.space](https://efecostu.space), deployed on Vercel.

## Tech Stack

- [Next.js](https://nextjs.org/) - React framework (App Router)
- [React](https://react.dev/) - UI library
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [React Three Fiber](https://docs.pmnd.rs/react-three-fiber) + [Rapier](https://github.com/pmndrs/react-three-rapier) - 3D badge card physics
- [Nodemailer](https://nodemailer.com/) - Contact form email delivery
- [Lucide React](https://lucide.dev/) - Icons

## Getting Started

Install dependencies:

```bash
npm install
```

Create a `.env.local` file in the root directory for the contact form:

```bash
GMAIL_USER=your@gmail.com
GMAIL_APP_PASSWORD=your-gmail-app-password
```

`GMAIL_APP_PASSWORD` is a Gmail [App Password](https://support.google.com/accounts/answer/185833) (requires 2FA on the account). The same two variables must be set in the Vercel project settings for production.

Then run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the site.

## References

- [Vercel badge card guide](https://x.com/0xca0a)

## License

This project is under MIT license

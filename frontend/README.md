This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

Install Bun by running
```bash
curl -fsSL https://bun.sh/install | bash
```

Then install all dependencies by running
```bash
bun install
```

Then, run the development server:

```bash
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Dev Tools
This project uses [shadcn/ui](https://ui.shadcn.com/docs/components/) as its component library. To add new components, just run
```bash
bunx shadcn-ui@latest add <component name>
```

If you're lazy like me, you can alias the "bunx shadcn-ui@latest" to something like "shadcn". To do that, just add 
```bash
alias shadcn="bunx shadcn-ui@latest"
```
to your ~/.bashrc.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!
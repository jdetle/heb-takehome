This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.


Please see instructions for the take home challenge below: 
#### Overview
Before your next technical interview, we would like for you to complete the following
programming assignment.
We will use this exercise to get a sense of your problem solving skills, your decomposition skills,
and the way that you approach refactoring.

Parameters
 Complete the requirement as described below
 Do not spend more than a 3-4 hours on it. (It doesn’t need to be perfect, be ingenious)
 Be prepared to speak about any extra work that you would’ve done if you had more time
at an onsite.
 Your solution will be discussed during the interview.
 Use whatever language and framework you prefer. (We typically use
React/Javascript/Typescript).

#### Problem Description
Provide a basic ATM (Automated Teller Machine) implementation. At a minimum, this program
should offer the following features:
 Enter a PIN to identify a unique customer
 Query and show the current account balance
 Simulate the withdrawal of cash
 Simulate a deposit
 A daily withdrawal limit

#### Submit the following
Provide complete steps to compile and run your project.
The full source of your solution in a Github, Bitbucket or Gitlab repo.
During your technical interview, we will:
    - Ask you to describe your design and implementation decisions.
    - Ask you to talk about testing scenarios and considerations for real-world
deployment.
    - Ask you about the next set of features that you would want to implement or any
improvements on your current implementation.


Please let me know if you have any questions.


### Guidelines to running the app
The UI here obviously needs work, and there is no actual call being made to an API. Form submissions save data to local storage.

(I found this humorous, and accurate, from Github Copilot): 
> "I would have liked to have spent more time on the UI, but I was running out of time. I would have added tests, but I was running out of time.

- Steps to run:
    0. Install and use node 18.15.0, I do this with fnm https://github.com/Schniz/fnm
    1. `git clone https://github.com/jdetle/heb-takehome.git`
    2. `npm i`
    3. `npm run dev`
    4. Navigate to `localhost:3000` in your browser
    5. Create an account
    6. Use account credentials to log in

### Tech used:
- Formik
- mui
- Next.js
- React
- Typescript
- Yup

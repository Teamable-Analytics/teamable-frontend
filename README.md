# Teamable: Frontend

## Getting Started
Prerequisites:
- Node Version Manager (NVM)
  - See [https://github.com/nvm-sh/nvm](https://github.com/nvm-sh/nvm)
- Node.js v20.16.0
- `Note:` Docker is not needed for local development

Installation:
1. Clone this project.
   ```bash
    git clone git@github.com:Teamable-Analytics/teamable-frontend.git
   ```
2. Create local environment file from sample.
   ```bash
   cp sample.env .env
   ```
3. Switch to the correct version of Node.js used in this project.
   ```bash
   nvm use
   ```
4. Start the development server.
   ```bash
   yarn dev
   ```
5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

Project setup:
1. Follow the steps from [Teamable Backend](https://github.com/Teamable-Analytics/teamable-backend) until you have an instructor signup token.
2. Navigate to `http://localhost:3000/accounts/signup?token={{INSTRUCTOR_SIGNUP_TOKEN}}`, replacing `{{INSTRUCTOR_SIGNUP_TOKEN}}` with the token from Step 1.
3. Signup with an email and password.
   - Use a good password, the signup will fail if the password is weak.
4. Once signed up, you will be redirected to the course's onboarding dashboard.

### Useful commands

Loading components from shadcn/ui
_(Run this in root directory, where package.json is)_. Component names can be found [here](https://ui.shadcn.com/docs/components).

```bash
npx shadcn-ui@latest add component-name
```

### Resources

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
- [shadcn/ui](https://ui.shadcn.com) - learn about shadcn/ui.

### Appendix
This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.
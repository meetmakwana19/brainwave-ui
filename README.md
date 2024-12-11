# Brainwave UI

Brainwave UI is a micro-frontend app built for Contentstack. It is a POC for an AI-powered content generator built into Contentstack, allowing you to create high-quality, on-brand content.

## Installation

- Create `.npmrc` file with the github access token of your contentstack github account.
- To install Brainwave UI dependencies :

```bash
npm install --legacy-peer-deps
```

- Create `.env` file by referring to the `example.env` file.
- Start development server :

```bash
npm run dev
```

- To run in the micro-frontend mode, you need to build it first and then host it :

```bash
npm run build
npm run preview
```

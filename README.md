# Frontend Test Project

A modern multilingual web application built with React, TypeScript, and TailwindCSS that supports language switching between English and French.

## Technologies Used

- [React 18](https://reactjs.org/) - UI library
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Vite](https://vitejs.dev/) - Fast build tool and dev server
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [i18next](https://www.i18next.com/) - Internationalization framework (English/French)
- [React Router v6](https://reactrouter.com/) - Routing with language prefixes
- [Framer Motion](https://www.framer.com/motion/) - Animation library

## Node.js Version

This project was developed with **Node.js v18.x**. It's recommended to use the same version for compatibility.

## Project Structure

```
src/
├── api/            # API and mock data
├── assets/         # Static assets (images, fonts, etc.)
├── components/     # Reusable UI components
├── context/        # React context providers
├── hooks/          # Custom React hooks
├── i18n/           # Internationalization setup and translations
├── pages/          # Application pages
├── types/          # TypeScript type definitions
└── utils/          # Utility functions
```

## Development Setup

1. Clone the repository:
```bash
git clone <repository-url>
cd frontend-test
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser to:
```
http://localhost:5173
```

## Build Instructions

To build the project for production:

```bash
npm run build
```

This will create a `dist` folder with the compiled assets.

To preview the production build locally:

```bash
npm run preview
```

## Docker Setup

### Using Docker Compose (Recommended)

The project includes a docker-compose.yml file for easy deployment:

```bash
# Production build
docker-compose up -d

# Development with hot reload
docker-compose --profile dev up
```

The application will be available at http://localhost:8080 (production) or http://localhost:5173 (development).

### Manual Docker Build and Run

```bash
# Build the Docker image
docker build -t frontend-test:latest .

# Run the Docker container
docker run -p 8080:80 frontend-test:latest
```

This will start the application and make it available at http://localhost:8080

## Deployment Instructions

### GitLab/GitHub Integration

1. If not already initialized, set up Git:
```bash
git init
git add .
git commit -m "Initial commit"
```

2. Connect to the remote repository:
```bash
# For GitHub
git remote add origin https://github.com/username/frontend-test.git

# For GitLab
git remote add origin https://gitlab.com/username/frontend-test.git
```

3. Push to the remote repository:
```bash
git push -u origin main
```

### CI/CD Options

#### GitHub Actions (for GitHub)

A GitHub Actions workflow is included in `.github/workflows/deploy.yml` for automated building, testing, and deployment.

#### GitLab CI/CD (for GitLab)

A GitLab CI configuration is included in `.gitlab-ci.yml` for automated building, testing, and deployment.

### Cloud Deployment Options

#### Deploy to AWS:

1. Build the Docker image
2. Push to Amazon ECR
3. Deploy using ECS or EC2

#### Deploy to Azure:

1. Build the Docker image
2. Push to Azure Container Registry
3. Deploy using Azure App Service or AKS

#### Deploy to Google Cloud:

1. Build the Docker image
2. Push to Google Container Registry
3. Deploy using Google Cloud Run or GKE

## Application Features

- Multi-language support (English/French)
- URL language prefixes (/en, /fr)
- Responsive design
- Animated UI components
- API integration for content

## Troubleshooting

- If you encounter build errors, make sure you're using Node.js v18.x
- For TypeScript errors, run `npm run lint` to identify issues
- For Docker issues, check that ports are not already in use

## License

This project is private and confidential. All rights reserved.

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    'react-x': reactX,
    'react-dom': reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs['recommended-typescript'].rules,
    ...reactDom.configs.recommended.rules,
  },
})
```

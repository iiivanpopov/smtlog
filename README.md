# SMTLOG

## TECH STACK

### 🪟 FRONTEND

#### FRAMEWORK: 🔥 [React](https://react.dev/) 19

- [vite](https://vite.dev/) - Bundler
- [@siberiacancode/fetches](https://www.npmjs.com/package/@siberiacancode/fetches) - API client
- [@tanstack/router](https://tanstack.com/router) - Routing
- [@tanstack/query](https://tanstack.com/query) - Server state manager
- [lucide-react](https://lucide.dev/icons/) - Icons
- [react-hook-form](https://react-hook-form.com/) - Form state manager
- [react-intl](https://formatjs.github.io/docs/getting-started/installation/) - Internationalization
- [sonner](https://sonner.emilkowal.ski/) - Toasts
- [zod](https://zod.dev/) - Data validation

### 💻 BACKEND

#### FRAMEWORK: 🔥 [Hono](https://hono.dev/) 4

- [drizzle orm](https://orm.drizzle.team/) - ORM
- [papaparse](https://www.papaparse.com/) - CSV parser
- [pino](https://getpino.io/) - Logger
- [zod](https://zod.dev/) - Data validation

## INSTALLATION

```bash
git clone https://github.com/iiivanpopov/smtlog.git
```

## CONFIGURATION

### STEP 1: ENVIRONMENT

Configure `.env` in the **root** directory following example in the `.env.example` file.

Example configuration:

```dotenv
BACKEND_PORT=5555
FRONTEND_PORT=8080
DB_URL=/app/database.sqlite
ADMIN_CODE=YOURCODE
VITE_API_BASE_URL=http://localhost:${BACKEND_PORT}
```

### STEP 2: DATABASE FILE

Create empty file in the **root** directory named `database.sqlite`

## UPDATING

```bash
cd smtlog # Be sure that you are inside the project directory
git pull
docker compose build
```

## RUNNING

```bash
docker compose up -d # -d === in background
```

## PREVIEW

[Youtube](https://youtu.be/byL1V0zyTjI)

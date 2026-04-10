# SMTLOG

## PREVIEW

[Youtube](https://youtu.be/RfjVFrURyiI)

## ABOUT

SMTLOG is a small internal app I made for my father's work. Instead of writing production records in a notebook, the data is entered into the system and stored in the database.

Each record contains the board name, PCB side, start and end time, `firstMPcb`, `lastMPcb`, `firstPcb`, `lastPcb`, `segmentsCount`, and an optional comment. Based on these values, the app also calculates `donePerShiftMPcb = lastMPcb - firstMPcb + 1` and `donePerShiftPcb = lastPcb - firstPcb + segmentsCount`.

## WHAT PROBLEM IT SOLVES

Before this project, all records were written by hand in a notebook. Because of that, it was harder to track how many boards were produced during a specific time period, check old entries, and keep everything in one place. SMTLOG makes this process digital: records are saved in the database and shown in a table, so they are easier to enter, review, and manage later.

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

## BUILDING

```bash
cd smtlog
docker compose build
```

## RUNNING

```bash
cd smtlog
docker compose up -d # -d === in background
```

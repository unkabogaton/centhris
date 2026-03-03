# Vue 3 + TypeScript + Vite

This template should help get you started developing with Vue 3 and TypeScript in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

Learn more about the recommended Project Setup and IDE Support in the [Vue Docs TypeScript Guide](https://vuejs.org/guide/typescript/overview.html#project-setup).

# CentHRIS Frontend

Vue 3 + Vite + Pinia

---

## 🚀 Tech Stack

- Vue 3 (Composition API)
- Vite
- Pinia (State Management)
- Axios

---

## 📦 Project Setup

### 1️⃣ Clone the repository

```bash
git clone <your-repo-url>
cd <project-folder>
```

---

### 2️⃣ Setup Environment Variables

Copy the example environment file:

```bash
cp .env.example .env
```

Update the values inside `.env` as needed:

```env
VITE_BASE_URL=https://afb5e405-82bc-4d4e-9b0e-0824976afc22.mock.pstmn.io
VITE_MAX_RETRIES=3
VITE_RETRY_DELAY=800
```

---

### 3️⃣ Install Dependencies

```bash
npm install
```

---

### 4️⃣ Run Development Server

```bash
npm run dev
```

App will run at:

    http://localhost:5173

---

## 📁 Project Structure

    src/
     ├── api/                # API layer
     ├── components/         # Reusable UI components
     ├── features/           # Feature-based modules
     ├── stores/             # Pinia stores
     ├── router/             # Routes
     ├── composables/        # Reusable logic
     └── assets/

---

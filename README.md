# Kanban

En enkel Kanban-board där man kan lägga till kort, flytta dem mellan kolumnerna TO DO, WIP och DONE, och söka bland dem. Byggd som slutprojekt i kursen Frontend JavaScript 2.

## Live

- Frontend: https://kanban-drab-three.vercel.app/
- Backend (API): https://kanban-server-fysd.onrender.com/api/tasks

Backenden körs på en gratistjänst som går i vila när ingen använt den en stund. Första laddningen kan därför ta ungefär 30 sekunder.

## Funktioner

- Tre kolumner: TO DO, WIP och DONE
- Lägg till nya kort (hamnar i TO DO)
- Flytta kort genom att klicka på knappen med den status kortet ska flyttas till
- Sök på titel (gäller alla kolumner)
- Visar laddningsstatus och felmeddelanden
- Fungerar på både mobil och dator, och går att använda med tangentbordet

## Teknik

- **Frontend:** React, TypeScript, Vite
- **Backend:** Node.js, Express
- **Tester:** Jest (ts-jest)
- **Driftsättning:** Vercel (frontend), Render (backend)

## Projektstruktur

```
kanban/
├── client/                 React-appen
│   └── src/
│       ├── components/     AddTaskForm, SearchBar, Board, Column, TaskCard
│       ├── constants/      statuses.ts
│       ├── services/       api.ts (anrop till servern)
│       ├── types/          task.ts (TypeScript-interfaces)
│       └── utils/          tasks.ts (hjälpfunktioner) och tester
└── server/                 Express-servern
    ├── index.js
    └── data/tasks.json     datafil
```

## API

| Metod | Adress | Beskrivning |
|---|---|---|
| GET | `/api/tasks` | Hämta alla kort |
| POST | `/api/tasks` | Skapa ett nytt kort (status `todo`) |
| PATCH | `/api/tasks/:id` | Ändra status på ett kort |

## Köra lokalt

Servern (http://localhost:3001):

```
cd server
npm install
npm run dev
```

Frontend (http://localhost:5173), i en annan terminal:

```
cd client
npm install
npm run dev
```

Frontend använder miljövariabeln `VITE_API_URL` för serveradressen. Saknas den används `http://localhost:3001/api`.

## Tester

```
cd client
npm test
```

## Begränsningar

- Korten sparas i en JSON-fil på servern. På Render kan filen nollställas när servern startar om. I en riktig app skulle jag använda en databas.
- Det finns ingen inloggning och ingen funktion för att ta bort kort.

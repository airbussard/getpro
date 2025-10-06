# EmergencyPro - Projektmanagement System

## Projekt-Übersicht

Erstelle eine moderne Next.js-basierte Projektmanagement-Webanwendung namens **EmergencyPro** für getemergence.com. Das System soll schlanke, aber leistungsstarke Funktionen für Einzelpersonen und kleine Teams bieten.

### Repository & Deployment
- **GitHub Repository:** https://github.com/airbussard/getpro.git
- **Deployment:** Caprover Server (automatisches Build nach Git Push)
- **Workflow:** Lokal entwickeln → Git Commit → Push to GitHub → Caprover baut automatisch

### Git-Workflow für dieses Projekt
```bash
# Initial Setup (falls noch nicht geklont)
git clone https://github.com/airbussard/getpro.git
cd getpro

# Während der Entwicklung
git add .
git commit -m "Beschreibung der Änderungen"
git push origin main

# WICHTIG: Nach jedem Push MUSS der Caprover Build getriggert werden!
curl -X POST "https://captain.immogear.de/api/v2/user/apps/webhooks/triggerbuild?namespace=captain&token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InRva2VuVmVyc2lvbiI6ImMwMzVlZmJmLTBmNDYtNGUzYS1hZTliLTQ2MDJiZWM4ZjJkYiIsImFwcE5hbWUiOiJnZXRlbWVyZ2VuY2Vwcm8iLCJuYW1lc3BhY2UiOiJjYXB0YWluIn0sImlhdCI6MTc1OTY4NDkxM30.cGeLL2oCBL62StXHtAfSASEuOODX3nCVYz03RtNghu4"
```

### Branch-Strategie
- **main:** Produktions-Code (wird auf Caprover deployed)
- **develop:** Entwicklungs-Branch (optional)
- Feature-Branches: `feature/feature-name` (optional)

## Tech-Stack

### Phase 1 (Dummy UI - JETZT)
- **Frontend:** Next.js 14+ (App Router), React, TypeScript
- **Styling:** Tailwind CSS
- **State Management:** React Context API oder Zustand
- **Icons:** Lucide React
- **Charts:** Recharts (für Budget-Reports)
- **Drag & Drop:** @dnd-kit/core
- **Date Handling:** date-fns
- **Forms:** React Hook Form + Zod
- **KEINE Backend-Integration in Phase 1!**

### Phase 3 (Backend Integration - SPÄTER)
- **Backend/Database:** Supabase (PostgreSQL)
- **Auth:** Supabase Auth
- **Storage:** Supabase Storage
- **Realtime:** Supabase Realtime
- **Deployment:** Caprover-ready (Docker)

### Design-Vorgaben
Orientiere dich am Design von getemergence.com (oscarknabe.de):
- Modern, clean, professionell
- Dunkle Farbpalette mit Gradient-Akzenten
- Card-basiertes Layout mit viel Whitespace
- Minimalistisch und premium
- Responsive Design (Mobile-First)
- Dark Mode als Standard (Light Mode optional)

---

## Core Features

### 1. Authentifizierung & User Management

#### Supabase Auth Integration
- E-Mail/Password Login & Registrierung
- Password Reset Flow
- E-Mail Verifizierung
- Session Management

#### Rollen-System (Pro Projekt)
- **Owner:** Volle Kontrolle über Projekt
- **Admin:** Kann alles außer Projekt löschen
- **Member:** Kann Tasks erstellen/bearbeiten
- **Viewer:** Nur Lese-Zugriff

#### Super Admin Interface
- Globale User-Verwaltung (nur für Super Admins)
- User sperren/entsperren
- User löschen (mit Bestätigung)
- Alle Projekte im System sehen
- System-Statistiken (Anzahl User, Projekte, Tasks)
- Zugriff über `/admin` Route (geschützt)

### 2. Projekt-Management

#### Projekt-Funktionen
- Projekte erstellen, bearbeiten, archivieren, löschen
- Projekt-Dashboard mit Übersicht (aktive Tasks, Budget, Team)
- Projekt-Farbe/Icon zur Identifikation

#### Team-Management
- Team-Mitglieder per E-Mail einladen (Link-basiert)
- Rollen zuweisen/ändern (Owner/Admin Berechtigung)
- Mitglieder entfernen
- Einladungen verwalten (Pending, Akzeptiert, Abgelehnt)

#### Projekt-Einstellungen (Modulare Features)
Jedes Feature kann pro Projekt aktiviert/deaktiviert werden:
- ✅ Zeiterfassung & Budget
- ✅ Datei-Uploads
- ✅ Kommentare
- ✅ Kalender-Ansicht
- ✅ Labels/Tags
- ✅ E-Mail-Benachrichtigungen

### 3. Task-Management

#### Task-Eigenschaften
- Titel (required)
- Beschreibung (Markdown Support)
- Status: To Do, In Progress, Done (Custom Stati pro Projekt optional)
- Priorität: Low, Medium, High, Critical
- Zuständigkeit (ein oder mehrere User)
- Deadline (Datum + optional Zeit)
- Schätzung (geplante Stunden)
- Labels/Tags (farbig, filterbar)
- Parent-Task (Subtasks möglich)
- Datei-Anhänge (wenn Modul aktiv)

#### Ansichten
1. **Kanban-Board**
   - Spalten nach Status
   - Drag & Drop zwischen Spalten
   - Echtzeit-Synchronisation
   - Inline-Editing (Titel, Zuständigkeit)
   
2. **Listen-Ansicht**
   - Tabellen-Format
   - Sortierbar nach allen Eigenschaften
   - Bulk-Aktionen (mehrere Tasks auswählen)
   - Inline-Editing

3. **Kalender-Ansicht** (wenn aktiviert)
   - Monats-/Wochen-/Tages-Ansicht
   - Tasks nach Deadline
   - Drag & Drop zum Verschieben

4. **Timeline/Gantt** (optional für späteren Ausbau)

#### Task-Details Modal
- Vollständige Task-Informationen
- Aktivitäts-Feed (Änderungshistorie)
- Kommentare (wenn aktiviert)
- Zeiterfassung (wenn aktiviert)
- Datei-Anhänge

### 4. Zeiterfassung & Budget

#### Zeiterfassung (wenn Modul aktiv)
- **Timer:** Start/Stop für aktiven Task
- **Manuelle Einträge:** Zeit nachträglich erfassen
- Zeit-Einträge pro Task und User
- Notizen zu Zeiteinträgen
- Bearbeiten/Löschen eigener Einträge (Admin kann alle)

#### Budget-Management
- **Stundensätze:**
  - Projekt-Standard-Stundensatz
  - User-spezifische Stundensätze (optional)
  
- **Budget-Tracking:**
  - Geplantes Gesamt-Budget (Stunden + €)
  - Verbrauchtes Budget (automatisch aus Zeiterfassung)
  - Fortschrittsbalken (% verbraucht)
  - Warnungen bei Budget-Überschreitung
  
- **Berichte:**
  - Zeit pro User
  - Zeit pro Task
  - Kosten-Übersicht
  - Exportierbar als CSV

- **Währung:** 
  - Einstellbar pro Projekt (EUR als Default)

### 5. Suche, Filter & Sortierung

#### Globale Suche
- Volltextsuche über Tasks (Titel, Beschreibung)
- Suche über alle Projekte oder projekt-spezifisch
- Keyboard Shortcut (CMD+K / CTRL+K)

#### Filter
- Status (Multi-Select)
- Priorität (Multi-Select)
- Zuständigkeit (Multi-Select)
- Labels (Multi-Select)
- Deadline (Überfällig, Heute, Diese Woche, etc.)
- Projekt (wenn global)

#### Sortierung
- Priorität
- Deadline
- Erstellt-Datum
- Aktualisiert-Datum
- Alphabetisch

### 6. Benachrichtigungen

#### E-Mail Benachrichtigungen (wenn aktiviert)
- Task zugewiesen
- Task-Status geändert
- Neuer Kommentar
- Deadline naht (24h vorher)
- Erwähnung in Kommentar (@mention)

#### User-Einstellungen
- Benachrichtigungen pro Typ aktivieren/deaktivieren
- Benachrichtigungs-Frequenz (Sofort, Täglich Digest, Wöchentlich)

#### In-App Benachrichtigungen
- Benachrichtigungszentrale (Bell-Icon)
- Ungelesen-Counter
- Mark as read/unread
- Link zum relevanten Task

### 7. Datei-Management

#### Datei-Uploads (wenn Modul aktiv)
- Upload zu Tasks (Drag & Drop)
- Supabase Storage Integration
- Erlaubte Dateitypen: Bilder, PDFs, Office-Dokumente
- Max. Größe: 10MB pro Datei
- Thumbnail-Preview für Bilder
- Download-Funktion
- Nur Owner/Admin/Member können hochladen
- Viewer können nur ansehen/downloaden

---

## 🎯 PHASE 1 - DUMMY UI PROMPT (START HIER!)

**Erstelle ein vollständig funktionales Frontend für EmergencyPro mit Mock-Daten.**

### Wichtig: Git-Integration
- Committe regelmäßig mit aussagekräftigen Commit-Messages
- Beispiel Commits:
  - `feat: Add kanban board with drag & drop`
  - `feat: Implement task creation modal`
  - `ui: Add dark mode toggle`
  - `fix: Correct mobile responsive issues`
- Nach jedem größeren Feature pushen
- Caprover baut automatisch nach jedem Push

### Dein Auftrag für Phase 1:

1. **Setup:**
   - Next.js 14+ mit App Router
   - TypeScript (strict mode)
   - Tailwind CSS
   - Installiere: lucide-react, @dnd-kit/core, recharts, date-fns, react-hook-form, zod, zustand

2. **Mock-Daten erstellen:**
   - Erstelle realistische Beispiel-Daten in `/src/lib/mock-data/`
   - Mindestens 4 Projekte mit unterschiedlichen Stati
   - 15-20 Tasks mit verschiedenen Prioritäten, Stati, Zuweisungen
   - 3-4 Benutzer-Profile
   - Zeit-Einträge für Budget-Berechnungen
   - Kommentare und Aktivitäts-Log

3. **State Management:**
   - Verwende Zustand oder React Context
   - Implementiere alle CRUD-Funktionen (funktioniert nur im Browser-State)
   - Optional: LocalStorage für Persistenz zwischen Reloads

4. **Alle Screens implementieren:**
   - ✅ Landing Page (nicht eingeloggt)
   - ✅ Login/Register Screens (nur UI)
   - ✅ Dashboard (Projekt-Übersicht)
   - ✅ Kanban-Board (mit Drag & Drop!)
   - ✅ Listen-Ansicht (sortierbar, filterbar)
   - ✅ Kalender-Ansicht
   - ✅ Task-Details Modal
   - ✅ Zeiterfassung Interface (mit Timer!)
   - ✅ Budget-Reports (mit Charts)
   - ✅ Projekt-Einstellungen
   - ✅ Team-Management
   - ✅ User-Profil
   - ✅ Benachrichtigungszentrale
   - ✅ Super Admin Interface
   - ✅ Globale Suche (CMD+K)

5. **Wichtige UI-Features:**
   - Dark Mode (Standard) + Light Mode Toggle
   - Responsive Design (Mobile-optimiert)
   - Toast-Notifications für Aktionen
   - Loading Skeletons
   - Empty States
   - Smooth Transitions
   - Keyboard Shortcuts (CMD+K, ESC, etc.)

6. **Funktionalität (alles lokal!):**
   - Tasks erstellen, bearbeiten, löschen, verschieben
   - Kanban: Drag & Drop zwischen Spalten
   - Filter & Suche funktionieren
   - Timer starten/stoppen (mit setInterval)
   - Budget wird berechnet aus Zeit-Einträgen
   - Kommentare hinzufügen/löschen
   - Projekt-Module aktivieren/deaktivieren
   - Rollen-basierte UI (Member sieht weniger als Admin)

7. **Code-Qualität:**
   - Komponenten gut strukturieren
   - Reusable Components (Button, Input, Modal, etc.)
   - TypeScript Interfaces für alle Daten-Typen
   - Kommentare für komplexe Logik
   - Clean Code Principles

8. **KEINE Backend-Integration:**
   - Keine Supabase
   - Keine Datenbank
   - Keine echte Authentifizierung
   - Keine API-Calls
   - Alles läuft im Browser!

### Beispiel Mock-User für "Login":
```typescript
const mockUsers = [
  { 
    id: '1', 
    email: 'admin@getemergence.com', 
    name: 'Max Admin',
    role: 'super_admin',
    avatar: '/avatars/admin.jpg'
  },
  { 
    id: '2', 
    email: 'user@example.com', 
    name: 'Lisa Member',
    role: 'member',
    avatar: '/avatars/user.jpg'
  }
]
// Login simulieren: User aus Array auswählen basierend auf E-Mail
```

### Testing-Checkliste für Phase 1:
- [ ] Alle Screens sind erreichbar
- [ ] Tasks können erstellt/bearbeitet/gelöscht werden
- [ ] Drag & Drop funktioniert im Kanban
- [ ] Filter & Suche funktionieren
- [ ] Timer läuft und speichert Zeit
- [ ] Budget wird korrekt berechnet
- [ ] Projekt-Einstellungen werden gespeichert (State/LocalStorage)
- [ ] Mobile-Ansicht funktioniert
- [ ] Dark/Light Mode Toggle funktioniert
- [ ] Keyboard Shortcuts funktionieren
- [ ] Design entspricht getemergence.com Vorgaben

---

**Starte jetzt mit Phase 1! Wenn das UI steht, machen wir gemeinsam Phase 2 & 3.**

### Tabellen

```sql
-- Users (erweitert Supabase Auth)
profiles (
  id UUID PRIMARY KEY REFERENCES auth.users,
  email TEXT,
  full_name TEXT,
  avatar_url TEXT,
  is_super_admin BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ
)

-- Projects
projects (
  id UUID PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  color TEXT,
  icon TEXT,
  owner_id UUID REFERENCES profiles,
  settings JSONB, -- Enthält aktivierte Module
  archived BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ
)

-- Project Members
project_members (
  id UUID PRIMARY KEY,
  project_id UUID REFERENCES projects ON DELETE CASCADE,
  user_id UUID REFERENCES profiles ON DELETE CASCADE,
  role TEXT, -- owner, admin, member, viewer
  invited_by UUID REFERENCES profiles,
  created_at TIMESTAMPTZ,
  UNIQUE(project_id, user_id)
)

-- Project Invitations
project_invitations (
  id UUID PRIMARY KEY,
  project_id UUID REFERENCES projects ON DELETE CASCADE,
  email TEXT NOT NULL,
  role TEXT,
  token TEXT UNIQUE,
  invited_by UUID REFERENCES profiles,
  status TEXT, -- pending, accepted, declined
  expires_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ
)

-- Tasks
tasks (
  id UUID PRIMARY KEY,
  project_id UUID REFERENCES projects ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  status TEXT NOT NULL,
  priority TEXT,
  parent_task_id UUID REFERENCES tasks,
  estimated_hours DECIMAL,
  deadline TIMESTAMPTZ,
  created_by UUID REFERENCES profiles,
  created_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ
)

-- Task Assignees
task_assignees (
  task_id UUID REFERENCES tasks ON DELETE CASCADE,
  user_id UUID REFERENCES profiles ON DELETE CASCADE,
  assigned_at TIMESTAMPTZ,
  PRIMARY KEY (task_id, user_id)
)

-- Task Labels
labels (
  id UUID PRIMARY KEY,
  project_id UUID REFERENCES projects ON DELETE CASCADE,
  name TEXT NOT NULL,
  color TEXT,
  created_at TIMESTAMPTZ
)

task_labels (
  task_id UUID REFERENCES tasks ON DELETE CASCADE,
  label_id UUID REFERENCES labels ON DELETE CASCADE,
  PRIMARY KEY (task_id, label_id)
)

-- Comments
comments (
  id UUID PRIMARY KEY,
  task_id UUID REFERENCES tasks ON DELETE CASCADE,
  user_id UUID REFERENCES profiles,
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ
)

-- Time Entries
time_entries (
  id UUID PRIMARY KEY,
  task_id UUID REFERENCES tasks ON DELETE CASCADE,
  user_id UUID REFERENCES profiles,
  hours DECIMAL NOT NULL,
  description TEXT,
  date DATE NOT NULL,
  created_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ
)

-- Activity Log
activity_log (
  id UUID PRIMARY KEY,
  project_id UUID REFERENCES projects ON DELETE CASCADE,
  task_id UUID REFERENCES tasks ON DELETE CASCADE,
  user_id UUID REFERENCES profiles,
  action TEXT NOT NULL,
  metadata JSONB,
  created_at TIMESTAMPTZ
)

-- Notifications
notifications (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES profiles ON DELETE CASCADE,
  type TEXT NOT NULL,
  title TEXT,
  message TEXT,
  link TEXT,
  read BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ
)
```

### Row Level Security (RLS)

Implementiere RLS Policies für:
- Users können nur ihre eigenen Daten sehen
- Project Members können nur Daten ihrer Projekte sehen
- Rollen-basierte Permissions (Owner > Admin > Member > Viewer)
- Super Admins können alles sehen

---

## Routing-Struktur

```
/                           → Landing Page (wenn nicht eingeloggt) oder Dashboard
/login                      → Login
/register                   → Registrierung
/reset-password            → Password Reset

/dashboard                 → Übersicht aller Projekte
/projects/[id]             → Projekt-Dashboard
/projects/[id]/board       → Kanban-Board
/projects/[id]/list        → Listen-Ansicht
/projects/[id]/calendar    → Kalender-Ansicht
/projects/[id]/timeline    → Timeline (optional)
/projects/[id]/reports     → Zeit & Budget Reports
/projects/[id]/settings    → Projekt-Einstellungen

/tasks/[id]                → Task-Details (Modal oder Seite)

/profile                   → User-Profil & Einstellungen
/profile/notifications     → Benachrichtigungs-Einstellungen

/admin                     → Super Admin Interface
/admin/users               → User-Verwaltung
/admin/projects            → Alle Projekte
/admin/stats               → System-Statistiken

/invite/[token]            → Projekt-Einladung akzeptieren
```

---

## Wichtige Funktionalitäten

### Echtzeit-Synchronisation (Supabase Realtime)
- Task-Änderungen (Status, Titel, Zuständigkeit)
- Board-Updates (Drag & Drop)
- Neue Kommentare
- Online-Status von Team-Mitgliedern (optional)

### Keyboard Shortcuts
- `CMD/CTRL + K` → Globale Suche
- `C` → Task erstellen (wenn auf Board/Liste)
- `ESC` → Modal schließen
- `/` → Focus auf Suche
- Pfeil-Tasten → Navigation in Listen

### Error Handling
- Toast-Notifications für Erfolg/Fehler
- Graceful Offline-Handling
- Optimistic UI Updates mit Rollback bei Fehler

### Performance
- Task-Listen virtualisieren bei >100 Tasks
- Lazy Loading für Task-Details
- Image Optimization (next/image)
- Caching-Strategie

### Security
- RLS auf allen Tabellen
- Input-Validierung (Zod Schemas)
- XSS-Protection
- CSRF-Protection
- Rate Limiting (Supabase Functions)

---

## Deployment (Caprover) - FÜR PHASE 3

**WICHTIG: Ignoriere diesen Abschnitt in Phase 1! Nur als Referenz für später.**

### Caprover Auto-Deploy Setup

Caprover baut automatisch nach jedem Git Push. Stelle sicher, dass folgende Dateien vorhanden sind:

#### Dockerfile (für Production Build)
```dockerfile
FROM node:20-alpine AS base

# Dependencies
FROM base AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

# Builder
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Build with environment variables
ENV NEXT_TELEMETRY_DISABLED 1
RUN npm run build

# Runner
FROM base AS runner
WORKDIR /app
ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000
ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

CMD ["node", "server.js"]
```

#### next.config.js (für standalone output)
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  // Weitere Config...
}

module.exports = nextConfig
```

#### captain-definition (Caprover Config)
```json
{
  "schemaVersion": 2,
  "dockerfilePath": "./Dockerfile"
}
```

#### .env.example (für Dokumentation)
```env
# Phase 3 - Supabase Config
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# App Config
NEXT_PUBLIC_APP_URL=https://getpro.yourdomain.com
NEXT_PUBLIC_APP_NAME=EmergencyPro
```

#### .gitignore
```
# Dependencies
/node_modules
/.pnp
.pnp.js

# Testing
/coverage

# Next.js
/.next/
/out/

# Production
/build

# Environment Variables
.env*.local
.env

# Debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Local
.DS_Store
*.pem

# Vercel
.vercel

# TypeScript
*.tsbuildinfo
next-env.d.ts
```

### Caprover Environment Variables
Im Caprover Dashboard unter App Settings → Environment Variables:
- Phase 1: Keine Env-Variables nötig
- Phase 3: Supabase URLs und Keys hinzufügen

---

## ⚠️ WICHTIG: 3-Phasen Entwicklung

### Phase 1 - DUMMY UI (Static Frontend)
**Ziel:** Vollständiges, funktionales UI mit Mock-Daten - KEINE Supabase Integration!

**Daten-Handling:**
- Verwende React Context oder Zustand für State Management
- Mock-Daten in JSON-Dateien oder in-memory
- LocalStorage für Persistenz (optional)
- Alle CRUD-Operationen funktionieren mit lokalem State

**Features komplett umsetzen:**
1. ✅ Auth-Screens (Login, Register, Password Reset) - nur UI, kein echtes Auth
2. ✅ Dashboard mit Mock-Projekten
3. ✅ Projekt erstellen/bearbeiten/löschen (lokaler State)
4. ✅ Team-Management UI (Einladungen, Rollen)
5. ✅ Task-Management komplett
   - Kanban-Board mit Drag & Drop
   - Listen-Ansicht mit Sortierung/Filter
   - Task erstellen/bearbeiten/löschen
   - Task-Details Modal
6. ✅ Zeiterfassung UI (Timer, manuelle Einträge)
7. ✅ Budget-Tracking UI (Berechnungen mit Mock-Daten)
8. ✅ Kalender-Ansicht
9. ✅ Kommentare
10. ✅ Datei-Upload UI (ohne echtes Upload)
11. ✅ Benachrichtigungszentrale
12. ✅ Super Admin Interface
13. ✅ Alle Settings-Screens
14. ✅ Suche & Filter (funktional mit lokalen Daten)
15. ✅ Reports & Charts

**Mock-Daten Struktur:**
Erstelle realistische Mock-Daten für:
- 3-5 Beispiel-Projekte
- 10-20 Tasks pro Projekt
- 3-4 Team-Mitglieder
- Zeit-Einträge
- Kommentare
- Benachrichtigungen

**Code-Struktur:**
```
/src
  /components        → UI Components
  /app              → Next.js App Router
  /lib
    /mock-data      → JSON Mock-Daten
    /context        → React Context für State
    /hooks          → Custom Hooks
  /types            → TypeScript Interfaces
```

### Phase 2 - UI Refinement & Testing
**Ziel:** Das Dummy-UI perfektionieren basierend auf deinem Feedback

- UI/UX Verbesserungen
- Responsive Design testen
- Performance-Optimierung
- Edge Cases abdecken
- Loading States
- Error States
- Empty States
- Transitions & Animations
- Keyboard Navigation

**Erst wenn das UI zu 100% steht, geht es weiter!**

### Phase 3 - Supabase Integration (Backend)
**Ziel:** Mock-Daten durch echte Datenbank ersetzen

1. ✅ Supabase Setup & Konfiguration
2. ✅ Datenbank-Schema erstellen (SQL Migrations)
3. ✅ RLS Policies implementieren
4. ✅ Supabase Auth integrieren
5. ✅ React Context durch Supabase Queries ersetzen
6. ✅ Realtime-Subscriptions
7. ✅ File Storage Integration
8. ✅ E-Mail Benachrichtigungen (Supabase Functions)
9. ✅ Testing & Bugfixing
10. ✅ Deployment auf Caprover

---

## Zusätzliche Hinweise

- **Code-Qualität:** TypeScript strict mode, ESLint, Prettier
- **Testing:** Unit Tests für kritische Funktionen (optional)
- **Documentation:** README mit Setup-Anleitung
- **Accessibility:** WCAG 2.1 AA konform
- **Internationalization:** Vorbereitung für i18n (German/English)

---

## Erfolgs-Kriterien

### Phase 1 (Dummy UI):
✅ Alle Screens vollständig implementiert
✅ Intuitive, moderne UI basierend auf getemergence.com Design (aktuell noch oscarknabe.de)
✅ Alle Funktionen arbeiten mit lokalem State
✅ Drag & Drop funktioniert flüssig
✅ Mobile-responsive
✅ Dark/Light Mode
✅ Realistische Mock-Daten
✅ Sauberer, gut strukturierter Code

### Phase 3 (Backend Integration):
✅ Supabase vollständig integriert
✅ Echte Auth & Permissions
✅ Stabile Echtzeit-Synchronisation
✅ Erfolgreicher Caprover Deployment
✅ Schnelle Performance (<3s Ladezeit)

---

**🚀 Beginne jetzt mit Phase 1 - Dummy UI! Erstelle ein beeindruckendes, voll funktionales Frontend.**
# Nexum Channel - Piattaforma Streaming Web

Sito web per Nexum Channel - TV Digitale Terrestre (Canale 403) con piattaforma streaming integrata.

## Caratteristiche

- **Video Player HLS/DASH**: Supporto completo per streaming live con tecnologie HLS
- **Multi-canale**: 4+ canali tematici integrati
  - Prime Event (Grandi Spettacoli)
  - XCapital (Finanza e Mercati)
  - Italian Horse TV (Passione Ippica)
  - Salute 24 (Benessere Oggi)
- **Design Moderno**: UI con glassmorphism e dark theme
- **Responsive**: Ottimizzato per desktop, tablet e mobile
- **Performance**: Costruito con Next.js 16 e React 19

## Tecnologie Utilizzate

- **Framework**: Next.js 16 con App Router
- **Linguaggio**: TypeScript
- **Styling**: Tailwind CSS
- **Video Player**: HLS.js per streaming
- **Icons**: Lucide React
- **Hosting**: Vercel (consigliato) o qualsiasi host Node.js

## Installazione e Avvio

1. Assicurati di avere Node.js installato (versione 18 o superiore)

2. Installa le dipendenze:
```bash
npm install
```

3. Avvia il server di sviluppo:
```bash
npm run dev
```

4. Apri il browser su [http://localhost:3000](http://localhost:3000)

## Configurazione Stream

Per configurare gli URL degli stream video, modifica il file `app/page.tsx`:

```typescript
const channels: Channel[] = [
  {
    id: 'prime-event',
    name: 'Prime Event',
    description: 'Grandi Spettacoli',
    isLive: true,
    isPremium: true,
    streamUrl: 'https://your-stream-url.m3u8', // <-- Aggiungi qui il tuo URL HLS
  },
  // ... altri canali
];
```

### Formati supportati:
- HLS (`.m3u8`)
- DASH (con configurazione aggiuntiva)

### Esempio URL:
```
https://example.com/live/stream/index.m3u8
```

## Build per Produzione

1. Crea la build di produzione:
```bash
npm run build
```

2. Avvia il server di produzione:
```bash
npm start
```

## Deploy su Vercel

1. Installa Vercel CLI:
```bash
npm i -g vercel
```

2. Deploy:
```bash
vercel
```

Oppure collega il repository GitHub/GitLab a Vercel per deploy automatici.

## Struttura del Progetto

```
nexum-channel-web/
├── app/
│   ├── layout.tsx          # Layout principale
│   ├── page.tsx             # Home page con dashboard
│   └── globals.css          # Stili globali
├── components/
│   ├── Header.tsx           # Header con navigazione
│   ├── VideoPlayer.tsx      # Player video con HLS
│   └── ChannelSidebar.tsx   # Sidebar canali
└── public/                  # Assets statici
```

## Personalizzazione

### Aggiungere un nuovo canale:

1. Apri `app/page.tsx`
2. Aggiungi un nuovo oggetto all'array `channels`:

```typescript
{
  id: 'nuovo-canale',
  name: 'Nome Canale',
  description: 'Descrizione breve',
  isLive: true,
  streamUrl: 'https://url-stream.m3u8',
}
```

3. Aggiungi l'icona corrispondente in `components/ChannelSidebar.tsx`:

```typescript
const channelIcons: Record<string, React.ReactNode> = {
  // ... icone esistenti
  'nuovo-canale': <YourIcon className="w-6 h-6" />,
};
```

### Modificare i colori:

Modifica le variabili CSS in `app/globals.css`:

```css
:root {
  --primary-blue: #3b82f6;  /* Blu principale */
  --glass-bg: rgba(255, 255, 255, 0.05);  /* Background vetro */
  --glass-border: rgba(255, 255, 255, 0.1);  /* Bordo vetro */
}
```

### Modificare il gradiente di sfondo:

In `app/globals.css`, modifica:

```css
body {
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
}
```

## Funzionalità Future (Roadmap)

- [ ] Sistema di autenticazione utenti
- [ ] EPG (Electronic Program Guide)
- [ ] Video on Demand (VOD)
- [ ] Chat live durante gli eventi
- [ ] Sistema di notifiche push
- [ ] App mobile (React Native)
- [ ] Statistiche di visualizzazione
- [ ] Sistema di abbonamenti premium

## Supporto Browser

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Opera 76+

## Performance

Il sito è ottimizzato per:
- First Contentful Paint < 1.5s
- Time to Interactive < 3.5s
- Lighthouse Score > 90

## Licenza

Copyright © 2025 Nexum Channel. Tutti i diritti riservati.

## Contatti

Per supporto tecnico o domande:
- Sito: https://nexumchannel.it
- Canale TV: 403 (Digitale Terrestre)

---

Sviluppato con Next.js e React

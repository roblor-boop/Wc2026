# ⚽ WC 2026 Sweepstake

Office sweepstake for the FIFA World Cup 2026 (11 June – 19 July).  
48 teams, 12 groups, full knockout bracket, live standings, auto-results.

---

## 🔗 Live app

**[Open the sweepstake →](https://roblor-boop.github.io/wc2026/)**

Works on any phone or browser. No app store, no login, no subscription.  
On iPhone tap Share → Add to Home Screen. On Android tap ⋮ → Install app.

---

## ✨ Features

- 🎲 **Cryptographic draw** — dramatic reveal ceremony, each player gets their teams
- ⚽ **All 104 fixtures** — group stage and full knockout bracket with BST times
- 📺 **UK TV channels** — BBC/ITV badge on every match card
- 📊 **Live standings** — points update the moment a result is saved
- 🏆 **Automatic bracket** — knockout teams populate from group results
- ⚡ **Auto-results** — polls football-data.org every 3 minutes (admin mode)
- 💬 **Teams notifications** — posts result cards to a channel automatically
- 📱 **Installable PWA** — works offline, sits on your home screen
- 🔒 **Read-only by default** — nobody can touch the data without the admin PIN

---

## 📺 Broadcast rights

All 104 matches are free-to-air in the UK, split between **BBC** and **ITV**.  
No subscription required — available on BBC iPlayer and ITVX.

---

## 🔑 Admin access

The app is read-only for everyone by default.

To enter admin mode (enter/import results, run the draw):
- **Tap the ⚽ icon 7 times** in quick succession, or
- Add `?admin` to the URL: `https://roblor-boop.github.io/wc2026/?admin`

You'll be prompted for the admin PIN. Session clears when you close the tab.

---

## 🏗️ Built with

- Vanilla HTML/CSS/JavaScript — no framework, no build step
- [Firebase Realtime Database](https://firebase.google.com) — live sync across all devices
- [football-data.org](https://www.football-data.org) — free API for auto-results
- GitHub Pages — free hosting

---

## 📁 Files

| File | Purpose |
|---|---|
| `index.html` | The entire app |
| `manifest.json` | PWA manifest (home screen install) |
| `sw.js` | Service worker (offline support) |
| `icon.svg` | App icon |
| `README.md` | This file |

---

*Carlyle · London · 2026*

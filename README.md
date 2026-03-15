# ⬡ CyberNexus — Cybersecurity Command Center

A modular, client-side cybersecurity dashboard built with React. Covers 12 security domains — from cryptography to OSINT — all in one unified interface.

![CyberNexus Dashboard](https://img.shields.io/badge/status-active-00ff9f?style=flat-square&labelColor=030b14)
![React](https://img.shields.io/badge/React-18-61dafb?style=flat-square&logo=react&labelColor=030b14)
![Vite](https://img.shields.io/badge/Vite-5-646cff?style=flat-square&logo=vite&labelColor=030b14)
![License](https://img.shields.io/badge/license-MIT-a78bfa?style=flat-square&labelColor=030b14)

---

## 🚀 Quick Start

```bash
# 1. Clone the repo
git clone https://github.com/Kodjocares/cybernexus.git
cd cybernexus

# 2. Install dependencies
npm install

# 3. Start dev server
npm run dev

# 4. Open http://localhost:5173
```

---

## 🧩 Modules

| Module | Category | Description |
|---|---|---|
| ⬡ Command Center | Core | Live dashboard with stats, CVE feed & log alerts |
| 🔐 Password Vault | Beginner | Credential storage with strength checker & generator |
| 📡 Port Scanner | Network | TCP SYN scan simulation with risk ratings |
| 🔎 File Integrity | Beginner | SHA-256 baseline monitoring with tamper detection |
| 🌐 Web Security | Web | OWASP Top 10 scanner (SQLi, XSS, CSRF, headers) |
| 🔑 Cryptography Lab | Crypto | SHA-256/384/512 hashing, Base64, RSA, ROT-13 |
| 🧩 Log Forensics | Forensics | Real-time log viewer with threat level filtering |
| ⚠️ CVE Monitor | Intelligence | Vulnerability feed with CVSS scores |
| 🕵️ OSINT Tool | Intelligence | Domain, IP, and email reconnaissance |
| 🖼️ Steganography | Forensics | LSB message encoding/decoding |
| 💥 Hash Cracker | Crypto | Dictionary attack engine (MD5/SHA) |
| 🎣 Phishing Detector | Web | Email threat scoring with red flag analysis |

---

## 🏗️ Project Structure

```
cybernexus/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── Sidebar.jsx      # Navigation sidebar
│   │   ├── Topbar.jsx       # Header with clock & status
│   │   └── UI.jsx           # Shared UI primitives
│   ├── modules/
│   │   ├── Dashboard.jsx    # Command center
│   │   ├── PasswordVault.jsx
│   │   ├── PortScanner.jsx
│   │   └── Modules.jsx      # All other 9 modules
│   ├── App.jsx              # Root component & routing
│   ├── constants.js         # Shared data & module config
│   ├── index.css            # Global styles & CSS variables
│   └── main.jsx             # Entry point
├── index.html
├── package.json
└── vite.config.js
```

---

## 🛠️ Tech Stack

- **Frontend:** React 18 + Vite 5
- **Styling:** Pure CSS with CSS variables (no frameworks)
- **Crypto:** Web Crypto API (native browser)
- **Storage:** Client-side only — no backend, no DB, no API keys

---

## 🔐 Security Note

> **This tool is for educational and authorized use only.**
> Port scanners and security testing tools should only be used on systems you own or have explicit written permission to test. Unauthorized scanning is illegal in many jurisdictions.

---

## 🚧 Roadmap

- [ ] Python/FastAPI backend for real network scanning
- [ ] Docker isolation for sandboxed module execution
- [ ] PostgreSQL persistence for vault & scan history
- [ ] Redis job queue for long-running scans
- [ ] Real CVE feed integration (NVD API)
- [ ] Export reports as PDF

---

## 📄 License

MIT — see [LICENSE](LICENSE) for details.

---

## 🤝 Contributing

1. Fork the repo
2. Create a feature branch: `git checkout -b feature/my-module`
3. Commit changes: `git commit -m 'Add: new security module'`
4. Push & open a PR

---

*Built with React + Vite. No backend required.*

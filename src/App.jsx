import { useState } from 'react'
import Sidebar from './components/Sidebar.jsx'
import Topbar from './components/Topbar.jsx'
import Dashboard from './modules/Dashboard.jsx'
import PortScanner from './modules/PortScanner.jsx'
import PasswordVault from './modules/PasswordVault.jsx'
import {
  FileIntegrity,
  WebSecurity,
  CryptographyLab,
  LogForensics,
  CVEMonitor,
  OSINTTool,
  Steganography,
  HashCracker,
  PhishingDetector,
} from './modules/Modules.jsx'

const VIEWS = {
  dashboard:     Dashboard,
  vault:         PasswordVault,
  scanner:       PortScanner,
  integrity:     FileIntegrity,
  web:           WebSecurity,
  crypto:        CryptographyLab,
  forensics:     LogForensics,
  cve:           CVEMonitor,
  osint:         OSINTTool,
  steganography: Steganography,
  hash:          HashCracker,
  phishing:      PhishingDetector,
}

export default function App() {
  const [active, setActive] = useState('dashboard')
  const ActiveView = VIEWS[active] || Dashboard

  return (
    <div className="scanline" style={{
      display: 'flex',
      height: '100vh',
      width: '100vw',
      overflow: 'hidden',
      position: 'relative',
    }}>
      <Sidebar active={active} setActive={setActive} />

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', minWidth: 0 }}>
        <Topbar active={active} />
        <main style={{
          flex: 1,
          overflowY: 'auto',
          padding: '24px',
          position: 'relative',
        }}>
          <ActiveView key={active} setActive={setActive} />
        </main>
      </div>
    </div>
  )
}

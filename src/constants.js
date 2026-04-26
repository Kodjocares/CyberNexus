// Module registry
export const MODULES = [
  { id: 'dashboard',     label: 'Command Center',    icon: '⬡',  color: '#00ff9f', category: 'core' },
  { id: 'vault',         label: 'Password Vault',    icon: '🔐', color: '#00d4ff', category: 'beginner' },
  { id: 'scanner',       label: 'Port Scanner',      icon: '📡', color: '#ff6b35', category: 'network' },
  { id: 'integrity',     label: 'File Integrity',    icon: '🔎', color: '#a78bfa', category: 'beginner' },
  { id: 'web',           label: 'Web Security',      icon: '🌐', color: '#fbbf24', category: 'web' },
  { id: 'crypto',        label: 'Cryptography',      icon: '🔑', color: '#34d399', category: 'crypto' },
  { id: 'forensics',     label: 'Log Forensics',     icon: '🧩', color: '#f472b6', category: 'forensics' },
  { id: 'cve',           label: 'CVE Monitor',       icon: '⚠️', color: '#fb923c', category: 'intel' },
  { id: 'osint',         label: 'OSINT Tool',        icon: '🕵️', color: '#60a5fa', category: 'intel' },
  { id: 'steganography', label: 'Steganography',     icon: '🖼️', color: '#e879f9', category: 'forensics' },
  { id: 'hash',          label: 'Hash Cracker',      icon: '💥', color: '#f87171', category: 'crypto' },
  { id: 'phishing',      label: 'Phishing Detector', icon: '🎣', color: '#4ade80', category: 'web' },
]

export const CATEGORY_LABELS = {
  core:      'Core',
  beginner:  'Beginner',
  network:   'Network',
  web:       'Web',
  crypto:    'Cryptography',
  forensics: 'Forensics',
  intel:     'Intelligence',
}

// Fake CVE data
export const FAKE_CVE = [
  { id: 'CVE-2024-1234', severity: 'CRITICAL', score: 9.8, desc: 'Remote code execution in OpenSSL 3.x via heap buffer overflow in certificate parsing', date: '2024-12-01', vector: 'NETWORK' },
  { id: 'CVE-2024-5678', severity: 'HIGH',     score: 7.5, desc: 'SQL injection vulnerability in popular CMS admin panel via unsanitized search parameter', date: '2024-11-28', vector: 'NETWORK' },
  { id: 'CVE-2024-9101', severity: 'HIGH',     score: 8.1, desc: 'Authentication bypass in enterprise VPN gateway via malformed JWT token', date: '2024-11-25', vector: 'NETWORK' },
  { id: 'CVE-2024-3322', severity: 'MEDIUM',   score: 5.4, desc: 'Reflected XSS in React component library v2.1 via unescaped user input in error handler', date: '2024-11-20', vector: 'NETWORK' },
  { id: 'CVE-2024-7755', severity: 'LOW',      score: 2.3, desc: 'Information disclosure via debug endpoint leaking internal stack traces', date: '2024-11-18', vector: 'LOCAL' },
  { id: 'CVE-2024-8820', severity: 'CRITICAL', score: 9.1, desc: 'Remote code execution in Apache Struts via OGNL injection in file upload parameter', date: '2024-11-15', vector: 'NETWORK' },
]

// Fake log data
export const FAKE_LOGS = [
  { time: '14:23:01', level: 'WARN',  source: 'auth.log',     msg: 'Failed SSH login from 192.168.1.105 — 3 attempts in 60s' },
  { time: '14:22:47', level: 'INFO',  source: 'access.log',   msg: 'GET /admin HTTP/1.1 200 OK from 10.0.0.42 [admin]' },
  { time: '14:22:33', level: 'ERROR', source: 'app.log',      msg: "SQL error: unescaped input detected in query at users.php:142" },
  { time: '14:21:59', level: 'WARN',  source: 'firewall.log', msg: 'Port scan detected — 1024 ports probed from 203.0.113.56' },
  { time: '14:21:44', level: 'INFO',  source: 'auth.log',     msg: 'User admin authenticated via password from 10.0.0.1' },
  { time: '14:20:12', level: 'ERROR', source: 'app.log',      msg: 'XSS payload in form input: <script>document.location=…</script>' },
  { time: '14:19:55', level: 'WARN',  source: 'auth.log',     msg: 'Brute force attempt blocked — IP 198.51.100.23 rate-limited' },
  { time: '14:19:11', level: 'INFO',  source: 'cron.log',     msg: 'Integrity check completed — 8 files verified, 0 anomalies' },
  { time: '14:18:44', level: 'WARN',  source: 'nginx.log',    msg: 'Unusual 404 spike — 340 requests/min from 172.16.0.5' },
  { time: '14:17:30', level: 'ERROR', source: 'auth.log',     msg: 'Privilege escalation attempt detected for user www-data' },
]

// Known hashes for cracker demo
export const KNOWN_HASHES = {
  '5f4dcc3b5aa765d61d8327deb882cf99': 'password',
  'e10adc3949ba59abbe56e057f20f883e': '123456',
  '21232f297a57a5a743894a0e4a801fc3': 'admin',
  '0d107d09f5bbe40cade3de5c71e9e9b7': 'letmein',
  'd8578edf8458ce06fbc5bb76a58c5ca4': 'qwerty',
  '25f9e794323b453885f5181f1b624d0b': '123456789',
  'fcea920f7412b5da7be0cf42b8c93759': '1234567',
}

export const WORDLIST = [
  'password','123456','admin','letmein','qwerty','123456789','1234567',
  'password123','welcome','monkey','dragon','master','secret','abc123',
  'iloveyou','sunshine','princess','football','shadow','michael',
]

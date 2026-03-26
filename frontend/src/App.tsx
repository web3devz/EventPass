import { useState } from 'react'
import { ConnectButton, useCurrentAccount } from '@mysten/dapp-kit'
import MyTickets from './components/MyTickets'
import IssueTicket from './components/IssueTicket'
import './App.css'

type Tab = 'view' | 'issue'

export default function App() {
  const account = useCurrentAccount()
  const [tab, setTab] = useState<Tab>('view')

  return (
    <div className="app">
      <header className="header">
        <div className="header-brand">
          <span className="logo">🎫</span>
          <div>
            <div className="brand-name">EventPass</div>
            <div className="brand-sub">NFT Ticketing</div>
          </div>
        </div>
        <ConnectButton />
      </header>

      {!account ? (
        <>
          <section className="hero">
            <div className="hero-badge">Authentic Tickets</div>
            <h1>Your Tickets,<br />As NFTs</h1>
            <p className="hero-sub">
              Authentic, non-duplicable event tickets minted as NFTs.
              Verifiable, transferable, and fraud-proof access.
            </p>
            <div className="hero-features">
              <div className="feature"><span>🔐</span><span>Authentic</span></div>
              <div className="feature"><span>🚫</span><span>No Fraud</span></div>
              <div className="feature"><span>🔄</span><span>Transferable</span></div>
              <div className="feature"><span>✅</span><span>Verifiable</span></div>
            </div>
          </section>

          <div className="stats-bar">
            <div className="stat-item">
              <div className="stat-value">∞</div>
              <div className="stat-label">Events Possible</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">0</div>
              <div className="stat-label">Fraud Risk</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">100%</div>
              <div className="stat-label">Verifiable</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">&lt;1s</div>
              <div className="stat-label">Finality</div>
            </div>
          </div>

          <section className="how-section">
            <div className="section-title">How EventPass Works</div>
            <p className="section-sub">Three steps to NFT ticketing</p>
            <div className="steps-grid">
              <div className="step-card">
                <div className="step-num">01</div>
                <div className="step-icon">🎪</div>
                <h3>Create Event</h3>
                <p>Organizer specifies event name, date, and seat information.</p>
              </div>
              <div className="step-card">
                <div className="step-num">02</div>
                <div className="step-icon">⚡</div>
                <h3>Issue Tickets</h3>
                <p>One transaction mints a unique NFT ticket to each attendee.</p>
              </div>
              <div className="step-card">
                <div className="step-num">03</div>
                <div className="step-icon">🎟️</div>
                <h3>Check In</h3>
                <p>Holders check in with their NFT — permanent, verifiable record.</p>
              </div>
            </div>
          </section>
        </>
      ) : (
        <div className="dashboard">
          <div className="dashboard-inner">
            <nav className="tabs">
              {(['view', 'issue'] as Tab[]).map((t) => (
                <button
                  key={t}
                  className={tab === t ? 'active' : ''}
                  onClick={() => setTab(t)}
                >
                  {t === 'view' && '🎫 My Tickets'}
                  {t === 'issue' && '✨ Issue Ticket'}
                </button>
              ))}
            </nav>
            <main>
              {tab === 'view' && <MyTickets />}
              {tab === 'issue' && <IssueTicket onSuccess={() => setTab('view')} />}
            </main>
          </div>
        </div>
      )}

      <footer className="footer">
        <span>EventPass · OneChain Testnet</span>
        <a href="https://onescan.cc/testnet" target="_blank" rel="noreferrer">Explorer ↗</a>
      </footer>
    </div>
  )
}

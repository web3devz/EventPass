import { useCurrentAccount, useSuiClientQuery } from '@mysten/dapp-kit'
import { PACKAGE_ID, objectUrl } from '../config/network'

interface TicketFields {
  event_name: string
  event_date: string
  seat: string
  issuer: string
  used: boolean
}

export default function MyTickets() {
  const account = useCurrentAccount()
  const { data, isPending, error } = useSuiClientQuery('getOwnedObjects', {
    owner: account?.address ?? '',
    filter: { StructType: `${PACKAGE_ID}::pass::Ticket` },
    options: { showContent: true },
  })

  if (isPending) return <div className="status-box">Loading your tickets...</div>
  if (error) return <div className="status-box error">Error: {error.message}</div>

  const tickets = data?.data ?? []

  if (tickets.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-icon">🎫</div>
        <h3>No tickets yet</h3>
        <p>You don't have any event tickets. Get one issued to your wallet!</p>
      </div>
    )
  }

  return (
    <div>
      <div className="card">
        <div className="card-header">
          <h2>My Tickets</h2>
          <p className="card-desc">{tickets.length} ticket{tickets.length !== 1 ? 's' : ''} in your wallet</p>
        </div>
      </div>
      <div className="badge-grid">
        {tickets.map((obj) => {
          const content = obj.data?.content
          if (content?.dataType !== 'moveObject') return null
          const f = content.fields as unknown as TicketFields
          const objId = obj.data?.objectId ?? ''

          return (
            <a
              key={objId}
              href={objectUrl(objId)}
              target="_blank"
              rel="noreferrer"
              className="badge-card"
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <div className="badge-icon">{f.used ? '✅' : '🎟️'}</div>
              <div className="badge-name">{f.event_name}</div>
              <div className="badge-desc">📅 {f.event_date}</div>
              <div className="badge-desc">💺 Seat: {f.seat}</div>
              <div className="badge-desc" style={{ marginTop: '4px', fontSize: '0.7rem', opacity: 0.6 }}>
                {f.used ? 'Used' : 'Valid'} · Issued by {f.issuer.slice(0, 8)}...
              </div>
            </a>
          )
        })}
      </div>
    </div>
  )
}

import { useState } from 'react'
import { useCurrentAccount, useSignAndExecuteTransaction } from '@mysten/dapp-kit'
import { Transaction } from '@mysten/sui/transactions'
import { PACKAGE_ID, txUrl } from '../config/network'

const enc = (s: string) => Array.from(new TextEncoder().encode(s))

interface Props {
  onSuccess?: () => void
}

export default function IssueTicket({ onSuccess }: Props) {
  const account = useCurrentAccount()
  const { mutate: signAndExecute, isPending } = useSignAndExecuteTransaction()
  const [eventName, setEventName] = useState('')
  const [eventDate, setEventDate] = useState('')
  const [seat, setSeat] = useState('')
  const [recipient, setRecipient] = useState('')
  const [txDigest, setTxDigest] = useState('')
  const [error, setError] = useState('')

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!account || !eventName || !eventDate || !seat || !recipient) return
    setError('')
    setTxDigest('')

    const tx = new Transaction()
    tx.moveCall({
      target: `${PACKAGE_ID}::pass::issue`,
      arguments: [
        tx.pure.vector('u8', enc(eventName)),
        tx.pure.vector('u8', enc(eventDate)),
        tx.pure.vector('u8', enc(seat)),
        tx.pure.address(recipient),
      ],
    })

    signAndExecute(
      { transaction: tx },
      {
        onSuccess: (r) => {
          setTxDigest(r.digest)
          setEventName('')
          setEventDate('')
          setSeat('')
          setRecipient('')
          onSuccess?.()
        },
        onError: (e) => setError(e.message),
      }
    )
  }

  return (
    <div className="card">
      <div className="card-header">
        <h2>Issue Ticket</h2>
        <p className="card-desc">Mint an NFT event ticket and send it to an attendee.</p>
      </div>

      <form onSubmit={submit} className="form">
        <div className="form-row">
          <label>
            Event Name *
            <input
              value={eventName}
              onChange={(e) => setEventName(e.target.value)}
              placeholder="e.g. OneChain Summit 2025"
              required
            />
          </label>
          <label>
            Event Date *
            <input
              value={eventDate}
              onChange={(e) => setEventDate(e.target.value)}
              placeholder="e.g. 2025-09-15"
              required
            />
          </label>
        </div>

        <div className="form-row">
          <label>
            Seat / Section *
            <input
              value={seat}
              onChange={(e) => setSeat(e.target.value)}
              placeholder="e.g. A-12 or VIP"
              required
            />
          </label>
          <label>
            Recipient Address *
            <input
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              placeholder="0x..."
              required
            />
          </label>
        </div>

        {error && <p className="error">⚠ {error}</p>}

        <button type="submit" className="btn-primary" disabled={isPending}>
          {isPending ? 'Issuing...' : 'Issue Ticket'}
        </button>
      </form>

      {txDigest && (
        <div className="tx-success">
          <span>✅ Ticket issued</span>
          <a href={txUrl(txDigest)} target="_blank" rel="noreferrer">View tx ↗</a>
        </div>
      )}
    </div>
  )
}

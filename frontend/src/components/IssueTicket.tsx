import { useState } from 'react'
import { useCurrentAccount, useSignAndExecuteTransaction } from '@mysten/dapp-kit'
import { Transaction } from '@mysten/sui/transactions'
import { PACKAGE_ID, txUrl } from '../config/network'

const enc = (s: string) => Array.from(new TextEncoder().encode(s))
const OPENAI_KEY = import.meta.env.VITE_OPENAI_KEY as string

interface Props {
  onSuccess?: () => void
}

export default function IssueTicket({ onSuccess }: Props) {
  const account = useCurrentAccount()
  const { mutate: signAndExecute, isPending } = useSignAndExecuteTransaction()
  const [eventName, setEventName] = useState('')
  const [eventDate, setEventDate] = useState('')
  const [seat, setSeat] = useState('')
  const [description, setDescription] = useState('')
  const [recipient, setRecipient] = useState('')
  const [txDigest, setTxDigest] = useState('')
  const [error, setError] = useState('')
  const [aiLoading, setAiLoading] = useState(false)
  const [aiHint, setAiHint] = useState('')

  const rewriteDescription = async () => {
    if (!description.trim() && !eventName.trim()) return
    setAiLoading(true)
    setAiHint('')
    try {
      const context = eventName ? `Event: "${eventName}"${eventDate ? `, Date: ${eventDate}` : ''}${seat ? `, Seat: ${seat}` : ''}` : ''
      const userText = description.trim() || 'No description provided yet.'
      const res = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${OPENAI_KEY}`,
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: [
            {
              role: 'user',
              content: `You are writing a short event ticket description for an NFT ticket.
${context}
Current description: "${userText}"

Rewrite it as a polished, exciting 1-2 sentence event description (max 30 words). No quotes. Make it sound premium and engaging.`,
            },
          ],
          temperature: 0.75,
          max_tokens: 80,
        }),
      })
      if (!res.ok) throw new Error(`OpenAI error ${res.status}`)
      const data = await res.json()
      const rewritten = data.choices?.[0]?.message?.content?.trim()
      if (rewritten) {
        setDescription(rewritten)
        setAiHint('✨ AI rewritten · edit freely')
      }
    } catch (e: unknown) {
      setAiHint('⚠ AI unavailable, edit manually')
    } finally {
      setAiLoading(false)
    }
  }

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
          setDescription('')
          setRecipient('')
          setAiHint('')
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

        <label>
          Event Description
          <div style={{ position: 'relative' }}>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe the event... then click ✨ Rewrite to polish with AI"
              rows={3}
              style={{ width: '100%', paddingRight: '7rem' }}
            />
            <button
              type="button"
              onClick={rewriteDescription}
              disabled={aiLoading || (!description.trim() && !eventName.trim())}
              style={{
                position: 'absolute', right: '.5rem', top: '.5rem',
                padding: '.3rem .7rem', fontSize: '.75rem', fontWeight: 700,
                background: 'rgba(99,102,241,.15)', color: '#818cf8',
                border: '1px solid rgba(99,102,241,.3)', borderRadius: '6px',
                cursor: 'pointer', whiteSpace: 'nowrap', fontFamily: 'inherit',
              }}
            >
              {aiLoading ? '...' : '✨ Rewrite'}
            </button>
          </div>
          {aiHint && (
            <span style={{ fontSize: '.72rem', color: 'var(--muted)', marginTop: '.2rem' }}>
              {aiHint}
            </span>
          )}
        </label>

        {error && <p className="error">⚠ {error}</p>}

        <button type="submit" className="btn-primary" disabled={isPending || aiLoading}>
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

// ── Activity type registry ────────────────────────────────────────────────────
// To add a new type: add one entry to ACTIVITY_TYPES. That's it.

export type ActivityKey =
  | 'playground'
  | 'park'
  | 'cafe'
  | 'zoo'
  | 'theater'
  | 'exhibition'
  | 'other'

export interface ActivityDef {
  key: ActivityKey
  emoji: string
  color: string
  aliases: string[]
}

export const ACTIVITY_TYPES: ActivityDef[] = [
  {
    key: 'playground',
    emoji: '🛝',
    color: '#2D8A6B',
    aliases: ['playground'],
  },
  {
    key: 'park',
    emoji: '🌳',
    color: '#3A7D44',
    aliases: ['park'],
  },
  {
    key: 'cafe',
    emoji: '☕',
    color: '#E65100',
    aliases: ['café', 'cafe', 'coffee'],
  },
  {
    key: 'zoo',
    emoji: '🐴',
    color: '#7B3FA0',
    aliases: ['zoo', 'farm', 'animals'],
  },
  {
    key: 'theater',
    emoji: '🎭',
    color: '#C0392B',
    aliases: ['theater', 'theatre', 'театр'],
  },
  {
    key: 'exhibition',
    emoji: '🖼️',
    color: '#1565C0',
    aliases: ['exhibition', 'museum', 'gallery', 'выставка', 'музей'],
  },
  {
    key: 'other',
    emoji: '📍',
    color: '#607D8B',
    aliases: [],
  },
]

export function resolveActivity(raw: string): ActivityDef {
  const s = raw.toLowerCase().trim()
  return (
    ACTIVITY_TYPES.find(a => a.aliases.some(alias => s.includes(alias))) ??
    ACTIVITY_TYPES.find(a => a.key === 'other')!
  )
}

export function parseActivities(raw: string | null): ActivityDef[] {
  if (!raw) return [ACTIVITY_TYPES.find(a => a.key === 'other')!]
  const parts = raw.split(/[;,]/).map(s => s.trim()).filter(Boolean)
  const resolved = parts.map(resolveActivity)
  const seen = new Set<ActivityKey>()
  return resolved.filter(a => {
    if (seen.has(a.key)) return false
    seen.add(a.key)
    return true
  })
}

export function buildPinHtml(activities: ActivityDef[]): string {
  const [primary] = activities
  if (activities.length === 1) return singlePin(primary.color, primary.emoji)
  if (activities.length === 2) {
    const [a, b] = activities
    return splitPin(a.color, b.color, a.emoji, b.emoji)
  }
  return singlePin(primary.color, primary.emoji, `+${activities.length - 1}`)
}

function singlePin(bg: string, emoji: string, badge?: string): string {
  return `
    <div style="position:relative;width:38px;height:38px;">
      <div style="
        width:38px;height:38px;
        border-radius:50% 50% 50% 0;
        transform:rotate(-45deg);
        background:${bg};
        border:3px solid white;
        box-shadow:0 3px 12px rgba(0,0,0,0.22);
        display:flex;align-items:center;justify-content:center;
      ">
        <span style="transform:rotate(45deg);font-size:16px;line-height:1;">${emoji}</span>
      </div>
      ${badge ? `<span style="
        position:absolute;top:-4px;right:-4px;
        background:#1A1A1A;color:white;
        border-radius:99px;font-size:9px;font-weight:700;
        padding:1px 4px;line-height:1.4;
        border:1.5px solid white;
      ">${badge}</span>` : ''}
    </div>`
}

function splitPin(bgA: string, bgB: string, emojiA: string, emojiB: string): string {
  return `
    <div style="position:relative;width:38px;height:38px;">
      <div style="
        width:38px;height:38px;
        border-radius:50% 50% 50% 0;
        transform:rotate(-45deg);
        overflow:hidden;
        border:3px solid white;
        box-shadow:0 3px 12px rgba(0,0,0,0.22);
        display:flex;
      ">
        <div style="flex:1;background:${bgA};display:flex;align-items:center;justify-content:center;">
          <span style="transform:rotate(45deg);font-size:11px;line-height:1;">${emojiA}</span>
        </div>
        <div style="flex:1;background:${bgB};display:flex;align-items:center;justify-content:center;">
          <span style="transform:rotate(45deg);font-size:11px;line-height:1;">${emojiB}</span>
        </div>
      </div>
    </div>`
}

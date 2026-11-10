import { Label } from './Label'

export function SectionHeader({ label, title }: { label: string; title: string }) {
  return (
    <div className="mb-[clamp(32px,4vw,56px)] grid items-baseline gap-x-10 gap-y-3 lg:grid-cols-[220px_minmax(0,1fr)]">
      <Label className="lg:pt-2.5">{label}</Label>
      <h2 className="reveal">{title}</h2>
    </div>
  )
}

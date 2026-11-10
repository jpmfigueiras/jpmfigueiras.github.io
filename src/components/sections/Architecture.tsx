import { useLayoutEffect, useRef, type ReactNode, type Ref } from 'react'
import { useLanguage } from '../../context/LanguageContext'
import { layers, tenants, tenantSwatches } from '../../data/architecture'
import { gsap, useGSAP } from '../../lib/gsap'
import { cn } from '../../lib/cn'
import { Section } from '../ui/Section'
import { SectionHeader } from '../ui/SectionHeader'

const cell = 'min-w-0 border-t border-line px-5 py-[18px]'
const tenantCell = (first: boolean) =>
  cn(cell, 'text-center font-mono text-[13px]', !first && 'border-l [border-left-style:dashed]')

function LayerHeader({ name, tech, cellRef }: { name: string; tech: string; cellRef?: Ref<HTMLDivElement> }) {
  return (
    <div ref={cellRef} role="rowheader" className={cn(cell, 'border-r font-mono text-xs text-muted')}>
      <b className="block font-display wdth-104 text-base font-[750] text-fg">{name}</b>
      {tech}
    </div>
  )
}

function TenantRow({ children }: { children: (i: number) => ReactNode }) {
  return (
    <>
      {tenants.map((_, i) => (
        <div key={i} className={tenantCell(i === 0)}>
          {children(i)}
        </div>
      ))}
    </>
  )
}

/** Multi-tenant architecture diagram with an animated trust boundary between Client and API. */
export function Architecture() {
  const { t } = useLanguage()
  const stackRef = useRef<HTMLDivElement>(null)
  const apiRowRef = useRef<HTMLDivElement>(null)
  const boundaryRef = useRef<HTMLDivElement>(null)

  // Keep the boundary line on top of the API row, whatever the row heights are.
  useLayoutEffect(() => {
    const place = () => {
      if (apiRowRef.current && boundaryRef.current) {
        boundaryRef.current.style.top = `${apiRowRef.current.offsetTop - 1}px`
      }
    }
    place()
    const observer = new ResizeObserver(place)
    if (stackRef.current) observer.observe(stackRef.current)
    document.fonts?.ready.then(place)
    return () => observer.disconnect()
  }, [])

  useGSAP(() => {
    const mm = gsap.matchMedia()
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.from(boundaryRef.current, {
        scaleX: 0,
        ease: 'none',
        scrollTrigger: { trigger: stackRef.current, start: 'top 80%', end: 'center 50%', scrub: 0.6 },
      })
    })
  })

  return (
    <Section>
      <SectionHeader label={t.stack.label} title={t.stack.title} />

      <div className="reveal overflow-x-auto rounded-[14px]">
        <div
          ref={stackRef}
          role="table"
          aria-label={t.stack.tableLabel}
          className="relative grid min-w-[640px] grid-cols-[200px_repeat(3,minmax(0,1fr))] rounded-[14px] border border-line bg-surface"
        >
          <div role="columnheader" className={cn(cell, 'border-t-0 border-r font-mono text-xs text-muted')}>
            {t.stack.layer}
          </div>
          {tenants.map((tenant) => (
            <div
              key={tenant}
              role="columnheader"
              className={cn(cell, 'border-t-0 text-center font-mono text-xs tracking-[.06em] text-muted uppercase')}
            >
              {tenant}
            </div>
          ))}

          <LayerHeader {...layers.client} />
          <TenantRow>
            {(i) => (
              <>
                <span
                  className="mr-2 inline-block size-2.5 rounded-[3px] align-[-1px]"
                  style={{ background: tenantSwatches[i] }}
                />
                <span>{t.stack.theme}</span>
              </>
            )}
          </TenantRow>

          <LayerHeader {...layers.api} cellRef={apiRowRef} />
          <TenantRow>{() => t.stack.auth}</TenantRow>

          <LayerHeader name={layers.data.name} tech={layers.data.tech} />
          <TenantRow>{(i) => layers.data.schemas[i]}</TenantRow>

          <LayerHeader {...layers.infra} />
          <div className={cn(tenantCell(true), 'col-span-3')}>{t.stack.infra}</div>

          <div
            ref={boundaryRef}
            className="pointer-events-none absolute inset-x-0 h-0 origin-left border-t-2 border-dashed border-signal"
          >
            <span className="absolute right-3.5 -translate-y-1/2 rounded-sm border border-signal bg-signal-soft px-[9px] py-[3px] font-mono text-[11px] tracking-[.08em] text-fg uppercase">
              {t.stack.tag}
            </span>
          </div>
        </div>
      </div>

      <p className="reveal mt-[18px] max-w-[70ch] text-[15px] text-muted">{t.stack.caption}</p>
    </Section>
  )
}

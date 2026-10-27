export const tenants = ['Club A', 'Club B', 'Club C …']

/** Swatch colour per tenant in the Client row (CSS variable names). */
export const tenantSwatches = ['var(--accent)', 'var(--signal)', 'var(--muted)']

export const layers = {
  client: { name: 'Client', tech: 'React · Vite · Tailwind v4' },
  api: { name: 'API', tech: 'Flask · SQLAlchemy · Redis' },
  data: { name: 'Data', tech: 'MySQL', schemas: ['schema_a', 'schema_b', 'schema_c'] },
  infra: { name: 'Infra', tech: 'Azure App Service' },
}

/** Filenames under /public/catalog — URLs are built with encodeURIComponent for accents etc. */
export const catalogDocuments = [
  { id: 'catalog', file: 'Les Glissières de sécurité Routière.pdf' },
  { id: 'flyer', file: 'FLYER-PINTAPLANA-MAROC.pdf' },
]

export function catalogPdfHref(file) {
  return `/catalog/${encodeURIComponent(file)}`
}

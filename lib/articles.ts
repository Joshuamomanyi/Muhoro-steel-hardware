export type GuideArticle = {
  slug: string
  category: string
  title: string
  excerpt: string
  image: string
  imageAlt: string
  keywords?: string[]
  publishedAt?: string
  sections: { title: string; text: string }[]
}

export const articles: GuideArticle[] = [
  {
    slug: 'check-before-ordering-structural-steel',
    category: 'Materials guide',
    title: 'What to check before ordering structural steel',
    excerpt: 'A clear materials list helps your supplier quote accurately and keeps the order aligned with the build drawings.',
    image: '/Muhoro columns and pillars steel.jpeg',
    imageAlt: 'Structural steel columns and pillars',
    keywords: ['structural steel buying guide', 'steel supply Juja', 'building materials planning'],
    publishedAt: '2026-01-14',
    sections: [
      { title: 'Start with the drawings', text: 'Use the latest approved drawings or materials schedule as the source for sizes, quantities, and lengths. Keep items grouped by type so it is easier to compare the quote with the plan.' },
      { title: 'Confirm details before substitution', text: 'Steel dimensions and grades affect how a structure performs. If a listed item is unavailable, check with the project designer or engineer before accepting a substitute.' },
      { title: 'Plan delivery and storage', text: 'Share the site location, access constraints, and preferred delivery time when requesting a quote. Prepare a level, secure place to receive and store the steel before it arrives.' },
    ],
  },
  {
    slug: 'get-your-site-ready-for-delivery',
    category: 'Site planning',
    title: 'Get your site ready for a materials delivery',
    excerpt: 'A few checks before the truck leaves the yard can make receiving materials safer and less disruptive.',
    image: '/Muhoro1.jpeg',
    imageAlt: 'Muhoro Steel Hardware delivery truck',
    keywords: ['site delivery planning', 'construction materials delivery', 'Juja building materials'],
    publishedAt: '2026-01-11',
    sections: [
      { title: 'Make access clear', text: 'Confirm the delivery address, a contact person, and any gate or road restrictions. Make sure the route and unloading area are clear for the vehicle expected.' },
      { title: 'Prepare the receiving area', text: 'Choose a stable place away from busy walkways and active work. Arrange suitable help and equipment for unloading heavy or long materials; do not improvise a lift.' },
      { title: 'Check the order as it arrives', text: 'Compare delivered items with the agreed order and note any shortage or damage before signing off. Store cement and other moisture-sensitive supplies under cover on a dry surface.' },
    ],
  },
  {
    slug: 'build-a-practical-materials-list',
    category: 'Project planning',
    title: 'Build a practical materials list for your project',
    excerpt: 'Organize purchases by work stage, confirm quantities, and keep small fittings from getting missed.',
    image: '/Muhoro General stores1.jpeg',
    imageAlt: 'Hardware supplies arranged on shop shelves',
    keywords: ['material list for house construction', 'materials schedule Kenya', 'construction shopping checklist'],
    publishedAt: '2026-01-08',
    sections: [
      { title: 'Break the job into stages', text: 'List the materials needed for each stage of work, then compare the list with the drawings or instructions from your fundi or contractor. This makes it easier to spot gaps before ordering.' },
      { title: 'Include the supporting items', text: 'Alongside the main materials, check for the fasteners, fittings, tools, and accessories needed to install them. Confirm sizes and compatibility rather than relying on appearance alone.' },
      { title: 'Compare complete quotes', text: 'Check units, quantities, delivery charges, and quote validity when comparing suppliers. Ask questions about availability and delivery timing before confirming the order.' },
    ],
  },
  {
    slug: 'buy-cement-with-storage-in-mind',
    category: 'Materials guide',
    title: 'Buying cement? Plan the storage before it arrives',
    excerpt: 'Getting the quantity and storage plan right helps reduce waste when a busy site receives cement.',
    image: '/Muhorocement.jpeg',
    imageAlt: 'Cement supplies for a building project',
    keywords: ['buy cement in Kenya', 'cement storage tips', 'construction cement delivery'],
    publishedAt: '2026-01-04',
    sections: [
      { title: 'Confirm quantity with your team', text: 'Use your contractor’s or fundi’s materials estimate and check the units on the quote before you order. If the work plan changes, review the quantity rather than relying on a rough guess.' },
      { title: 'Keep it dry and off the ground', text: 'Choose a covered, dry storage area and keep bags raised off the floor. Protect the stack from rain and damp, and avoid placing it where site traffic could damage it.' },
      { title: 'Plan delivery in manageable stages', text: 'If site space is limited, ask about availability and delivery options before committing to a large drop. Make sure someone is ready to receive and check the order.' },
    ],
  },
  {
    slug: 'avoid-missing-small-hardware',
    category: 'Project planning',
    title: 'The small hardware items that can slow a site down',
    excerpt: 'A quick fittings check can prevent a half-day pause for the one item nobody remembered to add.',
    image: '/Muhoro binding wire.jpeg',
    imageAlt: 'Hardware supplies for repairs and construction',
    keywords: ['small hardware items for building', 'construction fixings checklist', 'site supply essentials'],
    publishedAt: '2025-12-28',
    sections: [
      { title: 'Review each work stage', text: 'Alongside major materials, ask what will connect, secure, seal, or finish them. Make a short checklist for fasteners, fittings, accessories, and consumables for each stage.' },
      { title: 'Write down sizes and quantities', text: 'Small items often have several sizes that look alike at a glance. Record the specification or take the item details from the plan so the order matches the job.' },
      { title: 'Check the full list together', text: 'Before a site run or delivery, compare the items on hand with the next task on the schedule. Confirm availability with your supplier early if anything is missing.' },
    ],
  },
]

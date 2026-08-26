export const initialConfig = {
  buildingType: 'aanbouw',
  depth: 300,
  width: 600,
  cladding: 'brick-grey',
  rollLayer: false,
  frameType: 'kunststof-double-9016',
  skylight: 'none',
  greenRoof: false,
  roofTrim: 'aluminium',
  overhang: 'none',
  outdoorLights: 'none',
  outdoorOutlet: 'none',
  outdoorTap: 'none',
  drainpipe: 'pvc-right',
  plastering: true,
  paintWork: false,
  radiators: 'none',
  floorHeating: false,
  ceilingLightLeft: false,
  ceilingLightMid: true,
  ceilingLightRight: false,
  lightTypeSwitchedLeft: false,
  lightTypeSwitchedRight: false,
  lightTypeDimmedLeft: false,
  lightTypeDimmedRight: false,
  spotRow1: [false, false, false, false, false],
  spotRow2: [false, false, false, false, false],
  spotRow3: [false, false, false, false, false],
  wallLampLeftCount: 0,
  wallLampRightCount: 0,
  socketLeftCount: 0,
  socketRightCount: 0,
  wallBreakthrough: false,
  hasBackAccess: true,
}

const baseUrl = import.meta.env?.BASE_URL || '/'
const a = (name) => `${baseUrl}assets/${name}`

export const claddingGroups = [
  {
    title: 'Echte baksteen (+ € 2.250)',
    items: [
      ['brick-red', 'Rood', 'brick-red-icon.webp'],
      ['brick-yellow', 'Geel', 'brick-yellow-icon.webp'],
      ['brick-black', 'Zwart', 'brick-black-icon.webp'],
      ['brick-grey', 'Grijs', 'brick-grey-icon.webp'],
    ],
  },
  {
    title: 'Kunststof rabat (keralit) - inbegrepen',
    items: [
      ['plastic-black', 'Zwart', 'plastic-black-icon.webp'],
      ['plastic-grey', 'Grijs', 'plastic-grey-icon.webp'],
      ['plastic-beige', 'Beige', 'plastic-beige-icon.webp'],
      ['plastic-green', 'Groen', 'plastic-green-icon.webp'],
    ],
  },
  {
    title: 'Hout (+ € 1.800)',
    items: [
      ['wood-natural-h', 'Naturel H', 'wood-natural-h-icon.webp'],
      ['wood-natural-v', 'Naturel V', 'wood-natural-v-icon.webp'],
      ['wood-dark-h', 'Donker H', 'wood-dark-h-icon.jpg'],
      ['wood-dark-v', 'Donker V', 'wood-dark-v-icon.jpg'],
    ],
  },
].map((group) => ({ ...group, items: group.items.map(([value, label, image]) => ({ value, label, image: a(image) })) }))

const standardFrames = [
  ['double', '9016', 'frame-double-door-9016.webp'],
  ['double', '7016', 'frame-double-door-7016.webp'],
  ['grid', '9016', 'frame-double-door-grid-9016.webp'],
  ['grid', '7016', 'frame-double-door-grid-7016.webp'],
  ['slide2', '9016', 'frame-sliding-2-9016.webp'],
  ['slide2', '7016', 'frame-sliding-2-7016.webp'],
  ['slide4', '9016', 'frame-sliding-4-9016.webp'],
  ['slide4', '7016', 'frame-sliding-4-7016.webp'],
]
const aluminiumFrames = [
  ['double', '9016', 'frame-alu-double-door-9016.webp'],
  ['double', '7016', 'frame-alu-double-door-7016.webp'],
  ['grid', '9016', 'frame-alu-double-door-grid-9016.webp'],
  ['grid', '7016', 'frame-alu-double-door-grid-7016.webp'],
  ['slide2', '9016', 'frame-alu-sliding-2-9016.webp'],
  ['slide2', '7016', 'frame-alu-sliding-2-7016.webp'],
  ['slide4', '9016', 'frame-alu-sliding-4-9016.webp'],
  ['slide4', '7016', 'frame-alu-sliding-4-7016.webp'],
  ['harmonica', '9016', 'frame-alu-harmonica-9016.webp'],
  ['harmonica', '7016', 'frame-alu-harmonica-7016.webp'],
]
const makeFrames = (material, list) => list.map(([type, color, image]) => ({
  value: `${material}-${type}-${color}`,
  label: `RAL ${color}`,
  image: a(image),
}))

export const frameGroups = [
  { title: 'Kunststof', items: makeFrames('kunststof', standardFrames) },
  { title: 'Aluminium', items: makeFrames('aluminium', aluminiumFrames) },
  { title: 'Hout', items: makeFrames('hout', standardFrames) },
]

export const skylightOptions = [
  ['none', 'Nee'], ['600x600', '600 x 600 (+ € 800)'], ['1000x1000', '1000 x 1000 (+ € 1.200)'],
  ['1600x800', '1600 x 800 (+ € 1.500)'], ['2400x800', '2400 x 800 (+ € 2.000)'],
  ['2000x1200', '2000 x 1200 (+ € 2.200)'], ['2400x1000', '2400 x 1000 (+ € 2.500)'],
  ['3000x1000', '3000 x 1000 (+ € 3.000)'],
]

export const selectOptions = {
  overhang: [['none', 'Geen'], ['plastic-white', 'Kunststof wit (+ € 1.100)'], ['plastic-black', 'Kunststof antraciet (+ € 1.100)'], ['wood', 'Hout (+ € 1.100)']],
  outdoorLights: [['none', 'Nee'], ['left', 'Links (+ € 250)'], ['right', 'Rechts (+ € 250)'], ['both', 'Links/Rechts (+ € 500)']],
  outdoorOutlet: [['none', 'Nee'], ['single-left', 'Enkel links (+ € 180)'], ['single-right', 'Enkel rechts (+ € 180)'], ['single-both', 'Enkel links + rechts (+ € 340)'], ['double-left', 'Dubbel links (+ € 220)'], ['double-right', 'Dubbel rechts (+ € 220)'], ['double-both', 'Dubbel links + rechts (+ € 420)']],
  outdoorTap: [['none', 'Nee'], ['left', 'Links (+ € 280)'], ['right', 'Rechts (+ € 280)'], ['both', 'Links + rechts (+ € 520)']],
  drainpipe: [['pvc-left', 'PVC Links - inbegrepen'], ['pvc-right', 'PVC Rechts - inbegrepen'], ['pvc-both', 'PVC Links + rechts - inbegrepen'], ['zinc-left', 'Zink Links (+ € 100)'], ['zinc-right', 'Zink Rechts (+ € 100)'], ['zinc-both', 'Zink Links + rechts (+ € 100)'], ['pvc-black-left', 'PVC zwart Links - inbegrepen'], ['pvc-black-right', 'PVC zwart Rechts - inbegrepen'], ['pvc-black-both', 'PVC zwart Links + rechts - inbegrepen']],
  radiators: [['none', 'Nee'], ['left', 'Radiator links (+ € 650)'], ['right', 'Radiator rechts (+ € 650)'], ['both', 'Radiator links + rechts (+ € 1.300)']],
}

const skylightPrices = { none: 0, '600x600': 800, '1000x1000': 1200, '1600x800': 1500, '2400x800': 2000, '2000x1200': 2200, '2400x1000': 2500, '3000x1000': 3000 }
const framePrices = {
  'kunststof-double-9016': 0, 'kunststof-double-7016': 400, 'kunststof-grid-9016': 650, 'kunststof-grid-7016': 950,
  'kunststof-slide2-9016': 1300, 'kunststof-slide2-7016': 1700, 'kunststof-slide4-9016': 2200, 'kunststof-slide4-7016': 2500,
  'aluminium-double-9016': 500, 'aluminium-double-7016': 500, 'aluminium-grid-9016': 1150, 'aluminium-grid-7016': 1450,
  'aluminium-slide2-9016': 1800, 'aluminium-slide2-7016': 2200, 'aluminium-slide4-9016': 2700, 'aluminium-slide4-7016': 3000,
  'aluminium-harmonica-9016': 3250, 'aluminium-harmonica-7016': 3250,
  'hout-double-9016': 0, 'hout-double-7016': 0, 'hout-grid-9016': 650, 'hout-grid-7016': 950,
  'hout-slide2-9016': 350, 'hout-slide2-7016': 350, 'hout-slide4-9016': 950, 'hout-slide4-7016': 950,
}

export function calculatePrice(c) {
  const area = (c.depth / 100) * (c.width / 100)
  let price = area * 2856
  if (c.cladding.startsWith('brick-')) price += 2250
  if (['wood-natural-h', 'wood-natural-v'].includes(c.cladding)) price += 2200
  if (['wood-dark-h', 'wood-dark-v'].includes(c.cladding)) price += 1800
  if (c.rollLayer) price += 800
  price += framePrices[c.frameType] || 0
  price += skylightPrices[c.skylight] || 0
  if (c.greenRoof) price += 3500
  if (c.overhang !== 'none') price += 1100
  if (['left', 'right'].includes(c.outdoorLights)) price += 250
  if (c.outdoorLights === 'both') price += 500
  if (c.outdoorOutlet.includes('single')) price += c.outdoorOutlet.includes('both') ? 340 : 180
  if (c.outdoorOutlet.includes('double')) price += c.outdoorOutlet.includes('both') ? 420 : 220
  if (['left', 'right'].includes(c.outdoorTap)) price += 280
  if (c.outdoorTap === 'both') price += 520
  if (c.drainpipe.includes('zinc')) price += 100
  if (c.plastering) price += area * 25
  if (c.paintWork) price += area * 15
  if (['left', 'right'].includes(c.radiators)) price += 650
  if (c.radiators === 'both') price += 1300
  if (c.floorHeating) price += 2000
  price += [c.ceilingLightLeft, c.ceilingLightMid, c.ceilingLightRight].filter(Boolean).length * 300
  price += [c.lightTypeDimmedLeft, c.lightTypeDimmedRight].filter(Boolean).length * 70
  price += [...c.spotRow1, ...c.spotRow2, ...c.spotRow3].filter(Boolean).length * 80
  price += (c.wallLampLeftCount + c.wallLampRightCount) * 120
  price += (c.socketLeftCount + c.socketRightCount) * 130
  if (c.wallBreakthrough) price += 3000
  if (!c.hasBackAccess) price += 1950
  return Math.max(price, 32000)
}

export const formatPrice = (value) => Math.round(value).toLocaleString('nl-NL')

const claddingLayers = {
  'brick-red': 'overlay-brick-red.png', 'brick-yellow': 'overlay-brick-cream.png', 'brick-black': 'overlay-brick-grey.png', 'brick-grey': 'overlay-brick-white.png',
  'plastic-black': 'overlay-siding-black.png', 'plastic-grey': 'overlay-siding-grey.png', 'plastic-beige': 'overlay-siding-cream.png', 'plastic-green': 'overlay-siding-green.png',
  'wood-natural-h': 'overlay-wood-natural-h.png', 'wood-natural-v': 'overlay-wood-natural-v.png', 'wood-dark-h': 'overlay-wood-dark-h.png', 'wood-dark-v': 'overlay-wood-dark-v.png',
}
const rollLayers = Object.fromEntries(Object.keys(claddingLayers).map((key) => [key, `overlay-rollayer-${key}.png`]))
const frameLayers = Object.fromEntries(frameGroups.flatMap((g) => g.items).map((item) => [item.value, `overlay-frame-${item.value.replace('aluminium', 'alu')}.png`]))

export function exteriorLayers(c) {
  const layers = ['onstenk-base-new.jpg', claddingLayers[c.cladding]]
  if (c.rollLayer) layers.push(rollLayers[c.cladding])
  if (c.greenRoof) layers.push('overlay-green-roof.png')
  const skylights = { '600x600': 'overlay-skylight-1.png', '1000x1000': 'overlay-skylight-1.png', '1600x800': 'overlay-skylight-2.png', '2400x800': 'overlay-skylight-2x2.png', '2000x1200': 'overlay-skylight-3.png', '2400x1000': 'overlay-skylight-3x2.png', '3000x1000': 'overlay-skylight-4.png' }
  layers.push(skylights[c.skylight])
  layers.push({ aluminium: 'overlay-trim-aluminium.png', black: 'overlay-trim-black.png', kraal: 'overlay-trim-white.png' }[c.roofTrim])
  layers.push({ 'plastic-white': 'overlay-overhang-white.png', 'plastic-black': 'overlay-overhang-black.png' }[c.overhang])
  layers.push(frameLayers[c.frameType])
  if (c.outdoorOutlet !== 'none') layers.push(`overlay-socket-${c.outdoorOutlet.replace('single-', 'single-').replace('double-', 'double-')}.png`)
  layers.push({ 'pvc-left': 'overlay-drainpipe-pvc-left.png', 'pvc-right': 'overlay-drainpipe-pvc-right.png', 'pvc-both': 'overlay-drainpipe-pvc-both.png', 'pvc-black-left': 'overlay-drainpipe-pvc-black-left.png', 'pvc-black-right': 'overlay-drainpipe-pvc-black-right.png', 'pvc-black-both': 'overlay-drainpipe-pvc-black-both.png', 'zinc-left': 'overlay-drainpipe-zinc-left.png', 'zinc-right': 'overlay-drainpipe-zinc-right.png', 'zinc-both': 'overlay-drainpipe-zinc-both.png' }[c.drainpipe])
  if (c.outdoorTap !== 'none') layers.push(`overlay-tap-${c.outdoorTap}.png`)
  if (c.outdoorLights !== 'none') layers.push(`overlay-light-${c.outdoorLights}.png`)
  return layers.filter(Boolean).map(a)
}

export function interiorLayers(c) {
  const layers = [c.plastering ? 'interior-stucen.jpg' : 'onstenk-interior-base.jpg']
  if (c.ceilingLightLeft) layers.push('overlay-ceiling-light-left.png')
  if (c.ceilingLightMid) layers.push('overlay-ceiling-light-mid.png')
  if (c.ceilingLightRight) layers.push('overlay-ceiling-light-right.png')
  if (c.radiators !== 'none') layers.push(`overlay-radiator-${c.radiators}.png`)
  if (c.socketLeftCount) layers.push(`overlay-interior-outlet-left-${Math.min(c.socketLeftCount, 2)}.png`)
  if (c.socketRightCount) layers.push(`overlay-interior-outlet-right-${Math.min(c.socketRightCount, 3)}.png`)
  ;[c.spotRow1, c.spotRow2, c.spotRow3].forEach((row, rowIndex) => row.forEach((on, index) => on && layers.push(`overlay-spots-row${rowIndex + 1}-${index + 1}.png`)))
  if (c.wallLampLeftCount) layers.push(`overlay-walllamp-left-${Math.min(c.wallLampLeftCount, 2)}.png`)
  if (c.wallLampRightCount) layers.push(`overlay-walllamp-right-${Math.min(c.wallLampRightCount, 3)}.png`)
  return layers.map(a)
}

export const labels = {
  cladding: { 'brick-red': 'Baksteen rood', 'brick-yellow': 'Baksteen geel', 'brick-black': 'Baksteen zwart', 'brick-grey': 'Baksteen grijs', 'plastic-black': 'Kunststof zwart', 'plastic-grey': 'Kunststof grijs', 'plastic-beige': 'Kunststof beige', 'plastic-green': 'Kunststof groen', 'wood-natural-h': 'Hout naturel horizontaal', 'wood-natural-v': 'Hout naturel verticaal', 'wood-dark-h': 'Hout donker horizontaal', 'wood-dark-v': 'Hout donker verticaal' },
}

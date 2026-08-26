<script setup>
import { calculatePrice, formatPrice, labels } from '../configurator'
const props = defineProps({ config: Object })
const c = props.config
const area = () => ((c.depth / 100) * (c.width / 100)).toFixed(2)
const cap = (value) => value.replaceAll('-', ' ').replace(/\b\w/g, (letter) => letter.toUpperCase())
const lightCount = () => [c.ceilingLightLeft, c.ceilingLightMid, c.ceilingLightRight].filter(Boolean).length
const spotCount = () => [...c.spotRow1, ...c.spotRow2, ...c.spotRow3].filter(Boolean).length
</script>

<template>
  <main class="summary-page">
    <h2>Uw configuratie overzicht</h2>
    <div class="summary-grid">
      <article><h3>Afmetingen</h3><dl><div><dt>Diepte:</dt><dd>{{ c.depth }}cm</dd></div><div><dt>Breedte:</dt><dd>{{ c.width }}cm</dd></div><div class="total-line"><dt>Oppervlakte:</dt><dd>{{ area() }}m²</dd></div></dl></article>
      <article><h3>Buitenzijde</h3><dl><div><dt>Gevel:</dt><dd>{{ labels.cladding[c.cladding] }}</dd></div><div><dt>Rollaag:</dt><dd>{{ c.rollLayer ? 'Ja' : 'Nee' }}</dd></div><div><dt>Kozijn type:</dt><dd>{{ cap(c.frameType) }}</dd></div><div><dt>Daglicht:</dt><dd>{{ c.skylight === 'none' ? 'Nee' : c.skylight.replace('x', ' x ') }}</dd></div><div><dt>Groen dak:</dt><dd>{{ c.greenRoof ? 'Ja' : 'Nee' }}</dd></div></dl></article>
      <article><h3>Buiten voorzieningen</h3><dl><div><dt>Overstek:</dt><dd>{{ cap(c.overhang) }}</dd></div><div><dt>Buitenlicht:</dt><dd>{{ cap(c.outdoorLights) }}</dd></div><div><dt>Buitenstopcontact:</dt><dd>{{ cap(c.outdoorOutlet) }}</dd></div><div><dt>Buitenkraan:</dt><dd>{{ cap(c.outdoorTap) }}</dd></div><div><dt>Regenpijp:</dt><dd>{{ cap(c.drainpipe) }}</dd></div></dl></article>
      <article><h3>Binnenzijde</h3><dl><div><dt>Stucwerk:</dt><dd>{{ c.plastering ? 'Ja' : 'Nee' }}</dd></div><div><dt>Radiatoren:</dt><dd>{{ cap(c.radiators) }}</dd></div><div><dt>Vloerverwarming:</dt><dd>{{ c.floorHeating ? 'Ja' : 'Nee' }}</dd></div><div><dt>Plafondverlichting:</dt><dd>{{ lightCount() ? `${lightCount()} lichtpunten` : 'Nee' }}</dd></div><div><dt>Schilderwerk:</dt><dd>{{ c.paintWork ? 'Ja' : 'Nee' }}</dd></div><div><dt>Plafondspots:</dt><dd>{{ spotCount() ? `${spotCount()} spots` : 'Nee' }}</dd></div><div><dt>Wandlampen:</dt><dd>{{ c.wallLampLeftCount + c.wallLampRightCount || 'Nee' }}</dd></div><div><dt>Stopcontacten:</dt><dd>{{ c.socketLeftCount + c.socketRightCount || 'Nee' }}</dd></div></dl></article>
      <article><h3>Bouwkundige opties</h3><dl><div><dt>Achterom bereikbaar:</dt><dd>{{ c.hasBackAccess ? 'Ja' : 'Nee (+€1.950)' }}</dd></div><div><dt>Muurdoorbraak:</dt><dd>{{ c.wallBreakthrough ? 'Ja (+€3.000)' : 'Nee' }}</dd></div></dl></article>
    </div>
    <article class="price-card"><h3><span>Totaalprijs</span><strong>€ {{ formatPrice(calculatePrice(c)) }}</strong></h3><p>Dit is een indicatieprijs. De definitieve prijs wordt bepaald na een vrijblijvende opname.</p></article>
  </main>
</template>

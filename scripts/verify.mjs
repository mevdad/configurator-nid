import { existsSync } from 'node:fs'
import { calculatePrice, claddingGroups, exteriorLayers, frameGroups, initialConfig, interiorLayers, selectOptions } from '../src/configurator.js'

const assert = (condition, message) => {
  if (!condition) throw new Error(message)
}

assert(calculatePrice(initialConfig) === 54408, 'De standaardprijs moet € 54.408 zijn')

const configurations = []
for (const group of claddingGroups) for (const item of group.items) configurations.push({ ...structuredClone(initialConfig), cladding: item.value, rollLayer: true })
for (const group of frameGroups) for (const item of group.items) configurations.push({ ...structuredClone(initialConfig), frameType: item.value })
for (const value of ['600x600', '1000x1000', '1600x800', '2400x800', '2000x1200', '2400x1000', '3000x1000']) configurations.push({ ...structuredClone(initialConfig), skylight: value })
for (const [value] of selectOptions.outdoorOutlet) configurations.push({ ...structuredClone(initialConfig), outdoorOutlet: value })
for (const [value] of selectOptions.outdoorTap) configurations.push({ ...structuredClone(initialConfig), outdoorTap: value })
for (const [value] of selectOptions.drainpipe) configurations.push({ ...structuredClone(initialConfig), drainpipe: value })

configurations.push({
  ...structuredClone(initialConfig),
  plastering: false,
  radiators: 'both',
  socketLeftCount: 2,
  socketRightCount: 3,
  wallLampLeftCount: 2,
  wallLampRightCount: 3,
  spotRow1: [true, true, true, true, true],
  spotRow2: [true, true, true, true, true],
  spotRow3: [true, true, true, true, true],
})

for (const config of configurations) {
  for (const path of [...exteriorLayers(config), ...interiorLayers(config)]) {
    const assetPath = path.slice(path.indexOf('/assets/'))
    assert(existsSync(new URL(`../public${assetPath}`, import.meta.url)), `Ontbrekend renderbestand: ${path}`)
  }
}

console.log(`Verified ${configurations.length} configurations and the € ${calculatePrice(initialConfig).toLocaleString('nl-NL')} base price.`)

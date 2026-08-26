<script setup>
import SectionCard from './SectionCard.vue'
import PreviewPane from './PreviewPane.vue'
import { claddingGroups, frameGroups, selectOptions, skylightOptions } from '../configurator'

const props = defineProps({ config: Object, side: String })
const emit = defineEmits(['update:side', 'change'])
const set = (key, value) => emit('change', { [key]: value })

function clampDimension(key, event, min, max) {
  const value = Math.min(max, Math.max(min, Number.parseInt(event.target.value, 10) || min))
  event.target.value = value
  set(key, value)
}

function toggleSpot(rowName, index) {
  const row = [...props.config[rowName]]
  row[index] = !row[index]
  set(rowName, row)
}

const spotCount = () => [...props.config.spotRow1, ...props.config.spotRow2, ...props.config.spotRow3].filter(Boolean).length
const ceilingCount = () => [props.config.ceilingLightLeft, props.config.ceilingLightMid, props.config.ceilingLightRight].filter(Boolean).length
</script>

<template>
  <div class="configurator-shell">
    <PreviewPane class="mobile-preview" :config="config" :side="side" mobile />

    <div class="panel-card">
      <div class="side-tabs">
        <button :class="{ active: side === 'exterior' }" @click="emit('update:side', 'exterior')">Buitenzijde</button>
        <button :class="{ active: side === 'interior' }" @click="emit('update:side', 'interior')">Binnenzijde</button>
      </div>

      <div class="panel-scroll">
        <template v-if="side === 'exterior'">
          <SectionCard title="Afmetingen">
            <label class="field-label">Diepte aanbouw (cm)</label>
            <input :value="config.depth" inputmode="numeric" @blur="clampDimension('depth', $event, 150, 400)" />
            <p class="hint">Min. 150 cm - Max. 400 cm</p>
            <label class="field-label field-gap">Breedte aanbouw (cm)</label>
            <input :value="config.width" inputmode="numeric" @blur="clampDimension('width', $event, 150, 1000)" />
            <p class="hint">Min. 150 cm - Max. 1000 cm</p>
            <p class="hint italic">Afwijkende maten of vormen? Neem contact op voor een offerte op maat.</p>
          </SectionCard>

          <SectionCard title="Gevelbekleding">
            <div v-for="group in claddingGroups" :key="group.title" class="choice-group">
              <p class="group-label">{{ group.title }}</p>
              <div class="round-grid">
                <button v-for="item in group.items" :key="item.value" class="round-choice" @click="set('cladding', item.value)">
                  <span class="round-image" :class="{ selected: config.cladding === item.value }"><img :src="item.image" :alt="item.label" /></span>
                  <small>{{ item.label }}</small>
                </button>
              </div>
            </div>
            <p class="hint">{{ config.cladding.startsWith('brick-') ? '+ € 2.250' : config.cladding.startsWith('wood-') ? '+ € 1.800' : 'Inbegrepen' }}</p>
          </SectionCard>

          <SectionCard title="Rollaag">
            <div class="switch-row"><span>Wilt u een rollaag?</span><button class="switch" :class="{ on: config.rollLayer }" @click="set('rollLayer', !config.rollLayer)"><i /></button></div>
            <p v-if="config.rollLayer" class="hint">+ € 800</p>
          </SectionCard>

          <SectionCard title="Kozijn / Deuren">
            <div v-for="group in frameGroups" :key="group.title" class="choice-group">
              <p class="group-label">{{ group.title }}</p>
              <div class="round-grid">
                <button v-for="item in group.items" :key="item.value" class="round-choice" @click="set('frameType', item.value)">
                  <span class="round-image" :class="{ selected: config.frameType === item.value }"><img :src="item.image" :alt="item.label" /></span>
                  <small>{{ item.label }}</small>
                </button>
              </div>
            </div>
            <button class="outline-choice" :class="{ selected: config.frameType === 'custom' }" @click="set('frameType', 'custom')">Anders gewenst, in overleg</button>
          </SectionCard>

          <SectionCard title="Lichtstraat">
            <select :value="config.skylight" @change="set('skylight', $event.target.value)"><option v-for="item in skylightOptions" :key="item[0]" :value="item[0]">{{ item[1] }}</option></select>
          </SectionCard>

          <SectionCard title="Groen dak">
            <div class="switch-row"><span>Wilt u een groen dak?</span><button class="switch" :class="{ on: config.greenRoof }" @click="set('greenRoof', !config.greenRoof)"><i /></button></div>
            <p v-if="config.greenRoof" class="hint">+ € 3.500</p>
          </SectionCard>

          <SectionCard title="Daktrim">
            <button v-for="item in [['aluminium','Aluminium daktrim - inbegrepen'],['black','Zwarte daktrim - inbegrepen'],['kraal','Kraal daktrim - inbegrepen']]" :key="item[0]" class="outline-choice" :class="{ selected: config.roofTrim === item[0] }" @click="set('roofTrim', item[0])">{{ item[1] }}</button>
            <p class="hint">Inbegrepen</p>
          </SectionCard>

          <SectionCard title="Overstek"><select :value="config.overhang" @change="set('overhang', $event.target.value)"><option v-for="item in selectOptions.overhang" :key="item[0]" :value="item[0]">{{ item[1] }}</option></select></SectionCard>
          <SectionCard title="Buitenlicht"><select :value="config.outdoorLights" @change="set('outdoorLights', $event.target.value)"><option v-for="item in selectOptions.outdoorLights" :key="item[0]" :value="item[0]">{{ item[1] }}</option></select></SectionCard>
          <SectionCard title="Buitenstopcontact"><select :value="config.outdoorOutlet" @change="set('outdoorOutlet', $event.target.value)"><option v-for="item in selectOptions.outdoorOutlet" :key="item[0]" :value="item[0]">{{ item[1] }}</option></select></SectionCard>
          <SectionCard title="Buitenkraan"><select :value="config.outdoorTap" @change="set('outdoorTap', $event.target.value)"><option v-for="item in selectOptions.outdoorTap" :key="item[0]" :value="item[0]">{{ item[1] }}</option></select></SectionCard>
          <SectionCard title="Regenpijp"><select :value="config.drainpipe" @change="set('drainpipe', $event.target.value)"><option v-for="item in selectOptions.drainpipe" :key="item[0]" :value="item[0]">{{ item[1] }}</option></select></SectionCard>

          <SectionCard title="Bouwkundige opties">
            <label class="field-label">Heeft u een achterom?</label>
            <p class="hint">Als u geen achterom heeft, moeten we een extra kraan inhuren om de heimachine en graafmachine op zijn plek te krijgen.</p>
            <div class="binary-row">
              <button :class="{ selected: !config.hasBackAccess }" @click="set('hasBackAccess', false)">◉ Nee <small>+ €1.950</small></button>
              <button :class="{ selected: config.hasBackAccess }" @click="set('hasBackAccess', true)">◉ Ja</button>
            </div>
            <label class="field-label field-gap">Achtergevel doorbreken?</label>
            <div class="binary-row">
              <button :class="{ selected: !config.wallBreakthrough }" @click="set('wallBreakthrough', false)">◉ Nee</button>
              <button :class="{ selected: config.wallBreakthrough }" @click="set('wallBreakthrough', true)">◉ Ja <small>+ €3.000</small></button>
            </div>
          </SectionCard>
        </template>

        <template v-else>
          <SectionCard title="Stucwerk">
            <p class="hint">ja voorzien van stucwerk (€ 25,- per m2, op nacalculatie)</p>
            <div class="yes-no"><button :class="{ selected: !config.plastering }" @click="set('plastering', false)">NEE</button><button :class="{ selected: config.plastering }" @click="set('plastering', true)">JA</button></div>
            <p v-if="config.plastering" class="hint">ca. € {{ Math.round(config.depth / 100 * (config.width / 100) * 25) }} (nacalculatie)</p>
          </SectionCard>
          <SectionCard title="Schilderwerk">
            <p class="hint">ja voorzien van schilderwerk (€ 15,- per m2, op nacalculatie)</p>
            <div class="yes-no"><button :class="{ selected: !config.paintWork }" @click="set('paintWork', false)">NEE</button><button :class="{ selected: config.paintWork }" @click="set('paintWork', true)">JA</button></div>
            <p v-if="config.paintWork" class="hint">ca. € {{ Math.round(config.depth / 100 * (config.width / 100) * 15) }} (nacalculatie)</p>
          </SectionCard>
          <SectionCard title="Radiator(en)"><select :value="config.radiators" @change="set('radiators', $event.target.value)"><option v-for="item in selectOptions.radiators" :key="item[0]" :value="item[0]">{{ item[1] }}</option></select></SectionCard>
          <SectionCard title="Vloerverwarming"><div class="switch-row"><span>Wilt u vloerverwarming?</span><button class="switch" :class="{ on: config.floorHeating }" @click="set('floorHeating', !config.floorHeating)"><i /></button></div><p v-if="config.floorHeating" class="hint">+ € 2.000</p></SectionCard>

          <SectionCard title="Verlichting lichtpunt">
            <button class="none-choice" :class="{ selected: !ceilingCount() }" @click="emit('change', { ceilingLightLeft:false, ceilingLightMid:false, ceilingLightRight:false })">◉ NEE</button>
            <p class="group-label">Lichtpunt</p>
            <div class="square-row"><button v-for="item in [['ceilingLightLeft','L'],['ceilingLightMid','M'],['ceilingLightRight','R']]" :key="item[0]" :class="{ selected: config[item[0]] }" @click="set(item[0], !config[item[0]])">☀<small>{{ item[1] }}</small></button></div>
            <p v-if="ceilingCount()" class="hint">{{ ceilingCount() }} lichtpunten (+ € {{ ceilingCount() * 300 }})</p>
            <p class="group-label">Type bediening</p>
            <div class="check-list">
              <label><input type="checkbox" :checked="config.lightTypeSwitchedLeft" @change="set('lightTypeSwitchedLeft', $event.target.checked)" /> geschakeld links</label>
              <label><input type="checkbox" :checked="config.lightTypeSwitchedRight" @change="set('lightTypeSwitchedRight', $event.target.checked)" /> geschakeld rechts</label>
              <label><input type="checkbox" :checked="config.lightTypeDimmedLeft" @change="set('lightTypeDimmedLeft', $event.target.checked)" /> gedimd links</label>
              <label><input type="checkbox" :checked="config.lightTypeDimmedRight" @change="set('lightTypeDimmedRight', $event.target.checked)" /> gedimd rechts</label>
            </div>
          </SectionCard>

          <SectionCard title="Spotjes">
            <button class="none-choice" :class="{ selected: !spotCount() }" @click="emit('change', { spotRow1:[false,false,false,false,false], spotRow2:[false,false,false,false,false], spotRow3:[false,false,false,false,false] })">◉ NEE</button>
            <div v-for="(rowName, rowIndex) in ['spotRow1','spotRow2','spotRow3']" :key="rowName" class="number-group">
              <p class="group-label">Spotjes rij {{ rowIndex + 1 }}</p>
              <div class="square-row"><button v-for="(_, i) in config[rowName]" :key="i" :class="{ selected: config[rowName][i] }" @click="toggleSpot(rowName, i)">●<small>{{ rowIndex * 5 + i + 1 }}</small></button></div>
            </div>
            <p v-if="spotCount()" class="hint">{{ spotCount() }} spots (+ € {{ spotCount() * 80 }})</p>
          </SectionCard>

          <SectionCard title="Wandlampen">
            <button class="none-choice" :class="{ selected: !config.wallLampLeftCount && !config.wallLampRightCount }" @click="emit('change', { wallLampLeftCount: 0, wallLampRightCount: 0 })">◉ NEE</button>
            <p class="group-label">wandlampen links</p><div class="square-row"><button v-for="n in 2" :key="n" :class="{ selected: config.wallLampLeftCount === n }" @click="set('wallLampLeftCount', n)">♧<small>{{ n }}</small></button></div>
            <p class="group-label">wandlampen rechts</p><div class="square-row"><button v-for="n in 3" :key="n" :class="{ selected: config.wallLampRightCount === n }" @click="set('wallLampRightCount', n)">♧<small>{{ n + 2 }}</small></button></div>
          </SectionCard>

          <SectionCard title="Stopcontacten">
            <button class="none-choice" :class="{ selected: !config.socketLeftCount && !config.socketRightCount }" @click="emit('change', { socketLeftCount: 0, socketRightCount: 0 })">◉ NEE</button>
            <p class="group-label">stopcontacten links</p><div class="square-row"><button v-for="n in 2" :key="n" :class="{ selected: config.socketLeftCount === n }" @click="set('socketLeftCount', n)">⊙<small>{{ n }}</small></button></div>
            <p class="group-label">stopcontacten rechts</p><div class="square-row"><button v-for="n in 3" :key="n" :class="{ selected: config.socketRightCount === n }" @click="set('socketRightCount', n)">⊙<small>{{ n + 3 }}</small></button></div>
          </SectionCard>
        </template>
      </div>
    </div>

    <PreviewPane class="desktop-preview" :config="config" :side="side" />
  </div>
</template>

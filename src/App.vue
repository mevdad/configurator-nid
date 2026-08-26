<script setup>
import { reactive, ref } from 'vue'
import ConfiguratorPanel from './components/ConfiguratorPanel.vue'
import SummaryView from './components/SummaryView.vue'
import QuoteForm from './components/QuoteForm.vue'
import BottomBar from './components/BottomBar.vue'
import { initialConfig } from './configurator'

const screen = ref('configure')
const side = ref('exterior')
const config = reactive(structuredClone(initialConfig))
const updateConfig = (changes) => Object.assign(config, changes)
const go = (value) => { screen.value = value; window.scrollTo({ top: 0, behavior: 'smooth' }) }
</script>

<template>
  <div class="app-shell">
    <main v-if="screen === 'configure'" class="config-page"><ConfiguratorPanel v-model:side="side" :config="config" @change="updateConfig" /></main>
    <SummaryView v-else-if="screen === 'summary'" :config="config" />
    <QuoteForm v-else :config="config" @back="go('summary')" />
    <BottomBar v-if="screen === 'configure'" :config="config" next-label="Naar overzicht" @next="go('summary')" />
    <BottomBar v-else-if="screen === 'summary'" :config="config" show-back next-label="Offerte aanvragen" @back="go('configure')" @next="go('quote')" />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { exteriorLayers, interiorLayers } from '../configurator'

const props = defineProps({ config: Object, side: String, mobile: Boolean })
const layers = computed(() => props.side === 'interior' ? interiorLayers(props.config) : exteriorLayers(props.config))
</script>

<template>
  <div class="preview" :class="[{ interior: side === 'interior' }, { mobile }]">
    <img v-for="(layer, index) in layers" :key="layer" :src="layer" :alt="index === 0 ? 'Aanbouw visualisatie' : ''" />
  </div>
</template>

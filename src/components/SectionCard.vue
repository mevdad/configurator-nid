<script setup>
import { ref } from 'vue'
const props = defineProps({ title: String, subtitle: String, defaultOpen: { type: Boolean, default: true } })
const open = ref(props.defaultOpen)
</script>

<template>
  <section class="option-section">
    <button class="section-heading" type="button" @click="open = !open">
      <span><strong>{{ title }}</strong><small v-if="subtitle">{{ subtitle }}</small></span>
      <span class="chevron" :class="{ closed: !open }">⌃</span>
    </button>
    <div v-show="open" class="section-body"><slot /></div>
  </section>
</template>

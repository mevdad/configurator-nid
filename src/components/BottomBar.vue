<script setup>
import { calculatePrice, formatPrice } from '../configurator'
defineProps({ config: Object, showBack: Boolean, nextLabel: String })
defineEmits(['next', 'back'])
</script>

<template>
  <footer class="bottom-bar">
    <div class="bottom-inner">
      <div class="price"><strong>€ {{ formatPrice(calculatePrice(config)) }}</strong><small>incl. btw</small></div>
      <div class="bar-actions">
        <button v-if="showBack" class="button secondary" @click="$emit('back')">← <span>Terug</span></button>
        <button class="button primary" @click="$emit('next')">{{ nextLabel }} <span>→</span></button>
      </div>
    </div>
  </footer>
</template>

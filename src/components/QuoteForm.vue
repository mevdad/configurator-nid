<script setup>
import { reactive, ref } from 'vue'
import { calculatePrice, formatPrice } from '../configurator'
const props = defineProps({ config: Object })
const emit = defineEmits(['back'])
const form = reactive({ name: '', email: '', phone: '', postalCode: '' })
const submitted = ref(false)

function submit() {
  if (!form.name || !form.email || !form.phone) return
  const detail = { customer: { ...form }, config: structuredClone(props.config), totalPrice: calculatePrice(props.config) }
  window.dispatchEvent(new CustomEvent('aanbouw:quote-request', { detail }))
  submitted.value = true
}
</script>

<template>
  <main v-if="submitted" class="success-page">
    <div class="success-mark">✓</div><h2>Bedankt voor uw aanvraag!</h2>
    <p>Wij hebben uw offerte aanvraag ontvangen. Wij nemen binnen 2 werkdagen contact met u op.</p>
    <button class="button primary" @click="submitted = false">Nieuwe aanvraag</button>
  </main>
  <main v-else class="quote-page">
    <h2>Offerte aanvragen</h2><p>Vul uw gegevens in om een vrijblijvende offerte te ontvangen</p>
    <form @submit.prevent="submit">
      <section class="form-card"><h3>Uw gegevens</h3>
        <label>Naam *<input v-model="form.name" required placeholder="Uw volledige naam" /></label>
        <label>E-mailadres *<input v-model="form.email" type="email" required placeholder="uw@email.nl" /></label>
        <label>Telefoonnummer *<input v-model="form.phone" type="tel" required placeholder="06-12345678" /></label>
        <label>Postcode<input v-model="form.postalCode" placeholder="1234 AB" /></label>
      </section>
      <section class="quote-price"><span>Indicatieprijs:</span><strong>€ {{ formatPrice(calculatePrice(config)) }}</strong><small>Definitieve prijs wordt bepaald na een vrijblijvende opname.</small></section>
      <footer class="quote-footer"><div><button type="button" class="button secondary dark" @click="emit('back')">← Terug</button><button type="submit" class="button primary">Verstuur aanvraag</button></div></footer>
    </form>
  </main>
</template>

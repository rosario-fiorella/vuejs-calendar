<template>
  <v-card tile elevation="6" class="mb-6 rental-card" v-if="product">

    <!-- Immagini -->
    <v-carousel v-if="product._media && product._media.length" height="250" hide-delimiter-background
      show-arrows-on-hover>
      <v-carousel-item v-for="(media, m) in product._media" :key="m" :src="media.url"></v-carousel-item>
    </v-carousel>

    <!-- Titolo e Descrizione con fallback -->
    <v-card-title class="text-h6 font-weight-bold">
      {{ product._content ? product._content.name : 'No Name' }}
    </v-card-title>
    <v-card-subtitle>
      {{ product._content ? product._content.short_description : '' }}
    </v-card-subtitle>

    <v-list dense flat>
      <v-list-item>
        <v-list-item-content v-if="product._ecommerce">
          <!-- Pricing -->
          <v-list-item-title class="text-h5 primary--text font-weight-black">
            {{ currency }} {{ product._ecommerce.price_current }}
            <small>{{ product._ecommerce.unit }}</small>
          </v-list-item-title>

          <!-- Discount -->
          <v-list-item-subtitle v-if="product._ecommerce.price_reduction">
            <span class="text-decoration-line-through mr-2 grey--text">
              {{ currency }} {{ product._ecommerce.price_original }}
            </span>
            <v-chip small color="primary" label class="white--text">
              -{{ product._ecommerce.price_reduction }}
            </v-chip>
          </v-list-item-subtitle>
        </v-list-item-content>

        <v-list-item-action>
          <v-btn fab small :color="product._selected ? 'secondary' : 'primary'" @click="toggleSelection">
            <v-icon color="white">
              {{ product._selected ? (ICONS.removeItem || 'mdi-minus') : (ICONS.addCart || 'mdi-plus') }}
            </v-icon>
          </v-btn>
        </v-list-item-action>
      </v-list-item>
    </v-list>

    <!-- Espansione Dettagli -->
    <v-expansion-panels flat>
      <v-expansion-panel>
        <v-expansion-panel-header>
          <span class="text-caption font-weight-bold">{{ $t('common.view_details') }}</span>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <!-- Contenuto dettagli (Notice, Attributes, etc.) -->
          <div v-if="product._tags" class="d-flex flex-wrap pa-2">
            <v-chip v-for="(tag, t) in product._tags" :key="t" class="ma-1" small outlined color="primary">
              {{ tag.name }}
            </v-chip>
          </div>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-card>
</template>

<script>
// Verifica che questo percorso sia corretto nel tuo progetto Vite
import { ICONS } from '@/assets/icons'

export default {
  name: 'RentalCard',
  props: {
    product: {
      type: Object,
      required: true,
      default: () => ({}) // Default per evitare errori di undefined
    }
  },
  data: () => ({
    ICONS: ICONS || {} // Fallback se le icone non caricano
  }),
  computed: {
    currency() {
      return this.product?._ecommerce?.currency || '€'
    }
  },
  methods: {
    toggleSelection() {
      if (this.product && this.product.id) {
        this.$store.dispatch('toggleProductSelection', this.product.id)
      }
    }
  }
}
</script>

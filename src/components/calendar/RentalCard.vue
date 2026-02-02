<template>
  <div>
    <v-card elevation="20" tile class="mb-4" v-for="(product) in products" :key="product.slug"
      :style="product._selected ? `border: 2px solid ${colors.primary}` : ''">
      <template v-if="product.slug">
        <v-carousel v-if="product.media && product.media.images && product.media.images.length" height="300"
          :next-icon="icons.arrowRight" :prev-icon="icons.arrowLeft" hide-delimiter-background show-arrows-on-hover>
          <v-carousel-item v-for="(image, m) in product.media.images" :key="m" :src="image.url"></v-carousel-item>
        </v-carousel>

        <v-card-title>{{ product.content.name }}</v-card-title>
        <v-card-subtitle>{{ product.content.description || product.content.excerpt }}</v-card-subtitle>

        <v-list dense class="no-line">
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title class="text-h5 primary--text font-weight-black price-text">
                {{ currency }} {{ product.price.price.toFixed(2) }}
              </v-list-item-title>
              <v-list-item-subtitle v-for="(tax, t) in product.price.tax" :key="t" class="text-caption">
                {{ tax.title }}: {{ tax.value }} {{ tax.currency }}
              </v-list-item-subtitle>
            </v-list-item-content>

            <v-list-item-action>
              <v-btn fab small :color="product._selected ? colors.secondary : colors.primary"
                @click.stop="addOrRemoveProduct(product)">
                <v-icon color="white">
                  {{ product._selected ? icons.removeItem : icons.addCart }}
                </v-icon>
              </v-btn>
            </v-list-item-action>
          </v-list-item>
        </v-list>

        <v-expansion-panels flat>
          <v-expansion-panel>
            <v-expansion-panel-header :expand-icon="icons.arrowDown">
              <span class="text-caption font-weight-bold">{{ labels.view_details }}</span>
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <v-divider></v-divider>

              <v-list dense class="no-line"
                v-if="product.terms && product.terms.features && product.terms.features.length">
                <v-subheader>
                  <v-icon small left>{{ icons.addCheck }}</v-icon>
                  {{ labels.features.toUpperCase() }}
                </v-subheader>
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-subtitle>
                      <v-chip class="mt-1 mr-1" small outlined :color="colors.primary"
                        v-for="(feat, f) in product.terms.features" :key="f">
                        <v-icon left small>{{ icons.done }}</v-icon> {{ feat.name }}
                      </v-chip>
                    </v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-list>

              <v-list dense class="no-line" v-if="product.content && product.content.note">
                <v-subheader>
                  <v-icon small left>{{ icons.eventNote }}</v-icon>
                  NOTE
                </v-subheader>
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-subtitle>{{ product.content.note }}</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </template>
    </v-card>
  </div>
</template>

<script>
import { ICONS } from '@/assets/icons'

export default {
  name: 'RentalCardList',
  props: {
    products: {
      type: Array,
      default: () => []
    },
    colors: {
      type: Object,
      default: () => ({ primary: '#4CAF50', secondary: '#388E3C' })
    }
  },
  data: () => ({
    icons: ICONS
  }),
  computed: {
    labels() {
      return {
        features: this.$t('rentals.features'),
        view_details: this.$t('common.view_details')
      }
    },
    currency() { return '€' }
  },
  methods: {
    addOrRemoveProduct(product) {
      this.$store.dispatch('toggleProductSelection', product.slug)
    }
  }
}
</script>

<style scoped>
.price-text {
  line-height: 1.4 !important;
  padding-top: 4px;
  overflow: visible !important;
}

.no-line .v-list-item__content {
  overflow: visible !important;
}
</style>

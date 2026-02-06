<template>
  <div class="rental-list-wrapper">
    <div v-for="(productsInDay, date) in products" :key="date" class="mb-8">

      <v-subheader class="primary--text font-weight-bold text-h6 pl-0">
        <v-icon left color="primary">{{ icons.dateRange }}</v-icon>
        {{ formatDisplayDate(date) }}
      </v-subheader>

      <v-card v-for="(slots, slug) in productsInDay" :key="slug" elevation="3" tile class="mb-6 rental-card-item"
        :class="{ 'selected-border': isProductSelectedInDate(slug, date) }">

        <template v-if="getEntity(slug)">
          <v-carousel v-if="getEntity(slug).media.images.length" height="300" hide-delimiter-background
            show-arrows-on-hover :next-icon="icons.arrowRight" :prev-icon="icons.arrowLeft">
            <v-carousel-item v-for="(image, m) in getEntity(slug).media.images" :key="m" :src="image.url" />
          </v-carousel>

          <v-card-title class="text-h5 font-weight-bold pb-2">
            {{ getEntity(slug).content.name }}
          </v-card-title>

          <v-card-text>
            <div class="text-body-1 grey--text text--darken-3 mb-4">
              {{ getEntity(slug).content.description }}
            </div>

            <div class="d-flex flex-wrap">
              <v-chip v-for="(feat, f) in getEntity(slug).terms.features" :key="f" small color="blue lighten-5"
                class="mr-2 mb-2 primary--text font-weight-medium">
                <v-icon x-small left>{{ icons.tag }}</v-icon>
                {{ feat.name }}
              </v-chip>
            </div>
          </v-card-text>

          <v-divider></v-divider>

          <v-card-actions class="px-4 py-3">
            <v-spacer></v-spacer>
            <v-btn color="primary" text @click="toggleExpand(slug, date)">
              {{ isExpanded(slug, date) ? $t('common.cancel') : $t('common.view_details') }}
              <v-icon right>{{ isExpanded(slug, date) ? (isExpanded(slug, date) ? icons.arrowUp : icons.arrowDown) :
                icons.arrowDown }}</v-icon>
            </v-btn>
          </v-card-actions>

          <v-expand-transition>
            <div v-show="isExpanded(slug, date)">
              <v-divider></v-divider>
              <v-card-text class="grey lighten-4 pa-4">
                <div class="text-overline mb-2 primary--text font-weight-bold">{{ $t('calendar.selection_title') }}
                </div>

                <v-expansion-panels flat hover class="mb-6">
                  <v-expansion-panel v-for="(slot, s) in slots" :key="s" class="rounded-lg mb-2 overflow-hidden border">
                    <v-expansion-panel-header class="py-3 px-4">
                      <v-row no-gutters align="center">
                        <v-col cols="6" class="d-flex align-center">
                          <v-icon small left color="grey darken-2">{{ icons.accessTime }}</v-icon>
                          <span class="font-weight-bold">{{ formatTime(slot.time_start) }} - {{
                            formatTime(slot.time_end) }}</span>
                        </v-col>
                        <v-col cols="6" class="d-flex justify-end align-center">
                          <div class="mr-4 text-h6 font-weight-black primary--text">{{ slot.currency }} {{ slot.price }}
                          </div>
                          <v-btn fab x-small depressed :color="isSlotSelected(slug, date, slot) ? 'error' : 'primary'"
                            @click.stop="toggleSlot(slug, date, slot)">
                            <v-icon small color="white">{{ isSlotSelected(slug, date, slot) ? icons.close : icons.add
                            }}</v-icon>
                          </v-btn>
                        </v-col>
                      </v-row>
                    </v-expansion-panel-header>

                    <v-expansion-panel-content class="white">
                      <v-divider class="mb-3"></v-divider>
                      <div class="text-caption">
                        <div class="font-weight-bold mb-2 grey--text text--darken-3">{{ $t('booking.confirm_title') }}
                        </div>
                        <div v-for="(tax, t) in getEntity(slug).taxes" :key="t"
                          class="d-flex justify-space-between mb-1 align-center">
                          <span class="grey--text">
                            {{ tax.title }} ({{ tax.type === 'tax_percentage' ? tax.value + '%' : tax.currency + ' ' +
                              tax.value }})
                          </span>
                          <v-tooltip v-if="tax.description" bottom>
                            <template v-slot:activator="{ on, attrs }">
                              <v-icon v-bind="attrs" v-on="on" x-small class="ml-1" color="grey lighten-1">{{ icons.help
                              }}</v-icon>
                            </template>
                            <span>{{ tax.description }}</span>
                          </v-tooltip>
                        </div>
                      </div>
                    </v-expansion-panel-content>
                  </v-expansion-panel>
                </v-expansion-panels>

                <template v-if="getEntity(slug).media.attachments && getEntity(slug).media.attachments.length">
                  <div class="text-overline mb-2 secondary--text font-weight-bold">{{ $t('rentals.notices') }}</div>
                  <v-list two-line subheader bg-color="transparent" class="pa-0">
                    <v-list-item v-for="(file, f) in getEntity(slug).media.attachments" :key="f" :href="file.url"
                      target="_blank" class="px-0">
                      <v-list-item-avatar color="white" size="40" class="border">
                        <v-icon color="red">{{ icons.pdf }}</v-icon>
                      </v-list-item-avatar>
                      <v-list-item-content>
                        <v-list-item-title class="primary--text font-weight-medium">{{ file.title }}</v-list-item-title>
                        <v-list-item-subtitle class="text-caption">PDF - {{ file.size || 'N/A' }}</v-list-item-subtitle>
                      </v-list-item-content>
                      <v-list-item-action>
                        <v-btn icon small><v-icon color="grey darken-1">{{ icons.download }}</v-icon></v-btn>
                      </v-list-item-action>
                    </v-list-item>
                  </v-list>
                </template>

              </v-card-text>
            </div>
          </v-expand-transition>
        </template>
      </v-card>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { ICONS } from '@/assets/icons'
import DateTransformer from '@/utils/DateTransformer'

export default {
  name: 'RentalCardList',
  props: {
    products: { type: Object, default: () => ({}) }
  },
  data: () => ({
    icons: ICONS,
    expandedCards: []
  }),
  computed: {
    ...mapState({
      catalogAnagraphic: state => state.config.catalog,
      selectedSlot: state => state.catalog.selectedSlot
    })
  },
  methods: {
    getEntity(slug) { return this.catalogAnagraphic[slug] || null; },

    formatDisplayDate(zuluStr) {
      const dateObj = DateTransformer.zuluToDate(zuluStr);
      return DateTransformer.toHuman(dateObj)
    },

    formatTime(timeStr) {
      return timeStr ? timeStr.substring(0, 5) : '--:--';
    },

    isExpanded(slug, date) {
      return this.expandedCards.includes(`${slug}-${date}`);
    },

    toggleExpand(slug, date) {
      const id = `${slug}-${date}`;
      const idx = this.expandedCards.indexOf(id);
      if (idx > -1) this.expandedCards.splice(idx, 1);
      else this.expandedCards.push(id);
    },

    isSlotSelected(slug, date, slot) {
      return this.selectedSlot?.slug === slug &&
        this.selectedSlot?.date === date &&
        this.selectedSlot?.slot?.time_start === slot.time_start;
    },

    isProductSelectedInDate(slug, date) {
      return this.selectedSlot?.slug === slug && this.selectedSlot?.date === date;
    },

    toggleSlot(slug, date, slot) {
      if (this.isSlotSelected(slug, date, slot)) {
        this.$store.commit('SET_SELECTED_SLOT', null);
      } else {
        this.$store.commit('SET_SELECTED_SLOT', { slug, date, slot });
      }
    }
  }
}
</script>

<style scoped>
.rental-card-item {
  transition: all 0.3s;
  border: 1px solid #eee !important;
  border-radius: 12px !important;
  overflow: hidden;
}

.selected-border {
  border: 2px solid var(--v-primary-base) !important;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12) !important;
}

.border {
  border: 1px solid #e0e0e0;
}
</style>

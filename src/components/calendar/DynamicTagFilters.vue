<template>
  <div>
    <v-sheet class="mb-2" :color="bgColor" v-for="group in tagGroups" :key="group.id">
      <div class="custom-card-border px-2 pt-2">
        <div class="font-weight-bold text-body-2" :class="labelColor">
          <v-icon small left :color="labelColor">
            {{ resolveIcon(group.id) }}
          </v-icon>
          {{ $t(group.label) }}
        </div>

        <v-chip-group :value="selectedFilters[group.id] || []" multiple :active-class="activeClass"
          @change="val => handleTagChange(group.id, val)">
          <v-chip v-for="item in group.items" :key="item.id" :value="item.id" filter small label :color="chipColor"
            :text-color="chipTextColor">
            {{ $t(item.text) }}
          </v-chip>
        </v-chip-group>
      </div>
    </v-sheet>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { ICONS } from '@/assets/icons';

export default {
  name: 'DynamicTagFilters',

  props: {
    labelColor: { type: String, default: 'secondary--text' },
    bgColor: { type: String, default: 'transparent' },
    chipColor: { type: String, default: 'transparent' },
    chipTextColor: { type: String, default: 'grey darken-4' },
    activeClass: { type: String, default: 'primary--text' }
  },

  computed: {
    ...mapState({
      tagGroups: state => state.businessConfig?.tagGroups || [],
      selectedFilters: state => state.selectedFilters || {}
    })
  },

  methods: {
    resolveIcon(iconNameFromApi) {
      return ICONS[iconNameFromApi] || ICONS.tag;
    },

    handleTagChange(groupId, selectedTags) {
      const tags = selectedTags || [];
      this.$store.commit('SET_DYNAMIC_TAGS', { groupId, tags });
    }
  }
}
</script>

<style scoped>
.v-chip-group {
  padding: 4px 0;
}

.custom-card-border {
  border: 1px solid rgba(0, 0, 0, 0.12) !important;
  border-radius: 4px !important;
}
</style>

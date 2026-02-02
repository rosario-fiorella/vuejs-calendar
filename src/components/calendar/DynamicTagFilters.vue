<template>
  <div>
    <v-sheet outlined rounded class="pa-2 mb-2" :color="bgColor" v-for="group in tagGroups" :key="group.id">
      <div class="font-weight-bold text-body-2 mb-1" :style="{ color: labelColor }">
        <v-icon small left :color="labelColor">{{ resolveIcon(group.id) }}</v-icon>
        {{ group.label }}
      </div>
      <v-chip-group :value="selectedFilters[group.id] || []" multiple :active-class="activeClass"
        @change="val => handleTagChange(group.id, val)">
        <v-chip v-for="item in group.items" :key="item.id" :value="item.id" filter small label :color="chipColor"
          :text-color="chipTextColor">
          {{ item.text }}
        </v-chip>
      </v-chip-group>
    </v-sheet>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { ICONS } from '@/assets/icons';

export default {
  name: 'DynamicTagFilters',

  props: {
    labelColor: {
      type: String,
      default: 'secondary--text'
    },
    bgColor: {
      type: String,
      default: 'transparent'
    },
    chipColor: {
      type: String,
      default: 'transparent'
    },
    chipTextColor: {
      type: String,
      default: 'grey darken-4'
    },
    activeClass: {
      type: String,
      default: 'primary--text'
    }
  },

  computed: {
    ...mapState({
      tagGroups: state => state.businessConfig?.tagGroups || [],
      selectedFilters: state => state.selectedFilters || {},
      selectedDates: state => state.selectedDates
    })
  },

  methods: {
    resolveIcon(groupId) {
      return ICONS[groupId] || 'mdi-tag-outline';
    },

    async handleTagChange(groupId, selectedTags) {
      const tags = selectedTags || [];
      this.$store.commit('SET_DYNAMIC_TAGS', { groupId, tags });

      try {
        await this.$store.dispatch('initApp', {
          tags: this.selectedFilters,
          dates: this.selectedDates
        });
      } catch (error) {
        console.error("[Tags Update Error]", error.message);
      }
    }
  }
}
</script>

<style scoped>
.v-chip-group {
  padding: 4px 0;
}
</style>

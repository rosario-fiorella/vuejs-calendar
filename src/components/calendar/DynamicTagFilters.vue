<template>
  <div>
    <v-sheet outlined rounded class="pa-2 mb-2" :color="bgColor" v-for="group in tagGroups" :key="group.id">
      <div class="font-weight-bold text-body-2" :style="{ color: labelColor }">
        {{ group.label }}
      </div>
      <v-chip-group :value="selectedFilters[group.id] || []" multiple :active-class="activeClass"
        @change="handleTagChange(group.id, $event)">
        <v-chip v-for="item in group.items" :key="item.id" :value="item.id" filter small label :color="chipColor" :text-color="chipTextColor">
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
    chipColor: {
      type: String,
      default: 'transparent'
    },
    activeClass: {
      type: String,
      default: 'primary--text'
    }
  },

  computed: {
    ...mapState({
      tagGroups: state => state.businessConfig?.tagGroups || [],
      selectedFilters: state => state.selectedFilters || {}
    })
  },

  methods: {
    resolveIcon(groupId) {
      return ICONS[groupId] || ICONS.tag;
    },

    async handleTagChange(groupId, selectedTags) {
      this.$store.commit('SET_DYNAMIC_TAGS', { groupId, tags: selectedTags });

      try {
        await this.$store.dispatch('initApp', {
          tags: this.selectedFilters
        });
      } catch (error) {
        console.error("[Tags Update Error]", error.message);
      }
    }
  }
}
</script>
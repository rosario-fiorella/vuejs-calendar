<template>
  <div>
    <v-sheet color="transparent" v-for="group in tagGroups" :key="group.id">
      <v-sheet color="transparent">{{ group.label }}</v-sheet>
      <v-chip-group :value="selectedFilters[group.id] || []" multiple active-class="primary--text" @change="handleTagChange(group.id, $event)">
        <v-chip v-for="item in group.items" :key="item.id" :value="item.id" filter outlined small label color="primary">
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
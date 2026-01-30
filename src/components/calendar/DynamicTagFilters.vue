<template>
  <div class="dynamic-tags-container">
    <v-select v-for="group in tagGroups" :key="group.id" :value="selectedFilters[group.id] || []" :items="group.items"
      :label="group.label" :prepend-icon="resolveIcon(group.id)" item-value="id" item-text="text" multiple chips
      deletable-chips outlined dense small-chips class="mb-3" @change="handleTagChange(group.id, $event)">

      <template v-slot:selection="{ item, index }">
        <v-chip v-if="index === 0" small color="primary" outlined>
          <span>{{ item.text }}</span>
        </v-chip>
        <span v-if="index === 1" class="grey--text text-caption ml-2">
          (+{{ (selectedFilters[group.id] || []).length - 1 }} others)
        </span>
      </template>
    </v-select>
  </div>
</template>

<script>
import { ICONS } from '@/assets/icons'

export default {
  name: 'DynamicTagFilters',
  data() {
    return {
      ICONS
    }
  },
  computed: {
    tagGroups() {
      return this.$store.state.businessConfig.tagGroups || []
    },
    selectedFilters() {
      return this.$store.state.selectedFilters || {}
    }
  },
  methods: {
    resolveIcon(groupId) {
      return this.ICONS[groupId] || this.ICONS.tag;
    },

    async handleTagChange(groupId, selectedTags) {
      this.$store.commit('SET_DYNAMIC_TAGS', { groupId, tags: selectedTags });
      const dates = this.$store.state.selectedDates;
      try {
        await this.$store.dispatch('initApp', {
          ...this.$store.state.selectedFilters,
        });
      } catch (error) {
        console.error("[DynamicTags Sync Error]", error.message);
      }
    }
  }
}
</script>

<style scoped>
.v-select>>>.v-icon {
  font-size: 20px;
}
</style>

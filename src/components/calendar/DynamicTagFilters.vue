<template>
  <div v-if="tagGroups.length" class="dynamic-tags-wrapper">
    <div class="d-flex align-center mb-3 mt-2">
      <span class="text-subtitle-2 grey--text text--darken-2">
        {{ $t('rentals.dynamic_filters_title') }}
      </span>
    </div>

    <v-select v-for="group in tagGroups" :key="group.id" :value="selectedFilters[group.id] || []" :items="group.items"
      :label="group.label" :prepend-icon="resolveIcon(group.id)" item-value="id" item-text="text" multiple chips
      deletable-chips outlined dense small-chips class="mb-3" @change="handleTagChange(group.id, $event)">
      <template v-slot:selection="{ item, index }">
        <v-chip v-if="index === 0" small color="primary" outlined>
          <span>{{ item.text }}</span>
        </v-chip>
        <span v-if="index === 1 && (selectedFilters[group.id] || []).length > 1" class="grey--text text-caption ml-2">
          (+{{ (selectedFilters[group.id] || []).length - 1 }} {{ $t('common.others') }})
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
      ICONS: ICONS || {}
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
      return this.ICONS[groupId] || 'mdi-tag';
    },
    async handleTagChange(groupId, selectedTags) {
      this.$store.commit('SET_DYNAMIC_TAGS', { groupId, tags: selectedTags });

      try {
        await this.$store.dispatch('initApp', {
          tags: this.$store.state.selectedFilters
        });
      } catch (error) {
        console.error("[DynamicTags Sync Error]", error.message);
      }
    }
  }
}
</script>

<style scoped>
.dynamic-tags-wrapper {
  border-top: 1px solid rgba(0, 0, 0, 0.05);
  padding-top: 12px;
}
</style>

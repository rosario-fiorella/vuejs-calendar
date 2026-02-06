<template>
  <v-app v-cloak>
    <v-fade-transition mode="out-in">
      <div v-if="!appReady" class="splash-screen d-flex align-center justify-center fill-height">
        <div v-if="bootError" class="text-center pa-4">
          <v-icon color="error" size="64">{{ ICONS.info }}</v-icon>
          <div class="text-h6 mt-4">{{ bootError }}</div>
          <v-btn color="primary" class="mt-4" @click="retryBoot">
            {{ $t('common.retry') || 'Retry' }}
          </v-btn>
        </div>

        <v-progress-circular v-else indeterminate :color="primaryColor" :size="size" />
      </div>

      <v-main v-else>
        <router-view />
      </v-main>
    </v-fade-transition>

    <v-snackbar v-model="snackbarStatus" :color="$store.state.snackbar.color" :timeout="$store.state.snackbar.timeout"
      bottom right>
      {{ $store.state.snackbar.message }}
      <template v-slot:action="{ attrs }">
        <v-btn text v-bind="attrs" @click="$store.commit('CLOSE_SNACKBAR')">
          {{ $t('common.close') }}
        </v-btn>
      </template>
    </v-snackbar>
  </v-app>
</template>
<script>
import { ICONS } from '@/assets/icons'

export default {
  name: 'App',
  data: () => ({
    size: 64,
    ICONS
  }),
  computed: {
    appReady() {
      return this.$store.state.appReady
    },
    bootError() {
      return this.$store.state.bootError
    },
    snackbarStatus: {
      get() { return this.$store.state.snackbar.show; },
      set(val) { if (!val) this.$store.commit('CLOSE_SNACKBAR'); }
    },
    primaryColor() {
      try {
        return this.$vuetify?.theme?.themes?.light?.primary || '#1976D2'
      } catch (e) {
        return '#1976D2'
      }
    }
  },
  created() {
    this.retryBoot();
  },
  methods: {
    retryBoot() {
      const today = new Date();
      const tomorrow = new Date();
      tomorrow.setDate(today.getDate() + 1);

      const dateStart = today.toISOString().split('T')[0];
      const dateEnd = tomorrow.toISOString().split('T')[0];

      this.$store.commit('SET_QUERY_DATES', [dateStart, dateEnd]);
      this.$store.dispatch('initApp', { fetch_config: 1 });
    }
  }
}
</script>

<style>
[v-cloak] {
  display: none;
}

.splash-screen {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: white;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
}

.v-application {
  font-family: 'Roboto', sans-serif !important;
}
</style>

<template>
  <v-app v-cloak>
    <v-fade-transition mode="out-in">
      <div v-if="!appReady" class="splash-screen">
        <v-progress-circular indeterminate :color="primaryColor" :size="size" />
      </div>
      <v-main v-else>
        <router-view />
      </v-main>
    </v-fade-transition>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  computed: {
    appReady() {
      return this.$store.state.appReady
    },
    primaryColor() {
      return this.$vuetify.theme.themes.light.primary
    }
  },
  created() {
    const todayUTC = new Date(Date.UTC(
      new Date().getUTCFullYear(),
      new Date().getUTCMonth(),
      new Date().getUTCDate(),
      0, 0, 0
    ));

    const tomorrowUTC = new Date(todayUTC);
    tomorrowUTC.setUTCDate(todayUTC.getUTCDate() + 1);

    const playload = {
      utc_datetime_start: todayUTC.toISOString(),
      utc_datetime_end: tomorrowUTC.toISOString(),
      currency: 'EUR',
      language: 'it_IT',
      fetch_config: 1,
      sort: 'asc'
    }

    this.$store.dispatch('initApp', playload)
  },
  data() {
    return {
      size: 64
    }
  }
}
</script>

<style scoped>
.splash-screen {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #ffffff;
  z-index: 9999;
}
</style>
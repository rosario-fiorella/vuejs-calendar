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
    this.$store.dispatch('initApp')
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
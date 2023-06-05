<template>
    <v-app class="bottom">
        <v-container>
            <router-view></router-view>
        </v-container>
    </v-app>
</template>

<script setup>
</script>

<style scoped>
.bottom {
background: rgb(255,255,255);
background: radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(115,103,240,1) 100%);
  }

</style>
<template>
  <div class="container">
    <div class="text-center">
      <img alt="Vue logo" src="@/assets/logo.png" class="text-center" />
    </div>
    <HelloWorld :msg="msg" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import HelloWorld from '@/components/HelloWorld.vue'

defineOptions({
  name: 'Home',
})

const msg = ref<string>('Welcome to Your Vue.js + Vite App')

// Uncomment the following line to see the error
// msg.value = 4
</script>

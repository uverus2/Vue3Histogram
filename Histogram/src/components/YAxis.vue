<script setup>

const props = defineProps({
  Yvalues: {
    type: Array,
    default: [0]
  }
});

</script>
<template>
  <div class="grid grid-rows-4 h-full justify-center y-axis">
    <div v-for="value in Yvalues" class="self-center">{{ value }}</div>
  </div>
</template>
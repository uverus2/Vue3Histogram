<script setup>
import {inject} from 'vue'

const column = inject('column');
</script>
<template>
  <div class="xs-250:bg-basic xs-250:rounded-lg mb-3">
    {{ column }}
  </div>
</template>
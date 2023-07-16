<script setup>
import {ref} from 'vue'

const props = defineProps({
  column: {
    type: Number,
    required: true
  },
  columnIndex: {
    type: String,
    required: true
  },
  colour: {
    type: String,
    default: "primary"
  },
});

const dynamicHeight = `height: ${props.column}rem`;

const isLabelShown = ref(false);

function toggleLabel() {
  isLabelShown.value = !isLabelShown.value;
}

</script>
<template>
  <li class="self-end text-center bar">
    <div v-if="isLabelShown" class="xs-250:bg-basic xs-250:rounded-lg mb-3">
      {{ column }}
    </div>
    <div :style="dynamicHeight"
         class="col-span-1 rounded-t-lg text-center flex flex-col justify-center hover:bg-basic hover:animate-pulse"
         :class="colour"
         @mouseleave="toggleLabel"
         @mouseover="toggleLabel"
    >
    </div>
    <div class="pt-2 hidden xs-450:flex">
      <span>{{ columnIndex }}</span>
    </div>
  </li>
</template>
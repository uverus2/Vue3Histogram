<script setup>
import {inject, provide, ref, computed} from 'vue'

//Components
import TheHistogramLabel from "@/components/Histogram/TheHistogramLabel.vue";

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
  largestEntry: {
    type: Number,
    default: 200
  }
});

function scaleValue(value, numColumns, largestValue) {
  return (value / largestValue) * numColumns;
}

const apiOptions = inject('apiOptions'),
      dynamicHeight = computed(() => `height: ${scaleValue(props.column, apiOptions?.max || 12, props.largestEntry)}rem`),
      isLabelShown = ref(false);

function toggleLabel() {
  isLabelShown.value = !isLabelShown.value;
}

//Not best practice for 1 level of drilling, I am just trying it out.
provide('column', computed(() => props.column));

</script>
<template>
  <li class="self-end text-center bar">
    <TheHistogramLabel v-if="isLabelShown"/>
    <div :style="dynamicHeight"
         class="col-span-1 rounded-t-lg text-center flex flex-col justify-center hover:bg-basic hover:animate-pulse"
         :class="colour"
         @mouseleave="toggleLabel"
         @mouseover="toggleLabel"
    >
    </div>
    <div class="pt-2 hidden xs-450:block">
      <span>{{ columnIndex }}</span>
    </div>
  </li>
</template>
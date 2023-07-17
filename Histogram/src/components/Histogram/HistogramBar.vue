<script setup>
import {computed, inject, provide, ref} from 'vue'

//Components
import TheHistogramLabel from "@/components/Histogram/TheHistogramLabel.vue";
import {useApiOptions} from "@/stores/apiOptions";

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

const {options} = useApiOptions(),
    dynamicHeight = computed(() => `height: ${scaleValue(props.column, options?.max || 12, props.largestEntry)}rem`),
    isLabelShown = ref(false);

console.log("STORE OPTIONS", options)

function toggleLabel() {
  isLabelShown.value = !isLabelShown.value;
}

//Not best practice for 1 level of drilling, I am just trying it out.
provide('column', computed(() => props.column));

</script>
<template>
  <li class="self-end text-center bar">
    <TheHistogramLabel v-if="isLabelShown"/>
    <div :class="colour"
         :style="dynamicHeight"
         class="col-span-1 rounded-t-lg text-center flex flex-col justify-center hover:bg-basic hover:animate-pulse"
         @mouseleave="toggleLabel"
         @mouseover="toggleLabel"
    >
    </div>
    <div class="pt-2 hidden xs-450:block">
      <span>{{ columnIndex }}</span>
    </div>
  </li>
</template>
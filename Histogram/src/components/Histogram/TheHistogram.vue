<script setup>
import {computed, provide, ref, inject} from 'vue'

//Components
import HistogramBar from "@/components/Histogram/HistogramBar.vue";
import YAxis from "@/components/Histogram/YAxis.vue";

const props = defineProps({
  data: {
    type: Object,
    required: true
  }
});

const largestEntry = ref(200),
      valuesArray = Object.values(props.data);

largestEntry.value = Math.max(...valuesArray);

 provide('largestEntry', largestEntry.value);

function getColour(index){
  const colourOptions = ['primary', 'secondary', 'third'],
        colourIndex = index % colourOptions.length;

  return colourOptions[colourIndex];
}

const calculatePercValue = (length, percent) => {
  return Math.floor(length * percent);
}
const calculateYAxis = computed(() => {
  const axisValues = [0],
        allowedPercentValues = [0.25, 0.50, 0.75];

  allowedPercentValues.forEach(percent => {
    const getPercentageValue = calculatePercValue(largestEntry.value, percent);
    axisValues.push(getPercentageValue);
  })

  return axisValues.sort((a, b) => b - a);
});

const apiOptions = inject('apiOptions')
const columnStyle = `grid-template-columns: repeat(${apiOptions?.max || 12}, minmax(0, 1fr))`;

</script>
<template>
  <div class=" mx-auto mt-4 p-4">
    <div class="grid grid-cols-12 gap-3">
      <div class="col-span-1">
        <YAxis :Yvalues="calculateYAxis"/>
      </div>
      <div class="col-span-12 xs-250:col-span-11">
        <div>
          <ul class="grid gap-1" :style="columnStyle">
           <HistogramBar v-for="(bar, index) in data" :columnIndex="index" :colour="getColour(index)" :column="bar" :key="index"/>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
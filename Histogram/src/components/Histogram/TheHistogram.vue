<script setup>
import { computed } from 'vue'

//Components
import HistogramBar from "@/components/Histogram/HistogramBar.vue";
import YAxis from "@/components/Histogram/YAxis.vue";

const props = defineProps({
  data: {
    type: Object,
    required: true
  },
});

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
        sortArrayData = Object.values(props.data).sort((a,b) => a - b),
        allowedPercentValues = [0.25, 0.50, 0.75];

  allowedPercentValues.forEach(percent => {
    const getPercentageValue = calculatePercValue(Math.max(...sortArrayData), percent);
    axisValues.push(getPercentageValue);
  })

  return axisValues.sort((a, b) => b - a);
})

</script>

<template>
  <div class=" mx-auto mt-4 p-4">
    <div class="grid grid-cols-12 gap-3">
      <div class="col-span-1">
        <YAxis :Yvalues="calculateYAxis"/>
      </div>
      <div class="col-span-12 xs-250:col-span-11">
        <div>
          <ul class="grid grid-cols-12 gap-1">
           <HistogramBar v-for="(bar, index) in data" :columnIndex="index" :colour="getColour(index)" :column="bar" :key="index"/>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
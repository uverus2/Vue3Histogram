<script setup>
import {computed, inject, ref, watch} from 'vue'

//Components
import HistogramBar from "@/components/Histogram/HistogramBar.vue";
import YAxis from "@/components/Histogram/YAxis.vue";
import {useApiOptions} from "@/stores/apiOptions";

const props = defineProps({
  data: {
    type: Object,
    required: true
  }
});

const largestEntry = ref(200);

const findLargestValue = (data) => {
  const valuesArray = Object.values(data)
  largestEntry.value = Math.max(...valuesArray);
}

findLargestValue(props.data);

watch(() => props.data, newData => {
  findLargestValue(newData);
});

function getColour(index) {
  const colourOptions = ['primary', 'secondary', 'third'],
      colourIndex = index % colourOptions.length;

  return colourOptions[colourIndex];
}

const calculatePercValue = (length, percent) => {
  return Math.floor(length * percent);
}
const calculateYAxis = computed(() => {
  const axisValues = [0],
      allowedPercentValues = [0.25, 0.50, 0.80];

  allowedPercentValues.forEach(percent => {
    const getPercentageValue = calculatePercValue(largestEntry.value, percent);
    axisValues.push(getPercentageValue);
  })

  return axisValues.sort((a, b) => b - a);
});

const {options} = useApiOptions();

const columnStyle = computed(() => {
  return `grid-template-columns: repeat(${options?.max || 12}, minmax(0, 1fr))`;
});

</script>
<template>
  <div class=" mx-auto mt-4 p-4">
    <div class="grid grid-cols-12 gap-3">
      <div class="col-span-1">
        <YAxis :Yvalues="calculateYAxis"/>
      </div>
      <div class="col-span-12 xs-250:col-span-11">
        <div>
          <ul :style="columnStyle" class="grid gap-1">
            <HistogramBar v-for="(bar, index) in data" :key="index" :colour="getColour(index)"
                          :column="bar" :columnIndex="index" :largestEntry="largestEntry"/>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
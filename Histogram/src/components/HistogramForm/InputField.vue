<script setup>
import {useField} from 'vee-validate';

const props = defineProps({
  name: {
    type: String,
    required: true
  },
  type: {
    type: String,
    default: "text"
  },
});

const {value, errorMessage} = useField(() => props.name);

</script>

<template>
  <input v-model="value" :type="type || 'text'"
         v-bind="$attrs"
         class="mt-1 block w-full px-3 py-2 bg-white border border-basic rounded-md text-sm shadow-sm"
  />

  <p class="text-primary capitalize font-bold pt-1 pb-3">{{ errorMessage }}</p>
</template>
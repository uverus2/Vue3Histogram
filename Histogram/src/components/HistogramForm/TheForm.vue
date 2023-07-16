<script setup>
import {reactive} from 'vue';

const emit = defineEmits(['submitForm'])

const formData = reactive({
  max: 0,
  min: 0,
  num: 200
});

const submitForm = () => {
  emit('submitForm', formData);

  formData.max = 0;
  formData.min = 0;
  formData.num = 200;
}

</script>
<template>
  <form @submit.prevent="submitForm">
    <label class="block">
      <span class="block text-sm font-medium text-slate-700">Max Columns</span>

      <input v-model="formData.max"
             class="mt-1 block w-full px-3 py-2 bg-white border border-basic rounded-md text-sm shadow-sm"
             type="number"
      />
    </label>
    <label class="block">
      <span class="block text-sm font-medium text-slate-700">Min Columns</span>

      <input v-model="formData.min"
             class="mt-1 block w-full px-3 py-2 bg-white border border-basic rounded-md text-sm shadow-sm"
             type="number"
      />
    </label>
    <label class="block">
      <span class="block text-sm font-medium text-slate-700">Number of Numbers</span>

      <input v-model="formData.num"
             class="mt-1 block w-full px-3 py-2 bg-white border border-basic rounded-md text-sm shadow-sm"
             type="number"
      />
    </label>
    <div class="w-full text-center mt-3">
      <button class="rounded p-3 w-32 h-12 bg-primary text-white hover:bg-secondary" type="submit">Click</button>
    </div>
  </form>
</template>
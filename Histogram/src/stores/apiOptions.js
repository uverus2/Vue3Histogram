import { reactive } from 'vue'
import { defineStore } from 'pinia'

export const useApiOptions = defineStore('apiOptions', () => {
  const options = reactive({num: 200, max: 12});

  function populate(data) {
    const {max, min, num} = data;

    options.max = max || 12;
    options.min = min || 1;
    options.num = num || 200;

  }

  function populateDefaults(){
    options.max = 12;
    options.min = 1;
    options.num = 200;
  }

  return { options, populate, populateDefaults }
})

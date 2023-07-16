import {inject, ref} from 'vue';

class Options {
    constructor(options) {
        this.num = options?.num || 200; 
        this.min = options?.min || 1;
        this.max = options?.max || 12;
        this.base = options?.base || 10;
    }
}

export function useIntegerFetch(){

    const request = inject('request'),
          response = ref({}),
          error = ref({}),
          isLoading = ref(false);

    const execute = async (options) => {
        isLoading.value = true;

        const apiOptions = new Options(options),
              url = `integers/?num=${apiOptions.num}&min=${apiOptions.min}&max=${apiOptions.max}&col=1&base=${apiOptions.base}&format=plain&rnd=new`;

        try{
            const responseData = await request(url);
            response.value = responseData.split('\n');
        }catch(e){
            error.value = e;
        }finally {
            isLoading.value = false;
        }
    }

    return {
        response,
        error,
        execute,
        isLoading
    }
}
import {inject, ref} from 'vue';

export function useIntegerFetch(){

    const response = ref({}),
          error = ref({}),
          isLoading = ref(false);

    const execute = async (options) => {
        isLoading.value = true;
        try{
            const request = inject('request'),
                responseData = await request('integers/?num=200&min=1&max=10&col=1&base=10&format=plain&rnd=new');

            response.value = responseData.split('\n');
        }catch(e){
            console.log(e);
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
export default {
    install: (app, options) => {
        const request = url => {
            return new Promise(async (resolve, reject) => {
               try{
                   const apiUrl = import.meta.env.VITE_BASE_API_URL,
                         response = await fetch(apiUrl + url, {
                            mode: 'cors',
                            headers: {
                                'Content-Type': 'application/json',
                            }
                         }),
                         text = await response.text();

                   if(!response.ok){
                       const exception = new Error();
                       exception.name = "ApiError";

                       console.log(response.statusText)
                       exception.response = {
                           message: response.statusText || "An Error Occurred with our third party API. Please check later!",
                           status: response.status
                       }

                       throw exception;
                   }

                   resolve(text);
               } catch(e){
                   const error = {
                       status: 500,
                       message: "An Application Error Occurred!"
                   }

                   if(e.name === "ApiError"){
                       error.status = e.response.status;
                       error.message = e.response.message
                   }

                   reject(error);
               }
            });
        }

        app.provide('request', request);
    }
}
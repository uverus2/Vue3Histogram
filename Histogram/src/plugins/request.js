export default {
    install: (app, options) => {
        const request = url => {
            return new Promise(async (resolve, reject) => {
                try {
                    const apiUrl = import.meta.env.VITE_BASE_API_URL,
                        fetchResponse = await fetch(apiUrl + url, {
                            mode: 'cors',
                            headers: {
                                'Content-Type': 'application/json',
                            }
                        }),
                        responseData = await fetchResponse.text();

                    if(!fetchResponse.ok){
                        const exception = new Error();
                        exception.name = "ApiError";

                        exception.response = {
                            message: fetchResponse.statusText || "An Error Occurred with our third party API. Please check later!",
                            status: fetchResponse.status
                        }

                        throw exception;
                    }

                    resolve(responseData);
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

        app.provide('request', request)
    }
}
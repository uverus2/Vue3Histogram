import * as yup from "yup";
import { messages } from "@/validationSchemas/customMessages";

const Schema = {
    validationSchema: yup.object({
        max: yup.number().typeError(messages.number).integer(messages.number).max(100, messages.max(100)).required(messages.required("Max Column")),
        min: yup.number().typeError(messages.number).min(0, messages.min(0)).required(messages.required("Min Column")),
        num: yup.number().typeError(messages.number).max(5000, messages.max(5000)).required(messages.required("Number"))
    })
}

export default Schema;
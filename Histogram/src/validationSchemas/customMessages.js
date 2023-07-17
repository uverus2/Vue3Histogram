export const messages = {
    number: "Please enter only numbers!",
    integer: "Please enter a whole number!",
    max: val => `Please enter a value less than ${val}!`,
    min: val => `Please enter a value bigger than ${val}!`,
    required: field => `The ${field} field is required!`
}
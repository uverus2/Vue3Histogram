# My Vue 3 Histogram 

Simple Vue 3 Histogram learning app. An API was used to generate random figures and Vue 3 and Tailwind Css were used to create the Histogram chart. 

## Installation & Running

- Step 1 ```cd Histogram```
- Step 2 copy the ".env.example" into ".env" file
- Step 2 install the project dependencies ```npm i```
- Step 3 ```npm run dev```

## Libraries/Approach Justification

Vue JS 3 - The approached utilized fully the Composition API making use of the "hook" based approach. 
TailwindCSS - Lightweight utility CSS framework. It was due to its smaller bundle size and its flexibility such as ability to inject classes. 
SASS/SCSS - It was used just in case custom styles were required. Ideally Tailwind CSS should be more than enough for the task, but it demonstrates knowledge of SCSS.
Vee-Validate - Simple to use validation framework for Vue. It was not required for this particular due to its size task but if it grows in the future the framework is there to expand.
Yup - Lightweight and easy to use schema validation. It pairs nicely with Vee-Validate 4 so its use was more for experimentation and education.
Pinia Store - As a state store to ensure state can be carried down to multiple parts of the application without injecting or using props.
Figma - For the favicon.
VueRouter - Ensures the application can be extended further.

## Form Validation Rules

- All fields are required
- Only integers allowed
- Only numbers allowed
- Max Value 
  - Number (how many we can retrieve at the same time) - 5000 max 
  - Max Column - 100
- Min Value
  - Min Column - 0 (In case we simply wish to start from 0 each time)

All rules can be found in validationSchemas folder. The idea of the folder is to contain our validation schema for the different forms without polluting the component.
You can find the all custom messages which can be shared with future Schemas. 

## API Error handling / Manipulation

The API error handling is basic covering a few cases:
- 404 - If the resource is not found in case the API changes their structure 
- 503 - In case the API is in maintenance mode
- 504 - In case there is a timeout which can be due to many reasons such as weak connection.
- All other errors with the API fetching. This error is very generic and can include all other status codes, or issues within the code.

The API logic encapsulated a few different files. We have a plugin which is responsible only for fetching data from the specific API and formatting the errors.
This was to ensure we can easily extend the functionality to other services the API provides. Currently, the logic will only support "GET" method as no other is required and it only supports TEXT responses.
We have the useIntegerFetch composable which handles the "Integer" service from the api. We extract the data and remove any line breaks we then pass it to the "Home" view.

The home view reduces or "counts" the values for the histogram and pass it down to the TheHistogram component to display the results.

The "TheErrorAlert" component handles the presenting of the error message based on the status code (if present).

## Histogram

The display the histogram Tailwind and CSS grids were used. The grid template columns will auto adjust based on the columns provided via the form.
The scaling formula that was used was current value (bar value) divided by the largest bar value and then times by the column length. The scaling value was then the height for each bar in rems.

## Future Improvements
- Testing with negative numbers. 
- Improving the grid logic to maybe allow users to scroll instead of fitting the columns in the view. The logic handles it however it does not look great.
- Abstracting the reduce logic from the home view into a composable. 
- Abstracting some of the functions into an "utilities" file. Functions which do not relate to the core logic of the components/view such as the getColour within the TheHistogram component.
- Improving naming of certain variables/functions. 
- Make the favicon into a logo which can be used as part of the header.


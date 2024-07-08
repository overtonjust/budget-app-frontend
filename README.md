# Simply Budgeting

Simply Budgeting is a full stack web application designed to demonstrate a budgeting tool

## To use 

#### Stack:
1. Fork and Clone both this repo as well as the [backend repo](https://github.com/overtonjust/budget-app-backend).

2. Update the PORT in the backends .env to your desired port.
    - Update your api url on the frontend to ```http://localhost:[PORT]/transactions```

3. Turn on the backend using ```npm start``` and the frontend using ``` npm run dev```.

#### Live Demo:

1. Alternatively to view the site you can go [here](simplybudgeting.netlify.app).

2. The frontend deployment is run on netlify using the link ```simplybudgeting.netlify.app```

3. The backend deployment is run on render using the link ```https://budget-app-backend-v1.onrender.com```


## Features

- Form access to create update and delete any transaction with error responses on invalid inputs.

- Responsive chart illustrations that adjust based on category filter

- Dynamic view allowing for functionality on both mobile and desktop devices.

## Stretch Goals

- Form is a dynamic component that adjusts based on being used for a new transaction or to edit an existing one.
    - Form also features a category dropdown as well as radio menu for transaction type to specify if it should be a withdrawal(-) or a deposit(+)
    - Error handling done via backend validations

- Dynamic mobile view with hamburger menu and Dynamic aside menu for filtering chart type and dataset

- Extensive use of Date object and various Date functions for formatting and displaying data

## Packages Used

- [Chart.js](https://www.chartjs.org/docs/latest/) 
- [React-chartjs.2](https://www.npmjs.com/package/react-chartjs-2)
- [Font Awesome](https://docs.fontawesome.com/web/use-with/react)
- [Hamburger-react](https://hamburger-react.netlify.app/)
- [React-select](https://react-select.com/home)
- [React-router-dom](https://reactrouter.com/en/main)
- [React-responsive](https://www.npmjs.com/package/react-responsive)
- [Sass](https://sass-lang.com/)

# Picnic Planner

## Running

- Get the repository to your local machine.

- Run these commands:

```
npm install
npm run dev
```

- Browse to [Picnic Planner Local](http://localhost:5173/)

## What is "Good Weather"?

For our purposes, a day is considered:

Ideal
: The high temperature is between 68 and 82 degrees (inclusive) and there is a 10% or less chance of rain.

Fair
: The high temperature is between 60 and 67 degrees (inclusive) or between 83 and 88 degrees (inclusive) and there is a greater than 10% chance but less than a 30% chance of rain.

Poor
: The high temperature is less than 60 degrees or greater than 88 degrees or the chance of rain is greater than 30%.

## Data Loading and Caching

Because we are using [React Query](https://tanstack.com/query/latest) to wrap our data fetching, we will only load the data we need when we need it. It will then be cached for 1 hour, so subsequent requests for the data will come from the cache.

## API Considerations

Because we are calling two different endpoints of the [Open Meteo](https://open-meteo.com/) API, we have lightly abstracted it by wrapping it with 2 functions that translate their data to our own interfaces. Replacing Open Meteo with a different API or source would require implementing those function signatures in a new file and replacing the import. This would also allow using different sources and switching easily.

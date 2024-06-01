# Average Calculator Microservice

This microservice provides an API to fetch and calculate the average of numbers based on specific IDs ('pi', 'f', 'e', 'r').

## API Endpoints

- `GET /numbers/{numberid}`

  Fetch numbers based on the given `numberid`.

  ### Parameters

  - `numberid`: Can be one of 'pi', 'f', 'e', 'r'.

  ### Response

  ```json
  {
    "windowPrevState": [5, 7],
    "windowNewState": [3, 5, 7],
    "avg": 4.00
  }

  ```

## Authentication and Authorization

This microservice requires authentication via a bearer token to access its endpoints securely. Include the bearer token in the `Authorization` header of your HTTP requests as follows:

```plaintext
Authorization: Bearer your_access_token_here

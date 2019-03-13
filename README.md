# Graphql Format Error

## Query

```graphql
query {
  error
}
```

## Response

```json
{
  "errors": [
    {
      "message": "Invalid input",
      "status": 422,
      "data": [
        {
          "message": "Invalid something"
        }
      ]
    }
  ],
  "data": {
    "error": null
  }
}
```

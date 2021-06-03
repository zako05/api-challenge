# API Challenges (Simple CRUD API) - HTTP request methods automated in Cypress

## Challenger

Challenger is unique ID associated with your progress.

### Get challenger ID

```bash
curl -iv -X POST https://apichallenges.herokuapp.com/challenger
```

output:

```bash
...
POST /challenger HTTP/1.1
Host: apichallenges.herokuapp.com
User-Agent: curl/7.64.1
Accept: */*

HTTP/1.1 201 Created
...
X-Challenger: a68ed1c9-4da6-43f1-b86a-1172ec70ff3b
```

### Set challenger as environment variable

cypress.json

```json
{
  ...,
  "env": {
    "challenger": "<challenger-id-generated-above>"
  }
}
```





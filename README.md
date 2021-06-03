# API Challenges (Simple CRUD API) - HTTP request methods automated in Cypress

main page: https://apichallenges.herokuapp.com/

## Challenger

Challenger is unique ID associated with your progress.

link: https://apichallenges.herokuapp.com/gui/{challenger-id}

### Get challenger ID

```bash
curl -iv -X POST https://apichallenges.herokuapp.com/challenger
```

Copy X-Challenger ID from output.

output:

```bash
...
POST /challenger HTTP/1.1
Host: apichallenges.herokuapp.com
User-Agent: curl/7.64.1
Accept: */*

HTTP/1.1 201 Created
...
X-Challenger: <challenger-id>
```

### Set challenger as environment variable

Copy & paste the challenger ID to cypress.json file.

cypress.json

```json
{
  ...,
  "env": {
    "challenger": "<challenger-id-generated-above>"
  }
}
```





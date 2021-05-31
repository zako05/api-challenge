# HTTP Request methods

## GET

Content-Type & Accept

```bash
curl -iv -o http-responses.md -H "X-CHALLENGER: 42114b1a-d819-426b-a0aa-663a0115fd01" -H "Accept: application/xml" -H "Content-Type: application/xml" -X GET https://apichallenges.herokuapp.com/todos
```

```bash
curl -iv -o http-responses.md -H "X-CHALLENGER: 42114b1a-d819-426b-a0aa-663a0115fd01" -H "Accept: application/json" -H "Content-Type: application/json" -X GET https://apichallenges.herokuapp.com/todos
```

```bash
curl -iv -o http-responses.md -H "X-CHALLENGER: 42114b1a-d819-426b-a0aa-663a0115fd01" -H "Accept:"" -X GET https://apichallenges.herokuapp.com/todos
```

```bash
curl -iv -o http-responses.md -H "X-CHALLENGER: 42114b1a-d819-426b-a0aa-663a0115fd01" -H "Accept: application/gzip" -X GET https://apichallenges.herokuapp.com/todos
```

201: No Content (there is body)

```bash
curl -iv -H "X-CHALLENGER: 42114b1a-d819-426b-a0aa-663a0115fd01" -X GET https://apichallenges.herokuapp.com/heartbeat
```

### Basic Authentication:

200: OK (with right token) or 403: Forbidden (with wrong token)

```bash
curl -iv -H "X-CHALLENGER: 42114b1a-d819-426b-a0aa-663a0115fd01" -H "X-Auth-Token: 8111afcf-cd94-40f8-b16b-53cd4f54db2c" -X GET https://apichallenges.herokuapp.com/secret/note
```

401: Unauthorized

```bash
curl -iv -H "X-CHALLENGER: 42114b1a-d819-426b-a0aa-663a0115fd01" -H "X-Auth-Token:" -X GET https://apichallenges.herokuapp.com/secret/note
```

### Bearer Token:

```bash
curl -iv -H "Authorization: Bearer 8111afcf-cd94-40f8-b16b-53cd4f54db2c" -H "X-CHALLENGER: 42114b1a-d819-426b-a0aa-663a0115fd01" -X GET https://apichallenges.herokuapp.com/secret/note
```

## POST

```bash
curl -iv -o http-responses.md -d '{"doneStatus":true}' -H "X-CHALLENGER: 42114b1a-d819-426b-a0aa-663a0115fd01" -H "Content-Type: application/json" -X POST https://apichallenges.herokuapp.com/todos/302
```

```bash
curl -iv -o http-responses.md -d '@http-request-method-post.xml' -H "X-CHALLENGER: 42114b1a-d819-426b-a0aa-663a0115fd01" -H "Accept: application/xml" -H "Content-Type: application/xml" -X POST https://apichallenges.herokuapp.com/todos
```

```bash
curl -iv -o http-responses.md -d '@http-request-method-post.json' -H "X-CHALLENGER: 42114b1a-d819-426b-a0aa-663a0115fd01" -H "Accept: application/json" -H "Content-Type: application/json" -X POST https://apichallenges.herokuapp.com/todos
```

doesn't work:

```bash
curl -iv -o http-responses.md -d '@multi-items.json' -H "X-CHALLENGER: 42114b1a-d819-426b-a0aa-663a0115fd01" -H "Accept: application/json" -H "Content-Type: application/json" -X POST https://apichallenges.herokuapp.com/todos
```

mix:

```bash
curl -iv -o http-responses.md -d '@http-request-method-post.xml' -H "X-CHALLENGER: 42114b1a-d819-426b-a0aa-663a0115fd01" -H "Accept: application/json" -H "Content-Type: application/xml" -X POST https://apichallenges.herokuapp.com/todos
```

```bash
curl -iv -o http-responses.md -d '@http-request-method-post.json' -H "X-CHALLENGER: 42114b1a-d819-426b-a0aa-663a0115fd01" -H "Accept: application/xml" -H "Content-Type: application/json" -X POST https://apichallenges.herokuapp.com/todos
```

### Basic Authentication:

401: Unauthorized (wrong credentials)

```bash
curl -iv -u "admin:admin" -H "X-CHALLENGER: 42114b1a-d819-426b-a0aa-663a0115fd01" -X POST https://apichallenges.herokuapp.com/secret/token
```

201: Created (received X-Auth-Token)

```bash
curl -iv -u "admin:password" -H "X-CHALLENGER: 42114b1a-d819-426b-a0aa-663a0115fd01" -X POST https://apichallenges.herokuapp.com/secret/token
```

200: OK (message less than 100 chars)

```bash
curl -iv -H "X-CHALLENGER: 42114b1a-d819-426b-a0aa-663a0115fd01" -H "X-Auth-Token: 8111afcf-cd94-40f8-b16b-53cd4f54db2c" -d '{"note":"my note"}' -X POST https://apichallenges.herokuapp.com/secret/note
```

200: OK (message more than 100 chars - message is truncate)

```bash
curl -iv -H "X-CHALLENGER: 42114b1a-d819-426b-a0aa-663a0115fd01" -H "X-Auth-Token: 8111afcf-cd94-40f8-b16b-53cd4f54db2c" -d '{"note":"blablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablabla"}' -X POST https://apichallenges.herokuapp.com/secret/note
```

### Bearer Token:

```bash
curl -iv -o http-responses.md -H "Authorization: Bearer 8111afcf-cd94-40f8-b16b-53cd4f54db2c" -H "X-CHALLENGER: 42114b1a-d819-426b-a0aa-663a0115fd01" -d '{"note":"new note again"}' -X POST https://apichallenges.herokuapp.com/secret/note
```

## DELETE

```bash
curl -iv -o http-responses.md -H "X-CHALLENGER: 42114b1a-d819-426b-a0aa-663a0115fd01" -X DELETE https://apichallenges.herokuapp.com/todos/302
```

405: Method Not Allowed

```bash
curl -iv -H "X-CHALLENGER: 42114b1a-d819-426b-a0aa-663a0115fd01" -X TRACE https://apichallenges.herokuapp.com/heartbeat
```

## PATCH

500: Internal Server Error (there is nothing to patch, no body)
```bash
curl -iv -H "X-CHALLENGER: 42114b1a-d819-426b-a0aa-663a0115fd01" -X PATCH https://apichallenges.herokuapp.com/heartbeat
```

## TRACE

501: Not Implemeted

```bash
curl -iv -H "X-CHALLENGER: 42114b1a-d819-426b-a0aa-663a0115fd01" -X TRACE https://apichallenges.herokuapp.com/heartbeat
```

## OPTIONS

```bash
curl -iv -o http-responses.md -H "X-CHALLENGER: 42114b1a-d819-426b-a0aa-663a0115fd01" -X OPTIONS https://apichallenges.herokuapp.com/todos
```

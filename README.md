# Few notes

- run `shell npm i ` with `shell --legacy-peer-deps ` to resolve the conflicts, would have taken sometime to find the conflicts so I left it as it is.

- add .env with the information in .env.example. We need the tokens because some routes as product CRUDs protected to simulate a real case senario.

- register a user at auth/register endpoint to gain access token. then use it to access the protected route, you can use the following payload, also its documented on swagger. api/docs

```sh
{
"fullName": "test",
"email": "test@gmail.com",
"avatar": "slaw",
"password": "lhon1234",
"isAdmin":true // isAdmin set to true gives authority to do actions other than just reading.
}
```

- cron job is running everyday at 10:00am at modules/products.controller.ts > create() function, I also made it accessible via a post request to facilitate testing.

- the data is transformed to my desired format and then saved to mongodb via insertMany, it inserts the data in chuncks to reduce high memory usage.
- then using gpt4 10 items descriptions are updated.
- to delete a product permenatly send a `shell ?permenant=true ` query, else it will set isDeleted to true and record deletion date, also documented in swagger.

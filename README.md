# Redis Challenge: Build a Real-Time, Multi-User Chat Platform

Slack, Discord, and WhatsApp have proven that responsive, real-time chat is an essential communication technology. This challenge is an opportunity to build your own real-time chat platform. [Watch our intro video on YouTube](https://www.youtube.com/watch?v=xKGSAdbTgfU).

# Short Description
so basically this project is the chat app which is using redis for database because that the challenge that create a chat app with using redis.
The technologies which we used in this project.
 * Redis for database.
 * Nodjs for backend.
 * React-Native for frontend.

Some packages which used in project to help in dev.
 * ioredis for redis client in nodejs
 * express for server.
 * sockio for real-time bidirectional event-based communication
 * bunyan for nicely viewing logs.
 * jsonwebtoken for authentication.

# API Description
If you want to use API of this project on your APP or web. you can easily use it.
but before going to use API you need to do some setting on your project like.
 * create `.env` file on your root and the your redis connection on it.
 ```bash
 REDIS_HOST=<hostname for Redis Enterprise>
 REDIS_PORT=<port number for Redis Enterprise>
 REDIS_PASSWORD=<password for Redis Enterprise>
 ```

Here is some API description of this Chat App
 ## Register User
 This api is use to register user.
 ```bash
 POST http://localhost:3099/api/register
 ```
 Request:
 ```bash
 {
     "firstname": "Muhammad",
     "lastname": "Zakir",
     "city": "Karachi",
     "country": "Pakistan",
     "username": "zakir",
     "password": "12345678"
   }
 ```

## Login User
 This api is use to login user.
 ```bash
 POST http://localhost:3099/api/login
 ```
 Request:
 ```bash
 {
     "username": "Zakir",
     "password": "12345678"
 }
 ```

  ## Get User profile
  This api is use to get User profile by username.
  ```bash
  GET http://localhost:3099/api/user/:username
  ```

  ## Get Channels
  This api is use to get all channels.
  ```bash
  GET http://localhost:3099/api/channel
  ```

  ## Add Channel
  This api is use to add new channels.
  ```bash
  POST http://localhost:3099/api/channel
  ```
  Request:
  ```bash
   {
       "channel": "Tech"
   }
  ```

  ## Delete Channel
  This api is use to delete channel.
  ```bash
  DELETE http://localhost:3099/api/channel:channel
  ```

  ## Get User in Channel
  This api is use to get all user on specific channel.
  ```bash
  GET http://localhost:3099/api/channel:channel
  ```

  ## Post Message
  This api is use to post new message.
  ```bash
  POST http://localhost:3099/api/message/:channel
  ```
  Request:
  ```bash
  {
      "message": "Tennis has two player to play"
  }
   ```

  ## Get All message in Channel
  This api is use to get all messages on specific channel. this is basically pagination and limit is 10, you need to pass `page`
  ```bash
  GET http://localhost:3099/api/message/:channel
  ```
  Query Param `page: number`.

  ## Search message in Channel
  This api is use to get search messages on specific channel. this is basically pagination and limit is 10, you need to pass `page`
  ```bash
  POST http://localhost:3099/api/message-search/:channel
  ```
  Query Param `page: number`.
  Request:
   ```bash
   {
      "keywords": {
      		"message": {
      				"cond": "contain", // like
      				"operand": ["awesome", "today"]
      			}
      	}
   }
  ```

  ## Search message in all channel
  This api is use to get search messages on specific channel. this is basically pagination and limit is 10, you need to pass `page`
  ```bash
  POST http://localhost:3099/api/message-search/
  ```
  Query Param `page: number`.
  Request:
  ```bash
  {
     "keywords": {
     		"message": {
     				"cond": "contain", // like
     				"operand": ["awesome", "today"]
     			}
     	}
  }
  ```

  ## Search message in all channel
  This api is use to get search user. this is basically pagination and limit is 10, you need to pass `page`
  ```bash
  POST http://localhost:3099/api/user-search
  ```
  Query Param `page: number`.
  Request:
  ```bash
  {
  	"keywords": {
              "username": {
                      "cond": "like",
                      "operand": ["zakir"]
                  },
                  "city": {
                      "cond": "like",
                      "operand": ["Karachi"]
                  }
          }
  	}
  ```
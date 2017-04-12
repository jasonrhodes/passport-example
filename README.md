## A baseline passport example

To get the app running:
* Clone repo and `cd` into repo folder
* `npm install`
* `PORT=4001 node app.js`

To see passport-enabled flow in action:
```
# create a user "jason"

$ curl -i localhost:4001/register -X POST -H 'Content-type: application/json' -d '{"username": "jason", "password": "great123", "age": 36}'
HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 51
ETag: W/"33-vQA+gSCjpqA3Tvf575jcs55z8nU"
Date: Wed, 12 Apr 2017 02:27:21 GMT
Connection: keep-alive

{"username":"jason","password":"great123","age":36}


# list users

$ curl -i localhost:4001/list
HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 61
ETag: W/"3d-c15wYAS2pkxazb8LPncz+hsqOJA"
Date: Wed, 12 Apr 2017 02:27:28 GMT
Connection: keep-alive

{"jason":{"username":"jason","password":"great123","age":36}}


# create a user "sarah"

$ curl -i localhost:4001/register -X POST -H 'Content-type: application/json' -d '{"username": "sarah", "password": "zingzing22!", "age": 27}'
HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 54
ETag: W/"36-hnSe/8EaUJ3w3OJkV/9CcRg7IAE"
Date: Wed, 12 Apr 2017 02:27:52 GMT
Connection: keep-alive

{"username":"sarah","password":"zingzing22!","age":27}


# list users

$ curl -i localhost:4001/list
HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 124
ETag: W/"7c-VfVTB+iDsKX1yBsbuUHzpow/Zwg"
Date: Wed, 12 Apr 2017 02:27:54 GMT
Connection: keep-alive

{"jason":{"username":"jason","password":"great123","age":36},"sarah":{"username":"sarah","password":"zingzing22!","age":27}}


# try to create another user "sarah" (custom express middleware returns 409 Conflict w00t)

$ curl -i localhost:4001/register -X POST -H 'Content-type: application/json' -d '{"username": "sarah", "password": "zingzing22!", "age": 27}'
HTTP/1.1 409 Conflict
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 37
ETag: W/"25-scZ5U4aoQHDOK1uRZ6MwTA10SqU"
Date: Wed, 12 Apr 2017 02:28:00 GMT
Connection: keep-alive

{"message":"Username already exists"}


# log in as sarah with correct password

$ curl -i localhost:4001/login -X POST -H 'Content-type: application/json' -d '{"username": "sarah", "password": "zingzing22!"}'
HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: text/html; charset=utf-8
Content-Length: 3
ETag: W/"3-RRH4wOITyOxRVZ60of/MvH5CcQ4"
Date: Wed, 12 Apr 2017 02:28:30 GMT
Connection: keep-alive

yay


# log in as sarah with wrong password (passport ta da)

$ curl -i localhost:4001/login -X POST -H 'Content-type: application/json' -d '{"username": "sarah", "password": "baaaaad"}'
HTTP/1.1 401 Unauthorized
X-Powered-By: Express
Date: Wed, 12 Apr 2017 02:28:34 GMT
Connection: keep-alive
Content-Length: 12

Unauthorized

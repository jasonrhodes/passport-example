## A baseline passport example

To get the app running:
* Clone repo and `cd` into repo folder
* `npm install`
* `PORT=4001 node app.js`

To see passport-enabled routes in action:
```
$ curl -i localhost:4001/register -X POST -H 'Content-type: application/json' -d '{"username": "good", "password": "great"}'
HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: text/html; charset=utf-8
Content-Length: 3
ETag: W/"3-RRH4wOITyOxRVZ60of/MvH5CcQ4"
Date: Wed, 12 Apr 2017 01:43:22 GMT
Connection: keep-alive

yay


$ curl -i localhost:4001/register -X POST -H 'Content-type: application/json' -d '{"username": "bad", "password": "great"}'
HTTP/1.1 401 Unauthorized
X-Powered-By: Express
Date: Wed, 12 Apr 2017 01:52:56 GMT
Connection: keep-alive
Content-Length: 12
```

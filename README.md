# Pubsub node client extender

## Environment setup

### Node

- Install [node v0.12](http://nodejs.org/download/)

- Install node-foreman `$ npm install -g foreman`

- run `$ npm install`

- Follow theses [Prerequisites](https://cloud.google.com/pubsub/prereqs) to setup tour app at [Google Developer Console](https://console.developers.google.com/)

- Create file `.env` in project structure with format:

```
MONGO_URL=127.0.0.1:27017/google-pubsub
PROJECT_ID=cogent-chess-88921
KEY_FILE_NAME=./keys/my-pubsub-test-2de1d6c80fbb.json
PORT=3001

```

- Setup your project `key.json` file in folder `keys` inside project root directory

## Running

- `$ nf start`

## Test Requests

- to send messages: `$ curl -X POST http://localhost:3001/`

- to read  last received message by worker: `$ curl http://localhost:3001/`

- to perform apache benchmark `$ ab -n 1000 -c 5 -T 'application/x-www-form-urlencoded' -p post.txt http://localhost:3001/`


## References

- [Pubsub](https://cloud.google.com/pubsub/overview)
- [GoogleCloudPlatform/gcloud-node](https://github.com/GoogleCloudPlatform/gcloud-node/)

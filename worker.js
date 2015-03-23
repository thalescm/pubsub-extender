var express = require('express'),

    app = express(),

    gcloud = require('gcloud'),

    pubsub = gcloud.pubsub({
      projectId: process.env.PROJECT_ID || 'cogent-chess-88921',
      keyFilename: process.env.KEY_FILE_NAME || './keys/my-pubsub-test-2de1d6c80fbb.json'
    });

    // database
    mongojs = require('mongojs'),
    db = mongojs(process.env.MONGO_URL || '127.0.0.1:27017/google-pubsub'),

    projetName = 'projects/' + (process.env.PROJECT_ID || 'cogent-chess-88921'),
    topic_GET_url = projetName + '/topics/' + (process.env.PROJECT_ID || 'cogent-chess-88921');



var topic = pubsub.topic('my-new-topic');

var subscription = topic.subscription('new-subscription');


// Register listeners to start pulling for messages. (Push system);
function onError(err) {
  console.log('Subscriber:');
  console.log('Error Message');
  console.log(err);
  console.log('\n');
}

function onMessage(message) {
  console.log('Subscriber:');
  console.log('Received Message.');
  console.log(message);
  console.log('\n');
}

subscription.on('error', onError);
subscription.on('message', onMessage);

// // Subscribe to the topic.
// topic.subscribe('new-subscription', function(err, subscription) {
//
//   if (err) {
//     console.log('Subscription');
//     console.log('Error Creating Subscription');
//     console.log(err);
//     console.log('\n');
//   } else {
//     // Register listeners to start pulling for messages.
//     function onError(err) {
//       console.log('Subscriber:');
//       console.log('Error Message');
//       console.log(err);
//       console.log('\n');
//     }
//     function onMessage(message) {
//       console.log('Subscriber:');
//       console.log('Received Message.');
//       console.log(message);
//       console.log('\n');
//     }
//     subscription.on('error', onError);
//     subscription.on('message', onMessage);
//   }
//
//   // // Remove listeners to stop pulling for messages.
//   // subscription.removeListener('message', onMessage);
//   // subscription.removeListener('error', onError);
// });

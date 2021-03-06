/*!
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/*!
 * @module pubsub-extender/subscription
 */

var express = require('express'),
    moment = require('moment-timezone'),
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




// pubsub.createTopic('my-new-topic', function(err, topic) {

//   if (err) {
//     console.log("Error: " + err);
//   } else {
//     console.log("Created my-new-topic!");
//     topic.publish('New message!', function(err) {

//       if (err) {
//         console.log("Error: " + err);
//       } else {
//         console.log("New message sent!");
//       }
//     });

//   }
// });


var topic = pubsub.topic('my-new-topic');

// Express setup
app.listen(process.env.PORT || 3001);
console.log('Server listening on port 3001');

app.post('/', function(req, res) {

  var timestamp = moment().unix();

  /*
    though Pub/Sub usually delivers messages in order of publication,
    this is not guaranteed; it is possible for subscriptions to receive
    messages out of order. For this reason, we suggest that you include
    sequence information in the message payload or attribute so that
    subscribers that need in-order messaging can implement logic to do so.
  */
  topic.publish({
    data: {

      timestamp: timestamp,
      event: 'Test Publish'
    },
    attributes: {
      order: "1"
    }
  }, function(err) {
    if (err) {
      console.log('Publisher:');
      console.log('Error sending message to ' + topic.name + ' topic');
      console.log(err);
      console.log('\n');
      res.send(500, err);
    } else {
      console.log('Publisher:');
      console.log('Sent message with timestamp ' + timestamp);
      console.log('\n');
      res.json(200, {timestamp: timestamp});
    }
  });

});

// Currently pubsub doesn't have all methods listed in pubsub API reference, WTF (YES, I KNOW RIGTH!)
// BUUUUT, there's a method that (in their node API they call it private)
// that you can use to make requests. Soooo thats nice
// var getTopic = function(url) {
//
//   var path = projetName + '/topics';
//   console.log(path);
//   pubsub.makeReq_('GET', path, {}, true, function(err, result) {
//
//     if(err){
//       console.log('ERROR! didnt get the topic');
//       console.log(err);
//     } else {
//       console.log('Success! got the topic!');
//       console.log(result);
//     }
//
//   })
// };


// topic.subscribe('new-subscription', {
//   ackDeadlineSeconds: 90,
//   autoAck: true,
//   interval: 30
// }, function(err, subscription) {
//   if (err) {
//     console.log(err);
//   }
// });

var subscription = topic.subscription('new-subscription');


// subscription.delete(function(err) {
//   if (err) {
//
//     console.log('Fail to delete subscription');
//   } else {
//
//     console.log('Subscription Deleted');
//   }
// });

// Please read https://cloud.google.com/pubsub/subscriber

app.get('/', function(req, res) {

  subscription.pull(
    {
      maxResults : 3
    }, function(err, messages) {

      if(err) {

          console.log('Subscriber:');
          console.log('Error getting messages');
          console.log(err);
          console.log('\n');
          res.send(500, err);
      } else {

          console.log('Subscriber:');
          console.log('Received Messages.');
          console.log(messages);
          console.log('\n');

          if (messages.length > 0) {


            // UNCOMMENT LINES BELOW TO ENABLE AUTO ACK FUNCTIONALITY

            var ackIds = messages.map(function(message) {
              return message.ackId;
            });

            subscription.ack(ackIds, function(err) {

              if (err) {
                console.log('It was not possible to ack messages');
                res.json(200, messages);
              } else {
                console.log('Successfuly acked messages');
                res.json(200, messages);
              }
            });
          } else {

            res.json(404, 'No message Found');
          }
      }
  });

});

# Google Cloud Pub/Sub POC

## Scaling

Well, as mentioned in the [Quota Policy](https://cloud.google.com/pubsub/quotas), the documentation says everything:  

- Each project can contain up to 10,000 topics.
- Each topic can have up to 10,000 subscriptions.
- Each project can publish up to 10,000 messages per second, on average, across all topics.
- Each project can make up to 20,000 pull or acknowledgment operations per second, on average, across all subscriptions.

## Erasing

As discussed before, in a pulling type of consumer, everytime you send an ACK call to a received message, the subscription deletes the message from the queue.

For a push subscriber, the message is deleted unless you return and error from the POST request you receive. Therefore, the deletion is kind of automatic.

## Control of Messages Order

Please, take a look at the [Subscriber Guide](// Please read https://cloud.google.com/pubsub/subscriber) and the [Publisher Guide](https://cloud.google.com/pubsub/publisher)  

Well, whats really important is this:  

- "Though Pub/Sub usually delivers messages in order of publication, this is not guaranteed; it is possible for subscriptions to receive messages out of order"

- "It may happen that a message is delivered more than once, and out of order. Therefore, your subscriber should be idempotent when processing messages, and, if necessary, able to handle messages received out of order."

- "We recommend that the publisher of the topic to which you subscribe include some kind of sequence information in the message."

###<strong>In my tests I couldn't make a single flow with all messages in order... Either sending or not sending the ACK...</strong>

## Batching

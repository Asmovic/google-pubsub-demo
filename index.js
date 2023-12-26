/* const serviceAccountKey = require('./raffle-draw-403915-cd50c640bd66.json'); */
require('dotenv').config();
const serviceAccountKey = JSON.parse(
  process.env.GOOGLE_APPLICATION_CREDENTIALS
);

const { PubSub } = require('@google-cloud/pubsub');
const pubSubClient = new PubSub({
  projectId: serviceAccountKey.project_id,
  credentials: {
    client_email: serviceAccountKey.client_email,
    private_key: serviceAccountKey.private_key,
  },
});

const topicName = 'order';
const subscriptionName = 'order-sub';

const processes = async () => {
  /* const [topic] = await pubSubClient.createTopic(topicName);
  console.log(`Topic ${topic.name} created.`);

  const [subscription] = await topic.createSubscription(subscriptionName);
  console.log(`Subscription ${subscription.name} created.`); */

  const data = JSON.stringify({ name: 'protect service key' });
  const messageId = await pubSubClient
    .topic(topicName)
    .publish(Buffer.from(data));
  console.log(`Message ${messageId} published.`);
};

processes();

const subscription = pubSubClient.subscription(subscriptionName);

const messageHandler = (message) => {
  console.log(`Received message: ${message.data}`);
  message.ack();
};

subscription.on('message', messageHandler);

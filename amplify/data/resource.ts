import { type ClientSchema, a, defineData } from '@aws-amplify/backend';

const schema = a.schema({
  Schedule: a
    .model({
      date: a.date().required(),
      text: a.string().required(),
      color: a.string().required(),
      startTime: a.string().required(),
      endTime: a.string().required()
    })
    .authorization((allow) => [allow.guest()]),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: 'iam',
  },
});

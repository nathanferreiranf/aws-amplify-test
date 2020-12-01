// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Sala } = initSchema(schema);

export {
  Sala
};
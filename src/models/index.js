// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Sala, Evento } = initSchema(schema);

export {
  Sala,
  Evento
};
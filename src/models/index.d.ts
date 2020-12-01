import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





export declare class Sala {
  readonly id: string;
  readonly name: string;
  readonly description?: string;
  constructor(init: ModelInit<Sala>);
  static copyOf(source: Sala, mutator: (draft: MutableModel<Sala>) => MutableModel<Sala> | void): Sala;
}

export declare class Evento {
  readonly id: string;
  readonly name: string;
  readonly description?: string;
  constructor(init: ModelInit<Evento>);
  static copyOf(source: Evento, mutator: (draft: MutableModel<Evento>) => MutableModel<Evento> | void): Evento;
}
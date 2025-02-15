import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface Comment {
  'text' : string,
  'imageUrl' : string,
  'timestamp' : bigint,
}
export interface _SERVICE {
  'createComment' : ActorMethod<[string, string], Array<Comment>>,
  'getAllComments' : ActorMethod<[], Array<Comment>>,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];

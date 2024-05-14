import mitt, { Emitter } from 'mitt';
export const emitter: Emitter<Record<string, any>> = mitt();

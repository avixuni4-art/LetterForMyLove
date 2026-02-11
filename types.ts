
export interface LetterContent {
  text: string;
  loading: boolean;
  error: string | null;
}

export enum EnvelopeState {
  CLOSED = 'CLOSED',
  OPENING = 'OPENING',
  OPENED = 'OPENED'
}

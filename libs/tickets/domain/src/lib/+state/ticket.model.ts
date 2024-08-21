import { Flight } from "../entities/flight";

export interface TicketState {
  flights: Flight[];
  tickets: unknown;
  basket: Record<number, boolean>;
}

export const initialTicketState: TicketState = {
  flights: [],
  tickets: {},
  basket: {}
};

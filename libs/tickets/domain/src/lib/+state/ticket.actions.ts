import { createActionGroup, props } from "@ngrx/store";
import { Flight } from "../entities/flight";

export const ticketActions = createActionGroup({
  source: 'ticket',
  events: {
    'filter updated': props<{ from: string; to: string; urgent: boolean }>(),
    'flights loaded': props<{ flights: Flight[] }>(),
  }
});

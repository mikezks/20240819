import { createFeature, createReducer, on } from '@ngrx/store';
import { initialTicketState } from './ticket.model';
import { ticketActions } from './ticket.actions';


export const ticketFeature = createFeature({
  name: 'ticket',
  reducer: createReducer(
    initialTicketState,

    on(ticketActions.flightsLoaded, (state, action) => {
      const flights = action.flights;
      return { ...state, flights };
    })
  )
});

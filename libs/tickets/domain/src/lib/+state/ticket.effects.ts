import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs';
import { FlightService } from '../infrastructure/flight.service';
import { ticketActions } from './ticket.actions';

export const loadFlights = createEffect((
  actions$ = inject(Actions),
  flightService = inject(FlightService)
) => actions$.pipe(
    ofType(ticketActions.filterUpdated),
    switchMap(action => flightService.find(
      action.from,
      action.to
    )),
    map(flights => ticketActions.flightsLoaded({ flights}))
  ),
  { functional: true }
);

export const ticketEffects = { loadFlights };

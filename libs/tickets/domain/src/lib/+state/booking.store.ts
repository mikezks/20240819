import { patchState, signalStore, withComputed, withHooks, withMethods, withState } from '@ngrx/signals'
import { Flight } from '../entities/flight';
import { computed } from '@angular/core';

export type BookingState = {
  flights: Flight[]
}

export const initialBookingState: BookingState = {
  flights: []
};


export const BookingStore = signalStore(
  // { providedIn: 'root' },
  withState(initialBookingState),
  withComputed(store => ({
    delayedFlights: computed(() => store.flights().filter(flight => flight.delayed))
  })),
  withMethods(store => ({
    addFlights: (flights: Flight[]) => {
      patchState(store, { flights });
      console.log('Booking Store updated flights', flights);
    }
  })),
  withHooks(() => ({
    onInit: () => console.log('BookingStore INIT')
  }))
);

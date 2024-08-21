import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CityPipe } from '@flight-demo/shared/ui-common';
import { Flight, ticketActions, ticketFeature } from '@flight-demo/tickets/domain';
import { Store } from '@ngrx/store';
import { FlightCardComponent } from '../flight-card/flight-card.component';

@Component({
  selector: 'app-flight-search',
  standalone: true,
  templateUrl: './flight-search.component.html',
  styleUrls: ['./flight-search.component.css'],
  imports: [CommonModule, FormsModule, CityPipe, FlightCardComponent],
})
export class FlightSearchComponent {
  private store = inject(Store);

  from = 'Paris';
  to = 'London';
  flights$ = this.store.select(ticketFeature.selectFlights);

  basket: Record<number, boolean> = {
    3: true,
    5: true,
  };

  search(): void {
    this.store.dispatch(
      ticketActions.filterUpdated({ from: this.from, to: this.to, urgent: false })
    );
  }

  delay(): void {
    // this.flights = this.toFlightsWithDelays(this.flights, 15);
  }

  toFlightsWithDelays(flights: Flight[], delay: number): Flight[] {
    if (flights.length === 0) {
      return [];
    }

    const oldFlights = flights;
    const oldFlight = oldFlights[0];
    const oldDate = new Date(oldFlight.date);
    const newDate = new Date(oldDate.getTime() + 1000 * 60 * delay);

    const newFlight = { ...oldFlight, date: newDate.toISOString() };

    return [newFlight, ...flights.slice(1)];
  }
}

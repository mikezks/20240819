import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';
import { CityPipe } from '@flight-demo/shared/ui-common';
import { BookingStore, Flight, FlightService } from '@flight-demo/tickets/domain';
import { FlightCardComponent } from '../flight-card/flight-card.component';

@Component({
  selector: 'app-flight-search',
  standalone: true,
  templateUrl: './flight-search.component.html',
  styleUrls: ['./flight-search.component.css'],
  imports: [CommonModule, ReactiveFormsModule, CityPipe, FlightCardComponent],
})
export class FlightSearchComponent {
  private flightService = inject(FlightService);
  private store = inject(BookingStore);

  filterForm = inject(NonNullableFormBuilder).group({
    from: ['Paris'],
    to: ['London']
  });

  flights = this.store.flights;

  basket = signal<Record<number, boolean>>({
    3: true,
    5: true,
  });

  search(): void {
    this.flightService.find(
      this.filterForm.controls.from.value,
      this.filterForm.controls.to.value
    ).subscribe({
      next: (flights) => {
        this.store.addFlights(flights)
      },
      error: (errResp) => {
        console.error('Error loading flights', errResp);
      },
    });
  }

  delay(): void {
    if (this.flights().length) {
      /* this.flights.update((flights) => {
        const oldFlight = flights[0];
        const oldDate = new Date(oldFlight.date);

        const newDate = new Date(oldDate.getTime() + 1000 * 60 * 15);
        const newFlight: Flight = { ...oldFlight, date: newDate.toISOString() };

        return [newFlight, ...flights.slice(1)];
      }); */
    }
  }

  updateBasket(flightId: number, selected: boolean): void {
    this.basket.update((basket) => ({
      ...basket,
      [flightId]: selected,
    }));
  }
}

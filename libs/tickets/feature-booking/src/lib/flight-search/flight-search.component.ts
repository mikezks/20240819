import { CommonModule } from '@angular/common';
import { Component, computed, effect, inject, Injector, signal } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { CityPipe } from '@flight-demo/shared/ui-common';
import { Flight, FlightService } from '@flight-demo/tickets/domain';
import { FlightCardComponent } from '../flight-card/flight-card.component';
import { debounceTime } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-flight-search',
  standalone: true,
  templateUrl: './flight-search.component.html',
  styleUrls: ['./flight-search.component.css'],
  imports: [CommonModule, FormsModule, CityPipe, FlightCardComponent],
})
export class FlightSearchComponent {
  private injector = inject(Injector);
  private flightService = inject(FlightService);

  from = signal('Paris');
  to = signal('London');
  lazyFrom$ = toObservable(this.from).pipe(
    debounceTime(1_000)
  );
  lazyFrom = toSignal(this.lazyFrom$, {
    initialValue: this.from()
  });

  flights = signal<Array<Flight>>([]);
  flightRoute = computed(
    () => 'From ' + this.lazyFrom() + ' to ' + this.to() + '.'
  );

  basket = signal<Record<number, boolean>>({
    3: true,
    5: true,
  });

  constructor() {
    effect(() => console.log(this.flightRoute()));

    console.log(this.to());
    this.to.set('Madrid');
    console.log(this.to());
    this.to.set('Rome');
    console.log(this.to());
    this.to.set('Oslo');
    console.log(this.to());
    this.to.set('San Francisco');
    console.log(this.to());

    const counter = signal(0);
    const isEven = computed(() => counter() % 2 ? false : true);

    // counter: 0
    // isEven: true
    // counter.set(1)
    // counter: 1
    // (isEven: true) --> would be a combineLatest event in RxJS, but the effect will not trigger
    // isEven: false
    // counter.set(2)
    // counter: 2
    // (isEven: false) --> would be a combineLatest event in RxJS, but the effect will not trigger
    // isEven: true
    // => Signals are Glitch-free

  }

  search(): void {
    effect(() => console.log(this.flightRoute()), {
      injector: this.injector
    });

    this.injector.get(Router);

    this.flightService.find(this.from(), this.to()).subscribe({
      next: (flights) => {
        this.flights.set(flights);
      },
      error: (errResp) => {
        console.error('Error loading flights', errResp);
      },
    });
  }

  delay(): void {
    this.flights.set(this.toFlightsWithDelays(this.flights(), 15));
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

  updateBasket(flightId: number, selected: boolean): void {
    this.basket.update((basket) => ({
      ...basket,
      [flightId]: selected,
    }));
  }
}

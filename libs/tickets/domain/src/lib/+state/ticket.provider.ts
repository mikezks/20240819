import { EnvironmentProviders, makeEnvironmentProviders } from "@angular/core";
import { provideState } from "@ngrx/store";
import { ticketFeature } from "./ticket.feature";
import { provideEffects } from "@ngrx/effects";
import { ticketEffects } from "./ticket.effects";


export function provideTicketFeature(): EnvironmentProviders {
  return makeEnvironmentProviders([
    provideState(ticketFeature),
    provideEffects([ticketEffects])
  ]);
}

import { AuthService } from './../../../../libs/shared/util-auth/src/lib/auth.service';
import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  imports: [RouterModule],
  selector: 'flight-demo-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'miles';
  authService = inject(AuthService);

  constructor() {
    this.authService.userName.subscribe((userName) => {
      console.log('userName', userName);
    });
  }
}

export default AppComponent;

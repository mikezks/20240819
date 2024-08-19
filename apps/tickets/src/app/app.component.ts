import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ConfigService } from '@flight-demo/shared/util-config';
import { AuthService } from '@flight-demo/shared/util-auth';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';

@Component({
  standalone: true,
  imports: [SidebarComponent, NavbarComponent, RouterOutlet],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Hello World!';

  configService = inject(ConfigService);
  auth = inject(AuthService);

  constructor() {
    this.auth.login('Max Mustermann');

    // TODO: In a later lab, we will assure that
    //  loading did happen _before_ we use the config!
    this.configService.loadConfig();
  }
}

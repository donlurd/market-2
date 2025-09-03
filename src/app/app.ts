import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Home } from './home/home';
import { SearchBarComponent } from './search-bar-component/search-bar-component';
import { HeaderComponent } from './header-component/header-component';
import { CharComponent } from './char-component/char-component';
import { TabComponent } from './tab-component/tab-component';
import { SummaryComponent } from './summary-component/summary-component';
import { InstrumentItemComponent } from './instrument-item-component/instrument-item-component';
import { InstrumentListComponent } from './instrument-list-component/instrument-list-component';


@Component({
  selector: 'app-root',
  imports: [Home, RouterOutlet],
  //templateUrl: './app.html',
  template: `
    <main>
      <header class="brand-name">
        <img class="brand-logo" src="/assets/logo.svg" alt="logo" aria-hidden="true" />
      </header>
      <section class="content">
        <app-home></app-home>
      </section>
    </main>
  `,
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('homes');
}

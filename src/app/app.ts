import { Component, signal, ChangeDetectionStrategy, inject, computed } from '@angular/core';

import { RouterOutlet } from '@angular/router';
import { Home } from './home/home';
import { MarketsStore } from './global';
import { SearchBarComponent } from './search-bar-component/search-bar-component';
import { HeaderComponent } from './header-component/header-component';
import { CharComponent } from './char-component/char-component';
import { TabComponent } from './tab-component/tab-component';
import { SummaryComponent } from './summary-component/summary-component';
import { InstrumentItemComponent } from './instrument-item-component/instrument-item-component';
import { InstrumentListComponent } from './instrument-list-component/instrument-list-component';


@Component({
  selector: 'app-root',
  imports: [SearchBarComponent, HeaderComponent, CharComponent, TabComponent, SummaryComponent, InstrumentItemComponent, InstrumentListComponent],
  //templateUrl: './app.html',
  template: `
    <div class="layout">
      <header class="top">
        <app-search-bar-component (buscar)="onBuscar($event)"></app-search-bar-component>
        <app-header-component class="m1"/>
      </header>

      <app-tab-component class="tabs"/>
      <section class="grid">
        <app-char-component class="char"/>
        <app-summary-component class="summary"/>
      </section>
      <app-instrument-list-component class="list"/>
    </div>
  `,
  // styleUrl: './app.css'
  styles: [`
    .layout { padding: 1rem; display: grid; gap: 1rem; }
    .top { display: flex; align-items: center; gap: 1rem; }
    .ml { margin-left: auto; }
    .grid { display: grid; grid-template-columns: 2fr 1fr; gap: 1rem; }
    .list { }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})


export class App {
  private readonly store = inject(MarketsStore);

  onBuscar(q: string): void {
    // Búsqueda simple por símbolo/nombre en la lista cargada
    const found = this.store.instrumentos().find(i =>
      i.simbolo.toLowerCase().includes(q.toLowerCase()) || i.nombre.toLowerCase().includes(q.toLowerCase())
    );
    if (found) this.store.seleccionarInstrumento(found);
  }
}
import { Component, ChangeDetectionStrategy, output, signal  } from '@angular/core';

@Component({
  selector: 'app-search-bar-component',
  imports: [],
  template:`
  <input 
    type="search" 
    [value]="q()"

    (keyup.enter)="buscar.emit(q())"
    placeholder="Busca un instrumento... "
    class="input"
    aria-label="Buscar instrumento"
    />
  ` ,
  styles: [`.input { width: 100%; padding: .5rem .75rem; border: 1px solid #ccc; border-radius: .5rem; }`],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host :{class:'block w-full'}
})
export class SearchBarComponent {
  buscar = output<string>();
  q = signal('');

}

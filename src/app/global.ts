import { Injectable, computed, signal, effect, inject } from '@angular/core';
import { InstrumentsService } from './service';

export type Periodo = '1M' | '3M' | '6M' | '1A';

export interface Instrumento {
  id: string;
  simbolo: string;
  nombre: string;
  precio: number;
  variacionPct: number;
  volumen: number;
}

export interface IndexResumen {
  indice: string;        // p.ej. IPSA
  valorActual: number;
  variacionPct: number;
  variacionPts: number;
  hora: string;
}

@Injectable({ providedIn: 'root' })
export class MarketsStore {
  private readonly api = inject(InstrumentsService);

  // --- Estado base ---
  private readonly _indice = signal<'IPSA' | 'IGPA' | 'NASDAQ'>('IPSA');
  private readonly _periodo = signal<Periodo>('1M');
  private readonly _instrumentos = signal<Instrumento[]>([]);
  private readonly _seleccionado = signal<Instrumento | null>(null);
  private readonly _resumen = signal<IndexResumen | null>(null);
  private readonly _loading = signal(false);

  // --- Derivados ---
  readonly indice = this._indice.asReadonly();
  readonly periodo = this._periodo.asReadonly();
  readonly instrumentos = this._instrumentos.asReadonly();
  readonly seleccionado = this._seleccionado.asReadonly();
  readonly resumen = this._resumen.asReadonly();
  readonly loading = this._loading.asReadonly();

  readonly instrumentosOrdenados = computed(() =>
    [...this._instrumentos()].sort((a, b) => b.variacionPct - a.variacionPct)
  );

  // Carga inicial / recargas al cambiar índice o periodo
  private _loadFx = effect(async () => {
    this._loading.set(true);
    const indice = this._indice();
    const periodo = this._periodo();
    const data = await this.api.getDashboard(indice, periodo);
    this._instrumentos.set(data.instrumentos);
    this._resumen.set(data.resumen);
    // Mantener selección si existe; si no, seleccionar primero
    const actual = this._seleccionado();
    this._seleccionado.set(
      actual && data.instrumentos.some(i => i.id === actual.id)
        ? actual
        : (data.instrumentos[0] ?? null)
    );
    this._loading.set(false);
  });

  // --- Acciones puras ---
  seleccionarInstrumento = (i: Instrumento): void => this._seleccionado.set(i);
  cambiarPeriodo = (p: Periodo): void => this._periodo.set(p);
  cambiarIndice = (i: 'IPSA' | 'IGPA' | 'NASDAQ'): void => this._indice.set(i);
}

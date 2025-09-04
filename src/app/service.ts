import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { Periodo, Instrumento, IndexResumen } from "./global";

@Injectable({ providedIn: 'root' })
export class InstrumentsService {
  private readonly http = inject(HttpClient);

  // Simulado; cuando tengas el zip, cambia las rutas a assets/*.json
  async getDashboard(indice: string, periodo: Periodo): Promise<{ resumen: IndexResumen; instrumentos: Instrumento[]; series: Array<{ t: string; v: number }>; }> {
    const base = `/assets/mock/${indice}-${periodo}.json`;
    return firstValueFrom(this.http.get<typeof dummy>(base));
  }
}

// Solo para tipado; elimina cuando uses tus JSON reales
const dummy = { resumen: {} as IndexResumen, instrumentos: [] as Instrumento[], series: [] as Array<{ t: string; v: number }> };

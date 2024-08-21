import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private apiUrl = 'https://pokeapi.co/api/v2/pokemon/'; // Limite de 20 pokemones

  constructor(private http: HttpClient) { }

  getPokemon(nameOrId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}${nameOrId}/`);
  }

  // Fetches details of a single Pokémon by its ID
  getPokemons(): Observable<any> {
    return this.http.get(`${this.apiUrl}?limit=20`);
  }
}

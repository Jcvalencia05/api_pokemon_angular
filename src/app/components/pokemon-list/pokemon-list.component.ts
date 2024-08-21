import { ChangeDetectionStrategy, Component, OnInit, signal } from '@angular/core';
import { PokemonService } from '../../services/pokemon.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-pokemon-list',
  standalone:true,
  imports:[
    HttpClientModule,
    CommonModule
  ],
  providers:[
    PokemonService
  ],
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PokemonListComponent implements OnInit {

  pokemonList = signal<{ name: string; image: string }[]>([]);
  loading = signal(false);

  constructor(private pokemonService: PokemonService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadPokemons();
  }

  // Fetches the first 20 Pokémon
  loadPokemons(): void {
    this.loading.set(true);
    this.pokemonService.getPokemons().subscribe({
      next: (response: any) => {
        const pokemonArray = response.results.map((pokemon: any, index: number) => ({
          name: pokemon.name,
          image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png`,
        }));
        this.pokemonList.set(pokemonArray);
        this.loading.set(false);
      },
      error: () => {
        console.error('Error fetching Pokémon data');
        this.loading.set(false);
      },
    });
  }
  
}

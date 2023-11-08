import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Observable, Subject, debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { Hero } from 'src/app/core/models/hero.model';
import { HeroService } from 'src/app/core/services/hero.service';

@Component({
  selector: 'app-hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: ['./hero-search.component.scss']
})
export class HeroSearchComponent implements OnInit {
  heroes$!: Observable<Hero[]>;
  @Input() label = '';
  @Output() private selected = new EventEmitter<Hero>();

  private searchTerm = new Subject<string>();

  constructor(private heroService: HeroService) { }

  ngOnInit(): void {
    this.heroes$ = this.searchTerm.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      switchMap((term) => this.heroService.searchHero(term))
    );
  }

  onSelected(selectedItem: MatAutocompleteSelectedEvent): void {
    this.searchTerm.next('');

    const hero: Hero = selectedItem.option.value;
    this.selected.emit(hero);
  }

  search(term: string): void {
    this.searchTerm.next(term);
  }
}

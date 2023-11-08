import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Hero } from '../core/models/hero.model';
import { HeroService } from '../core/services/hero.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  heroes: Hero[] = [];

  constructor(private heroService: HeroService, private router: Router) { }

  ngOnInit() {
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroService
      .getHeroes()
      .subscribe(heroes => this.heroes = heroes.slice(1, 5));
  }

  onSelected(hero: Hero): void {
    this.router.navigate(['/heroes', hero.id]);
  }
}

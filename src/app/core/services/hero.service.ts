import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Hero } from '../models/hero.model';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class HeroService {
  private heroesUrl = `${environment.baseUrl}/heroes`;

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) { }

  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.heroesUrl).pipe(
      tap((heroes => this.log(`Fetched ${heroes.length} heroes`)))
    );
  }

  getHero(id: number): Observable<Hero> {
    return this.http.get<Hero>(this.getUrl(id)).pipe(
      tap((hero => this.log(`Fetched hero ${hero.name}`)))
    );
  }

  createHero(hero: Hero): Observable<Hero> {
    return this.http.post<Hero>(this.heroesUrl, hero).pipe(
      tap(hero => this.log(`Create hero ${hero.name}`))
    )
  }

  updateHero(hero: Hero): Observable<Hero> {
    return this.http.put<Hero>(this.getUrl(hero.id), hero).pipe(
      tap(hero => this.log(`Updated hero ${hero.name}`))
    )
  }

  deleteHero(hero: Hero): Observable<any> {
    return this.http.delete<any>(this.getUrl(hero.id)).pipe(
      tap(() => this.log(`Deleted ${hero.name}`))
    )
  }

  private log(message: string): void {
    this.messageService.add(`HeroService: ${message}`);
  }

  private getUrl(id: number): string {
    return `${this.heroesUrl}/${id}`;
  }
}

import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Hero } from '../../../core/models/hero.model';
import { HeroService } from '../../../core/services/hero.service';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.scss']
})
export class HeroDetailComponent implements OnInit {
  hero!: Hero;
  isEditing = false;

  form = this.fb.group({
    id: { value: 0, disabled: true },
    name: ['', [Validators.required, Validators.minLength(3)]],
  })

  constructor(
    private fb: FormBuilder,
    private heroService: HeroService,
    private location: Location,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.getHero();
  }

  getHero(): void {
    const paramId = this.route.snapshot.paramMap.get('id');

    if (paramId !== 'new') {
      this.isEditing = true;

      const id = Number(paramId);
      this.heroService.getHero(id).subscribe(hero => {
        this.hero = hero
        this.form.controls['id'].setValue(hero.id);
        this.form.controls['name'].setValue(hero.name);
      });
    }
  }

  goBack(): void {
    this.location.back();
  }

  create(): void {
    const { valid, value } = this.form;

    if (valid) {
      const hero: Hero = {
        name: value.name
      } as Hero;

      this.heroService.createHero(hero).subscribe(() => this.goBack());
    } else {
      this.showErrorMsg();
    }
  }

  update(): void {
    const { valid, value } = this.form;

    if (valid) {
      const hero: Hero = {
        id: this.hero.id,
        name: value.name
      } as Hero;

      this.heroService.updateHero(hero).subscribe(() => this.goBack());
    } else {
      this.showErrorMsg();
    }
  }

  private showErrorMsg(): void {
    this.snackBar.open('Please check the errors found.', 'Ok', {
      duration: 3000,
      verticalPosition: 'top',
    })
  }
}

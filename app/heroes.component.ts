import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Hero } from './hero';
 
import { HeroService } from "./hero.service";
@Component({
    moduleId: module.id,
    selector: 'my-hero',
    templateUrl: 'heroes.component.html',
    styleUrls: ['heroes.component.css']
})


export class HeroesComponent implements OnInit{
    constructor(
        private heroService: HeroService,
        private router: Router
        ){    }

    ngOnInit(): void{
        this.getHeroes();
    }
    heroes;
    selectedHero;

    onSelect(hero): void {
        this.selectedHero = hero;
    }

    getHeroes(): void{
        this.heroService.getHeroes().then(
            heroes => this.heroes = heroes
        );
    }

    add(name: string): void{
        name = name.trim();
        if(!name) return;
        this.heroService.create(name)
            .then(hero =>{
                this.heroes.push(hero);
                this.selectedHero = null;
            })
    }

    delete(hero: Hero): void{
        this.heroService
            .delete(hero.id)
            .then(() =>{
                this.heroes = this.heroes.filter( h => h !== hero);
                if(this.selectedHero == hero) this.selectedHero = null;
            });
    }

    gotoDetail():void{
        let link = ['/detail', this.selectedHero.id];
        this.router.navigate(link);
    }
 }
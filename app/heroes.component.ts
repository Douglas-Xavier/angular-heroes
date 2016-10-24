import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
 
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

    gotoDetail():void{
        let link = ['/detail', this.selectedHero.id];
        this.router.navigate(link);
    }
 }
import { Component, OnInit } from '@angular/core';
import { HeroService } from 'src/app/services/sitio/hero.service';

@Component({
	selector: 'app-hero',
	templateUrl: './hero.component.html',
	styleUrl: './hero.component.scss'
})
export class HeroComponent implements OnInit {

	slides: any[] = [];
	dataLoaded: boolean = false;

	constructor(private heroService: HeroService) { }

	ngOnInit(): void {
		this.heroService.listarHeroes().subscribe({
			next: (heroes) => {
				const lista = heroes as unknown as any[];

				this.slides = lista.map(hero => {
					let imageUrl = hero.imagen;
					
					return {
						id: hero.id,
						src: imageUrl,
						title: hero.titulo,
						subtitle: hero.subtitulo,
						buttonText: hero.boton_texto,
						buttonUrl: hero.boton_url
					};
				});

				this.dataLoaded = true;
							},
			error: (err) => {
				console.error("Error al cargar heros:", err);
				this.dataLoaded = true; 
			}
		});
	}
	
}
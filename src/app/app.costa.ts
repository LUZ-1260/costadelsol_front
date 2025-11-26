import DashboardComponent from './modules/dashboard/dashboard.component';
'./modules/authentication/login/login.component';
import { LoginComponent } from './modules/authenticacion/login/login.component';

import { SimpleButtonsRendererComponent } from './utils/renderer/simpleButtons/simpleButtonsRenderer.component';
import { ListadoHeroComponent } from './modules/sitio/listado-hero/listado-hero.component';
import { HeroFormComponent } from './modules/sitio/listado-hero/hero-form/hero-form.component';
import { SitioComponent } from './modules/sitio/sitio.component';

export const AppProyectosConfig = [
	SimpleButtonsRendererComponent,
	DashboardComponent,
	LoginComponent,
	ListadoHeroComponent,
	HeroFormComponent,
	SitioComponent
]

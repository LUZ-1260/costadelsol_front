import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from "./theme/layouts/admin/admin.component";


const routes: Routes = [
	{
		path: '',
		component: AdminComponent,
		canActivate: [],
		children: [
			{
				path: '',
				redirectTo: '/dashboard',
				pathMatch: 'full',
			},
			{
				path: 'dashboard',
				loadComponent: () => import('./modules/dashboard/dashboard.component').then(m => m.default),
				canActivate: [],
			},
			{
				path: 'listadoHero',
				loadComponent: () => import('./modules/sitio/listado-hero/listado-hero.component').then(m => m.ListadoHeroComponent),
				canActivate: [],
			},
		]
	},
	{
		path: 'login',
		loadComponent: () => import('./modules/authenticacion/login/login.component').then(m => m.LoginComponent)
	},
];

@NgModule({
	imports: [RouterModule.forRoot(routes, { useHash: true })],
	exports: [RouterModule]
})
export class AppRoutingModule { }

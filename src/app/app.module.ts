import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { ToastrModule } from "ngx-toastr";

import { AppMaterialModule } from './app.material';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppThemeConfig } from './app.theme';
import { AppProyectosConfig } from './app.costa';
import { AgGridAngular } from "ag-grid-angular";
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { NgApexchartsModule } from 'ng-apexcharts';

import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';

export const MY_DATE_FORMATS = {
	parse: { dateInput: 'DD/MM/YYYY' },
	display: {
		dateInput: 'DD/MM/YYYY',
		monthYearLabel: 'MMM YYYY',
		dateA11yLabel: 'LL',
		monthYearA11yLabel: 'MMMM YYYY'
	}
};


@NgModule({
	declarations: [
		AppComponent,
		//SafePipe,
		...AppThemeConfig,
		...AppProyectosConfig,
 	],
	imports: [
		CommonModule,
		BrowserModule,
		AppRoutingModule,
		NgApexchartsModule,
		AgGridAngular,
		BrowserAnimationsModule,
		HttpClientModule,
		SweetAlert2Module,
		ToastrModule.forRoot({
			timeOut: 3000,
			positionClass: 'toast-top-right',
			preventDuplicates: false,
			progressBar: true
		}),
		...AppMaterialModule,
	],
	bootstrap: [AppComponent],
	providers: [
		provideAnimationsAsync(),
		{
			provide: MAT_DATE_LOCALE,
			useValue: 'es-ES'
		},
		{
			provide: DateAdapter,
			useClass: MomentDateAdapter,
			deps: [MAT_DATE_LOCALE]
		},
		{
			provide: MAT_DATE_FORMATS,
			useValue: MY_DATE_FORMATS
		}
	]
})
export class AppModule { }

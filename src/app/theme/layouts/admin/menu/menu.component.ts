
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ConfigSitioModel } from 'src/app/models/sitio/config-sitio.model';
import { ConfigSitioService } from 'src/app/services/sitio/config-sitio.service';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent implements OnInit {

  sitio!: ConfigSitioModel;
  dataLoaded: boolean = false;

  constructor(
	private sitioService: ConfigSitioService,
	private toastr: ToastrService
  ) {}

  ngOnInit(): void {

	this.sitioService.listarConfiguracion().subscribe({
	  next: (sitios) => {
		const lista = sitios as unknown as ConfigSitioModel[];
		this.sitio = lista[0];
		this.dataLoaded = true;
	  },
	  error: (err) => {
		this.toastr.error("No se pudo cargar la configuración del sitio", "Error");
		this.dataLoaded = true;
	  }
	});
  }
}

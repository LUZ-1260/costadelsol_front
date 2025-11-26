
import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { SwalAlertService } from './../../../utils/util.swal';
import { HandleErrorMessage } from '../../../utils/handle.errors';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';

import { ColDef, GridApi, GridOptions, GridReadyEvent, PaginationNumberFormatterParams } from 'ag-grid-community';
import { localeEs } from '../../../app.locale.es.grid';
import { SimpleButtonsRendererComponent } from '../../../utils/renderer/simpleButtons/simpleButtonsRenderer.component';
import { HeroModel } from '../../../models/sitio/hero.model';

import { HeroFormComponent } from './hero-form/hero-form.component';
import { HeroService } from 'src/app/services/hero.service';


@Component({
	selector: 'app-listado-hero',
	templateUrl: './listado-hero.component.html',
	styleUrl: './listado-hero.component.scss'
})
export class ListadoHeroComponent implements OnInit, OnDestroy {

	public dataHero: HeroModel[] = [] as HeroModel[];
	private dataSubscription: Subscription | undefined;
	public mostrarFormulario: boolean = false;
	public estadoSeleccionado: HeroModel | null = null;

	/**
	 * Configuracion de AgGrid
	 */
	private gridApi!: GridApi<HeroModel>;
	private gridColumnApi: any;
	public getRowId = (params: any) => params.data.id;
	public gridOptions: GridOptions = <GridOptions>{
		frameworkComponents: {
			actionCellRenderer: SimpleButtonsRendererComponent
		},
		context: { componentParent: this }
	};
	public rowSelection: 'single' = 'single';
	public localEs = localeEs;
	public paginationPageSize = 20;
	public paginationPageSizeSelector: number[] | boolean = [20, 30, 50];
	public paginationNumberFormatter: (params: PaginationNumberFormatterParams) => string = (params: PaginationNumberFormatterParams) => {
		return params.value.toLocaleString();
	};

	columnDefs: ColDef[] = [
		{
			field: 'id',
			headerName: 'Opciones',
			filter: false,
			minWidth: 120,
			maxWidth: 120,
			cellRenderer: SimpleButtonsRendererComponent,
			pinned: true
		},
		{ field: 'titulo', headerName: 'Título', filter: true, floatingFilter: true, minWidth: 200 },
		{ field: 'subtitulo', headerName: 'Subtítulo', filter: true, floatingFilter: true, minWidth: 250 },
		{ field: 'descripcion', headerName: 'Descripción', filter: true, floatingFilter: true, minWidth: 300 },
		{ field: 'imagen', headerName: 'Imagen', filter: true, floatingFilter: true, minWidth: 200 },
		{ field: 'boton_texto', headerName: 'Texto del Botón', filter: true, floatingFilter: true, minWidth: 200 },
		{ field: 'boton_url', headerName: 'URL del Botón', filter: true, floatingFilter: true, minWidth: 250 },
		{ field: 'orden', headerName: 'Orden', filter: true, floatingFilter: true, minWidth: 120 },
		{ field: 'estado', headerName: 'Estado', filter: true, floatingFilter: true, minWidth: 120 },
		{ field: 'fecha_registro', headerName: 'Fecha de Registro', filter: true, floatingFilter: true, minWidth: 200 },
		{ field: 'fecha_actualizacion', headerName: 'Fecha de Actualización', filter: true, floatingFilter: true, minWidth: 220 },
	];

	constructor(
		private modalService: NgbModal,
		private HeroService: HeroService,
		private alertService: SwalAlertService,
		private toastr: ToastrService
	) { }

	ngOnInit(): void {
		this.getAllHeros();
	}

	public getAllHeros() {
		this.dataSubscription = this.HeroService.listarHeroes().subscribe({
			next: (response) => {
				this.dataHero = response.data;
			}, error: (err) => {
				this.dataHero = [] as HeroModel[];
			}
		});
	}

	public accionNuevo() {
		const modalRef = this.modalService.open(HeroFormComponent, {
			centered: true,
			backdrop: 'static',
			size: 'lg',
			keyboard: false
		});

		modalRef.componentInstance.data = {} as HeroModel;

		modalRef.result.then(
			result => {
				if (result) {
					this.getAllHeros();
				}
			},
			reason => { }
		);
	}

	public accionEditar(data: HeroModel) {
		const modalRef = this.modalService.open(HeroFormComponent, {
			centered: true,
			backdrop: 'static',
			keyboard: false
		});

		modalRef.componentInstance.data = data;

		modalRef.result.then(
			result => {
				if (result) {
					this.getAllHeros();
				}
			},
			reason => { }
		);
	}

	public accionEliminar(data: HeroModel) {
		this.alertService.showConfirmationDialog('Eliminar registro').then(
			(res) => {
				if (res.isConfirmed) {
					Swal.fire({
						title: 'Espere un momento ...',
						allowEscapeKey: false,
						allowOutsideClick: false,
						didOpen: () => {
							Swal.showLoading();
						}
					});
					this.dataSubscription = this.HeroService.eliminarHero(data.id).subscribe({
						next: (response) => {
							this.toastr.success(response.message, 'Eliminación');
							this.getAllHeros();
							Swal.close();
						}, error: (err) => {
							Swal.close();
							this.toastr.error(HandleErrorMessage(err), 'Error inesperado');
						}

					});
				}
			}
		);
	}

	onActionClickAgGrid(e: any) {
		if (e.action == 'edit') {
			this.accionEditar(e.data);
		}
		if (e.action == 'delete') {
			this.accionEliminar(e.data);
		}
	}

	onGridReady(params: GridReadyEvent) {
		this.gridApi = params.api;
	}

	ngOnDestroy(): void {
		this.dataSubscription?.unsubscribe();
	}
}


import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Subject, Subscription } from 'rxjs';
import { HeroModel } from '../../../../models/sitio/hero.model';
import { HeroService } from 'src/app/services/sitio/hero.service';
import { HandleErrorMessage } from '../../../../utils/handle.errors';
import { SwalAlertService } from '../../../../utils/util.swal';
import Swal from 'sweetalert2';

@Component({
	selector: 'app-hero-form',
	templateUrl: './hero-form.component.html',
	styleUrl: './hero-form.component.scss'
})
export class HeroFormComponent implements OnInit, OnDestroy {

	public labelTitulo: string = 'Registrar Hero (Carrucel)';
	public formRegistro: FormGroup;
	private formSubscription: Subscription | undefined;
	@Input() data!: HeroModel;

	public nombreArchivoImagen: string = '';
	public previewImage: string | ArrayBuffer | null = null;

	public controlBusqueda = new FormControl();
	private _onDestroy = new Subject<void>();
	@Output() guardar = new EventEmitter<HeroModel>();
	@Output() cancelar = new EventEmitter<void>();

	constructor(
		public modalActiveService: NgbActiveModal,
		private HeroService: HeroService,
		private toastr: ToastrService,
		private alertService: SwalAlertService,
		private fb: FormBuilder,
	) {
		this.formRegistro = new FormGroup({});
	}

	ngOnInit(): void {
		this.getFormBuilder();

		if (this.data.id) {
			this.labelTitulo = 'Actualizar Hero';

			this.formRegistro.controls['id'].setValue(this.data.id);
			this.formRegistro.controls['titulo'].setValue(this.data.titulo);
			this.formRegistro.controls['subtitulo'].setValue(this.data.subtitulo);
			this.formRegistro.controls['descripcion'].setValue(this.data.descripcion);
			//this.formRegistro.controls['imagen'].setValue(this.data.imagen);
			this.formRegistro.controls['boton_texto'].setValue(this.data.boton_texto);
			this.formRegistro.controls['boton_url'].setValue(this.data.boton_url);
			this.formRegistro.controls['orden'].setValue(this.data.orden);
			this.formRegistro.controls['estado'].setValue(this.data.estado);
		}
	}


	public getFormBuilder() {
		this.formRegistro = this.fb.group({
			id: [''],
			descripcion: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
			titulo: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
			subtitulo: ['', [Validators.maxLength(150)]],
			imagen: [null, Validators.required],
			boton_texto: ['', [Validators.maxLength(50)]],
			boton_url: ['', [Validators.maxLength(250)]],
			orden: [1, [Validators.required]],
			estado: [true]
		});
	}

	public accionRegistrar() {
		if (this.formRegistro.valid) {
			this.alertService.showConfirmationDialog(this.labelTitulo).then(
				(res) => {
					if (res.isConfirmed) {
						Swal.fire({
							title: 'Espere un momento ...',
							allowEscapeKey: false,
							allowOutsideClick: false,
							didOpen: () => {
								const popup = document.querySelector('.swal2-container') as HTMLElement;
								if (popup) {
									popup.style.zIndex = '2000';
								}
								Swal.showLoading();
							}
						});
						///1
						const formData = new FormData();

						Object.keys(this.formRegistro.controls).forEach(key => {
							if (this.formRegistro.get(key)?.value !== null) {
								formData.append(key, this.formRegistro.get(key)?.value);
							}
						});
						//1
						if (this.data.id) {
							this.formSubscription = this.HeroService.actualizarHero(this.data.id, formData).subscribe({
								//this.formSubscription = this.HeroService.actualizarHero(this.data.id, this.formRegistro.value).subscribe({
								next: (response) => {
									this.toastr.success(response.message, 'Actualización');
									Swal.close();
									this.modalActiveService.close(response.data);
									this.guardar.emit(response.data);
								}, error: (err) => {
									Swal.close();
									this.toastr.error(HandleErrorMessage(err), 'Error inesperado');
								}
							});
						} else {
							this.formSubscription = this.HeroService.crearHero(formData).subscribe({
								//this.formSubscription = this.HeroService.crearHero(this.formRegistro.value).subscribe({
								next: (response) => {
									this.toastr.success(response.message, 'Registro');
									Swal.close();
									this.modalActiveService.close(response.data);
								}, error: (err) => {
									Swal.close();
									this.toastr.error(HandleErrorMessage(err), 'Error inesperado');
								}
							});
						}
					}
				}
			);
		}
	}

	onFileSelected(event: any) {
		const file = event.target.files[0];

		if (file) {
			this.nombreArchivoImagen = file.name;
			this.formRegistro.patchValue({ imagen: file });
			this.formRegistro.get('imagen')?.updateValueAndValidity();

			const reader = new FileReader();
			reader.onload = () => {
				this.previewImage = reader.result;
			};
			reader.readAsDataURL(file);
		}
	}


	ngOnDestroy(): void {
		this.formSubscription?.unsubscribe();
		this._onDestroy.next();
		this._onDestroy.complete();
	}
}


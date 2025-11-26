import { TipoSuscripcionModel } from "./tipo-suscripcion.model";

export interface PlanSuscripcionModel {
	id: number,
	costo_mensual: number,
	duracion_dias: number,
	maximo_fotos: number,
	permite_video: boolean,
	publicaciones_ilimitadas: boolean,
	es_prioritario: boolean,
	reporte_visualizaciones: boolean,
	descripcion_corta: string,
	tipo_suscripcion_id: number,
	tipo_suscripcion: TipoSuscripcionModel
}

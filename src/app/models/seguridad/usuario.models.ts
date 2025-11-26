export interface UsuarioModel {
  id: number,
  fecha_inicio_plan: Date,
  user: number,
  plan_actual: number
}

export interface TokenCustom {
	access: string,
	refresh: string
}

export interface Auth {
	username: string,
	password: string
}

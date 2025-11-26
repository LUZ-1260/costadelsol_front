export interface ResponseData {
  message: string,
  data: any,
  status: number,
  type?: string
  errors?: any[],
}

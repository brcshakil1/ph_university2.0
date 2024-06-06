export type TErrorSources = { path: string | number; message: string }[];

export interface TGenericResponse {
  statusCode: number;
  message: string;
  errorSources: TErrorSources;
}

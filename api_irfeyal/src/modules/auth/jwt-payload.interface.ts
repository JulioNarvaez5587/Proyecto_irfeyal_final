export interface IJwtPayload {
  usuId: number;
  usuNombre: string;
  usuCorreo: string;
  usuActivo: boolean;
  usuFechaRegistro: Date | null;
  usuAlias: string;
  nveId: number;
}

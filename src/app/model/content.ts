export interface ContentPDF {
    nombre_tramitante: string,
    cantidad: number | string;
    lugar?: string;
    tramite: string;
    fecha: string;
    comentarios?: string;
}

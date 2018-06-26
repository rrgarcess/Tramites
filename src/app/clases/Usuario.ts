export class Usuario implements Usuario {

    $key?: string;
    tipo_usuario: number;
    nombre: string;
    apellido_paterno: string;
    apellido_materno: string;
    correo: string;
    telefono?: string;
    contrasena: string;
    autorizado: boolean;

    constructor(){}
}

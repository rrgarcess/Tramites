import { Injectable } from '@angular/core';
import { Usuario } from '../model/usuario';
import { ResponseMessage } from '../model/message';

import * as firebase from 'firebase';
import { Code } from '../clases/codes';

@Injectable()
export class AuthService {

    auth = firebase.auth();
    database = firebase.database();
    usuarios: any;

    constructor() {
        this.usuarios = this.database.ref('usuarios');
        console.log(this.usuarios);
    }

    agregarUsuario(usuario: Usuario): Promise<ResponseMessage> {
        return new Promise((resolve, reject) => {
            this.auth.createUserWithEmailAndPassword(usuario.correo, usuario.contrasena)
            .then((response) => {
                console.log('response: ', response);
                if (response.uid) {
                    let key = this.usuarios.push(usuario).key;
                    resolve({status: Code.SUCCESS, message: 'key: ' + key});
                } else {
                    resolve({status: Code.UNDEFINED, message: 'El usuario ya existe'});
                }
            })
            .catch(ex => {
                console.log('exception: ', ex);
                reject({ status: Code.ERROR, message: ex });
            });
        });
    }
}

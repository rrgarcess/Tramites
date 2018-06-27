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

    cargarUsuarios(): Promise<Usuario[]>{
        let usuarios: Usuario[] = [];

        return new Promise((resolve, reject) => {
            this.usuarios.once('value', data => {
                let value = data.val();

                for (let key in value) {
                    if (value.hasOwnProperty(key)) {
                        let user = value[key] as Usuario;
                        user.$key = key;
                        usuarios.push(user);
                    }
                }
                console.log(usuarios);
                resolve(usuarios)
            });
        });
    }

    obtenerStatusAuth(correo): Promise<boolean> {
        return new Promise(async (resolve, reject) => {

            await this.usuarios.orderByChild('correo')
            .equalTo(correo)
            .on('value', (result) => {

                let object = result.val();
                if (result.val() === null){
                    resolve(false);
                } else {

                    let key = Object.keys(object)[0];
                    if (object[key]) {
                        resolve(object[key].autorizado);
                    } else {
                        resolve(false);
                    }
                }

            });
        });
    }
}

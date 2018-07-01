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
    }

    agregarUsuario(usuario: Usuario): Promise<ResponseMessage> {
        return new Promise((resolve, reject) => {
            this.auth.createUserWithEmailAndPassword(usuario.correo, usuario.contrasena)
            .then((response) => {
                if (response.uid) {
                    let key = this.usuarios.push(usuario).key;
                    resolve({status: Code.SUCCESS, message: 'key: ' + key});
                } else {
                    resolve({status: Code.UNDEFINED, message: 'El usuario ya existe'});
                }
            })
            .catch(ex => {
                reject({ status: Code.ERROR, message: ex });
            });
        });
    }

    cargarUsuarios(): Promise<Usuario[]>{
        let usuarios: Usuario[] = [];

        return new Promise((resolve, reject) => {
            let usuarioActivo = this.obtenerUsuarioActivo();

            this.usuarios.once('value', data => {
                let value = data.val();

                for (let key in value) {
                    if (value.hasOwnProperty(key) && key != usuarioActivo.$key) {
                        let user = value[key] as Usuario;
                        user.$key = key;
                        usuarios.push(user);
                    }
                }
                resolve(usuarios)
            });
        });
    }

    obtenerStatusAuth(correo): Promise<ResponseMessage> {
        return new Promise(async (resolve, reject) => {
            await this.usuarios.orderByChild('correo')
            .equalTo(correo)
            .on('value', (result) => {

                let object = result.val();
                if (result.val() === null){
                    resolve({status: Code.SUCCESS, message: Code.NON_EXISTENT});
                } else {

                    let key = Object.keys(object)[0];
                    if (object[key]) {
                        let autorizado = object[key].autorizado;
                        let usuario = object[key] as Usuario;
                        usuario.$key = key;

                        if (autorizado) {
                            resolve({status: Code.SUCCESS, message: Code.AUTHORIZED, body: usuario});
                        } else {
                            resolve({status: Code.SUCCESS, message: Code.UNAUTHORIZED});
                        }

                    } else {
                        resolve({status: Code.ERROR, message: Code.NON_EXISTENT});
                    }
                }

            });
        });
    }

    toggleAutorizacion(usuario: Usuario): Promise<ResponseMessage>{
        return new Promise((resolve, reject) => {

            this.usuarios.child(`${usuario.$key}/autorizado`).set(usuario.autorizado);
            resolve({status: Code.SUCCESS, body: usuario.autorizado})
        })
    }

    signInWithEmailAndPassword(email, password){
        return this.auth.signInWithEmailAndPassword(email, password);
    }

    signOut(){
        return this.auth.signOut();
    }

    getCurrentUser(){
        return this.auth.currentUser;
    }

    onAuthStateChanged(callback){
        return this.auth.onAuthStateChanged(callback);
    }

    guardarUsuarioActivo(usuario: Usuario){
        sessionStorage.setItem('usuario_activo', JSON.stringify(usuario));
    }

    obtenerUsuarioActivo(): Usuario {
        let usuario = JSON.parse(sessionStorage.getItem('usuario_activo'));
        return usuario;
    }

    limpiarDatos(){
        sessionStorage.clear();
        localStorage.clear();
        this.signOut();
    }
}

import { Injectable } from '@angular/core';
// import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Tramite } from '../clases/tramite';
import { environment } from '../../environments/environment';

import * as firebase from 'firebase';
firebase.initializeApp(environment.firebase)
const db = firebase.database();


@Injectable()
export class TramiteService {

    tramitesRef;

    constructor() {
        this.tramitesRef = db.ref('tramites');
    }

    obtenerTramitesRef(){
        return this.tramitesRef;
    }

    guardarTramite(tramite: Tramite){
        console.log('guardando tramite...');
        return new Promise((resolve, reject) => {
            try{
                let t = {
                    nombre: tramite.nombre,
                    apellido_paterno: tramite.apellido_paterno,
                    apellido_materno: tramite.apellido_materno,
                    localidad: tramite.localidad,
                    telefono: (tramite.telefono || ""),
                    concepto_tramite: tramite.concepto_tramite,
                    costo_tramite: tramite.costo_tramite,
                    cantidad_deudora: tramite.costo_tramite
                };

                this.tramitesRef.push(t);
                resolve({status: 'success'});
            } catch(ex){
                console.log(ex);
                reject({status: 'error'});
            }
        });
    }

    obtenerTramites(): Promise<Tramite[]>{
        console.log('obteniendo tramites...')
        let tramites: Tramite[] = [];

        return new Promise((resolve, reject) => {
            this.tramitesRef.once('value', (data) => {
                let registers = data.val();
                for (let key in registers) {
                    if (registers.hasOwnProperty(key)) {
                        let t = registers[key] as Tramite;
                        t.$key = key;
                        tramites.push(t);
                    }
                }
                console.log(tramites);
                resolve(tramites);
            });
        });
    }

    eliminarTramite($key: string){
        console.log('eliminando tramite...');
        this.tramitesRef.child($key).remove();
    }

    obtenerTramite($key: string): Promise<Tramite> {
        console.log('obtener tramite de: ' + $key);

        return new Promise((resolve, reject) => {
            let tramiteRef = db.ref('tramites/' + $key);
            let t = new Tramite();
            tramiteRef.once('value', (data) => {
                t = data.val() as Tramite;
                resolve(t);
            });
        });
    }

    buscarTramite(termino){
        let tramites: Tramite[] = [];

        return new Promise((resolve, reject) => {
            let reference = db.ref('tramites');

            reference.orderByChild('nombre').startAt(termino)
            .once('child_added', (data) => {
                resolve(data.key);
            });
        });
    }

    actualizaTramite($key: string, tramite: Tramite): Promise<any> {
        return new Promise((resolve, reject) => {
            this.tramitesRef.child($key).update(tramite);
            resolve({status: 'success'})
        });
    }

    actualizarCantidadDeudora($key: string, resto: number){
        this.tramitesRef.child($key)
        .update({ cantidad_deudora: resto });
    }
}

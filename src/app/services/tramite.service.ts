import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Tramite } from '../clases/tramite';
import { environment } from '../../environments/environment';

import * as firebase from 'firebase';
firebase.initializeApp(environment.firebase)
const db = firebase.database();


@Injectable()
export class TramiteService {

    tramites: AngularFireList<any>;
    tramitesRef;

    constructor(private firebase: AngularFireDatabase) {
        this.tramites = this.firebase.list('tramites');
        this.tramitesRef = db.ref('tramites');
        // this.tramitesRef.on('child_added', function(data) {
        //     console.log(data.val());
        // });
    }

    obtenerTramitesRef(){
        return this.tramitesRef;
    }

    guardarTramite(tramite: Tramite){
        console.log('guardando tramite...');
        return new Promise((resolve, reject) => {
            try{
                this.tramites.push({
                    nombre: tramite.nombre,
                    apellido_paterno: tramite.apellido_paterno,
                    apellido_materno: tramite.apellido_materno,
                    localidad: tramite.localidad,
                    telefono: (tramite.telefono || ""),
                    concepto_tramite: tramite.concepto_tramite,
                    costo_tramite: tramite.costo_tramite,
                });
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
        })
    }

    eliminarTramite($key: string){
        console.log('eliminando tramite...');
        this.tramites.remove($key);
    }

}

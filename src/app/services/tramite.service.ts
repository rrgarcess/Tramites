import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Tramite } from '../clases/tramite';


@Injectable()
export class TramiteService {

    tramites: AngularFireList<any>;

    constructor(private firebase: AngularFireDatabase) {
        // this.obtenerTramites();
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

    obtenerTramites(){
        console.log('obteniendo tramites...')
        this.tramites = this.firebase.list('tramites');
        return this.tramites;
    }

    eliminarTramite($key: string){
        console.log('eliminando tramite...');
        this.tramites.remove($key);
    }

}

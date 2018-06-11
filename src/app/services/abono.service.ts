import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import * as firebase from 'firebase';
import { Tramite } from '../clases/tramite';
import { Abono } from '../clases/abono';
// firebase.initializeApp(environment.firebase)
const db = firebase.database();

@Injectable()
export class AbonoService {

    tramiteActivo: Tramite = new Tramite();
    tramiteRef;

  constructor() { }

  obtenerTramiteRef($key: string){
      return new Promise((resolve, reject) => {
          this.tramiteRef = db.ref('tramites/' + $key);
          this.tramiteActivo = new Tramite();
          this.tramiteRef.once('value', (data) => {
              this.tramiteActivo = data.val() as Tramite;
              this.tramiteActivo.$key = data.key;
              resolve(this.tramiteActivo);
          });
      });
  }

  obtenerAbonos(){
      let abonosTotal: Abono[] = [];

      return new Promise((resolve, reject) => {
          this.tramiteRef.child('abonos').once('value', (data) => {
              let abonos = data.val();
              for (let key in abonos) {
                  if (abonos.hasOwnProperty(key)) {
                      let ab = abonos[key] as Abono;
                      ab.$key = key;
                      abonosTotal.push(ab);
                  }
              }
              resolve(abonosTotal);
          });
      });
  }

  obtenerAbono($key): Promise<Abono>{
      return new Promise((resolve, reject) => {
          this.tramiteRef.child('abonos').child($key).once('value', (data) => {
              resolve(data.val() as Abono);
          });
      });
  }

  agregarAbono(abono: Abono){
      return new Promise((resolve, reject) => {
          let resultKey = db.ref(`tramites/${this.tramiteActivo.$key}/abonos`).push(abono);
          if (resultKey) {
              let resto = this.tramiteActivo.cantidad_deudora - abono.cantidad_abonada;

              let updates = {};
              updates[`/cantidad_deudora`] = resto;

              db.ref(`tramites/${this.tramiteActivo.$key}/cantidad_deudora`).set(resto);
              console.log('actualizar resto a: ', resto);
          }
          resolve(resultKey);
      })
  }

  actualizaTramite(abono: Abono){
      return new Promise((resolve, reject) => {
          db.ref(`tramites/${this.tramiteActivo.$key}/abonos/${abono.$key}`)
          .set({
            fecha: abono.fecha,
            cantidad_abonada: abono.cantidad_abonada,
            descripcion: abono.descripcion || ''
          });
          resolve({status: 'success'});
      });
  }

}

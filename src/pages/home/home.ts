import {Component, Output} from '@angular/core';
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { AlertController } from 'ionic-angular';
import { ModalController } from 'ionic-angular';
import { HuertoPage } from '../huerto/huerto';
import { HuertoFormPage } from '../huerto-form/huerto-form';
import { Platform, ActionSheetController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage{
  public myHuertos:Array<Huerto>;
  public empty=true;
  public platform: Platform;

  constructor(public navCtrl: NavController, private storage: Storage, public alertCtrl: AlertController, public modal:ModalController, public actionSheetCtrl: ActionSheetController) {
    this.myHuertos=[];
    this.storage.get('nameHuerto').then((value) =>{
      if(value!=null) {
        for (let i of value) {
          this.myHuertos.push(i);
          this.empty = false;
        }
      }else{
        this.createHuerto();
      }
    });
  }
  createHuerto(){
    let modal=this.modal.create(HuertoFormPage);
    modal.present();
  }
  deleteHuerto(huerto){
      let confirm = this.alertCtrl.create({
        title: '¿Seguro que deseas borrar?',
        buttons: [
          {
            text: 'Cancelar',
            handler: () => {

            }
          },
          {
            text: 'Aceptar',
            handler: () => {
              let index=this.myHuertos.indexOf(huerto);
              if(index > -1){
                this.myHuertos.splice(index, 1);
                this.storage.set(huerto.name,this.myHuertos);
              }
            }
          }
        ]
      });
      confirm.present();
  }
  openOptions(huerto) {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Opciones',
      cssClass: 'action-sheets-basic-page',
      buttons: [
        {
          text:'Borrar',
          role: 'destructive',
          icon: 'trash',
          handler: () => {
            this.deleteHuerto(huerto);
          }
        },
        {
          text:'Editar',
          icon: 'create',
          handler: () => {
            console.log('Aqui se editara');
          }
        }
      ]
        });
    actionSheet.present();
  }
  changeToHuerto(huerto){
    this.navCtrl.push(HuertoPage,{
      huerto:huerto
    });
  }
}
export class Huerto{
  private name:string;
  private hortalizas:Array<Hortaliza>;
  private time;
  constructor(name:string){
    this.name=name;
    this.hortalizas=[];
    this.time=this.getMes();
  }
  private getMes(){
    var mes =new Date();
    var locale = "es-Es";
    var  month = mes.toLocaleString(locale, { month: "long" });
    return month;
  }
  public getName(){
    return this.name;
  }

}
class Hortaliza{
  public name:string;
  private plantel:boolean;
  private tierra:boolean;
  private semillero:boolean;
  private semilleroProtegido:boolean;
  public meses:Array<number>;
  public plagas:Array<string>;
  constructor(){
    if(this.plantel==true){
      this.tierra=false;
      this.semillero=false;
      this.semilleroProtegido=false;
    }else if (this.semillero==true || this.semilleroProtegido==true){
      this.plantel=false;
      this.tierra=false;
    }else if(this.tierra==true){
      this.plantel=false;
      this.semillero=false;
      this.semilleroProtegido=false;
    }
  }
}

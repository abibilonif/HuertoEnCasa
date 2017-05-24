import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { AlertController } from 'ionic-angular';
import { HuertoPage } from '../huerto/huerto';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage{
  public myHuertos:Array<Huerto>;
  public nombreHuerto:string;
  public empty=true;

  constructor(public navCtrl: NavController, private storage: Storage, public alertCtrl: AlertController) {
    this.myHuertos=[];
    this.storage.get('nameHuerto').then((value) =>{
        for (let i of value) {
          this.myHuertos.push(i);
          this.empty=false;
        }
    });
  }
  saveStorage(){
    this.storage.set('nameHuerto',this.myHuertos);
    if(this.myHuertos.length==0){
      this.empty=true;
    }else{
      this.empty=false;
    }
  }
  setNameHuerto(){
    this.myHuertos.push(new Huerto(this.nombreHuerto));
    this.saveStorage();
    this.nombreHuerto="";
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
              }
              this.saveStorage();
            }
          }
        ]
      });
      confirm.present();
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

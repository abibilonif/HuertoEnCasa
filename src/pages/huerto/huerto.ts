import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';

import {Storage} from '@ionic/storage';
import {Huerto} from "../home/home";

/**
 * Generated class for the HuertoPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-huerto',
  templateUrl: 'huerto.html',
})
export class HuertoPage {
  private huerto: Huerto;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.huerto = this.navParams.get('huerto');
    console.log(this.huerto);
  }
}

import { Component } from '@angular/core';
import { RealmService } from './services/realm.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ppit-project';

  constructor(private realm: RealmService){}

  ngOnInit() {

  }

  async initaliseApp(){
    try{
      await this.realm.startRealm();
      this.realm.openRealm();
    }catch(error){
      console.error(error);
    }
  }
}

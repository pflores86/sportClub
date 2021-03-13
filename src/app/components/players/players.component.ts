import { Component, OnInit } from '@angular/core';
import { IPlayerService } from '../../services/iplayer.service';
import { FormGroup, FormControl, FormBuilder, Validators} from '@angular/forms';

declare const openPopup: any;
declare const closePopup: any;
@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.scss']
})
export class PlayersComponent implements OnInit {
  public players: Jugador[] = []; 
  public player: Jugador = null;
  public form:FormGroup;
  public isNew=false;
  public posiciones =["Portero","Defensa","Centrocampista","Delantero"]
  constructor(private playerService: IPlayerService,private fb:FormBuilder,) { 
    this.playerService.getPlayers().subscribe(result => { 
      this.players = result;
    });
  }

  ngOnInit() {
    this.initForm();
  }
  initForm(){
    this.form = this.fb.group({
      id: null
      ,numCamiseta: [null, Validators.compose([Validators.required])] 
      ,posicion: ['', Validators.compose([Validators.required])] 
      ,nombre: [null, Validators.compose([Validators.required])] 
      ,apellido: [null, Validators.compose([Validators.required])] 
      ,edad: [null, Validators.compose([Validators.required])]
  });
  }
  addEditPlayer(obj : Jugador){
    if (obj) { 
      this.player = obj;
      this.isNew = false;
      let f = {id: this.player.id
        ,numCamiseta: this.player.numCamiseta
        ,posicion: this.player.posicion 
        ,nombre: this.player.dato_personal.nombre 
        ,apellido: this.player.dato_personal.apellido
        ,edad: this.player.dato_personal.edad
      };
      this.form.setValue(f);
    }
    else{ this.isNew = true; this.player = new Jugador(); }   
    console.log(this.player)
    openPopup();
  }
  closeModal(){
    this.form.reset();
    closePopup();
  }
  onSubmit(obj){
    let f = {id: obj.id
      ,numCamiseta: obj.numCamiseta
      ,posicion: obj.posicion 
      ,dato_personal : {
        nombre: obj.nombre 
        ,apellido: obj.apellido
        ,edad: obj.edad
      }        
    };
    if (this.isNew){
      let max = Math.max.apply(Math, this.players.map(function(o) { return o.id; })) 
      f.id = max+1;
      this.players.push(f);
    }else{
      let index = this.players.findIndex(item=> item.id == obj.id);
      this.players[index] = f;
    }
    this.closeModal();
  }

}
export class Jugador {
  id: number
  numCamiseta: number;
  posicion: string = '';
  dato_personal: Persona;
};
export class Persona {
    nombre: string;
    apellido: string;
    edad : number;
}
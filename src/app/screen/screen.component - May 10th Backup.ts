import { Component, OnInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-screen',
  templateUrl: './screen.component.html',
  styles: [
    'nb-card {min-width: 0rem;}'
]
})
export class ScreenComponent implements OnInit{
pauseGame:any; pauseGameBool;  petLevel:any; deleteSave:any; saveGame:any; first:any;refresh:any; choosePokemon: any; screenWidth: any; companpionName: string;  petHp: any; attackFalse: any; walkDown: any; walkUp: any; walkLeft: any; walkRight: any; stopWalking: any;attackButton: any;specialAttack: any;pokeBall: any;switchPokemon: any;returnPokemon: any;selectPokemon: any;selectPokemonBool: any;isRunning: any;
  @HostListener('document:keydown', ['$event'])
  function1(e: KeyboardEvent){
    if(e.keyCode === 83){        this.walkDown();      }      if(e.keyCode === 65){        this.walkLeft();      }      if(e.keyCode === 87){        this.walkUp();      }      if(e.keyCode === 68){        this.walkRight();      }      if(e.keyCode === 69){        this.attackButton();      }      if(e.keyCode === 32){        this.selectPokemon();      }          if(e.keyCode === 67){        this.switchPokemon();      }           if(e.keyCode === 82){        this.switchPokemon();      }      if(e.keyCode === 81){        this.pokeBall();      }      if(e.keyCode === 16){        this.isRunning();      }
  }
  @HostListener('document:keyup', ['$event'])
  function2(e: KeyboardEvent){
    if(e.keyCode === 83){        this.stopWalking();      }      if(e.keyCode === 65){        this.stopWalking();      }      if(e.keyCode === 87){        this.stopWalking();      }      if(e.keyCode === 68){        this.stopWalking();      }
  }
public ngOnInit(): void {
  /////////////////////////////////////////////////////////////////////////////////////////////////////
//STEP 1 Declare Variables
var game = this;
this.screenWidth = window.innerWidth;
var i = 0;
var fail = <HTMLAudioElement>document.getElementById("fail");
var point = <HTMLAudioElement>document.getElementById("point");
var music4 = <HTMLAudioElement>document.getElementById("music4");
music4.loop = true;
  var cnvs = <HTMLCanvasElement>document.getElementById('cnvs');
  game.selectPokemonBool = true;
  game.pauseGameBool = false;
  if(window.innerWidth > 700){    cnvs.width = window.innerWidth*.92;
    cnvs.height = window.innerHeight*.75;
  }else{
    cnvs.width = window.innerWidth*.89;
    cnvs.height = window.innerHeight*.65;
  }
  var canvas = cnvs.getContext("2d");
  var gameSize = {x:cnvs.width, y:cnvs.height};
  var trainer = new TrainerObject();
  var pet = new petObject();
  var bodies  = [new PokemonObject(), trainer,pet];
  bodies.push(new treeObject(),new treeObject(),new treeObject());
  bodies.push(new bushObject(),new bushObject(),new bushObject());
  bodies.push(new rockObject(),new rockObject(),new rockObject());
  bodies.push(new rainObject());
  var party = [];
  var night = false;
  var night2 = false;
  var noon = false;
  var daycycle = 1;
  var raining = false;
  var newPokemon = function(){
    if(window.innerWidth > 500){
      bodies.reverse();
      bodies.push(new PokemonObject());
      bodies.push(new PokemonObject());
      bodies.reverse();
    }else{
      bodies.reverse();
      bodies.push(new PokemonObject());
      bodies.reverse();
    }
  };
  var removeBody = function(dead){
    bodies = bodies.filter(function (newBodiesArray) {
        return newBodiesArray != dead; //return the original array minus ones removed
      })
  };
  var makeForest = function(){
    bodies.push(new rockObject(),new rockObject(),new rockObject());
    bodies.push(new bushObject(),new bushObject(),new bushObject());
    bodies.push(new treeObject(),new treeObject(),new treeObject());
    if(window.innerWidth > 700){
      bodies.push(new bushObject(),new bushObject(),new bushObject());
      bodies.push(new treeObject(),new treeObject(),new treeObject());
      bodies.push(new treeObject(),new treeObject(),new treeObject());
    }
    bodies.push(new rainObject());
  }
  function returnBallObject(){
    var self = this;    self.x = pet.x;    self.y = pet.y;    this.updateObject = function(){      var img = <HTMLImageElement>document.getElementById("ball-1");      self.rightSide = self.x + (img.width)/2+1;      self.leftSide = self.x - (img.width)/2+1;      self.topSide =  self.y - (img.height)/2+1;      self.bottomSide = self.y + (img.height)/2+1;      canvas.drawImage(img, this.x-img.width/2, this.y-img.height/2, img.width, img.height);      if(self.x < trainer.x-2){        self.x += trainer.x/2000+8;      }      if(self.x > trainer.x+2){        self.x -= trainer.x/2000+8;      }      if(self.y < trainer.y-2){        self.y += trainer.y/2000+8;      }      if(self.y > trainer.y+2){        self.y -= trainer.y/2000+8;      }      if(self.rightSide > trainer.leftSide &&        self.leftSide < trainer.rightSide &&        self.topSide < trainer.bottomSide &&        self.bottomSide > trainer.topSide){          removeBody(self);          pet.x = trainer.rightSide + 5;          pet.y = trainer.bottomSide + 5;          pet.attack = false;   pet.ball = false;    }    }
  }
  function missBallObject(x, y){
    var self = this;    self.x = x;    self.y = y;    this.updateObject = function(){      var img = <HTMLImageElement>document.getElementById("ball-2");      self.rightSide = self.x + (img.width)/2+1;      self.leftSide = self.x - (img.width)/2+1;      self.topSide =  self.y - (img.height)/2+1;      self.bottomSide = self.y + (img.height)/2+1;      canvas.drawImage(img, this.x-img.width/2, this.y-img.height/2, img.width, img.height);      if(self.x < trainer.x-2){        self.x += trainer.x/2000+8;      }      if(self.x > trainer.x+2){        self.x -= trainer.x/2000+8;      }      if(self.y < trainer.y-2){        self.y += trainer.y/2000+8;      }      if(self.y > trainer.y+2){        self.y -= trainer.y/2000+8;      }      if(self.rightSide > trainer.leftSide &&        self.leftSide < trainer.rightSide &&        self.topSide < trainer.bottomSide &&        self.bottomSide > trainer.topSide){          removeBody(self);        }    }
  }
  function caughtBallObject(x, y){
    var self = this;    self.x = x;    self.y = y;    this.updateObject = function(){      var img = <HTMLImageElement>document.getElementById("ball-2");      self.rightSide = self.x + (img.width)/2+1;      self.leftSide = self.x - (img.width)/2+1;      self.topSide =  self.y - (img.height)/2+1;      self.bottomSide = self.y + (img.height)/2+1;      canvas.drawImage(img, this.x-img.width/2, this.y-img.height/2, img.width, img.height);      if(self.x < trainer.x-2){        self.x += trainer.x/2000+8;      }      if(self.x > trainer.x+2){        self.x -= trainer.x/2000+8;      }      if(self.y < trainer.y-2){        self.y += trainer.y/2000+8;      }      if(self.y > trainer.y+2){        self.y -= trainer.y/2000+8;      }      if(self.rightSide > trainer.leftSide &&        self.leftSide < trainer.rightSide &&        self.topSide < trainer.bottomSide &&        self.bottomSide > trainer.topSide){          trainer.caught ++;          point.play();          removeBody(self);        }    }
  }
  function ballObject(){
    var self = this;    this.x = trainer.x;    this.y = trainer.y;    self.dead = false;    self.speed = 8;    self.xmod = 0;    self.ymod = 0;    self.sizeMod = 0;    self.range = 20;    self.direction = trainer.direction ;
    self.updateObject = function(){
      if(trainer.dead === true){
        return;
      }
      var img = <HTMLImageElement>document.getElementById("ball-3");
      self.rightSide = self.x + (img.width+self.sizeMod)/2+1;
      self.leftSide = self.x - (img.width+self.sizeMod)/2+1;
      self.topSide =  self.y - (img.height+self.sizeMod)/2+1;
      self.bottomSide = self.y + (img.height+self.sizeMod)/2+1;
      canvas.drawImage(img, this.x-img.width/2, this.y-img.height/2, img.width, img.height);
      bodies.forEach(function(body){
        if(body instanceof PokemonObject){
          if(self.rightSide > (body as any).leftSide &&
          self.leftSide < (body as any).rightSide &&
          self.topSide < (body as any).bottomSide &&
          self.bottomSide > (body as any).topSide){
            if((body as any).dead === true){
              removeBody(self);
              removeBody((body as any));
              party.push((body as any).name);
              bodies.push(new caughtBallObject(self.x,self.y));
            }else{
              fail.play();
              (body as any).pushedBy(self);
              removeBody(self);
              bodies.push(new missBallObject(self.x, self.y));
            }
         }
        }
      });
      if(self.direction === "left"){        self.x -= self.speed;        if(self.x < trainer.x - 200){          removeBody(this);          bodies.push(new missBallObject(self.x, self.y));        }      } if(self.direction === "right"){        self.x += self.speed;        if(self.x > trainer.x + 200){          removeBody(this);          bodies.push(new missBallObject(self.x, self.y));        }      }if(self.direction === "up"){        self.y -= self.speed;        if(self.y < trainer.y - 200){          removeBody(this);          bodies.push(new missBallObject(self.x, self.y));        }      }if(self.direction==="down"){        self.y += self.speed;        if(self.y > trainer.y + 200){          removeBody(this);          bodies.push(new missBallObject(self.x, self.y));        }      }    }
      }
/////////////////////////////////////////////////////////////////////////////////////////////////////
//STEP 2 Declare all new Objects and package update into one function
function updateAllObjects(){
  var versionNumber = document.getElementById("versionNumber").innerHTML;
if(versionNumber != localStorage.getItem("data")){
  window.location.reload(true);
}
localStorage.setItem("data", versionNumber);
  game.petLevel = pet.exp;
  if(pet.exp > 0){
    game.selectPokemonBool = false;
  }
  if(game.selectPokemonBool === true){
    music4.pause();
    return;
  }
  if(game.pauseGameBool === true){
    music4.pause();
    return;
  }
  else{
    music4.play();
  }
  if(daycycle === 3){    noon = true;  }  else{    noon = false;  }  if(daycycle === 7){    night2 = true;  }  else{    night2 = false;  }  if(daycycle > 8){    daycycle = 1;  }  else if(daycycle > 5){    night = true;  }  else{    night = false;  }
    canvas.clearRect(0, 0, gameSize.x, gameSize.y);
    for(var i = 0; i < bodies.length; i++){
      bodies[i].updateObject();
    }
    if(trainer.dead === true ){
      var img = <HTMLImageElement>document.getElementById("gameover");
      canvas.drawImage(img, 0, 0, gameSize.x, gameSize.y);
    }
    if(night === true){
      var nightpic = <HTMLImageElement>document.getElementById("night2");
      canvas.drawImage(nightpic, 0, 0, gameSize.x, gameSize.y);
    }
    if(night2 === true){
      var nightpic = <HTMLImageElement>document.getElementById("night");
      canvas.drawImage(nightpic, 0, 0, gameSize.x, gameSize.y);
    }
    if(noon === true){
      var noonpic = <HTMLImageElement>document.getElementById("noon");
      canvas.drawImage(noonpic, 0, 0, gameSize.x, gameSize.y);
    }
};
///////////////////////////////////////////////////////////////////////////////////////////////////
//STEP 3 declare object functions

//Wild Pokemon Object
////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Wild Pokemon Object
////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////Wild Pokemon///////////////////////////////////////////////////////////////////////
//Wild Pokemon Object
////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Wild Pokemon Object
////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Wild Pokemon Object
////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Wild Pokemon Object
////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function PokemonObject() {
  this.randomName = function(){
    var spawnMod = 300+pet.exp*10;
    if(night === true){
      spawnMod += 200;
    }
    var d1 = Math.floor(Math.random()*spawnMod+1);
    if(d1 === 1000){return "charizard";}    if(d1 > 995 && raining === true){return "articuno";}      if(d1 > 995 && noon === true){return "mewtwo";}        else if(d1 > 975){return "arcanine";        }else if(d1 > 950){return "lapras";        }else if(d1 > 900){return "nidoking";        }else if(d1 > 875){return "machamp";        }else if(d1 > 850){return "scyther";        }else if(d1 > 830){return "charmander";        }else if(d1 > 825){return "squirtle";        }else if(d1 > 800){return "bulbasaur";        }else if(d1 > 775){return "pidgeotto";        }else if(d1 > 750){return "zubat";        }else if(d1 > 700){return "cubone";        }else if(d1 > 650){return "growlithe";        }else if(d1 > 600){return "sandshrew";        }else if(d1 > 550){return "pikachu";        }else if(d1 > 500){return "vulpix";        }else if(d1 > 400){return "venonat";        }else if(d1 > 300){return "eevee";        }else if(d1 > 200){return "pidgey";        }else if(d1 > 100){return "seedot";        }else if(d1 > 0){return "rattata";}
  };
  var self = this;
  this.name = this.randomName();
    //STATS
    self.speed = .5;
    self.damage = 1;
    self.hp = 100;
    self.hpMax = 500;
    self.expValue = 1;
    self.sizeMod = 0;
    //END
  this.showHp = false;
  self.statusColor = "gray"
  this.x = Math.floor(Math.random()*gameSize.x);
  this.y = Math.floor(Math.random()*gameSize.y);
  this.action = "walking";
  this.direction = "down";
  this.frame = "one";
  this.spriteChange = 0;
  this.attackChange = 0;
  this.directionCount = 0;
  this.type = "normal";
  this.dead = false;
  this.first = true;
  self.attack = false;
  this.pushedBy = function(object){
    self.x += (self.x > object.x) ? object.x/500 : -object.x/500;
      if(self.x > object.x && self.dead === false){
        self.direction = "right";
      }
      else if(self.y < object.y && self.dead === false){
        self.direction = "up";
      }
      if(self.y > object.y && self.dead === false){
        self.direction = "down";
      }
      else if(self.x < object.x && self.dead === false){
        self.direction = "left";
      }
    self.y += (self.y > object.y) ? object.y/500 : -object.x/500;
  };
  this.loseHp = function(damage){
    damage = pet.damage + pet.damageMod;
    if(self.type === "fire" && pet.type === "water"){        damage = damage *2;        self.hp = self.hp - damage;          self.statusColor = "yellow";        }      else if(self.type === "fire" && pet.type === "ground"){        damage = damage *2;        self.hp = self.hp - damage;          self.statusColor = "yellow";        }      else if(self.type === "fire" && pet.type === "grass"){        damage = damage /2;        self.hp = self.hp - damage;          self.statusColor = "red";      }        else if(self.type === "water" && pet.type === "grass"){        damage = damage *2;        self.hp = self.hp - damage;        self.statusColor = "yellow";        }      else if(self.type === "water" && pet.type === "electric"){        damage = damage *2;        self.hp = self.hp - damage;          self.statusColor = "yellow";        }      else if(self.type === "water" && pet.type === "fire"){        damage = damage /2;        self.hp = self.hp - damage;          self.statusColor = "red";      }        else if(self.type === "grass" && pet.type === "fire"){        damage = damage *2;        self.hp = self.hp - damage;          self.statusColor = "yellow";        }      else if(self.type === "grass" && pet.type === "poison"){        damage = damage *2;        self.hp = self.hp - damage;          self.statusColor = "yellow";        }      else if(self.type === "grass" && pet.type === "flying"){        damage = damage *2;        self.hp = self.hp - damage;          self.statusColor = "yellow";        }      else if(self.type === "grass" && pet.type === "water"){        damage = damage /2;        self.hp = self.hp - damage;          self.statusColor = "red";      }        else if(self.type === "poison" && pet.type === "ground"){        damage = damage *2;        self.hp = self.hp - damage;          self.statusColor = "yellow";        }      else if(self.type === "poison" && pet.type === "fire"){        damage = damage *2;        self.hp = self.hp - damage;          self.statusColor = "yellow";        }      else if(self.type === "poison" && pet.type === "grass"){        damage = damage /2;        self.hp = self.hp - damage;          self.statusColor = "red";      }        else if(self.type === "ice" && pet.type === "fire"){        damage = damage *2;        self.hp = self.hp - damage;          self.statusColor = "yellow";        }      else if(self.type === "ice" && pet.type === "fighting"){        damage = damage *2;        self.hp = self.hp - damage;          self.statusColor = "yellow";        }      else if(self.type === "ice" && pet.type === "water"){        damage = damage /2;        self.hp = self.hp - damage;          self.statusColor = "red";      }        else if(self.type === "ground" && pet.type === "ice"){        damage = damage *2;        self.hp = self.hp - damage;          self.statusColor = "yellow";        }      else if(self.type === "ground" && pet.type === "grass"){        damage = damage *2;        self.hp = self.hp - damage;          self.statusColor = "yellow";        }      else if(self.type === "ground" && pet.type === "water"){        damage = damage *2;        self.hp = self.hp - damage;          self.statusColor = "yellow";        }      else if(self.type === "ground" && pet.type === "fire"){        damage = damage /2;        self.hp = self.hp - damage;          self.statusColor = "red";      }      else if(self.type === "ground" && pet.type === "flying"){        damage = damage /2;        self.hp = self.hp - damage;          self.statusColor = "red";      }      else if(self.type === "ground" && pet.type === "electric"){        damage = damage /10;        self.hp = self.hp - damage;          self.statusColor = "red";      }      else if(self.type === "fighting" && pet.type === "flying"){        damage = damage *2;        self.hp = self.hp - damage;          self.statusColor = "yellow";        }      else if(self.type === "flying" && pet.type === "electric"){        damage = damage *2;        self.hp = self.hp - damage;          self.statusColor = "yellow";        }      else if(self.type === "flying" && pet.type === "grass"){        damage = damage /2;        self.hp = self.hp - damage;          self.statusColor = "red";      }          else if(self.type === "electric" && pet.type === "ground"){            damage = damage *2;            self.hp = self.hp - damage;            self.statusColor = "yellow";            }          else if(self.type === "electric" && pet.type === "grass"){            damage = damage*2;            self.hp = self.hp - damage;            self.statusColor = "yellow";          }          else if(self.type === "electric" && pet.type === "water"){            damage = damage /2;            self.hp = self.hp - damage;            self.statusColor = "red";          }
    else{
      self.hp = self.hp - damage;
      self.statusColor = "gray";
    }
  }
  //////////////////////////////////////////////////
  /////////MOB UPDATE///////////////////////////////
  this.updateObject = function(){
    if(self.first === true){
      self.first = false;
      if(self.name === "zubat"){self.speed = .7;self.damage = .3;self.hpMax = 130;self.expValue = 1;self.sizeMod = -3;self.type = "poison";      }else if(self.name === "venonat"){self.speed = .1;self.damage = .5;self.hpMax = 160;self.expValue = 1;self.sizeMod = 0;self.type = "poison";      }else if(self.name === "rattata"){self.speed = .2;self.damage = .2;self.hpMax = 170;self.expValue = 1;self.sizeMod = 0;self.type = "poison";      }else if(self.name === "pidgey"){self.speed = .4;self.damage = .4;self.hpMax = 150;self.expValue = 1;self.sizeMod = 0;self.type = "flying";      }else if(self.name === "lapras"){self.speed = .1;self.damage = .5;self.hpMax = 300;self.expValue = 1;self.sizeMod = 10;self.type = "water";      }else if(self.name === "nidoking"){self.speed = .1;self.damage = 2.7;self.hpMax = 250;self.expValue = 1;self.sizeMod = 10;self.type = "poison";      }else if(self.name === "scyther"){self.speed = .5;self.damage = 3;self.hpMax = 150;self.expValue = 1;self.sizeMod = 5;self.type = "grass";      }else if(self.name === "eevee"){self.speed = .4;self.damage = 1;self.hpMax = 180;self.expValue = 1;self.sizeMod = 0;self.type = "ground";      }else if(self.name === "charmander"){self.speed = .3;self.damage = 1;self.hpMax = 180;self.expValue = 1;self.sizeMod = 0;self.type = "fire";      }else if(self.name === "pikachu"){self.speed = .3;self.damage = 1;self.hpMax = 180;self.expValue = 1;self.sizeMod = -3;self.type = "electric";      }else if(self.name === "growlithe"){self.speed = .6;self.damage = 1.2;self.hpMax = 200;self.expValue = 1;self.sizeMod = 0;self.type = "fire";      }else if(self.name === "arcanine"){self.speed = .4;self.damage = 3;self.hpMax = 300;self.expValue = 1;self.sizeMod = +5;self.type = "fire";      }else if(self.name === "cubone" || self.name === "sandshrew"){self.speed = .7;self.damage = 1.5;self.hpMax = 180;self.expValue = 1;self.sizeMod = 0;self.type = "ground";      }else if(self.name === "machamp"){self.speed = .2;self.damage = 5;self.hpMax = 200;self.expValue = 1;self.sizeMod = +10;self.type = "fighting"      }else if(self.name === "vulpix"){self.speed = .3;self.damage = 1.3;self.hpMax = 180;self.expValue = 1;self.sizeMod = 1;self.type = "fire";      }else if(self.name === "bulbasaur" || self.name === "seedot"){self.speed = .6;self.damage = 1.5;self.hpMax = 180;self.expValue = 1;self.sizeMod = 0;self.type = "grass";      }else if(self.name === "squirtle"){self.speed = .6;self.damage = 1.5;self.hpMax = 180;self.expValue = 1;self.sizeMod = 0;self.type = "water";      }else if(self.name === "charizard"){self.speed = .3;self.damage = 5;self.hpMax = 300;self.expValue = 1;self.sizeMod = 10;self.type = "fire";      }else if(self.name === "articuno"){self.speed = 1.3;self.damage = 3;self.hpMax = 500;self.expValue = 1;self.sizeMod = 15;self.type = "ice";self.x = gameSize.x/2; self.y = gameSize.y/2;      }else if(self.name === "mewtwo"){self.speed = .1;self.damage = 10;self.hpMax = 1000;self.expValue = 1;self.sizeMod = 15;self.type = "psychic";self.x = gameSize.x/2; self.y = gameSize.y/2;      }
    self.hp = self.hpMax;
    }
    var img = <HTMLImageElement>document.getElementById(this.name + "-" + this.action + "-" + this.direction + "-" + this.frame);
    self.rightSide = self.x + (img.width+self.sizeMod)/2+1;
    self.leftSide = self.x - (img.width+self.sizeMod)/2+1;
    self.topSide =  self.y - (img.height+self.sizeMod)/2+1;
    self.bottomSide = self.y + (img.height+self.sizeMod)/2+1;
    self.size = img.width+self.sizeMod;
    canvas.drawImage(img, self.x-(img.width+self.sizeMod)/2, self.y-(img.height+self.sizeMod)/2, img.width+self.sizeMod, img.height+self.sizeMod);
    if(self.rightSide > trainer.leftSide &&
      self.leftSide < trainer.rightSide &&
      self.topSide < trainer.bottomSide &&
      self.bottomSide > trainer.topSide){
        if(self.size < trainer.size){
          self.pushedBy(trainer);
        }
    }
    if(self.rightSide > pet.leftSide &&
      self.leftSide < pet.rightSide &&
      self.topSide < pet.bottomSide &&
      self.bottomSide > pet.topSide&&
      pet.attack === false){
        if(self.size < pet.size){
          self.pushedBy(pet);
        }
    }
    bodies.forEach(function(body){
      if(body instanceof treeObject || body instanceof rockObject){
          if(self.rightSide > (body as any).leftSide &&
            self.leftSide < (body as any).rightSide &&
            self.topSide < (body as any).bottomSide &&
            self.bottomSide > (body as any).topSide){
              self.pushedBy((body as any));
          }
        }
        if(body instanceof PokemonObject){
          if(self.rightSide > (body as any).leftSide &&
            self.leftSide < (body as any).rightSide &&
            self.topSide < (body as any).bottomSide &&
            self.bottomSide > (body as any).topSide){
              if(self.size < (body as any).size){
              self.pushedBy(body);
              }
          }
        }
    });
    if(this.dead === true){
      self.attack = false;
      this.sizeMod -= .01;
      if(this.sizeMod < -10){
        removeBody(this);
      }
      return;
    }else{
      if(this.hp < 0){
        newPokemon();
        this.dead = true;
        this.action = "dead";
        this.direction = "down";
        this.frame = "one";
        pet.levelUp(self.expValue);
        return;
      }
      if(this.spriteChange === 0){
        this.frame = (this.frame === "one") ?
        "two" : (this.frame === "two") ?
        "three" : (this.frame === "three") ?
        "one" : "three";
        this.spriteChange = 5;
      }else{
        this.spriteChange --;
      }
      if(self.attack === true){
        self.action = "attacking";
      }else{
        self.action = "walking";
      }
      if(self.rightSide+20 > pet.leftSide &&
      self.leftSide-20 < pet.rightSide &&
      self.topSide-20 < pet.bottomSide &&
      self.bottomSide+20 > pet.topSide &&
      pet.attack === true){
        self.attack = true;
        pet.loseHp(this.damage);
        if(pet.direction === "up"){
          self.x = pet.x;
          self.y = pet.topSide  - (img.height+self.sizeMod)/2;
          self.direction = "down";
          //HP BAR DOWN
          canvas.fillStyle =  self.statusColor;
          var width = 25*self.hp/self.hpMax;
          if(width < 0){
            width = 0;
          }
          canvas.fillRect(self.x-(img.width+self.sizeMod)/3, self.y-(img.height+self.sizeMod)/2-7, width, 5);
          canvas.strokeStyle = "black";
          canvas.strokeRect(self.x-(img.width+self.sizeMod)/3, self.y-(img.height+self.sizeMod)/2-7, 25, 5);
        }
        if(pet.direction === "down"){
          self.x = pet.x;
          self.y = pet.bottomSide + (img.height+self.sizeMod)/2;
          self.direction = "up";
          //HP BAR UP
          canvas.fillStyle =  self.statusColor;
          var width = 25*self.hp/self.hpMax;
          if(width < 0){
            width = 0;
          }
          canvas.fillRect(self.x-(img.width+self.sizeMod)/3, self.y+(img.height+self.sizeMod)/2+7, width, 5);
          canvas.strokeStyle = "black";
          canvas.strokeRect(self.x-(img.width+self.sizeMod)/3, self.y+(img.height+self.sizeMod)/2+7, 25, 5);
        }
        if(pet.direction === "right"){
          self.x = pet.rightSide + (img.width+self.sizeMod)/2;
          self.y = pet.y;
          self.direction = "left";
                    //HP BAR
                    canvas.fillStyle =  self.statusColor;
                    var width = 25*self.hp/self.hpMax;
                    if(width < 0){
                      width = 0;
                    }
                    canvas.fillRect(self.x-(img.width+self.sizeMod)/3, self.y-(img.height+self.sizeMod)/2-7, width, 5);
                    canvas.strokeStyle = "black";
                    canvas.strokeRect(self.x-(img.width+self.sizeMod)/3, self.y-(img.height+self.sizeMod)/2-7, 25, 5);

        }
        if(pet.direction === "left"){
          self.x = pet.leftSide - (img.width+self.sizeMod)/2;
          self.y = pet.y;
          self.direction = "right";
                    //HP BAR
                    canvas.fillStyle =  self.statusColor;
                    var width = 25*self.hp/self.hpMax;
                    if(width < 0){
                      width = 0;
                    }
                    canvas.fillRect(self.x-(img.width+self.sizeMod)/3, self.y-(img.height+self.sizeMod)/2-7, width, 5);
                    canvas.strokeStyle = "black";
                    canvas.strokeRect(self.x-(img.width+self.sizeMod)/3, self.y-(img.height+self.sizeMod)/2-7, 25, 5);
        }
      }
      else{
        self.attack = false;
      }
      if(self.attack === true){
        return;
        ////////////Return here so that the pokemon doesn't move around while attacking
      }
    if (this.directionCount === 0) {
        this.directionCount = Math.floor(Math.random()*500 + 100);
        this.direction = random();
    } else {
        this.directionCount--;
    }
      if(this.direction === "left"){
        this.x -= this.speed;
      }else if(this.direction === "right"){
        this.x += this.speed;
      }else if(this.direction === "up"){
        this.y -= this.speed;
      }else if(this.direction === "down"){
        this.y += this.speed;
      }
      //screen boundaries
      if (this.x > gameSize.x) {
        removeBody(this);
        return;
      } else if (this.x < 0) {
        removeBody(this);
          return;
      }else if(this.y > gameSize.y) {
        removeBody(this);
          return;
      } else if (this.y < 0) {
        removeBody(this);
          return;
      }
      function random(){
        var r = Math.floor(Math.random()*4+1);
        if(r === 1){return "up";}else if(r === 2){return "down";}else if(r === 3){return "left"}else if(r ===4){return "right";}
      };
    }//end of else not dead
  };  //end of updateObject()
};   //end of PokemonObject()
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////PET///////////////////////////////////////////////////////////////////////
//PET Object
////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////PET///////////////////////////////////////////////////////////////////////
//PET Object
////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////PET///////////////////////////////////////////////////////////////////////
//PET Object
////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////PET///////////////////////////////////////////////////////////////////////
//PET Object
////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function petObject(){
  var self = this;
  // this.name = randomName();
  this.name = localStorage.getItem("petname");
  this.hpbar = document.getElementById("pet-hpbar");
  this.level = localStorage.getItem("level");
  this.leveltonumber = Number(this.level);
  this.exp =  this.leveltonumber;
  self.hpbar.max = 150;
  self.damage = .5;
  this.action = "walking";
  this.direction = "down";
  this.frame = "one";
  this.spriteChange = 0;
  this.x = gameSize.x/2 - 60;
  this.y = gameSize.y/2 - 60;
  this.followChange = 0;
  this.hpRegen = 0;
  this.attack = false;
  this.sic = false;
  this.dead = false;
  this.speed = 3;
  this.damageMod = 0;
  this.sizeMod = -3;
  this.type = "normal";
  this.first = true;
  self.ball = false;
  self.directionCount = Math.floor(Math.random()*gameSize.x);;
  self.wander = false;
  self.randomDirection = function(){
    var r = Math.floor(Math.random()*4+1);
    if(r === 1){return "up";}else if(r === 2){return "down";}else if(r === 3){return "left"}else if(r ===4){return "right";}
  };
  this.pushedBy = function(object){
    self.x += (self.x > object.x) ? object.x/500 : -object.x/500;
    self.y += (self.y > object.y) ? object.y/500 : -object.x/500;
  };
  this.levelUp = function(expValue){
    self.attack = false;
    self.sic = false;
    if(self.exp > 99){
      return;
    }else{
      self.exp += expValue;
      localStorage.setItem("level", pet.exp);
      self.hpbar.max = 100 + this.exp*5;
      self.sizeMod = -3 + this.exp*0.2;
      self.damageMod = 0 + this.exp*0.05;
    }
  }
  this.loseHp = function(damage){
    if(self.hpbar.value > 0){
      self.hpbar.value = self.hpbar.value - damage;}
      else{self.dead = true;}
  }
  this.regen = function(){
    if(self.attack === false){
      if(self.hpbar.value < self.hpbar.max){
        pet.hpbar.value += pet.hpbar.max * 0.01;}}
  }
  function randomName(){
    var d1 = Math.floor(Math.random()*100+1);
    if(d1 > 95){return "lapras";}else if(d1 > 90){return "pidgey";}else if(d1 > 80){return "charmander";}else if(d1 > 70){return "squirtle";}else if(d1 > 60){return "squirtle";}else if(d1 > 50){return "squirtle";          }else if(d1 > 40){return "bulbasaur";}else if(d1 > 30){return "bulbasaur";}else if(d1 > 0){return "pikachu";}
    };
  this.updateObject = function(){
    if(self.exp > 0 && this.first === true){
      if(party.length < 1){
        party.push(localStorage.getItem("petname"));
      }
      this.first = false;
      self.hpbar.max = 100 + this.exp*5;
      self.sizeMod = -3 + this.exp*0.2;
      self.damageMod = 0 + this.exp*0.05;
    }

    if(self.name === "growlithe"){if(self.exp > 25){self.name = "arcanine";}}if(self.name === "charmander"){if(self.exp > 15){self.name = "charmeleon";}}if(self.name === "charmeleon" || self.name === "charmander"){if(self.exp > 35){self.name = "charizard";}}        if(self.name === "squirtle"){if(self.exp > 15){self.name = "wartortle";}}        if(self.name === "wartortle" || self.name === "squirtle"){if(self.exp > 35){self.name = "blastoise";}}        if(self.name === "pidgey"){if(self.exp > 15){self.name = "pidgeotto";}}        if(self.name === "pidgeotto" || self.name === "pidgey"){if(self.exp > 35){self.name = "pidgeot";}}
    if(self.name === "charmander" || self.name === "charmeleon" || self.name === "charizard" || self.name === "vulpix" || self.name === "arcanine" || self.name === "growlithe"){          self.type = "fire";}        if(self.name === "rattata" || self.name === "venonat" || self.name === "zubat" || self.name === "nidoking"){          self.type = "poison";}        if(self.name === "squirtle" || self.name === "wartortle" || self.name === "blastoise" || self.name === "lapras"){          self.type = "water";}        if(self.name === "seedot" || self.name === "bulbasaur" || self.name === "scyther"){          self.type = "grass";}if(self.name === "pikachu"){self.type = "electric";}if(self.name === "machamp"){self.type = "fighting";}if(self.name === "pidgey" || self.name === "pidgeotto" || self.name === "pidgeot"){self.type = "flying";}        if(self.name === "sandshrew" ||self.name === "cubone" || self.name === "eevee"){self.type = "ground";}if(self.name === "articuno"){self.type = "ice";}
    var img = <HTMLImageElement>document.getElementById(this.name + "-" + this.action + "-" + this.direction + "-" + this.frame);
    self.rightSide = self.x + (img.width+self.sizeMod)/2+1;
    self.leftSide = self.x - (img.width+self.sizeMod)/2+1;
    self.topSide =  self.y - (img.height+self.sizeMod)/2+1;
    self.bottomSide = self.y + (img.height+self.sizeMod)/2+1;
    self.size = img.width+self.sizeMod;
    self.sizex = img.width+self.sizeMod;
    self.sizey = img.height+self.sizeMod;
    if(self.ball === true){
      return;
    }
    canvas.drawImage(img, this.x-(img.width+self.sizeMod)/2, this.y-(img.height+self.sizeMod)/2, img.width+self.sizeMod, img.height+self.sizeMod);
    var size = img.width+self.sizeMod;
    if(self.hpbar.value > 0){
      self.dead = false;
    }else{
      self.dead = true;
      self.attack = false;
      self.sic = false;
    }
    if(self.dead === true){
      self.action = "dead";
      self.direction = "down";
      self.frame = "one";
      game.returnPokemon();
      return;
    }
    if(self.hpbar.value < self.hpbar.max && self.attack === false){
      canvas.fillStyle = 'blue';
      var width = 25*self.hpbar.value/self.hpbar.max;
      if(width < 0){
        width = 0;
      }
      canvas.fillRect(self.x-(img.width+self.sizeMod)/2, self.y+(img.height+self.sizeMod)/2+7, width, 5);
      canvas.strokeStyle = "black";
      canvas.strokeRect(self.x-(img.width+self.sizeMod)/2, self.y+(img.height+self.sizeMod)/2+7, 25, 5);
    }
    if(this.spriteChange === 0){
      this.frame = (this.frame === "one") ?
      "two" : (this.frame === "two") ?
      "three" : (this.frame === "three") ?
      "one" : "three";
      this.spriteChange = 5;
    }else{
      this.spriteChange --;
    }
    if(self.attack === true){
      self.action = "attacking";
    }else{
      self.action = "walking";
    }
    if(self.rightSide-3 > trainer.leftSide &&
      self.leftSide+3 < trainer.rightSide &&
      self.topSide+3 < trainer.bottomSide &&
      self.bottomSide-3 > trainer.topSide &&
      self.sic === false){
          self.pushedBy(trainer);
    }
    bodies.forEach(function(body){
      if(body instanceof PokemonObject){
          if(self.rightSide > (body as any).leftSide &&
            self.leftSide < (body as any).rightSide &&
            self.topSide < (body as any).bottomSide &&
            self.bottomSide > (body as any).topSide &&
            (body as any).attack === false){
              if(self.size < (body as any).size){
              self.pushedBy(body);
              }
          }
        }
        if(body instanceof treeObject || body instanceof rockObject){
          if(self.rightSide > (body as any).leftSide &&
            self.leftSide < (body as any).rightSide &&
            self.topSide < (body as any).bottomSide &&
            self.bottomSide > (body as any).topSide){
              self.pushedBy((body as any));

          }
        }
    });
///pet movement pet movement
////////////////////////////GO ATTACK, IE SIC === TRUE
if(self.sic === true){
  self.speed = 4.2;
  bodies.forEach(function(body){
    if(body instanceof PokemonObject){
        if((body as any).dead === true){
          return;
        }
        if(self.rightSide+5 > (body as any).leftSide &&
          self.leftSide-5 < (body as any).rightSide &&
          self.topSide-5 < (body as any).bottomSide &&
          self.bottomSide+5 > (body as any).topSide){
            self.attack = true;
            (body as any).loseHp(self.damage);
            if((body as any).direction === "up"){
              // self.direction = "down";
                canvas.fillStyle = 'blue';
                var width = 25*self.hpbar.value/self.hpbar.max;
                if(width < 0){
                  width = 0;
                }
                canvas.fillRect(self.x-(img.width+self.sizeMod)/3, self.y-(img.height+self.sizeMod)/2-7, width, 5);
                canvas.strokeStyle = "black";
                canvas.strokeRect(self.x-(img.width+self.sizeMod)/3, self.y-(img.height+self.sizeMod)/2-7, 25, 5);
            }else if((body as any).direction === "down"){
                //HP BAR UP
                canvas.fillStyle = 'blue';
                var width = 25*self.hpbar.value/self.hpbar.max;
                if(width < 0){
                  width = 0;
                }
                canvas.fillRect(self.x-(img.width+self.sizeMod)/3, self.y+(img.height+self.sizeMod)/2+7, width, 5);
                canvas.strokeStyle = "black";
                canvas.strokeRect(self.x-(img.width+self.sizeMod)/3, self.y+(img.height+self.sizeMod)/2+7, 25, 5);
              // self.direction = "up";
            }else if((body as any).direction === "right"){
              //HP BAR LEFT
              canvas.fillStyle = 'blue';
              var width = 25*self.hpbar.value/self.hpbar.max;
              if(width < 0){
                width = 0;
              }
              canvas.fillRect(self.x-(img.width+self.sizeMod)/3, self.y+(img.height+self.sizeMod)/2+7, width, 5);
              canvas.strokeStyle = "black";
              canvas.strokeRect(self.x-(img.width+self.sizeMod)/3, self.y+(img.height+self.sizeMod)/2+7, 25, 5);
              // self.direction = "left";
            }else if((body as any).direction === "left"){
              // self.direction = "right";
                            //HP BAR Right
                            canvas.fillStyle = 'blue';
                            var width = 25*self.hpbar.value/self.hpbar.max;
                            if(width < 0){
                              width = 0;
                            }
                            canvas.fillRect(self.x-(img.width+self.sizeMod)/3, self.y+(img.height+self.sizeMod)/2+7, width, 5);
                            canvas.strokeStyle = "black";
                            canvas.strokeRect(self.x-(img.width+self.sizeMod)/3, self.y+(img.height+self.sizeMod)/2+7, 25, 5);
            }
        }
      }
  });
///////FOLLOW TRAINER
  if(trainer.direction === "down" && self.attack === false){
    if(self.rightSide <= trainer.x-1){
      self.direction = "right";
    }
    else if(self.leftSide >= trainer.x+1){
      self.direction = "left";
    }
    else if(self.bottomSide <= trainer.bottomSide+size*9){
      self.direction = "down";
    }
    else{
      self.sic = false;
    }
  }
  if(trainer.direction === "up" && self.attack === false){
    if(self.topSide >= trainer.topSide - size*9){
      self.direction = "up";
    }
    else if(self.rightSide <= trainer.x-2){
      self.direction = "right";
    }
    else if(self.leftSide >= trainer.x+2){
      self.direction = "left";
    }
    else{
      self.sic = false;
    }
  }
  if(trainer.direction === "left" && self.attack === false){
    if(self.topSide >= trainer.y-2){
      self.direction = "up";
    }
    else if(self.leftSide > trainer.leftSide - size*9){
      self.direction = "left";
    }
    else if(self.bottomSide <= trainer.y+2){
      self.direction = "down";
    }
    else{
      self.sic = false;
    }
  }
  if(trainer.direction === "right" && self.attack === false){
    if(self.topSide >= trainer.y-2){
      self.direction = "up";
    }
    else if(self.rightSide < trainer.rightSide + size*9){
      self.direction = "right";
    }
    else if(self.bottomSide <= trainer.y+2){
      self.direction = "down";
    }
    else{
      self.sic = false;
    }
  }
}
else if(self.sic === false){
  self.attack = false;
    self.speed = trainer.speed-.3;
    if(self.topSide >= trainer.bottomSide){
      self.direction = "up";
    }
    else if(self.rightSide <= trainer.leftSide){
      self.direction = "right";
    }
    else if(self.leftSide >= trainer.rightSide){
      self.direction = "left";
    }
    else if(self.bottomSide <= trainer.topSide){
      self.direction = "down";
    }
    else{
      if(trainer.action === "attacking"){
        self.speed = trainer.speed/5;
        if(self.directionCount === 0){
          self.wander = (self.wander === true) ? false : true;
          self.directionCount = Math.floor(Math.random()*gameSize.x);
        }else{
          self.directionCount--
          if(self.wander === false){
            self.frame = "two";
            return;
          }
        }
      }
      else{
        self.wander = false;
        self.speed = trainer.speed -0.1;
      }
    }
}
      if(self.attack === false){
        if(self.direction === "left"){
          self.x -= self.speed;
        }else if(self.direction === "right"){
          self.x += self.speed;
        }else if(self.direction === "up"){
          self.y -= self.speed;
        }else if(self.direction === "down"){
          self.y += self.speed;
        }
      }
      if (this.x > gameSize.x) {
        this.x = gameSize.x-1;
        self.sic = false;
        return;
      } else if (this.x < 0) {
          this.x = 1;
          self.sic = false;
          return;
      }else if(this.y > gameSize.y) {
          this.y = gameSize.y -1;
          self.sic = false;
          return;
      } else if (this.y < 0) {
          this.y = 1;
          self.sic = false;
          return;
      }
    };//end of Update
  };//end of Follow Object
///////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////
//Trainer Object
///////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////
//Trainer Object
///////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////
//Trainer Object
///////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////
//Trainer Object
///////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////
//Trainer Object
///////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////
//Trainer Object
function TrainerObject() {
  var self = this;
  this.name = "boytrainer";
  this.direction = "down";
  this.x = gameSize.x/2;
  this.y = gameSize.y/2;
  this.action = "attacking";
  this.frame = "one";
  this.spriteChange = 0;
  this.speed = 3.3;
  this.hp = 500;
  this.dead = false;
  self.sizeMod = 5;
  self.caught = 1;
  this.pushedBy = function(object){
    self.x += (self.x > object.x) ? object.x/300 : -object.x/300;
    self.y += (self.y > object.y) ? object.y/300 : -object.x/300;
  };
  this.updateObject = function(){
    document.getElementById("caught").innerHTML = self.caught;
    var img = <HTMLImageElement>document.getElementById(this.name + "-" + this.action + "-" + this.direction + "-" + this.frame);
    self.rightSide = self.x + (img.width+self.sizeMod)/3+1;
    self.leftSide = self.x - (img.width+self.sizeMod)/3+1;
    self.topSide =  self.y - (img.height+self.sizeMod)/3+1;
    self.bottomSide = self.y + (img.height+self.sizeMod)/3+1;
    self.size = img.width+self.sizeMod;
    canvas.drawImage(img, this.x-(img.width+self.sizeMod)/2, this.y-(img.height+self.sizeMod)/2, img.width+self.sizeMod, img.height+self.sizeMod);
    if(this.hp < 0){
      this.dead = true;
      this.action = "dead";
      this.direction = "down";
      this.frame = "one";
      return;
    }
      if(self.rightSide > pet.leftSide &&
        self.leftSide < pet.rightSide &&
        self.topSide < pet.bottomSide &&
        self.bottomSide > pet.topSide){
          pet.regen();
        }
      bodies.forEach(function(body){
        if(body instanceof PokemonObject){
            if(self.rightSide > (body as any).leftSide &&
              self.leftSide < (body as any).rightSide &&
              self.topSide < (body as any).bottomSide &&
              self.bottomSide > (body as any).topSide){
                if(self.size < (body as any).size){
                self.pushedBy(body);
                }
            }
          }
          if(body instanceof treeObject || body instanceof rockObject){
            if(self.rightSide > (body as any).leftSide &&
              self.leftSide < (body as any).rightSide &&
              self.topSide < (body as any).bottomSide &&
              self.bottomSide > (body as any).topSide){
                self.pushedBy((body as any));

            }
          }
      });
    if(this.action === "attacking"){
      this.frame = "two";
      return;
    }
    if(this.spriteChange === 0){
      this.frame = (this.frame === "one") ?
      "two" : (this.frame === "two") ?
      "three" : (this.frame === "three") ?
      "one" : "three";
      this.spriteChange = 5;
    }else{
      this.spriteChange --;
    }
    if(this.direction === "left"){
      this.x -= this.speed;
    }else if(this.direction === "right"){
      this.x += this.speed;
    }else if(this.direction === "up"){
      this.y -= this.speed;
    }else if(this.direction === "down"){
      this.y += this.speed;
    }
//screen boundaries
//right
    if(pet.dead === true || pet.attack === true){
      if (this.x > gameSize.x) {
        this.x = gameSize.x-1;
        this.frame = "two";
        return;
      } else if (this.x < 0) {
          this.x = 1;
          this.frame = "two";
          return;
      }else if(this.y > gameSize.y) {
          this.y = gameSize.y -1;
          this.frame = "two";
          return;
      } else if (this.y < 0) {
          this.y = 1;
          this.frame = "two";
          return;
      }
    }
    if (this.x > gameSize.x) {
        bodies.forEach(function(body){
          if(body instanceof rainObject || body instanceof treeObject || body instanceof rockObject || body instanceof bushObject || body instanceof PokemonObject || body instanceof caughtBallObject){
            removeBody((body as any));
            }
        });
        makeForest();
        newPokemon();
        newPokemon();
        newPokemon();
        this.x = 0 + (img.width/2) +1;
        pet.x = 0 +1;
        daycycle++;
    } else if (this.x < 0) {
        bodies.forEach(function(body){
          if(body instanceof rainObject || body instanceof treeObject || body instanceof rockObject || body instanceof bushObject || body instanceof PokemonObject || body instanceof caughtBallObject){
            removeBody((body as any));
            }
        });
        makeForest();
        newPokemon();
        newPokemon();
        newPokemon();
        this.x = gameSize.x-1;
        pet.x = gameSize.x-1;
        daycycle++;
    }else if(this.y > gameSize.y) {
      bodies.forEach(function(body){
        if(body instanceof rainObject || body instanceof treeObject || body instanceof rockObject || body instanceof bushObject || body instanceof PokemonObject || body instanceof caughtBallObject){
          removeBody((body as any));
          }
      });
      makeForest();
      newPokemon();
      newPokemon();
      newPokemon();
        this.y = 0 + (img.width/2) + 1;
        pet.y = 0 + (img.width/2) + 1;
        daycycle++;
    } else if (this.y < 0) {
      bodies.forEach(function(body){
        if(body instanceof rainObject || body instanceof treeObject || body instanceof rockObject || body instanceof bushObject ||body instanceof PokemonObject || body instanceof caughtBallObject){
          removeBody((body as any));
          }
        });
        makeForest();
      newPokemon();
      newPokemon();
      newPokemon();
        this.y = gameSize.y - (img.height/2)-1;
        pet.y = gameSize.y - (img.height/2)-1;
        daycycle++;
    }
  };  //end of updateObject()
};   //end of TrainerObject()
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////MISC OBJECTS
////////////////////////////////////////////////////////
  function rainObject(){
    var self = this;
    var water = <HTMLImageElement>document.getElementById("water");
    var fire = <HTMLImageElement>document.getElementById("fire");
    self.x = Math.floor(Math.random()*gameSize.x);
    self.y = Math.floor(Math.random()*gameSize.y);
    self.randomNumber = Math.floor(Math.random()*100+1);
    this.updateObject = function(){
      if(self.randomNumber < 79){return;}
      if(self.randomNumber === 79){
        var img = <HTMLImageElement>document.getElementById("pokecenter");
        canvas.drawImage(img, self.x-100, self.y+100, img.width, img.height);
      }
      if(self.randomNumber > 98){
        canvas.drawImage(fire, Math.floor(Math.random()*gameSize.x-fire.width/2), Math.floor(Math.random()*gameSize.y-fire.height/2), fire.width, fire.height);
        canvas.drawImage(fire, Math.floor(Math.random()*gameSize.x-fire.width/2), Math.floor(Math.random()*gameSize.y-fire.height/2), fire.width, fire.height);
        canvas.drawImage(fire, Math.floor(Math.random()*gameSize.x-fire.width/2), Math.floor(Math.random()*gameSize.y-fire.height/2), fire.width, fire.height);
        canvas.drawImage(fire, Math.floor(Math.random()*gameSize.x-fire.width/2), Math.floor(Math.random()*gameSize.y-fire.height/2), fire.width, fire.height);
        canvas.drawImage(fire, Math.floor(Math.random()*gameSize.x-fire.width/2), Math.floor(Math.random()*gameSize.y-fire.height/2), fire.width, fire.height);
        canvas.drawImage(fire, Math.floor(Math.random()*gameSize.x-fire.width/2), Math.floor(Math.random()*gameSize.y-fire.height/2), fire.width, fire.height);
        canvas.drawImage(fire, Math.floor(Math.random()*gameSize.x-fire.width/2), Math.floor(Math.random()*gameSize.y-fire.height/2), fire.width, fire.height);
        canvas.drawImage(fire, Math.floor(Math.random()*gameSize.x-fire.width/2), Math.floor(Math.random()*gameSize.y-fire.height/2), fire.width, fire.height);
        canvas.drawImage(fire, Math.floor(Math.random()*gameSize.x-fire.width/2), Math.floor(Math.random()*gameSize.y-fire.height/2), fire.width, fire.height);
        canvas.drawImage(fire, Math.floor(Math.random()*gameSize.x-fire.width/2), Math.floor(Math.random()*gameSize.y-fire.height/2), fire.width, fire.height);
      }
      else{
        canvas.drawImage(water, Math.floor(Math.random()*gameSize.x-water.width/2), Math.floor(Math.random()*gameSize.y-water.height/2), water.width, water.height);
        canvas.drawImage(water, Math.floor(Math.random()*gameSize.x-water.width/2), Math.floor(Math.random()*gameSize.y-water.height/2), water.width, water.height);
        canvas.drawImage(water, Math.floor(Math.random()*gameSize.x-water.width/2), Math.floor(Math.random()*gameSize.y-water.height/2), water.width, water.height);
        canvas.drawImage(water, Math.floor(Math.random()*gameSize.x-water.width/2), Math.floor(Math.random()*gameSize.y-water.height/2), water.width, water.height);
        canvas.drawImage(water, Math.floor(Math.random()*gameSize.x-water.width/2), Math.floor(Math.random()*gameSize.y-water.height/2), water.width, water.height);
        canvas.drawImage(water, Math.floor(Math.random()*gameSize.x-water.width/2), Math.floor(Math.random()*gameSize.y-water.height/2), water.width, water.height);
        canvas.drawImage(water, Math.floor(Math.random()*gameSize.x-water.width/2), Math.floor(Math.random()*gameSize.y-water.height/2), water.width, water.height);
        canvas.drawImage(water, Math.floor(Math.random()*gameSize.x-water.width/2), Math.floor(Math.random()*gameSize.y-water.height/2), water.width, water.height);
        canvas.drawImage(water, Math.floor(Math.random()*gameSize.x-water.width/2), Math.floor(Math.random()*gameSize.y-water.height/2), water.width, water.height);
        canvas.drawImage(water, Math.floor(Math.random()*gameSize.x-water.width/2), Math.floor(Math.random()*gameSize.y-water.height/2), water.width, water.height);
      }
    }
  }

function treeObject(){
  var self = this;
  this.x = Math.floor(Math.random()*gameSize.x);
  this.y = Math.floor(Math.random()*gameSize.y);
  self.sizeMod = Math.random();
  this.pushedBy = function(object){
    self.x += (self.x > object.x) ? object.x*100 : -object.x*100;
    self.y += (self.y > object.y) ? object.y*100 : -object.x*100;
  };
  this.updateObject = function(){
    var img = <HTMLImageElement>document.getElementById("tree");
    self.rightSide = self.x + (img.width+self.sizeMod)/3;
    self.leftSide = self.x - (img.width+self.sizeMod)/3;
    self.topSide =  self.y - (img.height+self.sizeMod)/3.5;
    self.bottomSide = self.y + (img.height+self.sizeMod)/2;
    self.size = img.width+self.sizeMod;
    canvas.drawImage(img, this.x-(img.width+self.sizeMod)/2, this.y-(img.height+self.sizeMod)/2, img.width+self.sizeMod, img.height+self.sizeMod);
    bodies.forEach(function(body){
      if(body instanceof treeObject){

          if(self.rightSide > (body as any).leftSide &&
            self.leftSide < (body as any).rightSide &&
            self.topSide < (body as any).bottomSide &&
            self.bottomSide > (body as any).topSide){
              if(self.size < (body as any).size){
                removeBody(self);
              }
          }
        }
    });
    if (this.x > gameSize.x) {
      removeBody(this);
      return;
    } else if (this.x < 0) {
      removeBody(this);
        return;
    }else if(this.y > gameSize.y) {
      removeBody(this);
        return;
    } else if (this.y < 0) {
      removeBody(this);
        return;
    }
  }
}
function bushObject(){
  var self = this;
  this.x = Math.floor(Math.random()*gameSize.x);
  this.y = Math.floor(Math.random()*gameSize.y);
  self.sizeMod = Math.random();
  this.pushedBy = function(object){
    self.x += (self.x > object.x) ? object.x*100 : -object.x*100;
    self.y += (self.y > object.y) ? object.y*100 : -object.x*100;
  };
  this.updateObject = function(){
    var img = <HTMLImageElement>document.getElementById("bush");
    self.rightSide = self.x + (img.width+self.sizeMod)+10;
    self.leftSide = self.x - (img.width+self.sizeMod)+10;
    self.topSide =  self.y - (img.height+self.sizeMod)+10;
    self.bottomSide = self.y + (img.height+self.sizeMod)+10;
    self.size = img.width+self.sizeMod;
    canvas.drawImage(img, this.x-(img.width+self.sizeMod)/2, this.y-(img.height+self.sizeMod)/2, img.width+self.sizeMod, img.height+self.sizeMod);
    bodies.forEach(function(body){
      if(body instanceof treeObject || body instanceof bushObject){
          if(self.rightSide > (body as any).leftSide &&
            self.leftSide < (body as any).rightSide &&
            self.topSide < (body as any).bottomSide &&
            self.bottomSide > (body as any).topSide){
              if(self.size < (body as any).size){
              removeBody(self);
              }
          }
        }
    });
    if (this.x > gameSize.x) {
      removeBody(this);
      return;
    } else if (this.x < 0) {
      removeBody(this);
        return;
    }else if(this.y > gameSize.y) {
      removeBody(this);
        return;
    } else if (this.y < 0) {
      removeBody(this);
        return;
    }
  }
}
function rockObject(){
  var self = this;
  this.x = Math.floor(Math.random()*gameSize.x);
  this.y = Math.floor(Math.random()*gameSize.y);
  self.sizeMod = Math.random();
  this.updateObject = function(){
    var img = <HTMLImageElement>document.getElementById("rock");
    self.rightSide = self.x + (img.width+self.sizeMod)/3;
    self.leftSide = self.x - (img.width+self.sizeMod)/3;
    self.topSide =  self.y - (img.height+self.sizeMod)/3.5;
    self.bottomSide = self.y + (img.height+self.sizeMod)/2;
    self.size = img.width+self.sizeMod;
    canvas.drawImage(img, this.x-(img.width+self.sizeMod)/2, this.y-(img.height+self.sizeMod)/2, img.width+self.sizeMod, img.height+self.sizeMod);
    bodies.forEach(function(body){
      if(body instanceof treeObject || body instanceof bushObject || body instanceof rockObject){
          if(self.rightSide > (body as any).leftSide &&
            self.leftSide < (body as any).rightSide &&
            self.topSide < (body as any).bottomSide &&
            self.bottomSide > (body as any).topSide){
              if(self.size < (body as any).size){
                removeBody(self);
              }
          }
        }
    });
    if (self.x > gameSize.x) {
      removeBody(self);
      return;
    } else if (self.x < 0) {
      removeBody(self);
        return;
    }else if(self.y > gameSize.y) {
      removeBody(self);
        return;
    } else if (self.y < 0) {
      removeBody(self);
        return;
    }
  }
}


////////////////////////////////////////////////////////////////////////////////
//STEP 4 Run all updateObjects from Step 2 on an interval

this.choosePokemon = function(pokemon){
  pet.name = pokemon;
  party.push(pokemon);
  game.selectPokemon();
  localStorage.setItem("petname", pokemon);
}

game.deleteSave = function(){
  localStorage.removeItem("level");
  localStorage.removeItem("petname");
  location.reload();
}

game.saveGame = function(){
  localStorage.setItem("level", pet.exp);
}

this.isRunning = function(){
  trainer.speed = (trainer.speed === 3.3) ? 7.5 : 3.3;
}
this.switchPokemon = function(){
      if(i < party.length-1){
        i++;
      }else{
        i = 0;
      }
      pet.name = party[i];
      pet.ball = true;
      bodies.push(new returnBallObject());
      pet.hpbar.value = pet.hpbar.max;
      pet.sic = false;
}
this.returnPokemon = function(){
  if(pet.rightSide > trainer.leftSide &&
    pet.leftSide < trainer.rightSide &&
    pet.topSide < trainer.bottomSide &&
    pet.bottomSide > trainer.topSide){
      return;
    }
  pet.ball = true;
  bodies.push(new returnBallObject());
  pet.hpbar.value = 5;
  pet.sic = false;
  }
this.walkDown = function(){
  trainer.direction = "down";
  trainer.action = "walking";
}
this.walkUp = function(){
  trainer.direction = "up";
  trainer.action = "walking";
}
this.walkRight = function(){
  trainer.direction = "right";
  trainer.action = "walking";
}
this.walkLeft = function(){
  trainer.direction = "left";
  trainer.action = "walking";
}
this.stopWalking = function(){
  trainer.action = (trainer.action === "walking") ? "attacking" : "walking";
}
this.attackButton = function(){
  pet.sic = (pet.sic === true) ? false : true;
}
this.specialAttack = function(){
    if(pet.dead === false){
    }
}
this.pokeBall = function(){
    if(trainer.dead === false){
      bodies.push(new ballObject());
    }
}
this.selectPokemon = function(){
  game.selectPokemonBool = (game.selectPokemonBool === false) ? true : false;
}
this.pauseGame = function(){
  game.pauseGameBool = (game.pauseGameBool === false) ? true : false;
}
window.setInterval(function(){(updateAllObjects())}, 20);
window.setInterval(function(){(newPokemon())}, 8000);
}//end onInt
}//end screen class


//Old Fire/Water Attack Function, safe keeping
// function waterObject(x, y,direction){    var self = this;    this.x = x;    this.y = y;    self.dead = false;    this.direction = direction;    self.speed = 4;    self.xmod = 0;    self.ymod = 0;    this.updateObject = function(){      if(pet.dead === true){        return;      }      self.sizeMod = pet.sizeMod + 5;      self.range = (self.sizeMod+5)*10;      if(pet.name === "squirtle"){        self.speed = 2;        self.xmod = Math.floor(Math.random()*10+1);        self.ymod = Math.floor(Math.random()*10+1);        var img = <HTMLImageElement>document.getElementById("water");      }else if(pet.name === "lapras"|| pet.name === "wartortle"|| pet.name === "blastoise"){        self.speed = 10;        self.xmod = Math.floor(Math.random()*3+1);        self.ymod = Math.floor(Math.random()*3+1);        var img = <HTMLImageElement>document.getElementById("water");      }else if(pet.name === "bulbasaur"){        self.xmod = Math.floor(Math.random()*10+1);        self.ymod = Math.floor(Math.random()*10+1);        self.speed = 10;        var img = <HTMLImageElement>document.getElementById("leaf");      }else if(pet.name === "charmander"|| pet.name === "charmeleon"|| pet.name === "charizard"){        self.xmod = Math.floor(Math.random()*3+1);        self.ymod = Math.floor(Math.random()*3+1);        self.speed = 8;        var img = <HTMLImageElement>document.getElementById("fire");      }else if(pet.name === "pikachu"){        var img = <HTMLImageElement>document.getElementById("bolt");        self.xmod = Math.floor(Math.random()*3+1);        self.ymod = Math.floor(Math.random()*3+1);        self.speed = 15;      }else{        var img = <HTMLImageElement>document.getElementById("sand");        self.xmod = Math.floor(Math.random()*25+1);        self.ymod = Math.floor(Math.random()*25+1);        self.speed = 10;      }      self.rightSide = self.x + (img.width+self.sizeMod)/2+1;      self.leftSide = self.x - (img.width+self.sizeMod)/2+1;      self.topSide =  self.y - (img.height+self.sizeMod)/2+1;      self.bottomSide = self.y + (img.height+self.sizeMod)/2+1;      pet.attack = true;      if(direction==="left"){        this.x -= self.speed;        if(this.x < x - self.range){          pet.attack = false;          removeBody(self);        }      } if(direction==="right"){        this.x += self.speed;        if(this.x > x + self.range){          pet.attack = false;          removeBody(self);        }      }if(direction==="up"){        this.y = self.topSide;        this.y -= self.speed;        if(this.y < y - self.range){          pet.attack = false;          removeBody(self);        }      }if(direction==="down"){        this.y += self.speed;        if(this.y > y + self.range){          pet.attack = false;          removeBody(self);        }      }      canvas.drawImage(img, this.x-img.width/2+self.xmod, this.y-img.height/2+self.xmod, img.width+self.sizeMod, img.height+self.sizeMod);      bodies.forEach(function(body){        if(body instanceof PokemonObject){            if(self.rightSide > (body as any).leftSide &&              self.leftSide < (body as any).rightSide &&              self.topSide < (body as any).bottomSide &&              self.bottomSide > (body as any).topSide){                (body as any).loseHp(pet.damage*2);                pet.attack = false;                removeBody(self);            }          }      });      }  }

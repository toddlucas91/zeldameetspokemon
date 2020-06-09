import { Component, OnInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-screen',
  templateUrl: './screen.component.html',
  styles: [
    'nb-card {min-width: 0rem;}'

]
})
export class ScreenComponent implements OnInit{
mountBool: any; catchBool:any;
basicAttack:any;   selectedPet: any; petExpMax:any; biomeMap: any; rareCandy:any; petName: any; deletePokemon: any; battleBool: any;
displayteam:any; pet:any; petExp:any; pauseGame:any; pauseGameBool;  petLevel:any; deleteSave:any; saveGame:any; first:any;refresh:any; choosePokemon: any; screenWidth: any; companpionName: string;  petHp: any; attackFalse: any; walkDown: any; walkUp: any; walkLeft: any; walkRight: any; stopWalking: any;attackButton: any;specialAttack: any;pokeBall: any;switchPokemon: any;returnPokemon: any;selectPokemon: any;selectPokemonBool: any;ridePokemon: any;
  @HostListener('document:keydown', ['$event'])
  function1(e: KeyboardEvent){
    if(e.keyCode === 83){        this.walkDown();      }      if(e.keyCode === 65){        this.walkLeft();      }      if(e.keyCode === 87){        this.walkUp();      }      if(e.keyCode === 68){        this.walkRight();      }      if(e.keyCode === 69){        this.attackButton();      }      if(e.keyCode === 32){    this.rareCandy();        }    if(e.keyCode === 49){    this.basicAttack();        }       if(e.keyCode === 67){        this.pauseGame();      }           if(e.keyCode === 82){        this.switchPokemon();     }      if(e.keyCode === 81){   this.pokeBall();        }      if(e.keyCode === 16){        this.ridePokemon();      }
  }
  @HostListener('document:keyup', ['$event'])
  function2(e: KeyboardEvent){
    if(e.keyCode === 83){        this.stopWalking();      }      if(e.keyCode === 65){        this.stopWalking();      }      if(e.keyCode === 87){        this.stopWalking();      }      if(e.keyCode === 68){        this.stopWalking();      }
  }
  onSelect(pet:any): void {
    this.selectedPet = pet;
    this.pauseGame();
  }
public ngOnInit(): void {
  /////////////////////////////////////////////////////////////////////////////////////////////////////
//STEP 1 Declare Variables
var game = this;
game.selectPokemonBool = true;
game.battleBool = false;
game.catchBool = true;
game.biomeMap = "grass";
var south = 0;
var north = 0;
var east = 0;
var west = 0;
var cave = false;
var center = false;
var levelupsound = <HTMLAudioElement>document.getElementById("levelupsound");
levelupsound.volume = 0.07;
var music4 = <HTMLAudioElement>document.getElementById("music4");
music4.loop = true;
var battleMusic = <HTMLAudioElement>document.getElementById("battle");
battleMusic.volume = 0.07;

this.screenWidth = window.innerWidth;
  var cnvs = <HTMLCanvasElement>document.getElementById('cnvs');
  game.pauseGameBool = false;
  if(window.innerWidth > 700){
    cnvs.width = window.innerWidth*.92;
    cnvs.height = window.innerHeight*.75;
  }else{
    cnvs.width = window.innerWidth*.89;
    cnvs.height = window.innerHeight*.65;
  }
  var canvas = cnvs.getContext("2d");
  var gameSize = {x:cnvs.width, y:cnvs.height};
    // var bodies  = [new PokemonObject(), team[selectedTeam],trainer];
    var trainer = new TrainerObject();
    var bodies = [trainer];
    var night = false;
    var night2 = false;
    var noon = false;
    var daycycle = 1;
    var raining = false;
  var selectedTeam = 0;
  var team = [];
  var teamSize = 1;
  if(localStorage.getItem("teamSize") === null){
    teamSize = 1;
  }else{
    teamSize = Number(localStorage.getItem("teamSize"));
  }
  var newPokemon = function(){
    if(window.innerWidth > 700){
      var d1 = Math.round(Math.random()*3+5);
    }else{
      var d1 = Math.round(Math.random()*4+1);
    }
    if(cave === true){
      game.biomeMap = "caveground";
    }
    else if(center === true){
      game.biomeMap = "pokecenterfloor";
    }
    else if(south > 0){
      game.biomeMap = "dirt";
    }
    else if(north > 0){
      game.biomeMap = "snow";
    }
    else if(east > 0){
      game.biomeMap = "sea";
    }
    else if(west > 0){
      game.biomeMap = "swamp";
    }
    else{
      game.biomeMap = "grass";
    }
    bodies.reverse();
    if(d1 === 8){
      bodies.push(new PokemonObject());
      bodies.push(new PokemonObject());
      bodies.push(new PokemonObject());
      bodies.push(new PokemonObject());
      bodies.push(new PokemonObject());
      bodies.push(new PokemonObject());
      bodies.push(new PokemonObject());
      bodies.push(new PokemonObject());
    }
    else if(d1 === 7){
      bodies.push(new PokemonObject());
      bodies.push(new PokemonObject());
      bodies.push(new PokemonObject());
      bodies.push(new PokemonObject());
      bodies.push(new PokemonObject());
      bodies.push(new PokemonObject());
      bodies.push(new PokemonObject());
    }
    else if(d1 === 6){
      bodies.push(new PokemonObject());
      bodies.push(new PokemonObject());
      bodies.push(new PokemonObject());
      bodies.push(new PokemonObject());
      bodies.push(new PokemonObject());
      bodies.push(new PokemonObject());
    }
    else if(d1 === 5){
      bodies.push(new PokemonObject());
      bodies.push(new PokemonObject());
      bodies.push(new PokemonObject());
      bodies.push(new PokemonObject());
      bodies.push(new PokemonObject());
    }
    else if(d1 === 4){
      bodies.push(new PokemonObject());
      bodies.push(new PokemonObject());
      bodies.push(new PokemonObject());
      bodies.push(new PokemonObject());
    }
    else if(d1 === 3){
      bodies.push(new PokemonObject());
      bodies.push(new PokemonObject());
      bodies.push(new PokemonObject());
    }
    else if(d1 === 2){
      bodies.push(new PokemonObject());
      bodies.push(new PokemonObject());
    }
    else if(d1 === 1){
      bodies.push(new PokemonObject());
    }
    bodies.reverse();
  };
  game.choosePokemon = function(pokemon){

    team.push(new petObject(pokemon, 1, Math.floor(Math.random()*500+500), "lazy"));
    bodies.push(team[selectedTeam]);
    bodies.reverse();
    // newPokemon();
    game.selectPokemonBool = (game.selectPokemonBool === false) ? true : false;
  }
   if(localStorage.getItem("name"+"0")){
    for(var i = 0; i < teamSize; i++){
    team.push(new petObject(localStorage.getItem("name"+String(i)), Number(localStorage.getItem("level"+String(i))), Number(localStorage.getItem("rare"+String(i))), localStorage.getItem("nature"+String(i))));
    }
    bodies.push(team[selectedTeam]);
    bodies.reverse();
    game.selectPokemonBool = false;
  }

  game.displayteam = team;
  game.pet = team[0];

  var removeBody = function(removed){
    bodies = bodies.filter(function (newBodiesArray) {
        return newBodiesArray != removed; //return the original array minus ones removed
      })
  };
  var removeTeam = function(removed){
    team = team.filter(function (newBodiesArray) {
        return newBodiesArray != removed; //return the original array minus ones removed
      })
  };
  var makeForest = function(){
    bodies.reverse();
    bodies.push(new caveObject());
    bodies.push(new pokeCenterObject());
    bodies.reverse();
    bodies.push(new rainObject());
      bodies.push(new treeObject(),new treeObject(),new treeObject());
      bodies.push(new treeObject(),new treeObject(),new treeObject());
      bodies.push(new treeObject(),new treeObject(),new treeObject());
      bodies.push(new treeObject(),new treeObject(),new treeObject());
      bodies.push(new treeObject(),new treeObject(),new treeObject());

      bodies.push(new rockObject(),new rockObject(),new rockObject());
      bodies.push(new rockObject(),new rockObject(),new rockObject());
      bodies.push(new bushObject(),new bushObject(),new bushObject());
      bodies.push(new bushObject(),new bushObject(),new bushObject());
  }
  makeForest();
  var clearForest = function(){
    bodies.forEach(function(body){
      if(body instanceof rainObject || body instanceof treeObject || body instanceof rockObject || body instanceof bushObject || body instanceof PokemonObject || body instanceof caughtBallObject || body instanceof caveObject || body instanceof pokeCenterObject){
        removeBody((body as any));
        }
    });
  }


  if(this.selectPokemonBool === false){
    newPokemon();
  }

  function returnBallObject(){
    var self = this;
    self.x = team[selectedTeam].x;
    self.y = team[selectedTeam].y;
    this.updateObject = function(){
      var img = <HTMLImageElement>document.getElementById("ball-1");
      self.rightSide = self.x + (img.width)/2+1;
      self.leftSide = self.x - (img.width)/2+1;
      self.topSide =  self.y - (img.height)/2+1;
      self.bottomSide = self.y + (img.height)/2+1;
      canvas.drawImage(img, this.x-img.width/2, this.y-img.height/2, img.width, img.height);
      if(self.x < trainer.x-2){
        self.x += trainer.x/2000+15;
      }
      if(self.x > trainer.x+2){
        self.x -= trainer.x/2000+15;
      }
      if(self.y < trainer.y-2){
        self.y += trainer.y/2000+15;
      }
      if(self.y > trainer.y+2){
        self.y -= trainer.y/2000+15;
      }
      if(self.rightSide > trainer.leftSide &&
        self.leftSide < trainer.rightSide &&
        self.topSide < trainer.bottomSide &&
        self.bottomSide > trainer.topSide){
          removeBody(self);
          team[selectedTeam].x = trainer.rightSide + 5;
          team[selectedTeam].y = trainer.bottomSide + 5;
          team[selectedTeam].attack = false;
          team[selectedTeam].ball = false;
        }
      }
  }
  function missBallObject(x, y){
    var self = this;    self.x = x;    self.y = y;    this.updateObject = function(){      var img = <HTMLImageElement>document.getElementById("ball-2");      self.rightSide = self.x + (img.width)/2+1;      self.leftSide = self.x - (img.width)/2+1;      self.topSide =  self.y - (img.height)/2+1;      self.bottomSide = self.y + (img.height)/2+1;      canvas.drawImage(img, this.x-img.width/2, this.y-img.height/2, img.width, img.height);      if(self.x < trainer.x-2){        self.x += trainer.x/2000+15;      }      if(self.x > trainer.x+2){        self.x -= trainer.x/2000+15;      }      if(self.y < trainer.y-2){        self.y += trainer.y/2000+15;      }      if(self.y > trainer.y+2){        self.y -= trainer.y/2000+15;      }      if(self.rightSide > trainer.leftSide &&        self.leftSide < trainer.rightSide &&        self.topSide < trainer.bottomSide &&        self.bottomSide > trainer.topSide){          removeBody(self);        }    }
  }
  function caughtBallObject(x, y){
    var self = this;    self.x = x;    self.y = y;    this.updateObject = function(){      var img = <HTMLImageElement>document.getElementById("ball-2");      self.rightSide = self.x + (img.width)/2+1;      self.leftSide = self.x - (img.width)/2+1;      self.topSide =  self.y - (img.height)/2+1;      self.bottomSide = self.y + (img.height)/2+1;      canvas.drawImage(img, this.x-img.width/2, this.y-img.height/2, img.width, img.height);      if(self.x < trainer.x-2){        self.x += trainer.x/2000+15;      }      if(self.x > trainer.x+2){        self.x -= trainer.x/2000+15;      }      if(self.y < trainer.y-2){        self.y += trainer.y/2000+15;      }      if(self.y > trainer.y+2){        self.y -= trainer.y/2000+15;      }      if(self.rightSide > trainer.leftSide &&        self.leftSide < trainer.rightSide &&        self.topSide < trainer.bottomSide &&        self.bottomSide > trainer.topSide){                   removeBody(self);        }    }
  }
  function ballObject(){
    var self = this;
    this.x = trainer.x;
    this.y = trainer.y;
    self.dead = false;
    self.speed = 15;
    self.xmod = 0;
    self.ymod = 0;
    self.sizeMod = 0;
    self.range = 20;
    self.direction = trainer.direction ;
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
              team.push(new petObject((body as any).name,(body as any).level,(body as any).rare,(body as any).nature));
              team[selectedTeam].levelUp(0);
              bodies.push(new caughtBallObject(self.x,self.y));
              removeBody(self);
              removeBody((body as any));
            }else{
              (body as any).pushedBy(self);
              removeBody(self);

              bodies.push(new missBallObject(self.x, self.y));
            }
         }
         else if(self.rightSide+50 > (body as any).leftSide &&
         self.leftSide-50 < (body as any).rightSide &&
         self.topSide-50 < (body as any).bottomSide &&
         self.bottomSide+50 > (body as any).topSide &&
         (body as any).dead === true){
           if(self.x < (body as any).x-2){
             self.x += (body as any).x/2000+15;
           }
           if(self.x > (body as any).x+2){
             self.x -= (body as any).x/2000+15;
           }
           if(self.y < (body as any).y-2){
             self.y += (body as any).y/2000+15;
           }
           if(self.y > (body as any).y+2){
             self.y -= (body as any).y/2000+15;
           }
        }
        }
      });
      if(self.direction === "left"){        self.x -= self.speed;        if(self.x < trainer.x - 150){          removeBody(this);          bodies.push(new missBallObject(self.x, self.y));        }      } if(self.direction === "right"){        self.x += self.speed;        if(self.x > trainer.x + 150){          removeBody(this);          bodies.push(new missBallObject(self.x, self.y));        }      }if(self.direction === "up"){        self.y -= self.speed;        if(self.y < trainer.y - 150){          removeBody(this);          bodies.push(new missBallObject(self.x, self.y));        }      }if(self.direction==="down"){        self.y += self.speed;        if(self.y > trainer.y + 150){          removeBody(this);          bodies.push(new missBallObject(self.x, self.y));        }      }    }
      }

      function attackBallObject(){
        var self = this;    this.x = trainer.x;    this.y = trainer.y;    self.dead = false;    self.speed = 15;    self.xmod = 0;    self.ymod = 0;    self.sizeMod = 0;    self.range = 20;    self.direction = trainer.direction ;
        self.updateObject = function(){
          team[selectedTeam].ball = true;
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
              self.bottomSide > (body as any).topSide &&
              (body as any).dead === false){
                  team[selectedTeam].x = self.x;
                  team[selectedTeam].y = self.y;
                  team[selectedTeam].ball = false;
                  removeBody(self);
             }
             else if(self.rightSide+50 > (body as any).leftSide &&
             self.leftSide-50 < (body as any).rightSide &&
             self.topSide-50 < (body as any).bottomSide &&
             self.bottomSide+50 > (body as any).topSide &&
             (body as any).dead === false){
               if(self.x < (body as any).x-2){
                 self.x += (body as any).x/2000+15;
               }
               if(self.x > (body as any).x+2){
                 self.x -= (body as any).x/2000+15;
               }
               if(self.y < (body as any).y-2){
                 self.y += (body as any).y/2000+15;
               }
               if(self.y > (body as any).y+2){
                 self.y -= (body as any).y/2000+15;
               }
            }
            }
          });
          if(self.direction === "left"){
            self.x -= self.speed;
            if(self.x < trainer.x - 120){
              removeBody(this);
              team[selectedTeam].x = self.x;
              team[selectedTeam].y = self.y;
              team[selectedTeam].ball = true;
              team[selectedTeam].sic = false;
              bodies.push(new returnBallObject());
            }
          }
          if(self.direction === "right"){
            self.x += self.speed;
            if(self.x > trainer.x + 120){
              removeBody(this);
              team[selectedTeam].x = self.x;
              team[selectedTeam].y = self.y;
              team[selectedTeam].ball = true;
              team[selectedTeam].sic = false;
              bodies.push(new returnBallObject());
            }
          }
          if(self.direction === "up"){
            self.y -= self.speed;
            if(self.y < trainer.y - 120){
              removeBody(this);
              team[selectedTeam].x = self.x;
              team[selectedTeam].y = self.y;
              team[selectedTeam].ball = true;
              team[selectedTeam].sic = false;
              bodies.push(new returnBallObject());
            }
          }
          if(self.direction==="down"){
            self.y += self.speed;
            if(self.y > trainer.y + 120){
              removeBody(this);
              team[selectedTeam].x = self.x;
              team[selectedTeam].y = self.y;
              team[selectedTeam].ball = true;
              team[selectedTeam].sic = false;
              bodies.push(new returnBallObject());
            }
          }
      }//end of update
    }//end of attackBall object
/////////////////////////////////////////////////////////////////////////////////////////////////////
//STEP 2 Declare all new Objects and package update into one function
function updateAllObjects(){
  var versionNumber = document.getElementById("versionNumber").innerHTML;
  if(versionNumber != localStorage.getItem("data")){
    window.location.reload(true);
  }
  localStorage.setItem("data", versionNumber);
  if(game.pauseGameBool === true || game.selectPokemonBool === true){
    music4.pause();
    return;
  }
  else if(game.battleBool === true){
    battleMusic.play();
    music4.pause();
  }
  else{
    battleMusic.pause();
    battleMusic.currentTime = 0;
    music4.play();
  }

  game.pet = team[selectedTeam];

  if(cave === true){
    game.biomeMap = "caveground";
  }
  else if(center === true){
    game.biomeMap = "pokecenterfloor";
  }
  else if(south > 0){
    game.biomeMap = "dirt";
  }
  else if(north > 0){
    game.biomeMap = "snow";
  }
  else if(east > 0){
    game.biomeMap = "sea";
  }
  else if(west > 0){
    game.biomeMap = "swamp";
  }
  else{
    game.biomeMap = "grass";
  }
  if(daycycle === 10){    noon = true;  }  else{    noon = false;  }  if(daycycle === 19){    night2 = true;  }  else{    night2 = false;  }  if(daycycle > 20){    daycycle = 1;  }  else if(daycycle > 17){    night = true;  }  else{    night = false;  }
    canvas.clearRect(0, 0, gameSize.x, gameSize.y);
    for(var i = 0; i < bodies.length; i++){
      bodies[i].updateObject();
    }
    if(trainer.dead === true ){
      var img = <HTMLImageElement>document.getElementById("gameover");
      canvas.drawImage(img, 0, 0, gameSize.x, gameSize.y);
    }
    if(night === true || center === true){
      var nightpic = <HTMLImageElement>document.getElementById("night2");
      canvas.drawImage(nightpic, 0, 0, gameSize.x, gameSize.y);
    }
    if(night2 === true || cave === true){
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
function petObject(name, level, rare, nature){
  var self = this;
  // this.name = randomName();
  this.name = name;
  this.level =  level;
  self.expMax = self.level * 5;
  this.rare = rare;
//Initial Stats
  this.exp = 0;
  self.hpmax = 100 +(self.rare/5) + (self.level*3);
  self.damage = 1 +(self.rare/1000) + (self.level*0.05);
  self.sizeMod = this.level/3;
  self.hp = self.hpmax;
//Display Stats
self.displayDamage = Math.round(self.damage*10);
self.displayRare = Math.round(rare);
self.displayHp = Math.round(self.hpmax);
//
  this.action = "walking";
  this.direction = "down";
  this.frame = "one";
  this.spriteChange = 0;
  this.x = trainer.x -20;
  this.y = trainer.y -20;
  this.followChange = 0;
  this.hpRegen = 0;
  this.attack = false;
  this.sic = false;
  this.dead = false;
  this.speed = trainer.speed-.2;
  this.type = "normal";
  this.first = true;
  self.ball = false;
  self.directionCount = Math.floor(Math.random()*300+1);;
  self.wander = false;
  self.nature = nature;
  self.sleeping = false;
  self.battle = false;
  self.basicAttack = false;
  self.basicHit = false;
  self.attackCount = 16;
  self.hitCount = 16;

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
    self.exp += expValue;
    if(self.level > 98){
      self.level = 100;
    }
    if(self.exp > self.expMax){
      levelupsound.play();
      self.exp = 1;
      self.level ++;
      if(self.rare < 900){
        self.rare += 3;
      }
      self.expMax = self.level * 5;
      self.sizeMod = self.level/3;
      self.hpmax = 100 +(self.rare/5) + (self.level*3);
      self.damage = 1 +(self.rare/1000) + (self.level*0.05);
      //Display Stats
      self.displayDamage = Math.round(self.damage*10);
      self.displayRare = Math.round(self.rare);
      self.displayHp = Math.round(self.hpmax);
      //
    }
    //save stats to local storage
    for(var i = 0; i < team.length; i++){
      localStorage.setItem("name"+String(i), team[i].name);
      localStorage.setItem("level"+String(i), team[i].level);
      localStorage.setItem("rare"+String(i), team[i].rare);
      localStorage.setItem("nature"+String(i), team[i].nature);
    }
    teamSize = team.length;
    localStorage.setItem("teamSize", String(teamSize));
  }
  this.loseHp = function(body){
    if((body as any).basicAttack === true){
      if(self.hp > 0){
        self.hp = self.hp - (body as any).damage;}
        else{self.dead = true;}
        self.basicHit = true;
      }
  }
  this.regen = function(){
    if(self.attack === false){
      if(self.hp < self.hpmax){
        // heal.play();
        self.action = "sleeping";
        //
        self.hp += self.hpmax*0.005;
      }
    }
  }
  function randomName(){
    var d1 = Math.floor(Math.random()*100+1);
    if(d1 > 95){return "lapras";}else if(d1 > 90){return "pidgey";}else if(d1 > 80){return "charmander";}else if(d1 > 70){return "squirtle";}else if(d1 > 60){return "squirtle";}else if(d1 > 50){return "squirtle";          }else if(d1 > 40){return "bulbasaur";}else if(d1 > 30){return "bulbasaur";}else if(d1 > 0){return "pikachu";}
    };
      //TYPES
      if(self.name === "machop" ||self.name === "machoke" || self.name === "machamp"){self.type = "fighting";}
      if(self.name === "venonat" ||self.name === "butterfree"){self.type = "poison";}
      if(self.name === "zubat" ||self.name === "golbat"){self.type = "poison";}
      if(self.name === "bulbasaur" ||self.name === "ivysaur" || self.name === "venosaur"){self.type = "grass";}
      if(self.name === "kangaskhan" ||self.name === "cubone"){self.type = "ground";}
      if(self.name === "raichu" ||self.name === "pikachu"){self.type = "electric";}
      if(self.name === "vulpix" ||self.name === "ninetails"){self.type = "fire";}
      if(self.name === "geodude" ||self.name === "graveler" || self.name === "golem"){self.type = "ground";}
      if(self.name === "charmander" || self.name === "charmeleon" || self.name === "charizard" || self.name === "vulpix" || self.name === "arcanine" || self.name === "growlithe"){          self.type = "fire";}        if(self.name === "nidoran" ||self.name === "nidorino" || self.name === "venonat" || self.name === "zubat" || self.name === "nidoking"){          self.type = "poison";}        if(self.name === "squirtle" || self.name === "wartortle" || self.name === "blastoise" || self.name === "lapras" ||self.name === "gyarados"){          self.type = "water";}        if(self.name === "oddish" ||self.name === "gloom" || self.name === "vileplume" ||self.name === "bulbasaur" || self.name === "scyther"){          self.type = "grass";}if(self.name === "pikachu"){self.type = "electric";}if(self.name === "machop"){self.type = "fighting";}if(self.name === "pidgey" || self.name === "pidgeotto" || self.name === "pidgeot"){self.type = "flying";}        if(self.name === "sandshrew" ||self.name === "cubone" || self.name === "geodude"){self.type = "ground";}if(self.name === "articuno"){self.type = "ice";}

  this.updateObject = function(){
    if(self.level === null){
      removeBody(self);
    }
    game.petLevel = this.level;
    game.petName = this.name;
    game.petExp = this.exp;
    game.petExpMax = this.expMax;
    //EVOLUTIONS
    if(self.name === "machop"){if(self.level > 27){self.name = "machoke";}}if(self.name === "machop" || self.name === "machoke"){if(self.level > 39){self.name = "machamp";}}
    if(self.name === "venonat"){if(self.level > 31){self.name = "butterfree";}}
    if(self.name === "zubat"){if(self.level > 29){self.name = "golbat";}}
    if(self.name === "bulbasaur"){if(self.level > 15){self.name = "ivysaur";}}if(self.name === "bulbasaur" || self.name === "ivysaur"){if(self.level > 35){self.name = "venosaur";}}
    if(self.name === "cubone"){if(self.level > 34){self.name = "kangaskhan";}}
    if(self.name === "sandshrew"){if(self.level > 27){self.name = "sandslash";}}
    if(self.name === "pikachu"){if(self.level > 29){self.name = "raichu";}}
    if(self.name === "vulpix"){if(self.level > 37){self.name = "ninetails";}}
    if(self.name === "geodude"){if(self.level > 24){self.name = "graveler";}}if(self.name === "geodude" || self.name === "graveler"){if(self.level > 41){self.name = "golem";}}
    if(self.name === "oddish"){if(self.level > 19){self.name = "gloom";}}if(self.name === "oddish" || self.name === "gloom"){if(self.level > 29){self.name = "vileplume";}}
    if(self.name === "nidoran"){if(self.level > 22){self.name = "nidorino";}}if(self.name === "nidorino" || self.name === "nidoran"){if(self.level > 39){self.name = "nidoking";}}
    if(self.name === "growlithe"){if(self.level > 25){self.name = "arcanine";}}
    if(self.name === "charmander"){if(self.level > 15){self.name = "charmeleon";}}if(self.name === "charmeleon" || self.name === "charmander"){if(self.level > 35){self.name = "charizard";}}
    if(self.name === "squirtle"){if(self.level > 15){self.name = "wartortle";}}        if(self.name === "wartortle" || self.name === "squirtle"){if(self.level > 35){self.name = "blastoise";}}        if(self.name === "pidgey"){if(self.level > 15){self.name = "pidgeotto";}}        if(self.name === "pidgeotto" || self.name === "pidgey"){if(self.level > 35){self.name = "pidgeot";}}
    var img = <HTMLImageElement>document.getElementById(this.name + "-" + this.action + "-" + this.direction + "-" + this.frame);
    self.rightSide = self.x + (img.width+self.sizeMod)/2+1;
    self.leftSide = self.x - (img.width+self.sizeMod)/2+1;
    self.topSide =  self.y - (img.height+self.sizeMod)/2+1;
    self.bottomSide = self.y + (img.height+self.sizeMod)/2+1;
    var mountSize = <HTMLImageElement>document.getElementById(this.name + "-walking-down-one");
    self.size = mountSize.height+self.sizeMod;
    self.sizex = mountSize.width+self.sizeMod;
    self.sizey = mountSize.height+self.sizeMod;
    if(self.ball === true){
      return;
    }

    //Rare Elite
    if(this.rare === 1000){
        canvas.save();
        canvas.filter = 'invert(1)';
        canvas.drawImage(img, self.x-(img.width+self.sizeMod)/2, self.y-(img.height+self.sizeMod)/2, img.width+self.sizeMod, img.height+self.sizeMod);
        canvas.restore();
        canvas.save();
        canvas.globalCompositeOperation = "source-atop";
        canvas.globalAlpha = .7;
        canvas.fillStyle = "#000000";
        canvas.fillRect(self.x-(img.width+self.sizeMod)/2, self.y-(img.height+self.sizeMod)/2, img.width+self.sizeMod, img.height+self.sizeMod);
        canvas.restore();
      }
    // Rare Gold
    else if(this.rare > 950){
      canvas.save();
        canvas.drawImage(img, self.x-(img.width+self.sizeMod)/2, self.y-(img.height+self.sizeMod)/2, img.width+self.sizeMod, img.height+self.sizeMod);
        canvas.globalCompositeOperation = "source-atop";
        canvas.globalAlpha = .20;
        canvas.fillStyle = "#D4AF37";
        canvas.fillRect(self.x-(img.width+self.sizeMod)/2, self.y-(img.height+self.sizeMod)/2, img.width+self.sizeMod, img.height+self.sizeMod);
    canvas.restore();
    }
    //Rare black
    else if(this.rare > 850){
      canvas.save();
        canvas.drawImage(img, self.x-(img.width+self.sizeMod)/2, self.y-(img.height+self.sizeMod)/2, img.width+self.sizeMod, img.height+self.sizeMod);
        canvas.globalCompositeOperation = "source-atop";
        canvas.globalAlpha = .15;
        canvas.fillStyle = "#000000";
        canvas.fillRect(self.x-(img.width+self.sizeMod)/2, self.y-(img.height+self.sizeMod)/2, img.width+self.sizeMod, img.height+self.sizeMod);
    canvas.restore();
    }
    //Rare Normal
    else{
      canvas.drawImage(img, self.x-(img.width+self.sizeMod)/2, self.y-(img.height+self.sizeMod)/2, img.width+self.sizeMod, img.height+self.sizeMod);
    }
    if(self.hp > 0){
      self.dead = false;
    }else{
      self.dead = true;
      self.attack = false;
      self.sic = false;
    }
    if(self.dead === true){
      game.returnPokemon();
      return;
    }

    if(trainer.mount === true){
      self.direction = trainer.direction;
    }

    if(self.hp < self.hpmax && self.attack === false){
      canvas.fillStyle = 'blue';
      var width = 25*self.hp/self.hpmax;
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



/////////////////////////////////////////////////////

      if(self.basicAttack === true){
        self.attackCount --;
        if(self.type === "fire"){
          bodies.push(new fireAttack(self));
        }
        if(self.type === "water"){
          bodies.push(new waterAttack(self));
        }
        if(self.type === "electric"){
          bodies.push(new electricAttack(self));
        }
        if(self.type === "grass"){
          bodies.push(new grassAttack(self));
        }
        if(self.type === "poison"){
          bodies.push(new poisonAttack(self));
        }
        if(self.type === "flying"){
          bodies.push(new flyingAttack(self));
        }
        if(self.attackCount === 0){
          self.basicAttack = false;
          self.attackCount = 16;
        }
      }
      else if(self.basicHit === true){
        self.hitCount --;
        if(self.hitCount === 0){
          self.basicHit = false;
          // self.basicAttack = true;
          self.hitCount = 16;
        }
      }

      if(self.attack === true){
        if(self.basicHit === true){
          // this.action = "sleeping";
          // this.direction = "down";
          self.action = "walking";
          self.frame = "three";
        }
        else if(self.basicAttack === false){
          //self.action = "attacking";
          self.action = "walking";
          self.frame = "two";
        }
        else{
          self.action = "attacking";
        }
      }

    else if(self.sleeping === true && self.sic === false && self.wander === true && trainer.mount === false){
      self.action = "sleeping";
    }
    else if(self.attack === false){
      self.action = "walking";
      // battle.pause();
      self.battle = false;
      game.battleBool = false;
    }
    if(self.rightSide-3 > trainer.leftSide &&
      self.leftSide+3 < trainer.rightSide &&
      self.topSide+3 < trainer.bottomSide &&
      self.bottomSide-3 > trainer.topSide &&
      self.sic === false &&
      trainer.mount === false){
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
    });
    var img = <HTMLImageElement>document.getElementById(this.name + "-" + this.action + "-" + this.direction + "-two");
///pet movement pet movement
////////////////////////////GO ATTACK, IE SIC === TRUE
if(self.sic === true){
  self.sleep = false;
  self.speed = trainer.speed + 2;
  bodies.forEach(function(body){
    if(body instanceof PokemonObject){
        if((body as any).dead === true){
          return;
        }
        if(self.rightSide+30 > (body as any).leftSide &&
          self.leftSide-30 < (body as any).rightSide &&
          self.topSide-30 < (body as any).bottomSide &&
          self.bottomSide+30 > (body as any).topSide &&
          self.ball === false){
            self.attack = true;
            self.battle = true;
            game.battleBool = true;
            // battle.play();

            (body as any).loseHp(self.damage);
            if((body as any).direction === "up"){
                canvas.fillStyle = 'blue';
                var width = 25*self.hp/self.hpmax;
                if(width < 0){
                  width = 0;
                }
                canvas.fillRect(self.x-(img.width+self.sizeMod)/3, self.y-(img.height+self.sizeMod)/2-7, width, 5);
                canvas.strokeStyle = "black";
                canvas.strokeRect(self.x-(img.width+self.sizeMod)/3, self.y-(img.height+self.sizeMod)/2-7, 25, 5);
            }else if((body as any).direction === "down"){
                canvas.fillStyle = 'blue';
                var width = 25*self.hp/self.hpmax;
                if(width < 0){
                  width = 0;
                }
                canvas.fillRect(self.x-(img.width+self.sizeMod)/3, self.y+(img.height+self.sizeMod)/2+7, width, 5);
                canvas.strokeStyle = "black";
                canvas.strokeRect(self.x-(img.width+self.sizeMod)/3, self.y+(img.height+self.sizeMod)/2+7, 25, 5);
            }else if((body as any).direction === "right"){
              canvas.fillStyle = 'blue';
              var width = 25*self.hp/self.hpmax;
              if(width < 0){
                width = 0;
              }
              canvas.fillRect(self.x-(img.width+self.sizeMod)/3, self.y+(img.height+self.sizeMod)/2+7, width, 5);
              canvas.strokeStyle = "black";
              canvas.strokeRect(self.x-(img.width+self.sizeMod)/3, self.y+(img.height+self.sizeMod)/2+7, 25, 5);
            }else if((body as any).direction === "left"){
                            canvas.fillStyle = 'blue';
                            var width = 25*self.hp/self.hpmax;
                            if(width < 0){
                              width = 0;
                            }
                            canvas.fillRect(self.x-(img.width+self.sizeMod)/3, self.y+(img.height+self.sizeMod)/2+7, width, 5);
                            canvas.strokeStyle = "black";
                            canvas.strokeRect(self.x-(img.width+self.sizeMod)/3, self.y+(img.height+self.sizeMod)/2+7, 25, 5);
            }
        }
        else{
          self.battle = false;
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
    else if(self.bottomSide <= trainer.bottomSide+200){
      self.direction = "down";
      self.x = trainer.x;
    }
    else{
      self.sic = false;
    }
  }
  if(trainer.direction === "up" && self.attack === false){
    if(self.topSide >= trainer.topSide - 250){
      self.direction = "up";
      self.x = trainer.x;
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
    else if(self.leftSide > trainer.leftSide - 250){
      self.direction = "left";
      self.y = trainer.y;
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
    else if(self.rightSide < trainer.rightSide + 250){
      self.direction = "right";
      self.y = trainer.y;
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
  // self.attack = false;
    self.speed = trainer.speed-.2;
    if(self.topSide >= trainer.bottomSide){
      self.direction = "up";
      self.wander = false;
      self.attack = false;
      self.sleep = false;
    }
    else if(self.rightSide <= trainer.leftSide){
      self.direction = "right";
      self.wander = false;
      self.attack = false;
      self.sleep = false;
    }
    else if(self.leftSide >= trainer.rightSide){
      self.direction = "left";
      self.wander = false;
      self.attack = false;
      self.sleep = false;
    }
    else if(self.bottomSide <= trainer.topSide){
      self.direction = "down";
      self.wander = false;
      self.attack = false;
      self.sleep = false;
    }
    else{
      if(trainer.action === "attacking"){
        self.speed = trainer.speed/5;
        if(self.nature === "hostile"){
          if(self.directionCount === 0){
            self.wander = (self.wander === true) ? false : true;
            self.directionCount = Math.floor(Math.random()*300+1);
          }else{
            self.directionCount--
            if(self.wander === true){
              self.attack = true;
            }
            else if(self.wander === false){
              self.frame = "two";
              self.attack = false;
              return;
            }
          }
        }
        if(self.nature === "lazy"){
          if(self.directionCount === 0){
            self.wander = (self.wander === true) ? false : true;
            self.directionCount = Math.floor(Math.random()*300+50);
          }else{
            self.directionCount--
            if(self.wander === true){
              self.sleeping = true;
            }
            else if(self.wander === false){
              self.frame = "two";
              self.sleeping = false;
              return;
            }
          }
        }
        if(self.nature === "neutral"){
          if(self.directionCount === 0){
            self.wander = (self.wander === true) ? false : true;
            self.directionCount = Math.floor(Math.random()*300+1);
          }else{
            self.directionCount--
            if(self.wander === true){
              self.attack = false;
            }
            else if(self.wander === false){
              self.frame = "two";
              self.attack = false;
              return;
            }
          }
        }
      }
      else{
        self.wander = false;
        self.attack = false;
        self.sleep = false;
        self.speed = trainer.speed -.2;
      }
    }
}
      if(self.attack === false){
        if(self.action === "sleeping"){
          return;
        }
        else if(self.direction === "left"){
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
///////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////
function PokemonObject() {
  if(game.selectPokemonBool === true){
    return;
  }
  this.randomName = function(){
    var d1 = Math.floor(Math.random()*1700+1);
    if(night2 === true || cave === true){
      if(d1 === 1700){return "mewtwo";
      }else if(d1 > 1695){return "articuno";
      }else if(d1 > 1600){return "machop";
      }else if(d1 > 1500){return "machop";
      }else if(d1 > 1400){return "pikachu";
      }else if(d1 > 1300){return "pikachu";
      }else if(d1 > 1200){return "venonat";
      }else if(d1 > 1100){return "venonat";
      }else if(d1 > 1000){return "venonat";
      }else if(d1 > 900){return "venonat";
      }else if(d1 > 800){return "scyther";
      }else if(d1 > 700){return "scyther";
      }else if(d1 > 600){return "scyther";
      }else if(d1 > 500){return "zubat";
      }else if(d1 > 400){return "zubat";
      }else if(d1 > 300){return "zubat";
      }else if(d1 > 200){return "zubat";
      }else if(d1 > 100){return "zubat";
      }else if(d1 > 0){return "zubat";
      }
    }
    else if(game.biomeMap === "sea"){
      if(d1 > 1690){return "mewtwo";
      }else if(d1 > 1680){return "articuno";
      }else if(d1 > 1600){return "pidgey";
      }else if(d1 > 1500){return "pidgey";
      }else if(d1 > 1400){return "pidgey";
      }else if(d1 > 1300){return "lapras";
      }else if(d1 > 1200){return "lapras";
      }else if(d1 > 1100){return "squirtle";
      }else if(d1 > 1000){return "squirtle";
      }else if(d1 > 900){return "squirtle";
      }else if(d1 > 800){return "squirtle";
      }else if(d1 > 700){return "squirtle";
      }else if(d1 > 600){return "squirtle";
      }else if(d1 > 500){return "lapras";
      }else if(d1 > 400){return "gyarados";
      }else if(d1 > 300){return "gyarados";
      }else if(d1 > 200){return "zubat";
      }else if(d1 > 100){return "zubat";
      }else if(d1 > 0){return "squirtle";
      }
    }
    else if(game.biomeMap === "swamp"){
      if(d1 > 1690){return "mewtwo";
      }else if(d1 > 1680){return "articuno";
      }else if(d1 > 1600){return "pidgey";
      }else if(d1 > 1500){return "machop";
      }else if(d1 > 1400){return "zubat";
      }else if(d1 > 1300){return "zubat";
      }else if(d1 > 1200){return "zubat";
      }else if(d1 > 1100){return "nidoran";
      }else if(d1 > 1000){return "nidoran";
      }else if(d1 > 900){return "nidoran";
      }else if(d1 > 800){return "nidoran";
      }else if(d1 > 700){return "nidoran";
      }else if(d1 > 600){return "nidoran";
      }else if(d1 > 500){return "venonat";
      }else if(d1 > 400){return "venonat";
      }else if(d1 > 300){return "venonat";
      }else if(d1 > 200){return "venonat";
      }else if(d1 > 100){return "venonat";
      }else if(d1 > 0){return "venonat";
      }
    }
    else if(game.biomeMap === "grass"){
      if(d1 === 1700){return "articuno";
      }else if(d1 === 1699){return "mewtwo";
      }else if(d1 > 1600){return "scyther";
      }else if(d1 > 1500){return "vulpix";
      }else if(d1 > 1400){return "pikachu";
      }else if(d1 > 1300){return "pikachu";
      }else if(d1 > 1200){return "pidgey";
      }else if(d1 > 1100){return "pidgey";
      }else if(d1 > 1000){return "pidgey";
      }else if(d1 > 900){return "nidoran";
      }else if(d1 > 800){return "nidoran";
      }else if(d1 > 700){return "bulbasaur";
      }else if(d1 > 600){return "bulbasaur";
      }else if(d1 > 500){return "bulbasaur";
      }else if(d1 > 400){return "oddish";
      }else if(d1 > 300){return "oddish";
      }else if(d1 > 200){return "oddish";
      }else if(d1 > 100){return "oddish";
      }else if(d1 > 0){return "venonat";
      }
    }
    else if(game.biomeMap === "dirt"){
      if(d1 === 1700){return "articuno";
      }else if(d1 === 1699){return "mewtwo";
      }else if(d1 > 1600){return "growlithe";
      }else if(d1 > 1500){return "charmander";
      }else if(d1 > 1400){return "charmander";
      }else if(d1 > 1300){return "cubone";
      }else if(d1 > 1200){return "cubone";
      }else if(d1 > 1100){return "cubone";
      }else if(d1 > 1000){return "sandshrew";
      }else if(d1 > 900){return "sandshrew";
      }else if(d1 > 800){return "sandshrew";
      }else if(d1 > 700){return "sandshrew";
      }else if(d1 > 600){return "geodude";
      }else if(d1 > 500){return "geodude";
      }else if(d1 > 400){return "geodude";
      }else if(d1 > 300){return "geodude";
      }else if(d1 > 200){return "geodude";
      }else if(d1 > 100){return "geodude";
      }else if(d1 > 0){return "venonat";
      }
    }
    else if(game.biomeMap === "snow" || center === true){
      if(d1 === 1700){return "articuno";
      }else if(d1 === 1699){return "mewtwo";
      }else if(d1 > 1600){return "lapras";
      }else if(d1 > 1500){return "growlithe";
      }else if(d1 > 1400){return "charmander";
      }else if(d1 > 1300){return "vulpix";
      }else if(d1 > 1200){return "growlithe";
      }else if(d1 > 1100){return "vulpix";
      }else if(d1 > 1000){return "pidgey";
      }else if(d1 > 900){return "pidgey";
      }else if(d1 > 800){return "pidgey";
      }else if(d1 > 700){return "pidgey";
      }else if(d1 > 600){return "pidgey";
      }else if(d1 > 500){return "pidgey";
      }else if(d1 > 400){return "squirtle";
      }else if(d1 > 300){return "squirtle";
      }else if(d1 > 200){return "squirtle";
      }else if(d1 > 100){return "squirtle";
      }else if(d1 > 0){return "squirtle";
      }
    }
  };
  this.randomNature = function(){
  var d1 = Math.floor(Math.random()*5+1);
    // if(d1 === 5){return "hostile";}
    if(d1 === 5){return "neutral";}
    if(d1 === 4){return "neutral";}
    if(d1 === 3){return "neutral";}
    if(d1 === 2){return "neutral";}
    if(d1 === 1){return "lazy";}
  };
  var self = this;
  this.name = this.randomName();
  if(team[selectedTeam].level > 48){
    this.level = Math.floor(Math.random()*99+1);
  }else{
    this.levelMod = team[selectedTeam].level-3;
    if(this.levelMod < 1){
      this.levelMod = 1;
      this.level = Math.floor(Math.random()* 5+this.levelMod);
    }else{
      this.level = Math.floor(Math.random()* 10+this.levelMod);
    }
  }
  this.rare = Math.floor(Math.random()*1000+1);
  this.type = "normal";
  if(self.name === "mewtwo"){self.type = "psychic";self.level = 99;self.rare = 1005;}
  if(self.name === "articuno"){self.type = "ice";self.level = 70;self.rare = 1001;}
    //STATS
    self.hpmax = 100 +(self.rare/5) + (self.level*3);
    self.damage = 1 +(self.rare/1000) + (self.level*0.05);

    self.displayDamage = Math.round(self.damage*10);
    self.displayRare = Math.round(self.rare);
    self.displayHp = Math.round(self.hpmax);

    self.hp = self.hpmax;
    self.sizeMod = this.level/3;
    self.speed = 1;
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
  this.dead = false;
  this.first = true;
  self.attack = false;
  self.sleeping = false;
  self.nature = self.randomNature();
  self.basicAttack = false;
  self.basicHit = false;
  self.attackCount = 16;
  self.hitCount = 16;
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
    if(team[selectedTeam].basicAttack === true){
      if(self.type === "fire" && team[selectedTeam].type === "water"){        damage = damage *2;        self.hp = self.hp - damage;          self.statusColor = "yellow";        }      else if(self.type === "fire" && team[selectedTeam].type === "ground"){        damage = damage *2;        self.hp = self.hp - damage;          self.statusColor = "yellow";        }      else if(self.type === "fire" && team[selectedTeam].type === "grass"){        damage = damage /2;        self.hp = self.hp - damage;          self.statusColor = "red";      }        else if(self.type === "water" && team[selectedTeam].type === "grass"){        damage = damage *2;        self.hp = self.hp - damage;        self.statusColor = "yellow";        }      else if(self.type === "water" && team[selectedTeam].type === "electric"){        damage = damage *2;        self.hp = self.hp - damage;          self.statusColor = "yellow";        }      else if(self.type === "water" && team[selectedTeam].type === "fire"){        damage = damage /2;        self.hp = self.hp - damage;          self.statusColor = "red";      }        else if(self.type === "grass" && team[selectedTeam].type === "fire"){        damage = damage *2;        self.hp = self.hp - damage;          self.statusColor = "yellow";        }      else if(self.type === "grass" && team[selectedTeam].type === "poison"){        damage = damage *2;        self.hp = self.hp - damage;          self.statusColor = "yellow";        }      else if(self.type === "grass" && team[selectedTeam].type === "flying"){        damage = damage *2;        self.hp = self.hp - damage;          self.statusColor = "yellow";        }      else if(self.type === "grass" && team[selectedTeam].type === "water"){        damage = damage /2;        self.hp = self.hp - damage;          self.statusColor = "red";      }        else if(self.type === "poison" && team[selectedTeam].type === "ground"){        damage = damage *2;        self.hp = self.hp - damage;          self.statusColor = "yellow";        }      else if(self.type === "poison" && team[selectedTeam].type === "fire"){        damage = damage *2;        self.hp = self.hp - damage;          self.statusColor = "yellow";        }      else if(self.type === "poison" && team[selectedTeam].type === "grass"){        damage = damage /2;        self.hp = self.hp - damage;          self.statusColor = "red";      }        else if(self.type === "ice" && team[selectedTeam].type === "fire"){        damage = damage *2;        self.hp = self.hp - damage;          self.statusColor = "yellow";        }      else if(self.type === "ice" && team[selectedTeam].type === "fighting"){        damage = damage *2;        self.hp = self.hp - damage;          self.statusColor = "yellow";        }      else if(self.type === "ice" && team[selectedTeam].type === "water"){        damage = damage /2;        self.hp = self.hp - damage;          self.statusColor = "red";      }        else if(self.type === "ground" && team[selectedTeam].type === "ice"){        damage = damage *2;        self.hp = self.hp - damage;          self.statusColor = "yellow";        }      else if(self.type === "ground" && team[selectedTeam].type === "grass"){        damage = damage *2;        self.hp = self.hp - damage;          self.statusColor = "yellow";        }      else if(self.type === "ground" && team[selectedTeam].type === "water"){        damage = damage *2;        self.hp = self.hp - damage;          self.statusColor = "yellow";        }      else if(self.type === "ground" && team[selectedTeam].type === "fire"){        damage = damage /2;        self.hp = self.hp - damage;          self.statusColor = "red";      }      else if(self.type === "ground" && team[selectedTeam].type === "flying"){        damage = damage /2;        self.hp = self.hp - damage;          self.statusColor = "red";      }      else if(self.type === "ground" && team[selectedTeam].type === "electric"){        damage = damage /10;        self.hp = self.hp - damage;          self.statusColor = "red";      }      else if(self.type === "fighting" && team[selectedTeam].type === "flying"){        damage = damage *2;        self.hp = self.hp - damage;          self.statusColor = "yellow";        }      else if(self.type === "flying" && team[selectedTeam].type === "electric"){        damage = damage *2;        self.hp = self.hp - damage;          self.statusColor = "yellow";        }      else if(self.type === "flying" && team[selectedTeam].type === "grass"){        damage = damage /2;        self.hp = self.hp - damage;          self.statusColor = "red";      }          else if(self.type === "electric" && team[selectedTeam].type === "ground"){            damage = damage *2;            self.hp = self.hp - damage;            self.statusColor = "yellow";            }          else if(self.type === "electric" && team[selectedTeam].type === "grass"){            damage = damage*2;            self.hp = self.hp - damage;            self.statusColor = "yellow";          }          else if(self.type === "electric" && team[selectedTeam].type === "water"){            damage = damage /2;            self.hp = self.hp - damage;            self.statusColor = "red";          }
      else{
        self.hp = self.hp - damage;
        self.statusColor = "gray";
      }
      if(self.dead === false){
        self.basicHit = true;
      }
    }
  }
   ///TYPES

   if(self.name === "machop" ||self.name === "machoke" || self.name === "machamp"){self.type = "fighting";}
   if(self.name === "venonat" ||self.name === "butterfree"){self.type = "poison";}
   if(self.name === "zubat" ||self.name === "golbat"){self.type = "poison";}
   if(self.name === "bulbasaur" ||self.name === "ivysaur" || self.name === "venosaur"){self.type = "grass";}
   if(self.name === "raichu" ||self.name === "pikachu"){self.type = "electric";}
   if(self.name === "vulpix" ||self.name === "ninetails"){self.type = "fire";}
   if(self.name === "kangaskhan" ||self.name === "cubone"){self.type = "ground";}
   if(self.name === "geodude" ||self.name === "graveler" || self.name === "golem"|| self.name === "sandshrew"|| self.name === "sandslash"){self.type = "ground";}
   if(self.name === "charmander" || self.name === "charmeleon" || self.name === "charizard" || self.name === "vulpix" || self.name === "arcanine" || self.name === "growlithe"){          self.type = "fire";}        if(self.name === "nidoran" || self.name === "venonat" || self.name === "zubat" || self.name === "nidoking"){          self.type = "poison";}        if(self.name === "squirtle" || self.name === "wartortle" || self.name === "blastoise" || self.name === "lapras" ||self.name === "gyarados"){          self.type = "water";}        if(self.name === "oddish" ||self.name === "gloom" || self.name === "vileplume" || self.name === "bulbasaur" || self.name === "scyther"){          self.type = "grass";}if(self.name === "pikachu"){self.type = "electric";}if(self.name === "machop"){self.type = "fighting";}if(self.name === "pidgey" || self.name === "pidgeotto" || self.name === "pidgeot"){self.type = "flying";}        if(self.name === "sandshrew" ||self.name === "cubone" || self.name === "geodude"){self.type = "ground";}

  //////////////////////////////////////////////////
  /////////MOB UPDATE///////////////////////////////
  this.updateObject = function(){


    if(game.battleBool === true){
      self.speed = .1;
    }else{
      self.speed = 1;
    }

    //EVOLUTIONS
    if(self.name === "machop"){if(self.level > 27){self.name = "machoke";}}if(self.name === "machop" || self.name === "machoke"){if(self.level > 39){self.name = "machamp";}}
    if(self.name === "venonat"){if(self.level > 31){self.name = "butterfree";}}
    if(self.name === "zubat"){if(self.level > 29){self.name = "golbat";}}
    if(self.name === "bulbasaur"){if(self.level > 15){self.name = "ivysaur";}}if(self.name === "bulbasaur" || self.name === "ivysaur"){if(self.level > 35){self.name = "venosaur";}}
    if(self.name === "cubone"){if(self.level > 34){self.name = "kangaskhan";}}
    if(self.name === "sandshrew"){if(self.level > 27){self.name = "sandslash";}}
    if(self.name === "pikachu"){if(self.level > 29){self.name = "raichu";}}
    if(self.name === "vulpix"){if(self.level > 37){self.name = "ninetails";}}
    if(self.name === "geodude"){if(self.level > 24){self.name = "graveler";}}if(self.name === "geodude" || self.name === "graveler"){if(self.level > 41){self.name = "golem";}}
        if(self.name === "oddish"){if(self.level > 19){self.name = "gloom";}}if(self.name === "oddish" || self.name === "gloom"){if(self.level > 29){self.name = "vileplume";}}
            if(self.name === "nidoran"){if(self.level > 22){self.name = "nidorino";}}if(self.name === "nidorino" || self.name === "nidoran"){if(self.level > 39){self.name = "nidoking";}}
    if(self.name === "growlithe"){if(self.level > 25){self.name = "arcanine";}}if(self.name === "charmander"){if(self.level > 15){self.name = "charmeleon";}}if(self.name === "charmeleon" || self.name === "charmander"){if(self.level > 35){self.name = "charizard";}}        if(self.name === "squirtle"){if(self.level > 15){self.name = "wartortle";}}        if(self.name === "wartortle" || self.name === "squirtle"){if(self.level > 35){self.name = "blastoise";}}        if(self.name === "pidgey"){if(self.level > 15){self.name = "pidgeotto";}}        if(self.name === "pidgeotto" || self.name === "pidgey"){if(self.level > 35){self.name = "pidgeot";}}
    var img = <HTMLImageElement>document.getElementById(this.name + "-" + this.action + "-" + this.direction + "-" + this.frame);
    if(img === null){
      img = <HTMLImageElement>document.getElementById(this.name + "-" + "dead" + "-" + "down" + "-" + "one");
    }
    self.rightSide = self.x + (img.width+self.sizeMod)/2+1;
    self.leftSide = self.x - (img.width+self.sizeMod)/2+1;
    self.topSide =  self.y - (img.height+self.sizeMod)/2+1;
    self.bottomSide = self.y + (img.height+self.sizeMod)/2+1;
    var mountSize = <HTMLImageElement>document.getElementById(this.name + "-walking-down-one");
    self.size = mountSize.height+self.sizeMod;

    if(this.rare === 1000){
      canvas.save();
      canvas.filter = 'invert(1)';
      canvas.drawImage(img, self.x-(img.width+self.sizeMod)/2, self.y-(img.height+self.sizeMod)/2, img.width+self.sizeMod, img.height+self.sizeMod);
      canvas.restore();
      canvas.save();
      canvas.globalCompositeOperation = "source-atop";
      canvas.globalAlpha = .7;
      canvas.fillStyle = "#000000";
      canvas.fillRect(self.x-(img.width+self.sizeMod)/2, self.y-(img.height+self.sizeMod)/2, img.width+self.sizeMod, img.height+self.sizeMod);
      canvas.restore();
    }
  // Rare Gold
  else if(this.rare > 950){
    canvas.save();
      canvas.drawImage(img, self.x-(img.width+self.sizeMod)/2, self.y-(img.height+self.sizeMod)/2, img.width+self.sizeMod, img.height+self.sizeMod);
      canvas.globalCompositeOperation = "source-atop";
      canvas.globalAlpha = .30;
      canvas.fillStyle = "#D4AF37";
      canvas.fillRect(self.x-(img.width+self.sizeMod)/2, self.y-(img.height+self.sizeMod)/2, img.width+self.sizeMod, img.height+self.sizeMod);
  canvas.restore();
  }
  //Rare black
  else if(this.rare > 850){
    canvas.save();
      canvas.drawImage(img, self.x-(img.width+self.sizeMod)/2, self.y-(img.height+self.sizeMod)/2, img.width+self.sizeMod, img.height+self.sizeMod);
      canvas.globalCompositeOperation = "source-atop";
      canvas.globalAlpha = .35;
      canvas.fillStyle = "#000000";
      canvas.fillRect(self.x-(img.width+self.sizeMod)/2, self.y-(img.height+self.sizeMod)/2, img.width+self.sizeMod, img.height+self.sizeMod);
  canvas.restore();
  }
  //Rare Normal
  else{
    canvas.drawImage(img, self.x-(img.width+self.sizeMod)/2, self.y-(img.height+self.sizeMod)/2, img.width+self.sizeMod, img.height+self.sizeMod);
  }
    if(self.rightSide > trainer.leftSide &&
      self.leftSide < trainer.rightSide &&
      self.topSide < trainer.bottomSide &&
      self.bottomSide > trainer.topSide){
        if(self.size < trainer.size){
          self.pushedBy(trainer);
        }
    }

    if(self.rightSide > team[selectedTeam].leftSide &&
      self.leftSide < team[selectedTeam].rightSide &&
      self.topSide < team[selectedTeam].bottomSide &&
      self.bottomSide > team[selectedTeam].topSide&&
      team[selectedTeam].attack === false &&
      team[selectedTeam].ball === false){
        if(self.size < team[selectedTeam].size){
          self.pushedBy(team[selectedTeam]);
        }
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
    });
    if(this.spriteChange === 0){
      this.frame = (this.frame === "one") ?
      "two" : (this.frame === "two") ?
      "three" : (this.frame === "three") ?
      "one" : "three";
      this.spriteChange = 5;
    }else{
      this.spriteChange --;
    }
    if(this.dead === true){
      self.attack = false;
      self.action = "sleeping";
      canvas.fillStyle = 'black';
      canvas.font = "10px Arial";
      canvas.fillText("P:"+self.rare, self.x, self.y-(img.height+self.sizeMod)/2);
      return;
    }
      if(this.hp < 0){
        this.dead = true;
        this.action = "sleeping";
        self.expValue = self.level;
        if(self.level > team[selectedTeam].level){
          self.expValue = self.level * 2;
        }
        team[selectedTeam].levelUp(self.expValue);
        return;
      }

      if(self.hp < self.hpmax && self.attack === false){
        canvas.fillStyle =  self.statusColor;
        var width = 25*self.hp/self.hpmax;
        if(width < 0){
          width = 0;
        }
        canvas.fillRect(self.x-(img.width+self.sizeMod)/3, self.y-(img.height+self.sizeMod)/2-7, width, 5);
        canvas.strokeStyle = "black";
        canvas.strokeRect(self.x-(img.width+self.sizeMod)/3, self.y-(img.height+self.sizeMod)/2-7, 25, 5);

        canvas.fillStyle = 'black';
        canvas.font = "12px Arial";
        canvas.fillText(self.level, self.x+(img.width+self.sizeMod)/3+15, self.y-(img.height+self.sizeMod)/2-3);
      }
      if(self.attack === false){
        if(self.hp < self.hpmax){
          self.hp += self.hpmax*0.005;
        }
      }
      if(self.basicAttack === true){
        self.attackCount --;
        if(self.type === "fire"){
          bodies.push(new fireAttack(self));
        }
        if(self.type === "water"){
          bodies.push(new waterAttack(self));
        }
        if(self.type === "flying"){
          bodies.push(new flyingAttack(self));
        }
        if(self.type === "electric"){
          bodies.push(new electricAttack(self));
        }
        if(self.type === "grass"){
          bodies.push(new grassAttack(self));
        }
        if(self.type === "poison"){
          bodies.push(new poisonAttack(self));
        }
        if(self.attackCount === 0){
          self.basicAttack = false;
          self.attackCount = 16;
        }
      }
      else if(self.basicHit === true){
        self.hitCount --;
        if(self.hitCount === 0){
          self.basicHit = false;
          self.basicAttack = true;
          self.hitCount = 16;
        }
      }

      if(self.attack === true){
        if(self.basicHit === true){
          self.action = "walking";
          self.frame = "three";
        }
        else if(self.basicAttack === false){
          //self.action = "attacking";
          self.action = "walking";
          self.frame = "two";
        }
        else{
          self.action = "attacking";
        }
      }
      else if(self.sleeping === true){
        // self.action = "sleeping";
        //placeholder
        self.speed = 0.3;
        self.action = "walking";
      }
      else if(self.attack === false){
        self.action = "walking";
      }
      var imgBar = <HTMLImageElement>document.getElementById(this.name + "-" + this.action + "-" + this.direction + "-one");
      if(self.rightSide+30 > team[selectedTeam].leftSide &&
      self.leftSide-30 < team[selectedTeam].rightSide &&
      self.topSide-30 < team[selectedTeam].bottomSide &&
      self.bottomSide+30 > team[selectedTeam].topSide &&
      team[selectedTeam].attack === true &&
      team[selectedTeam].sic === true){
          self.attack = true;
        team[selectedTeam].loseHp(self);
        if(team[selectedTeam].direction === "up"){
          self.x = team[selectedTeam].x;
          self.y = team[selectedTeam].topSide  - (img.height+self.sizeMod)/1.5;
          if(self.basicHit === false){
            self.direction = "down";
          }
          //HP BAR DOWN
          canvas.fillStyle =  self.statusColor;
          var width = 25*self.hp/self.hpmax;
          if(width < 0){
            width = 0;
          }
          canvas.fillRect(self.x-(imgBar.width+self.sizeMod)/3, self.y-(imgBar.height+self.sizeMod)/2-7, width, 5);
          canvas.strokeStyle = "black";
          canvas.strokeRect(self.x-(imgBar.width+self.sizeMod)/3, self.y-(imgBar.height+self.sizeMod)/2-7, 25, 5);

          canvas.fillStyle = 'black';
          canvas.font = "12px Arial";
          canvas.fillText(self.level, self.x+(imgBar.width+self.sizeMod)/3+15, self.y-(imgBar.height+self.sizeMod)/2-3);
        }
        if(team[selectedTeam].direction === "down"){
          self.x = team[selectedTeam].x;
          self.y = team[selectedTeam].bottomSide + (img.height+self.sizeMod)/1.5;
          if(self.basicHit === false){
            self.direction = "up";
          }
          //HP BAR UP
          canvas.fillStyle =  self.statusColor;
          var width = 25*self.hp/self.hpmax;
          if(width < 0){
            width = 0;
          }
          canvas.fillRect(self.x-(imgBar.width+self.sizeMod)/3, self.y+(imgBar.height+self.sizeMod)/2+7, width, 5);
          canvas.strokeStyle = "black";
          canvas.strokeRect(self.x-(imgBar.width+self.sizeMod)/3, self.y+(imgBar.height+self.sizeMod)/2+7, 25, 5);

          canvas.fillStyle = 'black';
          canvas.font = "12px Arial";
          canvas.fillText(self.level, self.x-(imgBar.width+self.sizeMod)/3-15, self.y+(imgBar.height+self.sizeMod)/2+3);
        }
        if(team[selectedTeam].direction === "right"){
          self.x = team[selectedTeam].rightSide + (img.width+self.sizeMod)/1.5;
          self.y = team[selectedTeam].y;
          if(self.basicHit === false){
            self.direction = "left";
          }
                    //HP BAR
                    canvas.fillStyle =  self.statusColor;
                    var width = 25*self.hp/self.hpmax;
                    if(width < 0){
                      width = 0;
                    }
                    canvas.fillRect(self.x-(imgBar.width+self.sizeMod)/3, self.y-(imgBar.height+self.sizeMod)/2-7, width, 5);
                    canvas.strokeStyle = "black";
                    canvas.strokeRect(self.x-(imgBar.width+self.sizeMod)/3, self.y-(imgBar.height+self.sizeMod)/2-7, 25, 5);

                    canvas.fillStyle = 'black';
                    canvas.font = "12px Arial";
                    canvas.fillText(self.level, self.x+(imgBar.width+self.sizeMod)/3+15, self.y-(imgBar.height+self.sizeMod)/2-3);

        }
        if(team[selectedTeam].direction === "left"){
          self.x = team[selectedTeam].leftSide - (img.width+self.sizeMod)/1.5;
          self.y = team[selectedTeam].y;
          if(self.basicHit === false){
            self.direction = "right";
          }
                    //HP BAR
                    canvas.fillStyle =  self.statusColor;
                    var width = 25*self.hp/self.hpmax;
                    if(width < 0){
                      width = 0;
                    }
                    canvas.fillRect(self.x-(imgBar.width+self.sizeMod)/3, self.y-(imgBar.height+self.sizeMod)/2-7, width, 5);
                    canvas.strokeStyle = "black";
                    canvas.strokeRect(self.x-(imgBar.width+self.sizeMod)/3, self.y-(imgBar.height+self.sizeMod)/2-7, 25, 5);

                    canvas.fillStyle = 'black';
                    canvas.font = "12px Arial";
                    canvas.fillText(self.level, self.x-(imgBar.width+self.sizeMod)/3-15, self.y-(imgBar.height+self.sizeMod)/2-3);
        }
      }
      else{
        if(self.nature !== "hostile"){
          self.attack = false;
        }
      }
    if (self.directionCount === 0) {
        if(self.nature === "lazy"){
          self.directionCount = Math.floor(Math.random()*500 + 100);
          self.sleeping = (self.sleeping === true) ? false : true;
          self.direction = random();
        }if(self.nature === "hostile"){
          self.directionCount = Math.floor(Math.random()*100 + 100);
          self.attack = (self.attack === true) ? false : true;
          self.direction = random();
        }else{
          self.attack = (self.speed === .2) ? .5 : .2;
          self.directionCount = Math.floor(Math.random()*500 + 100);
          self.direction = random();
        }

    } else {
        self.directionCount--;
    }
      if(this.direction === "left" && this.action === "walking"){
        this.x -= this.speed;
      }else if(this.direction === "right" && this.action === "walking"){
        this.x += this.speed;
      }else if(this.direction === "up" && this.action === "walking"){
        this.y -= this.speed;
      }else if(this.direction === "down" && this.action === "walking"){
        this.y += this.speed;
      }
      //screen boundaries
      if (this.x > gameSize.x) {
        if(self.attack === true){
          team[selectedTeam].direction = "up";
        }
        else{
          self.direction = "left";
        }
      }

      else if (this.x < 0) {
        if(self.attack === true){
          team[selectedTeam].direction = "down";
        }
        else{
          self.direction = "right";
        }
      }

      else if(this.y > gameSize.y) {
        if(self.attack === true){
          team[selectedTeam].direction = "left";
        }
        else{
          self.direction = "up";
        }
      }

      else if (this.y < 0) {
        if(self.attack === true){
          team[selectedTeam].direction = "right";
        }
        else{
          self.direction = "down";
        }
      }
      function random(){
        var r = Math.floor(Math.random()*4+1);
        if(r === 1){return "up";}else if(r === 2){return "down";}else if(r === 3){return "left"}else if(r ===4){return "right";}
      };
  };  //end of updateObject()
};   //end of PokemonObject()

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
  this.name = "trainer";
  this.direction = "down";
  this.x = gameSize.x/2;
  this.y = gameSize.y/2;
  this.action = "attacking";
  this.frame = "one";
  this.spriteChange = 0;
  this.speed = 4;
  this.hp = 500;
  this.dead = false;
  this.mount = false;
  self.sizeMod = 7;
  self.sizeMody = 10;
  // self.caught = 1;
  this.pushedBy = function(object){
    self.x += (self.x > object.x) ? object.x/300 : -object.x/300;
    self.y += (self.y > object.y) ? object.y/300 : -object.x/300;
  };
  this.updateObject = function(){

    var img = <HTMLImageElement>document.getElementById(this.name + "-" + this.action + "-" + this.direction + "-" + this.frame);
    if(game.battleBool === true){
      self.speed = .1;
      if(self.mount === false && team[selectedTeam].dead === false){
        if(team[selectedTeam].direction === "up"){
          self.x = team[selectedTeam].x-10;
          self.y = team[selectedTeam].topSide  + (img.height+self.sizeMod)+15;
          self.direction = "up";
        }

        if(team[selectedTeam].direction === "down"){
          self.x = team[selectedTeam].x+10;
          self.y = team[selectedTeam].bottomSide - ((img.height+self.sizeMod)+15);
            self.direction = "down";
        }
        if(team[selectedTeam].direction === "right"){
          self.x = team[selectedTeam].rightSide + ((img.width+self.sizeMod)+15);
          self.y = team[selectedTeam].y;
            self.direction = "right";
        }
        if(team[selectedTeam].direction === "left"){
          self.x = team[selectedTeam].leftSide - (img.width+self.sizeMod)+15;
          self.y = team[selectedTeam].y;
            self.direction = "left";
        }
      }
    }
    else if(game.biomeMap === "sea"){
      if(self.mount === true && team[selectedTeam].type === "water" || self.mount === true && team[selectedTeam].type === "flying"){
        self.speed = 8;
      }else{
        self.speed = .5;
      }

    }
    else if(self.mount === true){
      self.speed = 8;
    }else{
      self.speed = 4;
    }

    if(self.rightSide > team[selectedTeam].leftSide &&
      self.leftSide < team[selectedTeam].rightSide &&
      self.topSide < team[selectedTeam].bottomSide &&
      self.bottomSide > team[selectedTeam].topSide){
        if(team[selectedTeam].size > trainer.size*1.5){
          game.mountBool = true;
        }else{
          game.mountBool = false;
        }
      }
    //   bodies.forEach(function(body){
    //     if(body instanceof PokemonObject){
    //       if(self.rightSide+20 > (body as any).leftSide &&
    //         self.leftSide-20 < (body as any).rightSide &&
    //         self.topSide-20 < (body as any).bottomSide &&
    //         self.bottomSide+20 > (body as any).topSide){
    //           if((body as any).dead === true){
    //           game.catchBool = true;
    //           }else{
    //             game.catchBool = false;
    //           }
    //       }
    //       else{
    //         game.catchBool = false;
    //       }
    //     }
    // });

    // var img = <HTMLImageElement>document.getElementById(this.name + "-" + this.action + "-" + this.direction + "-" + this.frame);
    self.rightSide = self.x + (img.width+self.sizeMod)/3+1;
    self.leftSide = self.x - (img.width+self.sizeMod)/3+1;
    self.topSide =  self.y - (img.height+self.sizeMody)/3+1;
    self.bottomSide = self.y + (img.height+self.sizeMody)/3+1;
    var mountSize = <HTMLImageElement>document.getElementById(this.name + "-walking-down-one");
    self.size = mountSize.height+self.sizeMod;
    if(this.mount === true && this.direction === "down"){
      canvas.drawImage(img, this.x-(img.width+self.sizeMod)/2, this.y-(img.height+self.sizeMod)/2, 0.1, 0.1);
    }else{
      canvas.drawImage(img, this.x-(img.width+self.sizeMod)/2, this.y-(img.height+self.sizeMody)/2, img.width+self.sizeMod, img.height+self.sizeMody);
    }

    if(this.hp < 0){
      this.dead = true;
      // this.action = "dead";
      // this.direction = "down";
      // this.frame = "one";
      return;
    }
    if(this.mount === true){
      this.frame = "one";
      this.x = team[selectedTeam].x;
      this.y = team[selectedTeam].y;
    }
      if(self.rightSide > team[selectedTeam].leftSide &&
        self.leftSide < team[selectedTeam].rightSide &&
        self.topSide < team[selectedTeam].bottomSide &&
        self.bottomSide > team[selectedTeam].topSide){
          team[selectedTeam].regen();
        }

    if(this.action === "attacking"){
      this.frame = "two";
      return;
    }
    if(self.mount === false){
      if(this.spriteChange === 0){
        this.frame = (this.frame === "one") ?
        "two" : (this.frame === "two") ?
        "three" : (this.frame === "three") ?
        "one" : "three";
        this.spriteChange = 5;
      }else{
        this.spriteChange --;
      }
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
if(team[selectedTeam].dead === true || team[selectedTeam].attack === true){
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

bodies.forEach(function(body){
  if(body instanceof caveObject){
    if(self.rightSide > (body as any).leftSide &&
      self.leftSide < (body as any).rightSide &&
      self.topSide < (body as any).bottomSide &&
      self.bottomSide > (body as any).topSide){
        cave = true;
        clearForest();
        newPokemon();
        self.x = gameSize.x/2;
        self.y = gameSize.y/2;
        team[selectedTeam].x = gameSize.x/2.5;
        team[selectedTeam].y = gameSize.y/2.5;
    }
  }
  else if(body instanceof pokeCenterObject){
    if(self.rightSide > (body as any).leftSide &&
      self.leftSide < (body as any).rightSide &&
      self.topSide < (body as any).bottomSide &&
      self.bottomSide > (body as any).topSide){
        center = true;
        clearForest();
        newPokemon();
        self.x = gameSize.x/2;
        self.y = gameSize.y/2;
        team[selectedTeam].x = gameSize.x/2.5;
        team[selectedTeam].y = gameSize.y/2.5;
    }
  }
  else if(body instanceof treeObject || body instanceof rockObject){
      if(self.rightSide > (body as any).leftSide &&
        self.leftSide < (body as any).rightSide &&
        self.topSide < (body as any).bottomSide &&
        self.bottomSide > (body as any).topSide){
            trainer.pushedBy((body as any));
      }
    }
});

if (this.x > gameSize.x) {
  if(cave === true || center === true){
    cave = false;
    center = false;
    game.biomeMap = "grass";
  }
    clearForest();
    this.x = 0 + (img.width/2) +1;
    team[selectedTeam].x = 0 +1;
    daycycle++;
    east++;
    west--;
    newPokemon();
    makeForest();
}
else if (this.x < 0) {
  if(cave === true || center === true){
    cave = false;
    center = false;
    game.biomeMap = "grass";
  }
  clearForest();
    this.x = gameSize.x-1;
    team[selectedTeam].x = gameSize.x-1;
    daycycle++;
    east--;
    west++;
    newPokemon();
    makeForest();
}
else if(this.y > gameSize.y) {
  if(cave === true || center === true){
    cave = false;
    center = false;
    game.biomeMap = "grass";
  }
    clearForest();
    this.y = 0 + (img.width/2) + 1;
    team[selectedTeam].y = 0 + (img.width/2) + 1;
    daycycle++;
    north--;
    south++;
    newPokemon();
    makeForest();
}
else if (this.y < 0) {
  if(cave === true || center === true){
    cave = false;
    center = false;
    game.biomeMap = "grass";
  }
    clearForest();
    this.y = gameSize.y - (img.height/2)-1;
    team[selectedTeam].y = gameSize.y - (img.height/2)-1;
    north++;
    south--;
    daycycle++;
    newPokemon();
    makeForest();
}
  };  //end of updateObject()
};   //end of TrainerObject()
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////MISC OBJECTS
////////////////////////////////////////////////////////
function rainObject(){
  var self = this;
  var rain = <HTMLImageElement>document.getElementById("rain");
  var snow = <HTMLImageElement>document.getElementById("snowing");
  self.x = Math.floor(Math.random()*gameSize.x);
  self.y = Math.floor(Math.random()*gameSize.y);
  self.randomNumber = Math.floor(Math.random()*100+1);
  this.updateObject = function(){
    if(self.randomNumber < 79){return;}
    if(game.biomeMap === "snow"){
      canvas.drawImage(snow, Math.floor(Math.random()*gameSize.x-snow.width/2), Math.floor(Math.random()*gameSize.y-snow.height/2), snow.width, snow.height);
      canvas.drawImage(snow, Math.floor(Math.random()*gameSize.x-snow.width/2), Math.floor(Math.random()*gameSize.y-snow.height/2), snow.width, snow.height);
      canvas.drawImage(snow, Math.floor(Math.random()*gameSize.x-snow.width/2), Math.floor(Math.random()*gameSize.y-snow.height/2), snow.width, snow.height);
      canvas.drawImage(snow, Math.floor(Math.random()*gameSize.x-snow.width/2), Math.floor(Math.random()*gameSize.y-snow.height/2), snow.width, snow.height);
      canvas.drawImage(snow, Math.floor(Math.random()*gameSize.x-snow.width/2), Math.floor(Math.random()*gameSize.y-snow.height/2), snow.width, snow.height);
    }
    else if(game.biomeMap === "grass"){
      canvas.drawImage(rain, Math.floor(Math.random()*gameSize.x-rain.width/2), Math.floor(Math.random()*gameSize.y-rain.height/2), rain.width, rain.height);
      canvas.drawImage(rain, Math.floor(Math.random()*gameSize.x-rain.width/2), Math.floor(Math.random()*gameSize.y-rain.height/2), rain.width, rain.height);
      canvas.drawImage(rain, Math.floor(Math.random()*gameSize.x-rain.width/2), Math.floor(Math.random()*gameSize.y-rain.height/2), rain.width, rain.height);
      canvas.drawImage(rain, Math.floor(Math.random()*gameSize.x-rain.width/2), Math.floor(Math.random()*gameSize.y-rain.height/2), rain.width, rain.height);
      canvas.drawImage(rain, Math.floor(Math.random()*gameSize.x-rain.width/2), Math.floor(Math.random()*gameSize.y-rain.height/2), rain.width, rain.height);
      canvas.drawImage(rain, Math.floor(Math.random()*gameSize.x-rain.width/2), Math.floor(Math.random()*gameSize.y-rain.height/2), rain.width, rain.height);
      canvas.drawImage(rain, Math.floor(Math.random()*gameSize.x-rain.width/2), Math.floor(Math.random()*gameSize.y-rain.height/2), rain.width, rain.height);
      canvas.drawImage(rain, Math.floor(Math.random()*gameSize.x-rain.width/2), Math.floor(Math.random()*gameSize.y-rain.height/2), rain.width, rain.height);
      canvas.drawImage(rain, Math.floor(Math.random()*gameSize.x-rain.width/2), Math.floor(Math.random()*gameSize.y-rain.height/2), rain.width, rain.height);
      canvas.drawImage(rain, Math.floor(Math.random()*gameSize.x-rain.width/2), Math.floor(Math.random()*gameSize.y-rain.height/2), rain.width, rain.height);
    }
    else{
      return;
    }
  }
}

function treeObject(){
var self = this;
this.x = Math.floor(Math.random()*gameSize.x);
this.y = Math.floor(Math.random()*gameSize.y);
self.sizeMod = Math.floor(Math.random()*15+1)+Math.random();
self.hide = false;
self.hide2 = false;
this.pushedBy = function(object){
  self.x += (self.x > object.x) ? object.x*100 : -object.x*100;
  self.y += (self.y > object.y) ? object.y*100 : -object.x*100;
};
this.updateObject = function(){
  if(game.biomeMap === "snow"){
    var img = <HTMLImageElement>document.getElementById("snowtree");
  }
  else if(game.biomeMap === "dirt"){
    var img = <HTMLImageElement>document.getElementById("dirttree");
  }
  else if(game.biomeMap === "grass"){
    var img = <HTMLImageElement>document.getElementById("tree");
  }
  else if(game.biomeMap === "swamp"){
    var img = <HTMLImageElement>document.getElementById("swamptree");
  }
  else{
    return;
    //var img = <HTMLImageElement>document.getElementById("tree");
  }
  self.rightSide = self.x + (img.width+self.sizeMod)/2;
  self.leftSide = self.x - (img.width+self.sizeMod)/2;
  self.topSide =  self.y - (img.height+self.sizeMod)/2;
  self.bottomSide = self.y + (img.height+self.sizeMod)/2;
  self.size = img.height+self.sizeMod;

  if(self.hide === true || self.hide2 === true){
    canvas.save();
    canvas.globalAlpha = .5;
    canvas.drawImage(img, self.x-(img.width+self.sizeMod)/2, self.y-(img.height+self.sizeMod)/2, img.width+self.sizeMod, img.height+self.sizeMod);
    canvas.restore();
  }
  else{
    canvas.drawImage(img, this.x-(img.width+self.sizeMod)/2, this.y-(img.height+self.sizeMod)/2, img.width+self.sizeMod, img.height+self.sizeMod);
  }

  if(self.rightSide > team[selectedTeam].leftSide &&
    self.leftSide < team[selectedTeam].rightSide &&
    self.topSide < team[selectedTeam].bottomSide &&
    self.bottomSide > team[selectedTeam].topSide){
      self.hide2 = true;
    }else{
      self.hide2 = false;
    }

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
      if(body instanceof PokemonObject){
        if(self.rightSide > (body as any).leftSide &&
          self.leftSide < (body as any).rightSide &&
          self.topSide < (body as any).bottomSide &&
          self.bottomSide > (body as any).topSide){
            self.hide = true;
        }else{
          self.hide = false;
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
self.sizeMod = Math.floor(Math.random()*10+1)+Math.random();
self.hide = false;
self.hide2 = false;
this.pushedBy = function(object){
  self.x += (self.x > object.x) ? object.x*100 : -object.x*100;
  self.y += (self.y > object.y) ? object.y*100 : -object.x*100;
};
this.updateObject = function(){
  if(game.biomeMap === "snow"){
    var img = <HTMLImageElement>document.getElementById("snowbush");
  }
  else if(game.biomeMap === "dirt"){
    var img = <HTMLImageElement>document.getElementById("dirtbush");
  }
  else if(game.biomeMap === "swamp"){
    var img = <HTMLImageElement>document.getElementById("swampbush");
  }
  else if(game.biomeMap === "grass"){
    var img = <HTMLImageElement>document.getElementById("bush");
  }
  else{
    return;
    //var img = <HTMLImageElement>document.getElementById("bush");
  }
  self.rightSide = self.x + (img.width+self.sizeMod)+10;
  self.leftSide = self.x - (img.width+self.sizeMod)+10;
  self.topSide =  self.y - (img.height+self.sizeMod)+10;
  self.bottomSide = self.y + (img.height+self.sizeMod)+10;
  self.size = img.height+self.sizeMod;
  if(self.hide === true || self.hide2 === true){
    canvas.save();
    canvas.globalAlpha = .5;
    canvas.drawImage(img, self.x-(img.width+self.sizeMod)/2, self.y-(img.height+self.sizeMod)/2, img.width+self.sizeMod, img.height+self.sizeMod);
    canvas.restore();
  }
  else{
    canvas.drawImage(img, this.x-(img.width+self.sizeMod)/2, this.y-(img.height+self.sizeMod)/2, img.width+self.sizeMod, img.height+self.sizeMod);
  }

  if(self.rightSide > team[selectedTeam].leftSide &&
    self.leftSide < team[selectedTeam].rightSide &&
    self.topSide < team[selectedTeam].bottomSide &&
    self.bottomSide > team[selectedTeam].topSide){
      self.hide2 = true;
    }else{
      self.hide2 = false;
    }


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
      if(body instanceof PokemonObject){
        if(self.rightSide > (body as any).leftSide &&
          self.leftSide < (body as any).rightSide &&
          self.topSide < (body as any).bottomSide &&
          self.bottomSide > (body as any).topSide){
            self.hide = true;
        }else{
          self.hide = false;
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
self.sizeMod = Math.floor(Math.random()*25+1)+Math.random();
self.hide = false;
self.hide2 = false;
this.updateObject = function(){
  if(game.biomeMap === "snow"){
    var img = <HTMLImageElement>document.getElementById("snowrock");
  }
  else if(game.biomeMap === "dirt"){
    var img = <HTMLImageElement>document.getElementById("dirtrock");
  }
  else if(game.biomeMap === "swamp"){
    var img = <HTMLImageElement>document.getElementById("swamprock");
  }
  else if(game.biomeMap === "grass"){
    var img = <HTMLImageElement>document.getElementById("rock");
  }
  else{
    var img = <HTMLImageElement>document.getElementById("dirtrock");
  }
  self.rightSide = self.x + (img.width+self.sizeMod)/3;
  self.leftSide = self.x - (img.width+self.sizeMod)/3;
  self.topSide =  self.y - (img.height+self.sizeMod)/3.5;
  self.bottomSide = self.y + (img.height+self.sizeMod)/2;
  self.size = img.height+self.sizeMod;
  if(self.hide === true || self.hide2 === true){
    canvas.save();
    canvas.globalAlpha = .5;
    canvas.drawImage(img, self.x-(img.width+self.sizeMod)/2, self.y-(img.height+self.sizeMod)/2, img.width+self.sizeMod, img.height+self.sizeMod);
    canvas.restore();
  }
  else{
    canvas.drawImage(img, this.x-(img.width+self.sizeMod)/2, this.y-(img.height+self.sizeMod)/2, img.width+self.sizeMod, img.height+self.sizeMod);
  }

  if(self.rightSide > team[selectedTeam].leftSide &&
    self.leftSide < team[selectedTeam].rightSide &&
    self.topSide < team[selectedTeam].bottomSide &&
    self.bottomSide > team[selectedTeam].topSide){
      self.hide2 = true;
    }else{
      self.hide2 = false;
    }


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
      if(body instanceof PokemonObject){
        if(self.rightSide > (body as any).leftSide &&
          self.leftSide < (body as any).rightSide &&
          self.topSide < (body as any).bottomSide &&
          self.bottomSide > (body as any).topSide){
            self.hide = true;
        }else{
          self.hide = false;
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
function caveObject(){
  var self = this;
  this.x = Math.floor(Math.random()*gameSize.x);
  this.y = Math.floor(Math.random()*gameSize.y);
  this.random = Math.floor(Math.random()*100);
  self.sizeMod = 0;
  this.updateObject = function(){
    if(this.random < 95){
      return;
    }

    var img = <HTMLImageElement>document.getElementById("cave_entrance");
    self.rightSide = self.x + (img.width+self.sizeMod)/5;
    self.leftSide = self.x - (img.width+self.sizeMod)/5;
    self.topSide =  self.y - (img.height+self.sizeMod)/5;
    self.bottomSide = self.y + (img.height+self.sizeMod)/5;
    canvas.drawImage(img, self.x-(img.width+self.sizeMod)/2, this.y-(img.height+self.sizeMod)/2, img.width+self.sizeMod, img.height+self.sizeMod);
    bodies.forEach(function(body){
      if(body instanceof treeObject || body instanceof bushObject || body instanceof rockObject){
          if(self.rightSide > (body as any).leftSide &&
            self.leftSide < (body as any).rightSide &&
            self.topSide < (body as any).bottomSide &&
            self.bottomSide > (body as any).topSide){
                removeBody((body as any));
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
function pokeCenterObject(){
  var self = this;
  this.x = Math.floor(Math.random()*gameSize.x);
  this.y = Math.floor(Math.random()*gameSize.y);
  this.random = Math.floor(Math.random()*100);
  self.sizeMod = 0;
  this.updateObject = function(){
    if(this.random < 95){
      return;
    }

    var img = <HTMLImageElement>document.getElementById("pokecenter");
    self.rightSide = self.x + (img.width+self.sizeMod)/5;
    self.leftSide = self.x - (img.width+self.sizeMod)/5;
    self.topSide =  self.y - (img.height+self.sizeMod)/5;
    self.bottomSide = self.y + (img.height+self.sizeMod)/5;
    canvas.drawImage(img, self.x-(img.width+self.sizeMod)/2, this.y-(img.height+self.sizeMod)/2, img.width+self.sizeMod, img.height+self.sizeMod);
    bodies.forEach(function(body){
      if(body instanceof treeObject || body instanceof bushObject || body instanceof rockObject){
          if(self.rightSide > (body as any).leftSide &&
            self.leftSide < (body as any).rightSide &&
            self.topSide < (body as any).bottomSide &&
            self.bottomSide > (body as any).topSide){
                removeBody((body as any));
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

function fireAttack(attacker){
  var self = this;
  self.sizeMod = -20;
  this.x = (attacker as any).x;
  this.y = (attacker as any).y;
  if((attacker as any).direction === "up"){
    this.x = (attacker as any).x;
    this.y = (attacker as any).topSide;
  }
  else if((attacker as any).direction === "down"){
    this.x = (attacker as any).x;
    this.y = (attacker as any).bottomSide;
  }
  else if((attacker as any).direction === "left"){
    this.x = (attacker as any).leftSide;
    this.y = (attacker as any).y;
  }
  else if((attacker as any).direction === "right"){
    this.x = (attacker as any).rightSide;
    this.y = (attacker as any).y;
  }
  this.updateObject = function(){
    if((attacker as any).basicAttack === false || game.battleBool === false){
      removeBody(self);
    }
    self.sizeMod += 3;
    var img = <HTMLImageElement>document.getElementById("fireAttack");
    self.rightSide = self.x + (img.width+self.sizeMod)/2;
    self.leftSide = self.x - (img.width+self.sizeMod)/2;
    self.topSide =  self.y - (img.height+self.sizeMod)/2;
    self.bottomSide = self.y + (img.height+self.sizeMod)/2;
    canvas.drawImage(img, self.x-(img.width+self.sizeMod)/2, this.y-(img.height+self.sizeMod)/2, img.width+self.sizeMod, img.height+self.sizeMod);
if((attacker as any) === team[selectedTeam]){
    bodies.forEach(function(body){
      if(body instanceof PokemonObject){
        if((body as any).attack === true){
          if(self.x < (body as any).x-2){
            self.x += (body as any).x/2000+5;
          }
          if(self.x > (body as any).x+2){
            self.x -= (body as any).x/2000+5;
          }
          if(self.y < (body as any).y-2){
            self.y += (body as any).y/2000+5;
          }
          if(self.y > (body as any).y+2){
            self.y -= (body as any).y/2000+5;
          }
          if(self.rightSide > (body as any).x-1 &&
            self.leftSide < (body as any).x+1 &&
            self.topSide < (body as any).y-1 &&
            self.bottomSide > (body as any).y+1){
              removeBody(self);
          }
        }
      }
  });
}else{
          if(self.x < team[selectedTeam].x-2){
            self.x += team[selectedTeam].x/2000+5;
          }
          if(self.x > team[selectedTeam].x+2){
            self.x -= team[selectedTeam].x/2000+5;
          }
          if(self.y < team[selectedTeam].y-2){
            self.y += team[selectedTeam].y/2000+5;
          }
          if(self.y > team[selectedTeam].y+2){
            self.y -= team[selectedTeam].y/2000+5;
          }
          if(self.rightSide > team[selectedTeam].x-1 &&
            self.leftSide < team[selectedTeam].x+1 &&
            self.topSide < team[selectedTeam].y-1 &&
            self.bottomSide > team[selectedTeam].y+1){
              removeBody(self);
          }
    }
  }
}

function waterAttack(attacker){
  var self = this;
  self.sizeMod = team[selectedTeam].sizeMod/2;
  this.x = (attacker as any).x;
  this.y = (attacker as any).y;
  if((attacker as any).direction === "up"){
    this.x = (attacker as any).x;
    this.y = (attacker as any).topSide;
  }
  else if((attacker as any).direction === "down"){
    this.x = (attacker as any).x;
    this.y = (attacker as any).bottomSide;
  }
  else if((attacker as any).direction === "left"){
    this.x = (attacker as any).leftSide;
    this.y = (attacker as any).y;
  }
  else if((attacker as any).direction === "right"){
    this.x = (attacker as any).rightSide;
    this.y = (attacker as any).y;
  }
  this.updateObject = function(){
    if((attacker as any).basicAttack === false || game.battleBool === false){
      removeBody(self);
    }
    var img = <HTMLImageElement>document.getElementById("waterAttack");
    self.rightSide = self.x + (img.width+self.sizeMod)/2;
    self.leftSide = self.x - (img.width+self.sizeMod)/2;
    self.topSide =  self.y - (img.height+self.sizeMod)/2;
    self.bottomSide = self.y + (img.height+self.sizeMod)/2;
    canvas.drawImage(img, self.x-(img.width+self.sizeMod)/2, this.y-(img.height+self.sizeMod)/2, img.width+self.sizeMod, img.height+self.sizeMod);
if((attacker as any) === team[selectedTeam]){
    bodies.forEach(function(body){
      if(body instanceof PokemonObject){
        if((body as any).attack === true){
          if(self.x < (body as any).x-2){
            self.x += (body as any).x/2000+5;
          }
          if(self.x > (body as any).x+2){
            self.x -= (body as any).x/2000+5;
          }
          if(self.y < (body as any).y-2){
            self.y += (body as any).y/2000+5;
          }
          if(self.y > (body as any).y+2){
            self.y -= (body as any).y/2000+5;
          }
          if(self.rightSide > (body as any).x-1 &&
            self.leftSide < (body as any).x+1 &&
            self.topSide < (body as any).y-1 &&
            self.bottomSide > (body as any).y+1){
              removeBody(self);
          }
        }
      }
  });
}else{
      if(self.x < team[selectedTeam].x-2){
        self.x += team[selectedTeam].x/2000+5;
      }
      if(self.x > team[selectedTeam].x+2){
        self.x -= team[selectedTeam].x/2000+5;
      }
      if(self.y < team[selectedTeam].y-2){
        self.y += team[selectedTeam].y/2000+5;
      }
      if(self.y > team[selectedTeam].y+2){
        self.y -= team[selectedTeam].y/2000+5;
      }
      if(self.rightSide > team[selectedTeam].x-1 &&
        self.leftSide < team[selectedTeam].x+1 &&
        self.topSide < team[selectedTeam].y-1 &&
        self.bottomSide > team[selectedTeam].y+1){
          removeBody(self);
      }
    }
  }
}

function grassAttack(attacker){
  var self = this;
  self.sizeMod = 0;
  var moveVariance = Math.floor(Math.random()*6+1);
  this.x = (attacker as any).x;
  this.y = (attacker as any).y;
  if((attacker as any).direction === "up"){
    this.x = (attacker as any).x;
    this.y = (attacker as any).topSide;
  }
  else if((attacker as any).direction === "down"){
    this.x = (attacker as any).x;
    this.y = (attacker as any).bottomSide;
  }
  else if((attacker as any).direction === "left"){
    this.x = (attacker as any).leftSide;
    this.y = (attacker as any).y;
  }
  else if((attacker as any).direction === "right"){
    this.x = (attacker as any).rightSide;
    this.y = (attacker as any).y;
  }
  this.updateObject = function(){
    if((attacker as any).basicAttack === false || game.battleBool === false){
      removeBody(self);
    }
    var img = <HTMLImageElement>document.getElementById("grassAttack");
    self.rightSide = self.x + (img.width+self.sizeMod)/2;
    self.leftSide = self.x - (img.width+self.sizeMod)/2;
    self.topSide =  self.y - (img.height+self.sizeMod)/2;
    self.bottomSide = self.y + (img.height+self.sizeMod)/2;
    canvas.drawImage(img, self.x-(img.width+self.sizeMod)/2, this.y-(img.height+self.sizeMod)/2, img.width+self.sizeMod, img.height+self.sizeMod);
if((attacker as any) === team[selectedTeam]){
    bodies.forEach(function(body){
      if(body instanceof PokemonObject){
        if((body as any).attack === true){
          if(self.x < (body as any).x-2){
            self.x += (body as any).x/2000+10;
            self.y += moveVariance;
          }
          if(self.x > (body as any).x+2){
            self.x -= (body as any).x/2000+10;
            self.y += moveVariance;
          }
          if(self.y < (body as any).y-2){
            self.y += (body as any).y/2000+10;
            self.x += moveVariance;
          }
          if(self.y > (body as any).y+2){
            self.y -= (body as any).y/2000+10;
            self.x += moveVariance;
          }
          if(self.rightSide > (body as any).x-1 &&
            self.leftSide < (body as any).x+1 &&
            self.topSide < (body as any).y-1 &&
            self.bottomSide > (body as any).y+1){
              removeBody(self);
          }
        }
      }
  });
}else{
      if(self.x < team[selectedTeam].x-2){
        self.x += team[selectedTeam].x/2000+10;
        self.y += moveVariance;
      }
      if(self.x > team[selectedTeam].x+2){
        self.x -= team[selectedTeam].x/2000+10;
        self.y += moveVariance;
      }
      if(self.y < team[selectedTeam].y-2){
        self.y += team[selectedTeam].y/2000+10;
        self.x += moveVariance;
      }
      if(self.y > team[selectedTeam].y+2){
        self.y -= team[selectedTeam].y/2000+10;
        self.x += moveVariance;
      }
      if(self.rightSide > team[selectedTeam].x-1 &&
        self.leftSide < team[selectedTeam].x+1 &&
        self.topSide < team[selectedTeam].y-1 &&
        self.bottomSide > team[selectedTeam].y+1){
          removeBody(self);
      }
    }
  }
}
function electricAttack(attacker){
  var self = this;
  self.sizeMod = 0;
  var moveVariance = Math.floor(Math.random()*6+1);
  this.x = (attacker as any).x;
  this.y = (attacker as any).y;
  if((attacker as any).direction === "up"){
    this.x = (attacker as any).x;
    this.y = (attacker as any).topSide;
  }
  else if((attacker as any).direction === "down"){
    this.x = (attacker as any).x;
    this.y = (attacker as any).bottomSide;
  }
  else if((attacker as any).direction === "left"){
    this.x = (attacker as any).leftSide;
    this.y = (attacker as any).y;
  }
  else if((attacker as any).direction === "right"){
    this.x = (attacker as any).rightSide;
    this.y = (attacker as any).y;
  }
  this.updateObject = function(){
    if((attacker as any).basicAttack === false || game.battleBool === false){
      removeBody(self);
    }
    var img = <HTMLImageElement>document.getElementById("electricAttack");
    self.rightSide = self.x + (img.width+self.sizeMod)/2;
    self.leftSide = self.x - (img.width+self.sizeMod)/2;
    self.topSide =  self.y - (img.height+self.sizeMod)/2;
    self.bottomSide = self.y + (img.height+self.sizeMod)/2;
    canvas.drawImage(img, self.x-(img.width+self.sizeMod)/2, this.y-(img.height+self.sizeMod)/2, img.width+self.sizeMod, img.height+self.sizeMod);
if((attacker as any) === team[selectedTeam]){
    bodies.forEach(function(body){
      if(body instanceof PokemonObject){
        if((body as any).attack === true){
          if(self.x < (body as any).x-2){
            self.x += (body as any).x/2000+10;
            self.y += moveVariance;
          }
          if(self.x > (body as any).x+2){
            self.x -= (body as any).x/2000+10;
            self.y += moveVariance;
          }
          if(self.y < (body as any).y-2){
            self.y += (body as any).y/2000+10;
            self.x += moveVariance;
          }
          if(self.y > (body as any).y+2){
            self.y -= (body as any).y/2000+10;
            self.x += moveVariance;
          }
          if(self.rightSide > (body as any).x-1 &&
            self.leftSide < (body as any).x+1 &&
            self.topSide < (body as any).y-1 &&
            self.bottomSide > (body as any).y+1){
              removeBody(self);
          }
        }
      }
  });
}else{
      if(self.x < team[selectedTeam].x-2){
        self.x += team[selectedTeam].x/2000+10;
        self.y += moveVariance;
      }
      if(self.x > team[selectedTeam].x+2){
        self.x -= team[selectedTeam].x/2000+10;
        self.y += moveVariance;
      }
      if(self.y < team[selectedTeam].y-2){
        self.y += team[selectedTeam].y/2000+10;
        self.x += moveVariance;
      }
      if(self.y > team[selectedTeam].y+2){
        self.y -= team[selectedTeam].y/2000+10;
        self.x += moveVariance;
      }
      if(self.rightSide > team[selectedTeam].x-1 &&
        self.leftSide < team[selectedTeam].x+1 &&
        self.topSide < team[selectedTeam].y-1 &&
        self.bottomSide > team[selectedTeam].y+1){
          removeBody(self);
      }
    }
  }
}

function poisonAttack(attacker){
  var self = this;
  self.sizeMod = -30;
  this.x = (attacker as any).x;
  this.y = (attacker as any).y;
  if((attacker as any).direction === "up"){
    this.x = (attacker as any).x;
    this.y = (attacker as any).topSide;
  }
  else if((attacker as any).direction === "down"){
    this.x = (attacker as any).x;
    this.y = (attacker as any).bottomSide;
  }
  else if((attacker as any).direction === "left"){
    this.x = (attacker as any).leftSide;
    this.y = (attacker as any).y;
  }
  else if((attacker as any).direction === "right"){
    this.x = (attacker as any).rightSide;
    this.y = (attacker as any).y;
  }
  this.updateObject = function(){
    if((attacker as any).basicAttack === false || game.battleBool === false){
      removeBody(self);
    }
    self.sizeMod += 5;
    var img = <HTMLImageElement>document.getElementById("poisonAttack");
    self.rightSide = self.x + (img.width+self.sizeMod)/2;
    self.leftSide = self.x - (img.width+self.sizeMod)/2;
    self.topSide =  self.y - (img.height+self.sizeMod)/2;
    self.bottomSide = self.y + (img.height+self.sizeMod)/2;
    canvas.drawImage(img, self.x-(img.width+self.sizeMod)/2, this.y-(img.height+self.sizeMod)/2, img.width+self.sizeMod, img.height+self.sizeMod);
if((attacker as any) === team[selectedTeam]){
    bodies.forEach(function(body){
      if(body instanceof PokemonObject){
        if((body as any).attack === true){
          if(self.x < (body as any).x-2){
            self.x += (body as any).x/2000+5;
          }
          if(self.x > (body as any).x+2){
            self.x -= (body as any).x/2000+5;
          }
          if(self.y < (body as any).y-2){
            self.y += (body as any).y/2000+5;
          }
          if(self.y > (body as any).y+2){
            self.y -= (body as any).y/2000+5;
          }
          if(self.rightSide > (body as any).x-1 &&
            self.leftSide < (body as any).x+1 &&
            self.topSide < (body as any).y-1 &&
            self.bottomSide > (body as any).y+1){
              removeBody(self);
          }
        }
      }
  });
}else{
          if(self.x < team[selectedTeam].x-2){
            self.x += team[selectedTeam].x/2000+5;
          }
          if(self.x > team[selectedTeam].x+2){
            self.x -= team[selectedTeam].x/2000+5;
          }
          if(self.y < team[selectedTeam].y-2){
            self.y += team[selectedTeam].y/2000+5;
          }
          if(self.y > team[selectedTeam].y+2){
            self.y -= team[selectedTeam].y/2000+5;
          }
          if(self.rightSide > team[selectedTeam].x-1 &&
            self.leftSide < team[selectedTeam].x+1 &&
            self.topSide < team[selectedTeam].y-1 &&
            self.bottomSide > team[selectedTeam].y+1){
              removeBody(self);
          }
    }
  }
}
function flyingAttack(attacker){
  var self = this;
  self.sizeMod = -40;
  this.x = (attacker as any).x;
  this.y = (attacker as any).y;
  if((attacker as any).direction === "up"){
    this.x = (attacker as any).x;
    this.y = (attacker as any).topSide;
  }
  else if((attacker as any).direction === "down"){
    this.x = (attacker as any).x;
    this.y = (attacker as any).bottomSide;
  }
  else if((attacker as any).direction === "left"){
    this.x = (attacker as any).leftSide;
    this.y = (attacker as any).y;
  }
  else if((attacker as any).direction === "right"){
    this.x = (attacker as any).rightSide;
    this.y = (attacker as any).y;
  }
  this.updateObject = function(){
    if((attacker as any).basicAttack === false || game.battleBool === false){
      removeBody(self);
    }
    self.sizeMod += 7;
    var img = <HTMLImageElement>document.getElementById("flyingAttack");
    self.rightSide = self.x + (img.width+self.sizeMod)/2;
    self.leftSide = self.x - (img.width+self.sizeMod)/2;
    self.topSide =  self.y - (img.height+self.sizeMod)/2;
    self.bottomSide = self.y + (img.height+self.sizeMod)/2;
    canvas.drawImage(img, self.x-(img.width+self.sizeMod)/2, this.y-(img.height+self.sizeMod)/2, img.width+self.sizeMod, img.height+self.sizeMod);
if((attacker as any) === team[selectedTeam]){
    bodies.forEach(function(body){
      if(body instanceof PokemonObject){
        if((body as any).attack === true){
          if(self.x < (body as any).x-2){
            self.x += (body as any).x/2000+5;
          }
          if(self.x > (body as any).x+2){
            self.x -= (body as any).x/2000+5;
          }
          if(self.y < (body as any).y-2){
            self.y += (body as any).y/2000+5;
          }
          if(self.y > (body as any).y+2){
            self.y -= (body as any).y/2000+5;
          }
          if(self.rightSide > (body as any).x-1 &&
            self.leftSide < (body as any).x+1 &&
            self.topSide < (body as any).y-1 &&
            self.bottomSide > (body as any).y+1){
              removeBody(self);
          }
        }
      }
  });
}else{
          if(self.x < team[selectedTeam].x-2){
            self.x += team[selectedTeam].x/2000+5;
          }
          if(self.x > team[selectedTeam].x+2){
            self.x -= team[selectedTeam].x/2000+5;
          }
          if(self.y < team[selectedTeam].y-2){
            self.y += team[selectedTeam].y/2000+5;
          }
          if(self.y > team[selectedTeam].y+2){
            self.y -= team[selectedTeam].y/2000+5;
          }
          if(self.rightSide > team[selectedTeam].x-1 &&
            self.leftSide < team[selectedTeam].x+1 &&
            self.topSide < team[selectedTeam].y-1 &&
            self.bottomSide > team[selectedTeam].y+1){
              removeBody(self);
          }
    }
  }
}
////////////////////////////////////////////////////////////////////////////////
//STEP 4 Run all updateObjects from Step 2 on an interval




game.rareCandy = function(){
  team[selectedTeam].levelUp(0);
}
game.deleteSave = function(){
  localStorage.clear();
  location.reload();
}
this.switchPokemon = function(){
  if(trainer.mount === true){
    game.ridePokemon();
  }
  var x = team[selectedTeam].x;
  var y = team[selectedTeam].y;
  var direction = team[selectedTeam].direction;
  var sic = team[selectedTeam].sic = (team[selectedTeam].sic === true) ? true : false;
  // team[selectedTeam].sic = false;
  removeBody(team[selectedTeam])

      if(selectedTeam > team.length -2){
        selectedTeam = 0;
      }
      else{
        selectedTeam++;
      }
      team[selectedTeam].ball = false;
      team[selectedTeam].sic = sic;
      team[selectedTeam].x = x;
      team[selectedTeam].y = y;
      team[selectedTeam].direction = direction;
      bodies.reverse();
      bodies.push(team[selectedTeam]);
      bodies.reverse();

}


game.deletePokemon = function(){
  if(team.length === 1){
    return;
  }
  if(trainer.mount === true){
    game.ridePokemon();
  }
  team[selectedTeam].sic = false;
  removeBody(team[selectedTeam]);
  removeTeam(team[selectedTeam]);
  game.displayteam = team;
  game.pet = team[0];
      if(selectedTeam > team.length -2){
        selectedTeam = 0;
      }
      else{
        selectedTeam++;
      }
      team[selectedTeam].x = trainer.x - 30;
      team[selectedTeam].y = trainer.y - 30;
      bodies.reverse();
      bodies.push(team[selectedTeam]);
      bodies.reverse();
}



this.returnPokemon = function(){
  if(team[selectedTeam].rightSide > trainer.leftSide &&
    team[selectedTeam].leftSide < trainer.rightSide &&
    team[selectedTeam].topSide < trainer.bottomSide &&
    team[selectedTeam].bottomSide > trainer.topSide){
      return;
    }
    team[selectedTeam].ball = true;
  bodies.push(new returnBallObject());
  team[selectedTeam].sic = false;
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
  team[selectedTeam].sic = (team[selectedTeam].sic === true) ? false : true;

  if(team[selectedTeam].sic === true && trainer.mount === false){
    bodies.push(new attackBallObject());
  }
  if(team[selectedTeam].sic === false){
    game.returnPokemon();
  }
}
game.basicAttack = function(){
  if(game.battleBool === false || team[selectedTeam].basicAttack === true || team[selectedTeam].basicHit === true){
    return;
  }else{
    team[selectedTeam].basicAttack = true;
  }
  // team[selectedTeam].basicAttack = (team[selectedTeam].basicAttack === true) ? false : true;


}


this.pokeBall = function(){
  if(team.length === 6){
    return;
  }
    //     bodies.forEach(function(body){
    //     if(body instanceof PokemonObject){
    //       if(trainer.rightSide+20 > (body as any).leftSide &&
    //       trainer.leftSide-20 < (body as any).rightSide &&
    //       trainer.topSide-20 < (body as any).bottomSide &&
    //       trainer.bottomSide+20 > (body as any).topSide){
    //           if((body as any).dead === false){
    //           return;
    //           }
    //       }
    //     }
    // });
    team[selectedTeam].battle = false;
    bodies.push(new ballObject());
}
this.ridePokemon = function(){
  if(game.mountBool === false){
    return;
  }
trainer.mount = (trainer.mount === true) ? false : true;
if(trainer.mount === true){
  trainer.speed = 8;
}else{
  trainer.speed = 4;
}
}
this.pauseGame = function(){
  game.pauseGameBool = (game.pauseGameBool === false) ? true : false;
}
window.setInterval(function(){(updateAllObjects())}, 20);
// window.setInterval(function(){(newPokemon())}, 10000);
}//end onInt
}//end screen class

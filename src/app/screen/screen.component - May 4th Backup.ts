import { Component, OnInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-screen',
  templateUrl: './screen.component.html',
  styles: [
    'nb-card {min-width: 0rem;}'


]
})
export class ScreenComponent implements OnInit{
  screenWidth: any;
  companpionName: string;
  companionHp: any;
  attackFalse: any;
  walkDown: any;
  walkUp: any;
  walkLeft: any;
  walkRight: any;
  stopWalking: any;
  attackButton: any;
  specialAttack: any;
  pokeBall: any;
  switchPokemon: any;
  returnPokemon: any;
  pauseGame: any;
  pauseGameBool: any;


  @HostListener('document:keydown', ['$event'])
  function1(e: KeyboardEvent){
    if(e.keyCode === 83){
      this.walkDown();
    }
    if(e.keyCode === 65){
      this.walkLeft();
    }
    if(e.keyCode === 87){
      this.walkUp();
    }
    if(e.keyCode === 68){
      this.walkRight();
    }
    if(e.keyCode === 69){
      this.attackButton();
    }
    if(e.keyCode === 32){
      this.pauseGame();
    }
    //q = 81
    if(e.keyCode === 67){
      this.pokeBall();
    }
    //c = 67
    if(e.keyCode === 82){
      this.switchPokemon();
    }
    //r = 82
    if(e.keyCode === 81){
      this.returnPokemon();
    }
  }
  @HostListener('document:keyup', ['$event'])
  function2(e: KeyboardEvent){
    if(e.keyCode === 83){
      this.stopWalking();
    }
    if(e.keyCode === 65){
      this.stopWalking();
    }
    if(e.keyCode === 87){
      this.stopWalking();
    }
    if(e.keyCode === 68){
      this.stopWalking();
    }
  }


public ngOnInit(): void {
this.screenWidth = window.innerWidth;
var i = 0;
var pauseGameBool = this.pauseGameBool;

this.switchPokemon = function(){
  companion.name = party[i];
  if(i < party.length-1){
    i++;
  }else{
    i = 0;
  }
  companion.ball = true;
  bodies.push(new returnBallObject());
  companion.hpbar.value = companion.hpbar.max * 0.8;
  companion.sic = false;

}

this.returnPokemon = function(){
  companion.ball = true;
  bodies.push(new returnBallObject());
  companion.hpbar.value = 5;
  companion.sic = false;
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
  companion.sic = (companion.sic === true) ? false : true;
}

this.specialAttack = function(){
    if(companion.dead === false){
      bodies.push(new waterObject(companion.x, companion.y, companion.direction));
    }
}
this.pokeBall = function(){
    if(trainer.dead === false){
      bodies.push(new ballObject());
    }
}

this.pauseGame = function(){
  pauseGameBool = (pauseGameBool === false) ? true : false;
}
/////////////////////////////////////////////////////////////////////////////////////////////////////
//STEP 1 Declare Variables
  var cnvs = <HTMLCanvasElement>document.getElementById('cnvs');
  pauseGameBool = false;
  if(window.innerWidth > 700){
    cnvs.width = window.innerWidth*.92;
    cnvs.height = window.innerHeight*.75;
  }else{
    cnvs.width = window.innerWidth*.89;
    cnvs.height = window.innerHeight*.65;
  }
  var canvas = cnvs.getContext("2d");
  var gameSize = {x:cnvs.width, y:cnvs.height};
  var trainer = new TrainerObject();
  var companion = new followObject();
  var land = new landScape();
  this.companpionName = companion.name;
  this.companionHp = companion.hpbar.value;
  this.attackFalse = companion.attack;
  var bodies  = [new PokemonObject(), trainer,companion,land];
  var party = [companion.name];
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


  var cry = <HTMLAudioElement>document.getElementById("charmander-cry");
  var hit = <HTMLAudioElement>document.getElementById("hit");
  var hitX = <HTMLAudioElement>document.getElementById("hitX");
  var end = <HTMLAudioElement>document.getElementById("end");
  var special = <HTMLAudioElement>document.getElementById("special");
  var caughtsound = <HTMLAudioElement>document.getElementById("caughtsound");
  var fail = <HTMLAudioElement>document.getElementById("fail");
  var point = <HTMLAudioElement>document.getElementById("point");

  // var levelupsound = <HTMLAudioElement>document.getElementById("levelupsound");

/////////////////////////////////////////////////////////////////////////////////////////////////////
//STEP 2 Declare all new Objects and package update into one function

function updateAllObjects(){
  if(pauseGameBool === true){
    return;
  }
if(daycycle === 3){
  noon = true;
}
else{
  noon = false;
}
if(daycycle === 7){
  night2 = true;
}
else{
  night2 = false;
}
if(daycycle > 8){
  daycycle = 1;
}
else if(daycycle > 5){
  night = true;
}
else{
  night = false;
}
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
function returnBallObject(){
  var self = this;
  self.x = companion.x;
  self.y = companion.y;
  this.updateObject = function(){
    var img = <HTMLImageElement>document.getElementById("ball-1");
    self.rightSide = self.x + (img.width)/2+1;
    self.leftSide = self.x - (img.width)/2+1;
    self.topSide =  self.y - (img.height)/2+1;
    self.bottomSide = self.y + (img.height)/2+1;
    canvas.drawImage(img, this.x-img.width/2, this.y-img.height/2, img.width, img.height);
    if(self.x < trainer.x-2){
      self.x += trainer.x/2000+8;
    }
    if(self.x > trainer.x+2){
      self.x -= trainer.x/2000+8;
    }
    if(self.y < trainer.y-2){
      self.y += trainer.y/2000+8;
    }
    if(self.y > trainer.y+2){
      self.y -= trainer.y/2000+8;
    }
    if(self.rightSide > trainer.leftSide &&
      self.leftSide < trainer.rightSide &&
      self.topSide < trainer.bottomSide &&
      self.bottomSide > trainer.topSide){
        removeBody(self);
        companion.x = trainer.rightSide + 5;
        companion.y = trainer.bottomSide + 5;
        companion.attack = false;
        // companion.sic = false;
        companion.ball = false;
      }
  }
}
function caughtBallObject(x, y){
  var self = this;
  self.x = x;
  self.y = y;
  this.updateObject = function(){
    var img = <HTMLImageElement>document.getElementById("ball-3");
    self.rightSide = self.x + (img.width)/2+1;
    self.leftSide = self.x - (img.width)/2+1;
    self.topSide =  self.y - (img.height)/2+1;
    self.bottomSide = self.y + (img.height)/2+1;
    canvas.drawImage(img, this.x-img.width/2, this.y-img.height/2, img.width, img.height);
    if(self.rightSide > trainer.leftSide &&
      self.leftSide < trainer.rightSide &&
      self.topSide < trainer.bottomSide &&
      self.bottomSide > trainer.topSide){
        trainer.caught ++;
        point.play();
        removeBody(self);
      }
  }
}
function ballObject(){
  var self = this;
  this.x = trainer.x;
  this.y = trainer.y;
  self.dead = false;
  self.speed = 8;
  self.xmod = 0;
  self.ymod = 0;
  self.sizeMod = 0;
  self.range = 20;
  self.direction = trainer.direction
  this.updateObject = function(){
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
                caughtsound.play();
                removeBody((body as any));
                party.push((body as any).name);
                bodies.push(new caughtBallObject(self.x,self.y));
              }
              fail.play();
              removeBody(self);
          }
        }
    });
    if(self.direction === "left"){
      self.x -= self.speed;
      if(self.x < trainer.x - 200){
        removeBody(this);
      }
    } if(self.direction === "right"){
      self.x += self.speed;
      if(self.x > trainer.x + 200){
        removeBody(this);
      }
    }if(self.direction === "up"){
      self.y -= self.speed;
      if(self.y < trainer.y - 200){
        removeBody(this);
      }
    }if(self.direction==="down"){
      self.y += self.speed;
      if(self.y > trainer.y + 200){
        removeBody(this);
      }
    }
  }
}

function waterObject(x, y,direction){
  var self = this;
  this.x = x;
  this.y = y;
  self.dead = false;
  this.direction = direction;
  self.speed = 4;
  self.xmod = 0;
  self.ymod = 0;
  this.updateObject = function(){
    if(companion.dead === true){
      return;
    }
    self.sizeMod = companion.sizeMod + 5;
    self.range = (self.sizeMod+5)*10;
    if(companion.name === "squirtle"){
      self.speed = 2;
      self.xmod = Math.floor(Math.random()*10+1);
      self.ymod = Math.floor(Math.random()*10+1);
      var img = <HTMLImageElement>document.getElementById("water");
    }else if(companion.name === "lapras"|| companion.name === "wartortle"|| companion.name === "blastoise"){
      self.speed = 10;
      self.xmod = Math.floor(Math.random()*3+1);
      self.ymod = Math.floor(Math.random()*3+1);
      var img = <HTMLImageElement>document.getElementById("water");
    }else if(companion.name === "bulbasaur"){
      self.xmod = Math.floor(Math.random()*10+1);
      self.ymod = Math.floor(Math.random()*10+1);
      self.speed = 10;
      var img = <HTMLImageElement>document.getElementById("leaf");
    }else if(companion.name === "charmander"|| companion.name === "charmeleon"|| companion.name === "charizard"){
      self.xmod = Math.floor(Math.random()*3+1);
      self.ymod = Math.floor(Math.random()*3+1);
      self.speed = 8;
      var img = <HTMLImageElement>document.getElementById("fire");
    }else if(companion.name === "pikachu"){
      var img = <HTMLImageElement>document.getElementById("bolt");
      self.xmod = Math.floor(Math.random()*3+1);
      self.ymod = Math.floor(Math.random()*3+1);
      self.speed = 15;
    }else{
      var img = <HTMLImageElement>document.getElementById("sand");
      self.xmod = Math.floor(Math.random()*25+1);
      self.ymod = Math.floor(Math.random()*25+1);
      self.speed = 10;
    }
    self.rightSide = self.x + (img.width+self.sizeMod)/2+1;
    self.leftSide = self.x - (img.width+self.sizeMod)/2+1;
    self.topSide =  self.y - (img.height+self.sizeMod)/2+1;
    self.bottomSide = self.y + (img.height+self.sizeMod)/2+1;
    companion.attack = true;
    if(direction==="left"){
      this.x -= self.speed;
      if(this.x < x - self.range){
        companion.attack = false;
        removeBody(self);
      }
    } if(direction==="right"){
      this.x += self.speed;
      if(this.x > x + self.range){
        companion.attack = false;
        removeBody(self);
      }
    }if(direction==="up"){
      this.y = self.topSide;
      this.y -= self.speed;
      if(this.y < y - self.range){
        companion.attack = false;
        removeBody(self);
      }
    }if(direction==="down"){
      this.y += self.speed;
      if(this.y > y + self.range){
        companion.attack = false;
        removeBody(self);
      }
    }
    canvas.drawImage(img, this.x-img.width/2+self.xmod, this.y-img.height/2+self.xmod, img.width+self.sizeMod, img.height+self.sizeMod);
    bodies.forEach(function(body){
      if(body instanceof PokemonObject){
          if(self.rightSide > (body as any).leftSide &&
            self.leftSide < (body as any).rightSide &&
            self.topSide < (body as any).bottomSide &&
            self.bottomSide > (body as any).topSide){
              (body as any).loseHp(companion.damage*2);
              companion.attack = false;
              removeBody(self);
          }
        }
    });

  }
}
// function fruitObject(){
//   var self = this;
//   this.x = Math.floor(Math.random()*gameSize.x);
//   this.y = Math.floor(Math.random()*gameSize.y);
//   self.sizeMod = -20;
//   self.dead = false;
//   this.updateObject = function(){
//     var img = <HTMLImageElement>document.getElementById("fruit");
//     self.rightSide = self.x + (img.width+self.sizeMod)/2+1;
//     self.leftSide = self.x - (img.width+self.sizeMod)/2+1;
//     self.topSide =  self.y - (img.height+self.sizeMod)/2+1;
//     self.bottomSide = self.y + (img.height+self.sizeMod)/2+1;
//     if(self.dead === true){
//       return;
//     }
//     canvas.drawImage(img, self.x, self.y, img.width+self.sizeMod, img.height+self.sizeMod)
//     if(this.sizeMod < -50){
//       removeBody(self);
//       self.dead = true;
//       return;
//     }
//   }
// }
function landScape(){
  var self = this;
  this.sizeMod = -50;
  this.x = Math.floor(Math.random()*gameSize.x);
  this.y = Math.floor(Math.random()*gameSize.y);
  this.x2 = Math.floor(Math.random()*gameSize.x);
  this.y2 = Math.floor(Math.random()*gameSize.y);
  this.x3 = Math.floor(Math.random()*gameSize.x);
  this.y4 = Math.floor(Math.random()*gameSize.y);
  this.x4 = Math.floor(Math.random()*gameSize.x);
  this.y4 = Math.floor(Math.random()*gameSize.y);
  this.x5 = Math.floor(Math.random()*gameSize.x);
  this.y5 = Math.floor(Math.random()*gameSize.y);
  this.randomNumber = Math.floor(Math.random()*100+1);
  this.updateObject = function(){
    var tree = <HTMLImageElement>document.getElementById("tree");
    var rock = <HTMLImageElement>document.getElementById("rock");
    var bush = <HTMLImageElement>document.getElementById("bush");
    var water = <HTMLImageElement>document.getElementById("water");
    var sand = <HTMLImageElement>document.getElementById("sand");
    var fire = <HTMLImageElement>document.getElementById("fire");
    var leaf = <HTMLImageElement>document.getElementById("leaf");
    canvas.drawImage(bush, this.x2-bush.width/2, this.y2-bush.height/2, bush.width, bush.height);
    canvas.drawImage(bush, this.x3-bush.width/2, this.y3-bush.height/2, bush.width, bush.height);
    canvas.drawImage(bush, this.x4-bush.width/2, this.y4-bush.height/2, bush.width, bush.height);
    canvas.drawImage(rock, this.x5-rock.width/2, this.y5-rock.height/2, rock.width, rock.height);
    canvas.drawImage(tree, gameSize.x - gameSize.x+gameSize.x, gameSize.y - gameSize.y-40, tree.width, tree.height);
    canvas.drawImage(tree, gameSize.x - gameSize.x+gameSize.x-this.x, gameSize.y - gameSize.y-40, tree.width, tree.height);
    canvas.drawImage(bush, gameSize.x - gameSize.x+gameSize.x-this.x, gameSize.y - gameSize.y-40, bush.width+self.sizeMod, bush.height+self.sizeMod);
    canvas.drawImage(tree, gameSize.x - gameSize.x-40, gameSize.y -  gameSize.y+self.y, tree.width, tree.height);
    canvas.drawImage(tree, gameSize.x - gameSize.x-40, gameSize.y -  gameSize.y+self.y, tree.width, tree.height);
    canvas.drawImage(tree, this.x +30, this.y +30, tree.width, tree.height);
    canvas.drawImage(tree, this.x +80, this.y +80, tree.width, tree.height);



    if(self.randomNumber === 50){
      var img = <HTMLImageElement>document.getElementById("pokecenter");
      canvas.drawImage(img, self.x-100, self.y+100, img.width, img.height);
    }


    if(self.randomNumber > 99){
      //fire
      raining = false;
      if(companion.type === "fire"){
        companion.damageMod = 3;
      }
      canvas.drawImage(fire, Math.floor(Math.random()*gameSize.x), Math.floor(Math.random()*gameSize.y), fire.width, fire.height);
      canvas.drawImage(fire, Math.floor(Math.random()*gameSize.x), Math.floor(Math.random()*gameSize.y), fire.width, fire.height);
      canvas.drawImage(fire, Math.floor(Math.random()*gameSize.x), Math.floor(Math.random()*gameSize.y), fire.width, fire.height);
      canvas.drawImage(fire, Math.floor(Math.random()*gameSize.x), Math.floor(Math.random()*gameSize.y), fire.width, fire.height);
      canvas.drawImage(fire, Math.floor(Math.random()*gameSize.x), Math.floor(Math.random()*gameSize.y), fire.width, fire.height);
      canvas.drawImage(fire, Math.floor(Math.random()*gameSize.x), Math.floor(Math.random()*gameSize.y), fire.width, fire.height);
      canvas.drawImage(fire, Math.floor(Math.random()*gameSize.x), Math.floor(Math.random()*gameSize.y), fire.width, fire.height);
      canvas.drawImage(fire, Math.floor(Math.random()*gameSize.x), Math.floor(Math.random()*gameSize.y), fire.width, fire.height);
      canvas.drawImage(fire, Math.floor(Math.random()*gameSize.x), Math.floor(Math.random()*gameSize.y), fire.width, fire.height);
      canvas.drawImage(fire, Math.floor(Math.random()*gameSize.x), Math.floor(Math.random()*gameSize.y), fire.width, fire.height);
      canvas.drawImage(fire, Math.floor(Math.random()*gameSize.x), Math.floor(Math.random()*gameSize.y), fire.width, fire.height);
      canvas.drawImage(fire, Math.floor(Math.random()*gameSize.x), Math.floor(Math.random()*gameSize.y), fire.width, fire.height);
      canvas.drawImage(fire, Math.floor(Math.random()*gameSize.x), Math.floor(Math.random()*gameSize.y), fire.width, fire.height);
      canvas.drawImage(fire, Math.floor(Math.random()*gameSize.x), Math.floor(Math.random()*gameSize.y), fire.width, fire.height);
      canvas.drawImage(fire, Math.floor(Math.random()*gameSize.x), Math.floor(Math.random()*gameSize.y), fire.width, fire.height);
      canvas.drawImage(fire, Math.floor(Math.random()*gameSize.x), Math.floor(Math.random()*gameSize.y), fire.width, fire.height);
      canvas.drawImage(fire, Math.floor(Math.random()*gameSize.x), Math.floor(Math.random()*gameSize.y), fire.width, fire.height);
      canvas.drawImage(fire, Math.floor(Math.random()*gameSize.x), Math.floor(Math.random()*gameSize.y), fire.width, fire.height);
      }
    else if(self.randomNumber > 95){
      //leaf wind
      raining = false;
      if(companion.type === "grass" || companion.type === "flying"){
        companion.damageMod = 2;
      }
      canvas.drawImage(leaf, Math.floor(Math.random()*gameSize.x), Math.floor(Math.random()*gameSize.y), leaf.width, leaf.height);
      canvas.drawImage(leaf, Math.floor(Math.random()*gameSize.x), Math.floor(Math.random()*gameSize.y), leaf.width, leaf.height);
      canvas.drawImage(leaf, Math.floor(Math.random()*gameSize.x), Math.floor(Math.random()*gameSize.y), leaf.width, leaf.height);
      canvas.drawImage(leaf, Math.floor(Math.random()*gameSize.x), Math.floor(Math.random()*gameSize.y), leaf.width, leaf.height);
      canvas.drawImage(leaf, Math.floor(Math.random()*gameSize.x), Math.floor(Math.random()*gameSize.y), leaf.width, leaf.height);
      canvas.drawImage(leaf, Math.floor(Math.random()*gameSize.x), Math.floor(Math.random()*gameSize.y), leaf.width, leaf.height);
      canvas.drawImage(leaf, Math.floor(Math.random()*gameSize.x), Math.floor(Math.random()*gameSize.y), leaf.width, leaf.height);
      canvas.drawImage(leaf, Math.floor(Math.random()*gameSize.x), Math.floor(Math.random()*gameSize.y), leaf.width, leaf.height);
      canvas.drawImage(leaf, Math.floor(Math.random()*gameSize.x), Math.floor(Math.random()*gameSize.y), leaf.width, leaf.height);
      canvas.drawImage(leaf, Math.floor(Math.random()*gameSize.x), Math.floor(Math.random()*gameSize.y), leaf.width, leaf.height);
      canvas.drawImage(leaf, Math.floor(Math.random()*gameSize.x), Math.floor(Math.random()*gameSize.y), leaf.width, leaf.height);
      canvas.drawImage(leaf, Math.floor(Math.random()*gameSize.x), Math.floor(Math.random()*gameSize.y), leaf.width, leaf.height);
      canvas.drawImage(leaf, Math.floor(Math.random()*gameSize.x), Math.floor(Math.random()*gameSize.y), leaf.width, leaf.height);
      canvas.drawImage(leaf, Math.floor(Math.random()*gameSize.x), Math.floor(Math.random()*gameSize.y), leaf.width, leaf.height);
      canvas.drawImage(leaf, Math.floor(Math.random()*gameSize.x), Math.floor(Math.random()*gameSize.y), leaf.width, leaf.height);
      canvas.drawImage(leaf, Math.floor(Math.random()*gameSize.x), Math.floor(Math.random()*gameSize.y), leaf.width, leaf.height);
      canvas.drawImage(leaf, Math.floor(Math.random()*gameSize.x), Math.floor(Math.random()*gameSize.y), leaf.width, leaf.height);
      canvas.drawImage(leaf, Math.floor(Math.random()*gameSize.x), Math.floor(Math.random()*gameSize.y), leaf.width, leaf.height);
      }
      else if(self.randomNumber > 85){
        if(companion.type === "water"){
          companion.damageMod = 2;
        }
        //Raining
        raining = true;
        canvas.drawImage(water, Math.floor(Math.random()*gameSize.x), Math.floor(Math.random()*gameSize.y), water.width, water.height);
        canvas.drawImage(water, Math.floor(Math.random()*gameSize.x), Math.floor(Math.random()*gameSize.y), water.width, water.height);
        canvas.drawImage(water, Math.floor(Math.random()*gameSize.x), Math.floor(Math.random()*gameSize.y), water.width, water.height);
        canvas.drawImage(water, Math.floor(Math.random()*gameSize.x), Math.floor(Math.random()*gameSize.y), water.width, water.height);
        canvas.drawImage(water, Math.floor(Math.random()*gameSize.x), Math.floor(Math.random()*gameSize.y), water.width, water.height);
        canvas.drawImage(water, Math.floor(Math.random()*gameSize.x), Math.floor(Math.random()*gameSize.y), water.width, water.height);
        canvas.drawImage(water, Math.floor(Math.random()*gameSize.x), Math.floor(Math.random()*gameSize.y), water.width, water.height);
        canvas.drawImage(water, Math.floor(Math.random()*gameSize.x), Math.floor(Math.random()*gameSize.y), water.width, water.height);
        canvas.drawImage(water, Math.floor(Math.random()*gameSize.x), Math.floor(Math.random()*gameSize.y), water.width, water.height);
        canvas.drawImage(water, Math.floor(Math.random()*gameSize.x), Math.floor(Math.random()*gameSize.y), water.width, water.height);
        canvas.drawImage(water, Math.floor(Math.random()*gameSize.x), Math.floor(Math.random()*gameSize.y), water.width, water.height);
        canvas.drawImage(water, Math.floor(Math.random()*gameSize.x), Math.floor(Math.random()*gameSize.y), water.width, water.height);
        canvas.drawImage(water, Math.floor(Math.random()*gameSize.x), Math.floor(Math.random()*gameSize.y), water.width, water.height);
        canvas.drawImage(water, Math.floor(Math.random()*gameSize.x), Math.floor(Math.random()*gameSize.y), water.width, water.height);
        canvas.drawImage(water, Math.floor(Math.random()*gameSize.x), Math.floor(Math.random()*gameSize.y), water.width, water.height);
        canvas.drawImage(water, Math.floor(Math.random()*gameSize.x), Math.floor(Math.random()*gameSize.y), water.width, water.height);
        canvas.drawImage(water, Math.floor(Math.random()*gameSize.x), Math.floor(Math.random()*gameSize.y), water.width, water.height);
        canvas.drawImage(water, Math.floor(Math.random()*gameSize.x), Math.floor(Math.random()*gameSize.y), water.width, water.height);
        }
        else{
        raining = false;
        }


    // if(window.innerWidth > 500){
    // }






  }
}
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
    var d1 = Math.floor(Math.random()*1000+1);
    if(d1 === 1000){return "charizard";}
    if(d1 > 950 && raining === true){return "articuno";}
    if(d1 > 950 && noon === true){return "mewtwo";}
      else if(d1 > 975){return "arcanine";
      }else if(d1 > 950){return "lapras";
      }else if(d1 > 900){return "nidoking";
      }else if(d1 > 875){return "charmander";
      }else if(d1 > 850){return "bulbasaur";
      }else if(d1 > 825){return "squirtle";
      }else if(d1 > 800){return "growlithe";
      }else if(d1 > 775){return "machamp";
      }else if(d1 > 750){return "scyther";
      }else if(d1 > 700){return "pikachu";
      }else if(d1 > 650){return "eevee";
      }else if(d1 > 600){return "cubone";
      }else if(d1 > 500){return "vulpix";
      }else if(d1 > 400){return "venonat";
      }else if(d1 > 300){return "pidgey";
      }else if(d1 > 200){return "pidgey";
      }else if(d1 > 100){return "zubat";
      }else if(d1 > 0){return "rattata";}
  };
  var self = this;
  this.name = this.randomName();
    //STATS
    self.speed = .5;
    self.damage = 1;
    self.hp = 100;
    self.expValue = 1;
    self.sizeMod = 0;
    //END
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
  this.loseHp = function(damage){
    damage = companion.damage + companion.damageMod;
    if(self.type === "fire" && companion.type === "water"){
      damage = damage *2;
      self.hp = self.hp - damage;
      special.play();
    }
    else if(self.type === "fire" && companion.type === "ground"){
      damage = damage *2;
      self.hp = self.hp - damage;
      special.play();
    }
    else if(self.type === "fire" && companion.type === "grass"){
      damage = damage /2;
      self.hp = self.hp - damage;
      hitX.play();
    }
////////////////////////////////////////////////////////    ////////////////////////////////////////////////////////
    else if(self.type === "water" && companion.type === "grass"){
      damage = damage *2;
      self.hp = self.hp - damage;
      special.play();
    }
    else if(self.type === "water" && companion.type === "electric"){
      damage = damage *2;
      self.hp = self.hp - damage;
      special.play();
    }
    else if(self.type === "water" && companion.type === "fire"){
      damage = damage /2;
      self.hp = self.hp - damage;
      hitX.play();
    }
        ////////////////////////////////////////////////////////    ////////////////////////////////////////////////////////
    else if(self.type === "grass" && companion.type === "fire"){
      damage = damage *2;
      self.hp = self.hp - damage;
      special.play();
    }
    else if(self.type === "grass" && companion.type === "poison"){
      damage = damage *2;
      self.hp = self.hp - damage;
      special.play();
    }
    else if(self.type === "grass" && companion.type === "flying"){
      damage = damage *2;
      self.hp = self.hp - damage;
      special.play();
    }
    else if(self.type === "grass" && companion.type === "water"){
      damage = damage /2;
      self.hp = self.hp - damage;
      hitX.play();
    }
        ////////////////////////////////////////////////////////    ////////////////////////////////////////////////////////
    else if(self.type === "poison" && companion.type === "ground"){
      damage = damage *2;
      self.hp = self.hp - damage;
      special.play();
    }
    else if(self.type === "poison" && companion.type === "fire"){
      damage = damage *2;
      self.hp = self.hp - damage;
      special.play();
    }
    else if(self.type === "poison" && companion.type === "grass"){
      damage = damage /2;
      self.hp = self.hp - damage;
      hitX.play();
    }
        ////////////////////////////////////////////////////////    ////////////////////////////////////////////////////////
    else if(self.type === "ice" && companion.type === "fire"){
      damage = damage *2;
      self.hp = self.hp - damage;
      special.play();
    }
    else if(self.type === "ice" && companion.type === "fighting"){
      damage = damage *2;
      self.hp = self.hp - damage;
      special.play();
    }
    else if(self.type === "ice" && companion.type === "water"){
      damage = damage /2;
      self.hp = self.hp - damage;
      hitX.play();
    }
        ////////////////////////////////////////////////////////    ////////////////////////////////////////////////////////
    else if(self.type === "ground" && companion.type === "ice"){
      damage = damage *2;
      self.hp = self.hp - damage;
      special.play();
    }
    else if(self.type === "ground" && companion.type === "grass"){
      damage = damage *2;
      self.hp = self.hp - damage;
      special.play();
    }
    else if(self.type === "ground" && companion.type === "water"){
      damage = damage *2;
      self.hp = self.hp - damage;
      special.play();
    }
    else if(self.type === "ground" && companion.type === "fire"){
      damage = damage /2;
      self.hp = self.hp - damage;
      hitX.play();
    }
    else if(self.type === "ground" && companion.type === "flying"){
      damage = damage /2;
      self.hp = self.hp - damage;
      hitX.play();
    }
        ////////////////////////////////////////////////////////    ////////////////////////////////////////////////////////
    else if(self.type === "fighting" && companion.type === "flying"){
      damage = damage *2;
      self.hp = self.hp - damage;
      special.play();
    }
        ////////////////////////////////////////////////////////    ////////////////////////////////////////////////////////
    else if(self.type === "flying" && companion.type === "electric"){
      damage = damage *2;
      self.hp = self.hp - damage;
      special.play();
    }
    else if(self.type === "flying" && companion.type === "grass"){
      damage = damage /2;
      self.hp = self.hp - damage;
      hitX.play();
    }
        ////////////////////////////////////////////////////////    ////////////////////////////////////////////////////////
        else if(self.type === "electric" && companion.type === "ground"){
          damage = damage *2;
          self.hp = self.hp - damage;
          special.play();
        }
        else if(self.type === "electric" && companion.type === "grass"){
          damage = damage /2;
          self.hp = self.hp - damage;
          hitX.play();
        }
            ////////////////////////////////////////////////////////    ////////////////////////////////////////////////////////
    else{
      self.hp = self.hp - damage;
      hit.play();
    }
  }
  //////////////////////////////////////////////////
  /////////MOB UPDATE///////////////////////////////
  this.updateObject = function(){
    if(self.first === true){
      self.first = false;
      if(self.name === "zubat"){self.speed = .7;self.damage = .3;self.hp = 130;self.expValue = 1;self.sizeMod = -3;self.type = "poison";
      }else if(self.name === "venonat"){self.speed = .1;self.damage = .5;self.hp = 160;self.expValue = 1;self.sizeMod = 0;self.type = "poison";
      }else if(self.name === "rattata"){self.speed = .2;self.damage = .2;self.hp = 170;self.expValue = 1;self.sizeMod = 0;self.type = "poison";
      }else if(self.name === "pidgey"){self.speed = .4;self.damage = .4;self.hp = 150;self.expValue = 1;self.sizeMod = 0;self.type = "flying";
      }else if(self.name === "lapras"){self.speed = .1;self.damage = .5;self.hp = 300;self.expValue = 1;self.sizeMod = 10;self.type = "water";
      }else if(self.name === "nidoking"){self.speed = .1;self.damage = 2.7;self.hp = 250;self.expValue = 1;self.sizeMod = 10;self.type = "poison";
      }else if(self.name === "scyther"){self.speed = .5;self.damage = 3;self.hp = 150;self.expValue = 1;self.sizeMod = 5;self.type = "grass";
      }else if(self.name === "eevee"){self.speed = .4;self.damage = 1;self.hp = 180;self.expValue = 1;self.sizeMod = 0;self.type = "ground";
      }else if(self.name === "charmander"){self.speed = .3;self.damage = 1;self.hp = 180;self.expValue = 1;self.sizeMod = 0;self.type = "fire";
      }else if(self.name === "pikachu"){self.speed = .3;self.damage = 1;self.hp = 180;self.expValue = 1;self.sizeMod = -3;self.type = "electric";
      }else if(self.name === "growlithe"){self.speed = .6;self.damage = 1.2;self.hp = 200;self.expValue = 1;self.sizeMod = 0;self.type = "fire";
      }else if(self.name === "arcanine"){self.speed = .4;self.damage = 3;self.hp = 300;self.expValue = 1;self.sizeMod = +5;self.type = "fire";
      }else if(self.name === "cubone"){self.speed = .1;self.damage = 1.5;self.hp = 180;self.expValue = 1;self.sizeMod = 0;self.type = "ground";
      }else if(self.name === "machamp"){self.speed = .2;self.damage = 5;self.hp = 200;self.expValue = 1;self.sizeMod = +10;self.type = "fighting"
      }else if(self.name === "vulpix"){self.speed = .3;self.damage = 1.3;self.hp = 180;self.expValue = 1;self.sizeMod = 1;self.type = "fire";
      }else if(self.name === "bulbasaur"){self.speed = .6;self.damage = 1.5;self.hp = 180;self.expValue = 1;self.sizeMod = 0;self.type = "grass";
      }else if(self.name === "squirtle"){self.speed = .6;self.damage = 1.5;self.hp = 180;self.expValue = 1;self.sizeMod = 0;self.type = "water";
      }else if(self.name === "charizard"){self.speed = .3;self.damage = 5;self.hp = 300;self.expValue = 1;self.sizeMod = 10;self.type = "fire";
      }else if(self.name === "articuno"){self.speed = 1.3;self.damage = 3;self.hp = 500;self.expValue = 1;self.sizeMod = 15;self.type = "ice";self.x = gameSize.x/2; self.y = gameSize.y/2;
      }else if(self.name === "mewtwo"){self.speed = .1;self.damage = 10;self.hp = 1000;self.expValue = 1;self.sizeMod = 15;self.type = "psychic";self.x = gameSize.x/2; self.y = gameSize.y/2;
      }
    }
    var img = <HTMLImageElement>document.getElementById(this.name + "-" + this.action + "-" + this.direction + "-" + this.frame);
    self.rightSide = self.x + (img.width+self.sizeMod)/2+1;
    self.leftSide = self.x - (img.width+self.sizeMod)/2+1;
    self.topSide =  self.y - (img.height+self.sizeMod)/2+1;
    self.bottomSide = self.y + (img.height+self.sizeMod)/2+1;
    canvas.drawImage(img, this.x-(img.width+self.sizeMod)/2, this.y-(img.height+self.sizeMod)/2, img.width+self.sizeMod, img.height+self.sizeMod);
    if(this.dead === true){
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
        companion.levelUp(self.expValue);
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
      if(self.name === "scyther" || self.name === "nidoking" || self.name === "machamp" || self.name === "mewtwo"){
        if(self.x+120 > trainer.x &&
          self.x-120 < trainer.x &&
          self.y-120 < trainer.y &&
          self.y+120 > trainer.y){
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
          }
      }
      if(self.x+50 > companion.x &&
          self.x-50 < companion.x &&
          self.y-50 < companion.y &&
          self.y+50 > companion.y &&
          companion.dead === false){
            if(self.topSide >= companion.bottomSide){
              self.direction = "up";
            }
            else if(self.rightSide <= companion.leftSide){
              self.direction = "right";
            }
            else if(self.leftSide >= companion.rightSide){
              self.direction = "left";
            }
            else if(self.bottomSide <= companion.topSide){
              self.direction = "down";
            }
          }
      if(self.rightSide > companion.leftSide &&
      self.leftSide < companion.rightSide &&
      self.topSide < companion.bottomSide &&
      self.bottomSide > companion.topSide &&
      companion.dead === false){
        self.attack = true;
        companion.loseHp(this.damage);
        if(companion.direction === "up"){
          self.direction = "down";
        }else if(companion.direction === "down"){
          self.direction = "up";
        }else if(companion.direction === "right"){
          self.direction = "left";
        }else if(companion.direction === "left"){
          self.direction = "right";
        }
      }
      else if(self.rightSide > trainer.leftSide &&
        self.leftSide < trainer.rightSide &&
        self.topSide < trainer.bottomSide &&
        self.bottomSide > trainer.topSide &&
        trainer.dead === false){
          self.action = "attacking";
          trainer.hp -= this.damage;
        }
      else{
        self.attack = false;
      }
      if(self.attack=== true){
        return;
      }
      if (this.directionCount === 0) {
        this.directionCount = Math.floor(Math.random()*500 + 100);;
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
///////////////////////////////COMPANION///////////////////////////////////////////////////////////////////////
//COMPANION Object
////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////COMPANION///////////////////////////////////////////////////////////////////////
//COMPANION Object
////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////COMPANION///////////////////////////////////////////////////////////////////////
//COMPANION Object
////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////COMPANION///////////////////////////////////////////////////////////////////////
//COMPANION Object
////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function followObject(){
  var self = this;
  this.name = randomName();
  // this.name = "pikachu";
  this.hpbar = document.getElementById("companion-hpbar");
  //STATS//
  self.hpbar.max = 100;
  self.damage = .3;
  //End Stats//
  this.action = "walking";
  this.direction = "down";
  this.frame = "one";
  this.spriteChange = 0;
  this.x = gameSize.x/2 - 50;
  this.y = gameSize.y/2 - 50;
  this.followChange = 0;
  this.hpRegen = 0;
  this.attack = false;
  this.sic = false;
  this.dead = false;
  this.speed = 3;
  this.damageMod = 0;
  this.sizeMod = -3;
  this.type = "normal";
  this.exp = 1;
  this.first = true;
  self.ball = false;
  this.levelUp = function(expValue){
    self.attack = false;
    self.sic = false;
    self.exp += expValue;
      self.hpbar.max += 5;
      self.sizeMod += .4;
      if(self.damageMod < 2){
        self.damageMod += .1;
      }
  }
  this.loseHp = function(damage){
    if(self.hpbar.value > 0){
      self.hpbar.value = self.hpbar.value - damage;
      hit.play();
    }else{
      self.dead = true;
    }
  }
  this.regen = function(){
    if(self.attack === false){
      if(self.hpbar.value < self.hpbar.max){
        companion.hpbar.value += companion.hpbar.max * 0.01;
      }
    }
  }
  function randomName(){
    var d1 = Math.floor(Math.random()*100+1);
        if(d1 > 95){
          return "lapras";
        }else if(d1 > 90){
          return "pidgey";
        }else if(d1 > 80){
          return "charmander";
        }else if(d1 > 70){
          return "squirtle";
        }else if(d1 > 60){
          return "squirtle";
        }else if(d1 > 50){
          return "squirtle";
        }else if(d1 > 40){
          return "bulbasaur";
        }else if(d1 > 30){
          return "bulbasaur";
        }else if(d1 > 0){
          return "pikachu";
        }
    };
  this.updateObject = function(){
    if(self.ball === true){
      return;
    }
    ///growlithe EVOLUTION/////////////////////
          if(self.name === "growlithe"){
            if(self.exp > 25){
            // levelupsound.play();
              self.name = "arcanine";
            }
          }
      ///charmander EVOLUTION/////////////////////
      if(self.name === "charmander"){
        if(self.exp > 15){
        // levelupsound.play();
          self.name = "charmeleon";
        }
      }
      if(self.name === "charmeleon" || self.name === "charmander"){
        if(self.exp > 35){
        // levelupsound.play();
          self.name = "charizard";
        }
      }

      ///squirtle EVOLUTION/////////////////////
      if(self.name === "squirtle"){
        if(self.exp > 15){
        // levelupsound.play();
          self.name = "wartortle";
        }
      }
      if(self.name === "wartortle" || self.name === "squirtle"){
        if(self.exp > 35){
        // levelupsound.play();
          self.name = "blastoise";
        }
      }
      ///Pidgey EVOLUTION/////////////////////
      if(self.name === "pidgey"){
        if(self.exp > 15){
        // levelupsound.play();
          self.name = "pidgeotto";
        }
      }
      if(self.name === "pidgeotto" || self.name === "pidgey"){
        if(self.exp > 35){
        // levelupsound.play();
          self.name = "pidgeot";
        }
      }
      //////////////////////////////////////////////////////////////
      ///////////////TYPES
      //////////////////////////////////////////////////////////////
      if(self.name === "charmander" || self.name === "charmeleon" || self.name === "charizard" || self.name === "vulpix" || self.name === "arcanine" || self.name === "growlithe"){
        self.type = "fire";
      }
      if(self.name === "rattata" || self.name === "venonat" || self.name === "zubat" || self.name === "nidoking"){
        self.type = "poison";
      }
      if(self.name === "squirtle" || self.name === "wartortle" || self.name === "blastoise" || self.name === "lapras"){
        self.type = "water";
      }
      if(self.name === "bulbasaur" || self.name === "scyther"){
        self.type = "grass";
      }
      if(self.name === "pikachu"){
        self.type = "electric";
      }
      if(self.name === "machamp"){
        self.type = "fighting";
      }
      if(self.name === "pidgey" || self.name === "pidgeotto" || self.name === "pidgeot"){
        self.type = "flying";
      }
      if(self.name === "cubone" || self.name === "eevee"){
        self.type = "ground";
      }
      if(self.name === "articuno"){
        self.type = "ice";
      }

    document.getElementById("lvl").innerHTML = companion.exp;
    var img = <HTMLImageElement>document.getElementById(this.name + "-" + this.action + "-" + this.direction + "-" + this.frame);
    self.rightSide = self.x + (img.width+self.sizeMod)/2+1;
    self.leftSide = self.x - (img.width+self.sizeMod)/2+1;
    self.topSide =  self.y - (img.height+self.sizeMod)/2+1;
    self.bottomSide = self.y + (img.height+self.sizeMod)/2+1;
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


if(self.sic === true){
  bodies.forEach(function(body){
    if(body instanceof PokemonObject){
        if((body as any).dead === true){
          return;
        }
        if(self.rightSide > (body as any).leftSide &&
          self.leftSide < (body as any).rightSide &&
          self.topSide < (body as any).bottomSide &&
          self.bottomSide > (body as any).topSide){
            self.attack = true;
            (body as any).loseHp(self.damage);
            if((body as any).direction === "up"){
              self.direction = "down";
            }else if((body as any).direction === "down"){
              self.direction = "up";
            }else if((body as any).direction === "right"){
              self.direction = "left";
            }else if((body as any).direction === "left"){
              self.direction = "right";
            }
        }
      }
  });
  self.speed = 4.2;
  // cry.play();
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
  self.speed = 2.8;
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
    self.frame = "two";
    return;
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
  this.updateObject = function(){
    document.getElementById("caught").innerHTML = self.caught;
    var img = <HTMLImageElement>document.getElementById(this.name + "-" + this.action + "-" + this.direction + "-" + this.frame);
    self.rightSide = self.x + (img.width+self.sizeMod)/3+1;
    self.leftSide = self.x - (img.width+self.sizeMod)/3+1;
    self.topSide =  self.y - (img.height+self.sizeMod)/3+1;
    self.bottomSide = self.y + (img.height+self.sizeMod)/3+1;
    canvas.drawImage(img, this.x-(img.width+self.sizeMod)/2, this.y-(img.height+self.sizeMod)/2, img.width+self.sizeMod, img.height+self.sizeMod);
    if(this.hp < 0){
      this.dead = true;
      this.action = "dead";
      this.direction = "down";
      this.frame = "one";
      return;
    }

      if(self.rightSide > companion.leftSide &&
        self.leftSide < companion.rightSide &&
        self.topSide < companion.bottomSide &&
        self.bottomSide > companion.topSide){
          companion.regen();
        }

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
    if(companion.dead === true || companion.attack === true){
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
          if(body instanceof landScape || body instanceof PokemonObject || body instanceof caughtBallObject){
            removeBody((body as any));
            }
        });
        bodies.push(new landScape());
        // bodies.push(new fruitObject());
        newPokemon();
        newPokemon();
        newPokemon();
        this.x = 0 + (img.width/2) +1;
        companion.x = 0 +1;
        daycycle++;
    } else if (this.x < 0) {
        bodies.forEach(function(body){
          if(body instanceof landScape || body instanceof PokemonObject || body instanceof caughtBallObject){
            removeBody((body as any));
            }
        });
        bodies.push(new landScape());
        // bodies.push(new fruitObject());
        newPokemon();
        newPokemon();
        newPokemon();
        this.x = gameSize.x-1;
        companion.x = gameSize.x-1;
        daycycle++;
    }else if(this.y > gameSize.y) {
      bodies.forEach(function(body){
        if(body instanceof landScape || body instanceof PokemonObject || body instanceof caughtBallObject){
          removeBody((body as any));
          }
      });
      bodies.push(new landScape());
      // bodies.push(new fruitObject());
      newPokemon();
      newPokemon();
      newPokemon();
        this.y = 0 + (img.width/2) + 1;
        companion.y = 0 + (img.width/2) + 1;
        daycycle++;
    } else if (this.y < 0) {
      bodies.forEach(function(body){
        if(body instanceof landScape || body instanceof PokemonObject || body instanceof caughtBallObject){
          removeBody((body as any));
          }
        });
      bodies.push(new landScape());
      // bodies.push(new fruitObject());
      newPokemon();
      newPokemon();
      newPokemon();
        this.y = gameSize.y - (img.height/2)-1;
        companion.y = gameSize.y - (img.height/2)-1;
        daycycle++;
    }
  };  //end of updateObject()
};   //end of TrainerObject()
///////////////////////////////////////////////////////////////////////////////////////////////////
//STEP 4 Run all updateObjects from Step 2 on an interval
  window.setInterval(function(){(updateAllObjects())}, 20);
  window.setInterval(function(){(newPokemon())}, 8000);
}//end onInt
}//end screen class


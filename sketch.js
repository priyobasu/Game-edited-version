var bg
var girl1,girl2,coin1,obstacle2,obstacle3,obstacle4,obstacle5,obstacle6,road;
var road1;
var invisibleGround;
var sign,restart,gameOver,pit,pit2,tree;
var gameState="start";
var groupObstacles,groupCoins;
var restartIMG,gameOverIMG;
var coinSound,obstacleSound
var score=0;
var gameName,developerName,start;
var title,name1,button;

function setup() {
  createCanvas(800,400);
  road1=createSprite(400,200)
  road1.addImage(road)
  road1.scale=1.30
  girl_1=createSprite(70,270)
  girl_1.addAnimation("girl",girl1)
  girl_1.addAnimation("falling",girl2)
  girl_1.scale=0.4
  invisibleGround=createSprite(400,370,800,20)
  invisibleGround.visible=false
  groupCoins = createGroup();
  groupObstacles = createGroup();
  gameOver = createSprite(400,100);
  gameOver.addImage(gameOverIMG);
  restart = createSprite(400,200);
  restart.addImage(restartIMG);
  gameOver.scale = 0.4;
  restart.scale = 0.2;
  title=createSprite(400,50)
  title.addImage(gameName)
  title.scale=0.5
  title.visible=false;
  name1=createSprite(400,150)
  name1.addImage(developerName)
  name1.scale=0.4
  name1.visible=false;
  button=createSprite(400,300)
  button.addImage(start)
  button.scale=0.4
  button.visible=false;
}

function preload(){
  girl1=loadAnimation("girl_1.png","girl_2.png","girl_3.png")
  girl2=loadAnimation("girl_4.png")
  coin1=loadImage("coin.png")
  obstacle3=loadImage("obstacle3.png")
  sign=loadImage("sign.png")
  road=loadImage("road.png")
  gameOverIMG=loadImage("gameOver.png")
  restartIMG=loadImage("restart.png")
  pit=loadImage("pit.png")
  pit2=loadImage("pit2.png")
  tree=loadImage("tree.png")
  coinSound = loadSound("coin.wav")
  obstacleSound = loadSound("obstacle.wav")
  gameName=loadImage("game name.png")
  developerName=loadImage("developer name.png")
  start=loadImage("start.png")

}

function draw() {
  background("red"); 
  console.log(girl_1.y)
  if(gameState==="start"){
    title.visible=true;
    name1.visible=true;
    button.visible=true;
    girl_1.visible=false;
    gameOver.visible=false;
    restart.visible=false;
    if(mousePressedOver(button)){
      gameState="play"
      girl_1.visible=true;
    }
  }

  if(gameState==="play"){
    road1.velocityX=-(9+3* score/200);
    if (road1.x < 0){
      road1.x = road1.width/2;
    }
    if(keyDown("UP_ARROW")&& girl_1.y>=280) {
      girl_1.velocityY = -25;
  }
  girl_1.velocityY = girl_1.velocityY + 0.8
  spawnCoins()
  spawnObstacles() 
  if(girl_1.isTouching (groupObstacles)){
    gameState="end"
    obstacleSound.play()
  }
  for (var a = 0; a < groupCoins.length; a++) {
    if (girl_1.isTouching(groupCoins.get(a))) {
    groupCoins.get(a).destroy();
    score=score+20;
    coinSound.play()
     }
    }
    gameOver.visible = false;
    restart.visible = false;
    title.visible=false;
    name1.visible=false;
    button.visible=false;
  }
  

 if(gameState==="end"){
  road1.velocityX=0
  groupCoins.setVelocityXEach(0)
  groupObstacles.setVelocityXEach(0); 
  groupObstacles.setLifetimeEach(-1);
  groupCoins.setLifetimeEach(-1);
  girl_1.changeAnimation("falling",girl2)
  gameOver.visible = true;
  restart.visible = true;
  groupCoins.destroyEach()
  groupObstacles.destroyEach()
  if(mousePressedOver(restart)){
    reset();
  }
}
girl_1.collide(invisibleGround);
  drawSprites();
  fill("yellow")
  textSize(20)
  text("Score "+score,700,50)
}


function spawnCoins() {
  
  //write code here to spawn the clouds
 if (frameCount % 120 === 0) {
    var coin = createSprite(800,120,40,10);
    coin.y = Math.round(random(80,120));
    coin.addImage(coin1);
    coin.scale = 0.5;
    coin.velocityX = -(3+score/200);
    
     //assign lifetime to the variable
    coin.lifetime = 500;
    
    //adjust the depth
   // cloud.depth = trex.depth;
    //trex.depth = trex.depth + 1;
    
    //add each cloud to the group
    //cloudsGroup.add(cloud);
    groupCoins.add(coin);
  }
}

function spawnObstacles(){
 
  if (frameCount % 220 === 0){
    var obstacle = createSprite(750,320,10,10);
    obstacle.velocityX= -(6+score/200);
     //generate random obstacles
     var rand = Math.round(random(1,5));
     switch(rand) {
       case 1: obstacle.addImage(pit);
       obstacle.scale=0.1
               break;
       case 2: obstacle.addImage(pit2);
       obstacle.scale=0.1
               break;
       case 3: obstacle.addImage(sign);
       obstacle.scale=0.1
               break;
       case 4: obstacle.addImage(obstacle3);
       obstacle.scale=0.1
               break;
       case 5: obstacle.addImage(tree);
       obstacle.scale=0.1
               break;
       default: break;
     }
    
     //assign scale and lifetime to the obstacle           
     obstacle.scale = 0.3;
     obstacle.lifetime = 400;
     groupObstacles.add(obstacle);
    

  }
 }
 function reset()
{
  restart.visible=false ;
  gameOver.visible=false ;
  gameState= "play";
  score=0;
  girl_1.changeAnimation("girl",girl1)
  girl_1.setCollider("rectangle",0,0,100,380);
}
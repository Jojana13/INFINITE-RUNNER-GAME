var PLAY = 1;
var END = 0;
var gameState= PLAY;
var score=0;
var gameOverImg, restartImg;
var gameOver, restart;

var witch, girl, coins, bg;
var witchImg,girlImg, coinImg, bgImg;
var coinGroup, rockGroup;
var spookyMusic;
var invisibleGround;
var rock, rockImg;


function preload(){
  witchImg = loadImage("Witch.png");
  girlImg = loadAnimation("Girl_running1.png","girl_running_2.png");
  coinImg = loadImage("Coin.png");
  spookyMusic = loadSound("spooky.wav");
  bgImg = loadImage("scary.jpg");
  rockImg = loadImage("rock.png");
  gameOverImg = loadImage("gameOver.png");
  restartImg = loadImage("restart.png");

}

function setup() {
    createCanvas(900,500);
    spookyMusic.loop();

bg = createSprite(450,250);
bg.addImage("background",bgImg);
bg.scale = 1;


girl = createSprite(250,400,20,50);
girl.addAnimation("running",girlImg);
girl.scale = 0.6;

witch = createSprite(50,400,20,50);
witch.addImage(witchImg);
witch.scale = 0.5;

  gameOver = createSprite(300,100);
  gameOver.addImage(gameOverImg);
  
  restart = createSprite(300,140);
  restart.addImage(restartImg);
  
  gameOver.scale = 0.5;
  restart.scale = 0.5; 

invisibleGround = createSprite(200,480,900,10);
invisibleGround.visible = false;

coinGroup = createGroup();
rockGroup = createGroup();
 
}

function draw() {
background(255);

  if(gameState === PLAY){
    //move the bg
    bg.velocityX = -4;
    //scoring
  if (girl.isTouching(coinGroup)){
    score = score+1;
  }
  if (girl.isTouching(rockGroup)){
    gameState=END
  }
  gameOver.visible = false
    restart.visible = false

    if (bg.x < 225){
      bg.x = width/2;
    }

    if(keyDown("space")&& girl.y >=100) {
    girl.velocityY = -13
  }

  girl.velocityY = girl.velocityY +  0.8 ; 
  if(coinGroup.isTouching(girl)){
    score=+1;
}
}

if(mousePressedOver(restart)) {
  reset();  
}
spawnCoins();
spawnRocks();
  
if (gameState === END) {
  bg.velocityX=0;
  girl.velocityY=0;
  gameOver.visible = true;
  restart.visible = true;
  coinGroup.setVelocityXEach(0);
  coinGroup.setLifetimeEach(-1);
  rockGroup.setVelocityXEach(0);
  rockGroup.setLifetimeEach(-1);
  rockGroup.destroyEach();
  coinGroup.destroyEach();
}


girl.collide(invisibleGround);
drawSprites();
fill("red");
textSize(25);
text("Score:"+score, 600,100);
}

function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  coinGroup.destroyEach();
  rockGroup.destroyEach();
  girl.changeAnimation("running",girlImg);
  score = 0;


}

function spawnCoins() {
  //write code here to spawn the coins
   if (frameCount % 100 === 0) {
     coins = createSprite(700,Math.round(random(200,350)));
    coins.addImage(coinImg);
    coins.scale = 0.3;
    coins.velocityX = -3;
    
     //assign lifetime to the variable
    coins.lifetime = 140;
    
    //adjust the depth
    coins.depth = girl.depth;
    girl.depth = girl.depth + 1;
    
    //adding coins to the group
   coinGroup.add(coins);
    }
}
function spawnRocks() {
  //write code here to spawn the rocks
   if (frameCount % 120    === 0) {
     rock = createSprite(600,Math.round(random(350,450)));
    rock.addImage(rockImg);
    rock.scale = 0.2;
    rock.velocityX = -3;
    
     //assign lifetime to the variable
    rock.lifetime = 134;
    
    //adjust the depth
    rock.depth = girl.depth;
    girl.depth = girl.depth + 1;
    
    //adding rocks to the group
   rockGroup.add(rock);
    }
}
var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "PLAY"

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);
  spookySound.loop();
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;
  ghost = createSprite(300,300,10,10);
  ghost.scale=0.5;
  ghost.addImage(ghostImg);
  invisibleBlockGroup = new Group();
  doorsGroup = new Group(); 
  climbersGroup = new Group();
  
}

function spawnDoors(){
  if (frameCount%250===0){
    door = createSprite(200,-10);
    climber = createSprite(200,55);
    invisibleBlock = createSprite(200,60);
    invisibleBlock.width = climber.width;
    invisibleBlock.height = 2
    door.addImage(doorImg);
    climber.addImage(climberImg);
    door.x =Math.round(random(100,400));
    climber.x=door.x;
    invisibleBlock.x=door.x;
    door.velocityY = 1
    climber.velocityY = 1
    invisibleBlock.velocityY = 1
    door.lifetime=700
    climber.lifetime = 700
    invisibleBlock.lifetime = 700
    doorsGroup.add(door);
    climbersGroup.add(climber);
    invisibleBlockGroup.add(invisibleBlock);
    ghost.depth=door.depth
    ghost.depth+=1
    invisibleBlock.visible=false;
  }
}


function draw() {
  background(200);
  if (gameState = "PLAY"){ 
    if (keyDown("SPACE")){
      ghost.velocityY=-5
    }
    ghost.velocityY= ghost.velocityY+0.5
  
    if(keyDown("RIGHT_ARROW")){
      ghost.x=ghost.x+5
    }
  
    if(keyDown("LEFT_ARROW")){
      ghost.x=ghost.x-5
    }
   
    if (climbersGroup.isTouching(ghost)){
      ghost.velocityY=0
      LOAD
    }

  if (invisibleBlockGroup.isTouching(ghost)||ghost.y>600){
    ghost.destroy();
    gameState = "END"
  }

  if(tower.y > 400){
      tower.y = 300
    }
    spawnDoors();
    drawSprites();
  }

  if (gameState === "END"){
    textSize(40)
    fill("BLACK")
    text("GAME OVER",200,300);
    
  }
  
}

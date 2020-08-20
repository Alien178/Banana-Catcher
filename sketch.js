var monkey, monkey_walking;

var bananaGroup, bananaImage;

var stoneGroup, stoneImage;

var ground;

var score = 0;

var PlayButton, PlayButtonImage;

var restart, restartImage;

var START = 0;
var PLAY = 1;
var END = 2
var gameState = START;

function preload() {
  monkey_walking = loadAnimation("Monkey_01.png", "Monkey_02.png", "Monkey_03.png", "Monkey_04.png", "Monkey_05.png", "Monkey_06.png", "Monkey_07.png", "Monkey_08.png", "Monkey_09.png", "Monkey_10.png");

  bananaImage = loadImage("banana.png");

  stoneImage = loadImage("stone.png");

  PlayButtonImage = loadImage("monkey_head.png");

  restartImage = loadImage("sprite_0.png")

}

function setup() {
  createCanvas(400, 400);

  PlayButton = createSprite(200, 250);
  PlayButton.addAnimation("Play", PlayButtonImage);
  PlayButton.scale = 0.75;

  restart = createSprite(200, 175);
  restart.addAnimation("Restart", restartImage);
  restart.scale = 0.75;
  restart.visible = false;

  monkey = createSprite(50, 200);
  monkey.addAnimation("walking", monkey_walking);
  monkey.scale = 0.15;
  monkey.visible = false;

  ground = createSprite(200, 350, 800, 20);
  ground.x = ground.width / 2;
  ground.velocityX = 0;
  ground.visible = false;

  bananaGroup = new Group();
  stoneGroup = new Group();
}

function draw() {
  background("lightblue");
  monkey.collide(ground);

  if (gameState == START) {
    fill("black");
    textSize(40);
    text("Banana", 75, 100);
    text("Catcher", 175, 137.5);
    if (mousePressedOver(PlayButton)) {
      gameState = PLAY;
      ground.velocityX = -14;
      monkey.visible = true;
      ground.visible = true;
      PlayButton.visible = false
    }
  }

  if (gameState == PLAY) {
    fill("black");
    textSize(20);
    text("Banana Catched: " + score, 25, 50);
    monkey.velocityY = monkey.velocityY + 0.8;

    if (ground.x < 0) {
      ground.x = ground.width / 2;
    }

    if (keyWentDown("space")) {
      monkey.velocityY = -12;
    }

    if (monkey.isTouching(bananaGroup)) {
      score = score + 1
      bananaGroup.destroyEach();
    }

    if (monkey.isTouching(stoneGroup)) {
      gameState = END;
    }

    spawnBanana();
    spawnStone();

  }

  if (gameState == END) {
    fill("black");
    textSize(40);
    text("Game Over", 100, 100);
    ground.velocityX = 0;
    monkey.visible = false;
    ground.visible = false;
    PlayButton.visible = false
    bananaGroup.destroyEach();
    stoneGroup.destroyEach();
    restart.visible = true;

    if (mousePressedOver(restart)) {
      gameState = START
      ground.velocityX = 0;
      monkey.visible = false;
      ground.visible = false;
      PlayButton.visible = true
      bananaGroup.destroyEach();
      stoneGroup.destroyEach();
      restart.visible = false;
      score = 0;
    }
  }

  drawSprites();
}


function spawnBanana() {
  //write code here to spawn the clouds
  if (frameCount % 120 === 0) {
    var banana = createSprite(400, 275, 40, 10);
    banana.y = Math.round(random(135, 200));
    banana.addImage(bananaImage);
    banana.scale = 0.05;
    banana.velocityX = -3;

    //assign lifetime to the variable
    banana.lifetime = 200;

    //adjust the depth
    banana.depth = monkey.depth;

    //add each cloud to the group
    bananaGroup.add(banana);
  }

}

function spawnStone() {
  if (frameCount % 120 === 0) {
    var stone = createSprite(400, 325, 10, 40);
    stone.velocityX = -6;
    stone.setCollider("circle", 0, 0, 140);
    stone.addImage(stoneImage);

    //assign scale and lifetime to the obstacle 
    stone.depth = ground.depth + 1;
    stone.scale = 0.17;
    stone.lifetime = 300;
    //add each obstacle to the group
    stoneGroup.add(stone);
  }
}
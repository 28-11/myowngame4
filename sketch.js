var bg, bgImg
var bottomGround
var topGround
var balloon, balloonImg
var obsBottom1, obsBottom1Img, obsBottom2, obsBottom2Img, obsBottom3, obsBottom3Img;
var obsTop1, obsTop1Img, obsTop2, obsTop2Img;
var obsTopGroup, obsBottomGroup;
var gameOver, gameOverImg, restart, restartImg;

var PLAY = 1;
var END = 0;
var gameState = PLAY;
var score = 0;
var bonusGroup;

function preload() {
  bgImg = loadImage("assets/bg.png")

  balloonImg = loadImage("assets/aeroplane1.png")

  obsBottom1Img = loadImage("assets/obsBottom1.png");
  obsBottom2Img = loadImage("assets/obsBottom2.png");
  obsBottom3Img = loadImage("assets/obsBottom3.png");
  obsTop1Img = loadImage("assets/obsTop1.png");
  obsTop2Img = loadImage("assets/obsTop2.png");
  gameOverImg = loadImage("assets/gameOver.png");
  restartImg = loadImage("assets/restart.png");

}

function setup() {
  createCanvas(1500, 700);
  //background image
  bg = createSprite(750, 350, 12, 12);
  bg.addImage(bgImg);
  bg.scale = 1.5

  //creating top and bottom grounds
  bottomGround = createSprite(200, 700, 800, 20);
  bottomGround.visible = false;

  topGround = createSprite(200, 10, 800, 20);
  topGround.visible = false;

  //creating balloon     
  balloon = createSprite(100, 200, 20, 50);
  balloon.addAnimation("balloon", balloonImg);
  balloon.scale = 0.3;
  //balloon.debug = true;

  obsTopGroup = new Group();
  obsBottomGroup = new Group();
  bonusGroup = new Group();

  gameOver = createSprite(750, 300);
  gameOver.addImage(gameOverImg);
  gameOver.scale = 0.7;
  gameOver.visible = false;

  restart = createSprite(750, 350);
  restart.addImage(restartImg);
  restart.scale = 0.7;
  restart.visible = false;


}

function draw() {

  background("black");
  if (gameState === PLAY) {

    //making the hot air balloon jump
    if (keyDown("space")) {
      balloon.velocityY = -6;

    }

    //adding gravity
    balloon.velocityY = balloon.velocityY + 2;

    spawnObsTop();
    spawnObsBottom();
    bonus();

    if (obsTopGroup.isTouching(balloon) || obsBottomGroup.isTouching(balloon) || bottomGround.isTouching(balloon)) {
      gameState = END;
    }
  }


  if (gameState === END) {
    gameOver.visible = true;
    restart.visible = true;

    balloon.velocityX = 0;
    balloon.velocityY = 0;

    obsTopGroup.setVelocityXEach(0);
    obsBottomGroup.setVelocityXEach(0);

    obsBottomGroup.setLifetimeEach(-1);
    obsTopGroup.setLifetimeEach(-1);

    bonusGroup.setVelocityXEach(0);
    bonusGroup.setLifetimeEach(-1);

    if (mousePressedOver(restart)) {
      reset();
    }


  }


  balloon.collide(topGround);
  // balloon.collide(bottomGround);



  drawSprites();
  score1();

}


function spawnObsTop() {
  if (frameCount % 200 === 0) {
    obsTop = createSprite(1500, 100, 20, 20);
    obsTop.scale = 0.1;
    obsTop.velocityX = -2;
    obsTop.y = Math.round(random(0, 200));


    var rand = Math.round(random(1, 2))

    switch (rand) {
      case 1: obsTop.addImage("obsTopPic", obsTop1Img);
        break;
      case 2: obsTop.addImage("obsTopPic", obsTop2Img);
        break;
      default: break;
    }
    obsTop.lifetime = 750;
    obsTop.depth = balloon.depth;
    balloon.depth += 1;

    obsTopGroup.add(obsTop);



  }
}


function spawnObsBottom() {
  if (frameCount % 160 === 0) {
    obsBottom = createSprite(1500, 565, 20, 20);
    obsBottom.scale = 0.15;
    obsBottom.velocityX = -3;
    //obsBottom.y = Math.round(random(500, 700));


    var rand = Math.round(random(1, 3))

    switch (rand) {
      case 1: obsBottom.addImage("obsBottomPic1", obsBottom1Img);
        break;
      case 2: obsBottom.addImage("obsBottomPic2", obsBottom2Img);
        break;
      case 3: obsBottom.addImage("obsBottomPic3", obsBottom3Img);
        break;
      default: break;
    }
    obsBottom.lifetime = 750;
    obsBottom.depth = balloon.depth;
    balloon.depth += 1;

    obsBottomGroup.add(obsBottom);

  }
}

function reset() {
  gameState = PLAY;
  balloon.y = 100;
  restart.visible = false;
  gameOver.visible = false;
  obsTopGroup.destroyEach();
  obsBottomGroup.destroyEach();
  bonusGroup.destroyEach([0]);
  score = 0;

}

function bonus() {
  if (frameCount % 80 === 0) {
    var bonus = createSprite(1500, 20, 20, 20);
    bonus.y = Math.round(random(10, 600));
    bonus.velocityX = -4;
    bonus.lifetime = 500;
    bonus.depth = balloon.depth;
    balloon.depth += 1;

    bonusGroup.add(bonus);

  }
}

function score1() {


  if (bonusGroup.isTouching(balloon)) {
    score += 1;
    bonusGroup[0].destroy();


  }

  textSize(28);
  fill("black");
  text("Score:" + score, 1300, 50);


}


//if condition
//if(rand === 1)




var PLAY = 1;
var END = 0;
var gameState = PLAY;

var ground,groundImage,invisibleGround;
var monkey , monkeyImage;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;

var score = 0;

function preload(){
  //load images
monkeyImage =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  groundImage = loadImage("jungle.jpg")
  obstaceImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(500,500);

 //to create ground
  ground = createSprite(450,125,900,10);
  ground.velocityX = -3;
  ground.addImage(groundImage);
  ground.x = ground.width/2;
  ground.visible = "false";
  
  //to create monkey
  monkey = createSprite(80,350,20,20);
  monkey.addAnimation("moving",monkeyImage);
  monkey.scale = 0.1;
  
  //to create invisible ground
  invisibleGround = createSprite(80,385,900,10);
  invisibleGround.visible = false;
  //to create generate the radmon number
  var rand = Math.round(random(1,100));
  console.log (rand);
  
  //to create groups
  FoodGroup = new Group;
  obstacleGroup = new Group;
}


function draw() {
background(225);
  if(gameState === PLAY){
    
    //to repeat the background
  if (ground.x < 0){
    ground.x = ground.width/2;
  }
   
  //when the space key is pressed the monkey should jump
  if(keyDown("space")){
    monkey.velocityY = -12;
}
  
  //add gravity to monkey
  monkey.velocityY = monkey.velocityY + 0.8;
  
  //monkey should on ground
  monkey.collide(invisibleGround);
  
  //when food group is touching the size should increase
  if(FoodGroup.isTouching(monkey)){
    FoodGroup.destroyEach();
    score = score + 1 ;
    score = Math.round(random(10,40));
    switch(score){
      case 10 : monkey.scale = 0.12;
                break;
      case 20 : monkey.scale = 0.14;
                break;
      case 30 : monkey.scale = 0.16;
                break;
      case 40 : monkey.scale = 0.20;
                break;
                default: break;
    }
  }  
  
  //when obstacle group is touching the size should decrease
  if(obstacleGroup.isTouching(monkey)){
    monkey.scale = 0.1; 
    gameState = END;
  }
  //calling obstacles and food 
  food();
  obstacles();
  
  }
  else if(gameState === END){
    monkey.velocityY = 0;
    ground.velocityX = 0;
    FoodGroup.setVelocityXEach(0);
    obstacleGroup.setVelocityXEach(0);
    obstacleGroup.setLifetimeEach(-1);
    FoodGroup.setLifetimeEach(-1);
    
  }
  //to draw sprites
  drawSprites();
  
  //to create score
  stroke("white");
  textSize(20);
  fill("white");
  text("SCORE : " + score,390,40);
  
}

function food(){
  if(frameCount % 80 === 0){
    //banana.y = Math.round(random(120,200));
    banana = createSprite(400,150,20,20);
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -3;
    banana.lifetime = 110;
    
    FoodGroup.add(banana);
  }
}

function obstacles(){
  if(frameCount % 300 === 0){
  obstacle = createSprite(400,350,20,20);
  obstacle.addImage(obstaceImage);
  obstacle.scale = 0.1;
  obstacle.velocityX = -3;
  obstacle.lifetime = 150;
  
  obstacleGroup.add(obstacle);
  }
}


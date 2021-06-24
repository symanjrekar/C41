var canvas, backgroundImage;
var allPlayers;
var gState = 0;
var plCount;

var database;

var form, player, game;
var cars, car1,car2,car3,car4;
var track;
var xVel = 0, yVel = 0;

function preload()
{
  track = loadImage("../images/track.jpg");
  car1_img = loadImage("../images/car1.png");
  car2_img = loadImage("../images/car2.png");
  car3_img = loadImage("../images/car3.png");
  car4_img = loadImage("../images/car4.png");
  ground = loadImage("../images/ground.png");
}

function setup(){
  canvas = createCanvas(displayWidth - 20,displayHeight - 30);
  database = firebase.database();
  game = new Game();
  game.getState();
  game.start();
}


function draw()
{
  if(plCount === 4)
  {
    game.updateState(1);
  }
  if(gState === 1)
  {
    clear();
    game.play();
  }
  if(gState === 2)
  {
    game.end();
  }
}
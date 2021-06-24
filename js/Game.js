class Game {
  constructor(){

  }

  getState()
  {
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gState = data.val();
    })

  }

  updateState(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start()
  {
    if(gState === 0)
    {
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists())
      {
        plCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }

    car1 = createSprite(100,200);
    car1.addImage("car1",car1_img);
    car2 = createSprite(300,200);
    car2.addImage("car2",car2_img);
    car3 = createSprite(500,200);
    car3.addImage("car3",car3_img);
    car4 = createSprite(700,200);
    car4.addImage("car4",car4_img);
    cars = [car1, car2, car3, car4];
  }

  play()
  {
    form.hide_details();
    Player.getPlayerInfo();
    
    if(allPlayers !== undefined)
    {
      background(rgb(198,135,103));
      image(track, 0,-displayHeight*4,displayWidth, displayHeight*5);
      
      //index of the array
      var carIndex = 0;

      //x and y position of the cars
      var x = 240;
      var y;

      for(var plr in allPlayers)
      {
        //add 1 to the index for every loop
        carIndex = carIndex + 1 ;

        //position the cars a little away from each other in x direction
        x = x + 200;
        //use data form the database to display the cars in y direction
        y = displayHeight - allPlayers[plr].distance;
        cars[carIndex-1].x = x;
        cars[carIndex-1].y = y;

        if (carIndex === player.index)
        {
          cars[carIndex - 1].shapeColor = "red";
          camera.position.x = displayWidth/2;
          camera.position.y = cars[carIndex-1].y
        }
      }
      
    }

    /*if(keyIsDown(UP_ARROW) && player.index !== null)
    {
      player.distance +=10;
      player.update();
    }*/
    if(keyIsDown(38) && player.index !== null)
    {
      yVel += 0.9;
      if(keyIsDown(37)){
          xVel -= 0.2;
      }
      if(keyIsDown(39)){
          xVel += 0.2;
      }
    }
        player.xPos += xVel;
        xVel *= 0.985;

        player.distance += yVel;
        yVel *= 0.98;
        
        player.update();
    if(player.distance > 3500)
    {
     gState = 2;
    }
    drawSprites();
  }

  end()
  {
    console.log("GAME ENDED");
  }
}
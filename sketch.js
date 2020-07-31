//Create variables here
var dog,dogImg,happyDogImg,db,foodS,foodStock

function preload()
{
  //load images here
  dogImg = loadImage("images/dogImg.png");
  happyDogImg = loadImage("images/dogImg1.png");
}

function setup() {
  createCanvas(500, 500);
  db=firebase.database();

  dog=createSprite(200,200,50,76);
  dog.addImage("dog",dogImg);
  dog.scale=0.3;

  foodStock=db.ref('food');
  foodStock.on("value",readStock);



}


function draw() {  
  background(46,139,87);
  if(foodS!==undefined){

  
  //add styles here
  dog.display();
  text("food remaining: "+ foodS,200,50);
  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
     dog.addImage(happyDogImg);
  }
  if(keyWentUp(UP_ARROW)){
    dog.addImage("dog",dogImg);
  }
  drawSprites();
}
  

}

function readStock(data){
foodS=data.val();
}

function writeStock(foodS){
  if(foodS<=0){
    foodS=0;
  }
  else{
    foodS=foodS-1;
  }
  db.ref('/').update({
    food:foodS
  });
    
  }






var corona1,corona2,corona3,coronaGroup
var mask,sanitizer,safetyKitGroup
var lives=3
var safetyKitCount=0
var gameState="PLAY"

function preload(){
groundImg=loadImage("track.png")
manImg=loadImage("Man.png")
corona1=loadImage("corona1.png")
corona2=loadImage("corona2.png")
corona3=loadImage("corona3.png")
mask=loadImage("mask.png")
sanitizer=loadImage("sanitizer.png")
gameOverImg=loadImage("gameover.png")
restartImg=loadImage("restart.png")
}



function setup() {
  createCanvas(400,600);
  ground=createSprite(200,200);
  ground.addImage(groundImg)
  
  ground.scale=1.2
 
  
  man = createSprite(100,500,20,20)
  man.addImage(manImg)
  man.scale=0.4
  man.debug=true
  man.setCollider("rectangle",0,0,man.width/2,(man.height/2)+100)

  coronaGroup=createGroup()
  safetyKitGroup=createGroup()

  gameOver=createSprite(200,200,30,30)
  gameOver.addImage(gameOverImg)
  gameOver.visible=false

  restart=createSprite(200,300,30,30)
  restart.addImage(restartImg)
  restart.scale=0.3
  restart.visible=false
  }

function draw() {
  
if(gameState==="PLAY"){
  background(255,255,255);
  ground.velocityY=4+(Math.round(safetyKitCount/50))
  if(ground.y>400){

  ground.y=ground.height/2
  }

  if(keyDown(LEFT_ARROW)){
  man.x=man.x-2
  }

  if(keyDown(RIGHT_ARROW)){
  man.x=man.x+2
  }
   if(man.isTouching(safetyKitGroup)) {
safetyKitCount=safetyKitCount+10
safetyKitGroup.destroyEach()
console.log(safetyKitCount)
   }
   
if(man.isTouching(coronaGroup)){
  safetyKitCount=safetyKitCount-10
  coronaGroup.destroyEach()
  if(safetyKitCount<0){
    lives=lives-1
  }
  
}
if(lives===0){
  gameState="END"

}

  spawnCoronas()
  spawnSafetyKits()
  
}
if(gameState==="END"){
background("grey")
gameOver.visible=true
restart.visible=true
man.visible=false
ground.visible=false
ground.velocityY=0
coronaGroup.setVelocityYEach(0)
safetyKitGroup.setVelocityYEach(0)
coronaGroup.destroyEach()
safetyKitGroup.destroyEach()
if(mousePressedOver(restart)){
  reset()
}
}
drawSprites();
  stroke("Violet")
  text("Immunity Booster: "+safetyKitCount,20,20 )
  text("Lives: "+lives,320,20 )

}

function spawnCoronas(){
if(frameCount%180===0){
corona=createSprite(200,-50,25,25)
var rand=Math.round(random(1,3))

switch(rand){
case 1: corona.addImage(corona1)
break;
case 2:corona.addImage(corona2)
break;
case 3:corona.addImage(corona3)
break;
default:break;


}
corona.velocityY=3+(Math.round(safetyKitCount/50))
corona.scale=0.2
corona.x=Math.round(random(100,300))
coronaGroup.add(corona)
}



}

function spawnSafetyKits(){
if(frameCount%240===0){
  safetyKit=createSprite(200,-50,25,25)
  var rand=Math.round(random(1,2))
  
  switch(rand){
  case 1: safetyKit.addImage(mask)
  break;
  case 2:safetyKit.addImage(sanitizer)
  break;
  default:break;
  
  
  }
  safetyKit.velocityY=3
  safetyKit.scale=0.1
  safetyKit.x=Math.round(random(100,300))
  safetyKitGroup.add(safetyKit)
  }


}

function reset(){
safetyKitCount=0
lives=3
gameState="PLAY"
gameOver.visible=false
restart.visible=false
man.visible=true
ground.visible=true
}




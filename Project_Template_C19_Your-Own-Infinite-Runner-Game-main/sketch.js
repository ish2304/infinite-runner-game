var PLAY = 1;
var END = 0;
var gameState = PLAY;

var ground,invisibleGround,groundImg;
var shark_Img
var submarine,submarine_Img
var obstaclesGroup,obstacle1,obstacle2,obstacle3,obstacle4
var wastedImg,restartImg

function preload(){
groundImg = loadImage("cartoon sand.png")
shark_Img = loadImage("cartoon shark.png")
submarine_Img = loadImage("cartoon submarine.png")

obstacle1 = loadImage("dead fish.png")
obstacle2 = loadImage("more cartoon coral.png")
obstacle3 = loadImage("cartoon coral.png")
obstacle4 = loadImage("cartoon rock.jpg")

wastedImg = loadImage("wasted.png")
restartImg = loadImage("restart icon.png")
}

function setup() {
 createCanvas(600,200)

 submarine = createSprite(50,180,20,50)
 submarine.addImage("submarine",submarine_Img)
 submarine.scale = 0.3

 shark = createSprite(30,180,20,40)
 shark.addImage("shark",shark_Img)
 shark.scale = 0.2

 ground = createSprite(200,180,400,20)
 ground.addImage("ground",groundImg)
 ground.x = ground.width /2
 ground.scale = 0.3

wasted = createSprite(300,100)
wasted.addImage(wastedImg)
restart = createSprite(300,140)
restart.addImage(restartImg)

wasted.scale = 0.3
restart.scale = 0.1

invisibleGround = createSprite(200,190,400,10)
invisibleGround.visible = false

obstaclesGroup = createGroup()
console.log("hello" + 5)

submarine.setCollider("circle",0,0,40)
submarine.debug = true

score = 0
}


function draw() {
 drawSprites()

 background(180)
 text("Score: "+ score, 500,50)

 console.log("this is",gameState)

 if (gameState = PLAY){
    wasted.visible = false
    restart.visible =false
    ground.velocityX = -4
    score = score + Math.round(frameCount/60)

    if (ground.x < 0){
        ground.x = ground.width/2
    }
    if(keyDown("space")&& submarine.y >= 100){
        submarine.velocityY + -12
    }

    submarine.velocityY = submarine.velocityY + 0.8

    spawnObstacles()

    if (obstaclesGroup.isTouching(submarine)){
        gameState = END
    }
 }

 else if (gameState === End) {
    console.log("hey")
    wasted.visible = true
    restart.visible = true

    ground.velocityX = 0
    submarine.velocityY = 0

    obstaclesGroup.setLifeTimeEach(-1)

    obstaclesGroup.setlVelocityXEach(0)
 }
}

function spawnObstacles(){
    if (frameCount % 60 === 0){
        var obstacle = createSprite(400,165,10,40)
        obstacle.velocityX = -6

        var rand = Math.round(random(1,6))
        switch(rand) {
            case 1: obstacle.addImage(obstacle1)
                    break
            case 2: obstacle.addImage(obstacle2)
                    break
            case 3: obstacle.addImage(obstacle3)
                    break
            case 4: obstacle.addImage(obstacle4)
                    break
            default: break
        }

        obstacle.scale = 0.5
        obstacle.lifetime = 300
        obstaclesGroup.add(obstacle)
    }
}
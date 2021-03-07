const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world;
var box1, pig1,pig3;
var backgroundImg,platform;
var bird, slingshot;

var gameState = "onSling";
var bg = "sprites/bg1.png";
var score = 0;
var count = 0;

function preload() {
    bg = loadImage("sprites/bg.png");
    getBackgroundImg();
}

function setup(){
    var canvas = createCanvas(2400,600);
    engine = Engine.create();
    world = engine.world;


    ground = new Ground(600,height,3200,20);
    platform = new Ground(150, 505, 300, 170);

    box1 = new Box(1700,520,70,70);
    box2 = new Box(1920,520,70,70);
    pig1 = new Pig(1810,550);
    log1 = new Log(1810,460,300, PI/2);

    box3 = new Box(1700,440,70,70);
    box4 = new Box(1920,440,70,70);
    pig3 = new Pig(1810,420);

    log3 =  new Log(1810,380,300, PI/2);

    box5 = new Box(1810,360,70,70);
    log4 = new Log(1760,320,150, PI/7);
    log5 = new Log(1870,320,150, -PI/7);

    bird = new Bird(200,150);

    //log6 = new Log(230,180,80, PI/2);
    slingshot = new SlingShot(bird.body,{x:200, y:250});
}

function draw(){
    //if(backgroundImg)
    //    background(backgroundImg);
    background(bg);
        noStroke();
        textSize(35)
        fill("white")
        text("Score  " + score, width-300, 50)
    
    Engine.update(engine);
    //strokeWeight(4);
    box1.display();
    box2.display();
    ground.display();
    pig1.display();
    pig1.score();
    log1.display();

    box3.display();
    box4.display();
    pig3.display();
    pig3.score();
    log3.display();

    box5.display();
    log4.display();
    log5.display();

    bird.display();
    platform.display();
    //log6.display();
    slingshot.display();
}

function mouseDragged(){
    //if (gameState!=="launched"){
        Matter.Body.setPosition(bird.body, {x: mouseX , y: mouseY});
    //}
}


function mouseReleased(){
    slingshot.fly();
    gameState = "launched";
}

function keyPressed(){
    if(keyCode === 32){
        bird.trajectory = [];
        Matter.Body.setPosition(bird.body, {x:200,y:250});
      slingshot.attach(bird.body);
    }


}

async function getBackgroundImg(){
    var response = await fetch("http://worldtimeapi.org/api/timezone/Asia/Kolkata");
    var responseJSON = await response.json();

    var datetime = responseJSON.datetime;
    var hour = datetime.slice(11,13);
    
    if(hour>=06 && hour<=19){
        bg = "sprites/bg1.png";
    }
    else{
        bg = "sprites/bg2.jpg";
    }

    backgroundImg = loadImage(bg);
}

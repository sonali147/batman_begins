const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;

var engine, world;

var walkingManAnimation;
var thunder1, thunder2, thunder3, thunder4;
var drops = [];
var maxDrops = 100;
var umbrella;
var walkingMan;

function preload(){
    walkingManAnimation = loadAnimation("images/Walking Frame/walking_1.png",
                                "images/Walking Frame/walking_2.png",
                                "images/Walking Frame/walking_3.png",
                                "images/Walking Frame/walking_4.png",
                                "images/Walking Frame/walking_5.png",
                                "images/Walking Frame/walking_6.png",
                                "images/Walking Frame/walking_7.png",
                                "images/Walking Frame/walking_8.png");
    thunder1 = loadImage("images/thunderbolt/1.png");
    thunder2 = loadImage("images/thunderbolt/2.png");
    thunder3 = loadImage("images/thunderbolt/3.png");
    thunder4 = loadImage("images/thunderbolt/4.png");

}

function setup(){
    createCanvas(400,600);

    engine = Engine.create();
    world = engine.world;

    umbrella = new Umbrella(165, 385);
    walkingMan = createSprite(155,435);
    walkingMan.addAnimation("walking", walkingManAnimation);
    walkingMan.scale = 0.4;

    for(var i=0; i< maxDrops; i++){
        drops.push(new Drop(random(0,width), random(0,height)));
    }
    
}

function draw(){
    background("black");

    Engine.update(engine);

    //umbrella.display();

    for(var i=0;i<drops.length;i++){
        drops[i].display();
        if(drops[i].body.position.y > height){
            Matter.Body.setPosition(drops[i].body, {x:random(0,width), y:0});
        }
    }

    spawnThunder();
    drawSprites();
}   

function spawnThunder(){
    
    if(frameCount % 50 === 0){
        var thunder = createSprite(random(20,380), 0);
        var r = Math.round(random(1,4));
        switch(r){
            case 1: thunder.addImage(thunder1);
                break;
            case 2: thunder.addImage(thunder2);
                break;
            case 3: thunder.addImage(thunder3);
                break;
            case 4: thunder.addImage(thunder4);
                break;
        }
        thunder.scale = 0.7;
        thunder.lifetime = Math.round(random(10,12));
    }
    
}


let wurly;
var physics;
var particle1 = []; // particle array
var spring1 = []; // spring array
var particle2 = []; // particle array
var spring2 = []; // spring array
var particle3 = []; // particle array
var spring3 = []; // spring array
var numParticle1 = 20;
var numParticle2 = 20;
var numParticle3 = 20;
var touching = false;


function preload() {


  

  
}

function setup() { 
  
  if (Tone.context.state != 'running') {
    Tone.start();
  }
  
  createCanvas(400, 400);
  



  
  // Initialize the physics
  physics = new VerletPhysics2D();
  physics.setWorldBounds(new Rect(0,0,width,height));
  physics.addBehavior(new GravityBehavior(new Vec2D(0,.05)));
 
  // create particles and add to array
  for(var i=0;i<numParticle1;i++){
    particle1[i] = new VerletParticle2D(new Vec2D(200+20*i,50));
    
	  physics.addParticle(particle1[i]);
  }
  
   for(var i=0;i<numParticle2;i++){
    particle2[i] = new VerletParticle2D(new Vec2D(50+20*i,200));
    
	  physics.addParticle(particle2[i]);
  }
  
  for(var i=0;i<numParticle3;i++){
    particle3[i] = new VerletParticle2D(new Vec2D(100+20*i,300));
    
	  physics.addParticle(particle3[i]);
  }

  // create springs and add to array
  for(var i=0;i<numParticle1-1;i++){
	  spring1[i] = new VerletSpring2D(particle1[i],particle1[i+1],10,0.1)
	  physics.addSpring(spring1[i]);
  }
  
  for(var i=0;i<numParticle2-1;i++){
	  spring2[i] = new VerletSpring2D(particle2[i],particle2[i+1],10,0.1)
	  physics.addSpring(spring2[i]);
  }
  
  for(var i=0;i<numParticle3-1;i++){
	  spring3[i] = new VerletSpring2D(particle3[i],particle3[i+1],10,0.1)
	  physics.addSpring(spring3[i]);
  }
  
  // lock the ends
  particle1[0].lock();
  particle1[numParticle1-1].lock();
  particle2[0].lock();
  particle2[numParticle2-1].lock();
  particle3[0].lock();
  particle3[numParticle3-1].lock();

} 

function draw() { 
  background(50);
  var bass = new Tone.Player('bassgove.m4a').toMaster();
  bass.autostart = true;
bass.loop = true;
  bass.mute = true;
  
  var wurly = new Tone.Player('wurlystuff.m4a').toMaster();
  wurly.autostart = true;
wurly.loop = true;
  wurly.mute = true;
  
  var main = new Tone.Player('maingov.m4a').toMaster();
  main.autostart = true;
main.loop = true;
  main.mute = true;
  
  var perc = new Tone.Player('percandchoir.m4a').toMaster();
  perc.autostart = true;
perc.loop = true;
  perc.mute = true;

  var drum = new Tone.Player('drummach.m4a').toMaster();
  drum.autostart = true;
  drum.loop = true;
  drum.mute = true;

  // draw particles
  for(var i=0;i<numParticle1;i++){
    noStroke();
    let c = color(255, 204, 0);
    fill(c);  
        
  ellipse(particle1[i].x,particle1[i].y,8,15);
  }  
  

  for(var i=0;i<numParticle2;i++){
    noStroke();
    let c = color(255, 204, 0);
    fill(c);
        
  ellipse(particle2[i].x,particle2[i].y,8,15);
  }  
  

  
  for(var i=0;i<numParticle3;i++){
    noStroke();
    let c = color(255, 204, 0);
    fill(c);  
        
  ellipse(particle3[i].x,particle3[i].y,8,15);
  }  


  physics.update();

  for(var i = 0; i < particle1.length; i++)
    {
    
  for(var j = 0; j < particle2.length; j++){
            if (dist(particle1[i].x, particle1[i].y, particle2[j].x, particle2[j].y) < 10) {
        console.log('touch');
         if(wurly.mute == true)
    {
      //wurly.mute = false;
      
    }
      } 
    }
      
      for(var k = 0; k < particle2.length; k++){
            if (dist(particle1[i].x, particle1[i].y, particle3[k].x, particle3[k].y) < 10) {
        console.log('2touch');
        // if(wurly.isLooping())
    //{
      //wurly.disconnect();
  //wurly.connect(filter);
  //filterFreq = map(particle3[18].x, 0, width, 10, 11050);
  //filterRes = map(particle3[18].y, 0, height, 15, 5);
  //filter.set(filterFreq, filterRes);
    //}
      } 
    }
    }
  
   for(var j = 0; j < particle2.length; j++)
    {
      for(var k = 0; k < particle2.length; k++){
            if (dist(particle2[j].x, particle2[j].y, particle3[k].x, particle3[k].y) < 10) {
        console.log('3touch');
         if(drum.mute == true)
    {
  drum.mute = false;
    }
      } 
    }
    }
  

  // interactivity
	if(mouseIsPressed){
      if (dist(mouseX, mouseY, particle1[numParticle1-1].x, particle1[numParticle1-1].y) < 20) {
        particle1[numParticle1-1].x = mouseX;
    particle1[numParticle1-1].y = mouseY;
      }
    if (dist(mouseX, mouseY, particle2[numParticle2-1].x, particle2[numParticle2-1].y) < 20) {
        particle2[numParticle2-1].x = mouseX;
    particle2[numParticle2-1].y = mouseY;
      }
      if (dist(mouseX, mouseY, particle3[numParticle3-1].x, particle3[numParticle3-1].y) < 20) {
        particle3[numParticle3-1].x = mouseX;
    particle3[numParticle3-1].y = mouseY;
      }
  }
}


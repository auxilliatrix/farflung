var physics;
var particles = []; // particle array
var springs = []; // spring array
var numParticles = 10;

function setup() { 
  createCanvas(400, 400);
  strokeWeight(2);
  fill(127);
  stroke(200);
  
  // Initialize the physics
  physics = new VerletPhysics2D();
  physics.setWorldBounds(new Rect(0,0,width,height));
  physics.addBehavior(new GravityBehavior(new Vec2D(0,0.5)));
 
  // create particles and add to array
  for(var i=0;i<numParticles;i++){
    particles[i] = new VerletParticle2D(new Vec2D(200+20*i,50));
	  physics.addParticle(particles[i]);
  }

  // create springs and add to array
  for(var i=0;i<numParticles-1;i++){
	  springs[i] = new VerletSpring2D(particles[i],particles[i+1],20,0.1)
	  physics.addSpring(springs[i]);
  }
  
  // lock the ends
  particles[0].lock();
  particles[numParticles-1].lock();

} 

function draw() { 
  background(50);

  // draw particles
  for(var i=0;i<numParticles;i++){
	  ellipse(particles[i].x,particles[i].y,3);
  }  

  // draw springs
  for(var i=0;i<numParticles-1;i++){
	  line(particles[i].x,particles[i].y,particles[i+1].x,particles[i+1].y);
  }  

  physics.update();

  // interactivity
	if(mouseIsPressed){
    particles[numParticles-1].x = mouseX;
    particles[numParticles-1].y = mouseY;
  }
}

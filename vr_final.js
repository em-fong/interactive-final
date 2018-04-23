//declare basic world variables
var world;
var imgs = ["sand", "brain", "crate", "coin", "kelp", "scale"];
var ping;
var glub;
var whale;
var fishes = [];
var castle;

//get ping sound for collecting treasure
function preload() {
	ping = loadSound("assets/point.mp3");
	glub = loadSound("assets/glub.mp3");
}

function setup() {

	//construct world and floor
	noCanvas();
	world = new World("VRScene");

	var plane = new Plane({x:0, y:-3, z:0, width: 1000, height: 1000, rotationX:-90, asset: imgs[0]});
	world.add(plane);

	//load in seafloor objects (corals, crates, kelp, etc)
	for (var seafloor = 0; seafloor < 200; seafloor++) {

		//to whoever is reading this: sorry for this code but i needed them to be random on each instantiation :/
		var coral = new TorusKnot({x:random(-500, 500), y:-1, z:random(-500, 500), red:random(100,225), green:random(90,130), blue:random(90,180), p:7, q: 8, radius: 3, rotationX: 90, scaleX: random(1.0, 3.0), scaleZ: random(1.0, 6)});
		var cr8 = new Box({x:random(-500, 500), y:-1, z:random(-500, 500), width:1, height:1, depth:1, scaleX: 6.0, scaleY: 6.0, scaleZ: 6.0, rotationX: random(-25, 25), asset: imgs[2]});
		var brainCoral = new Sphere({x:random(-500, 500), y:-1, z:random(-500, 500), radius: 5, segmentsHeight: 6, asset: imgs[1]});
		var kelp = new Cone({x:random(-500, 500), y:-1, z:random(-500, 500), transparent: true, repeatX: 3, radiusTop: 5, radiusBottom: 5, height: 20.0, asset: imgs[4]});
		world.add(coral);
		world.add(cr8);
		world.add(brainCoral);
		world.add(kelp)
	}

	//load in the coins to be collected via clicks
	for (var coinCount = 0; coinCount < 50; coinCount++) {
		var coin = new Circle({x:random(-500, 500), y:0.5, z:random(-500, 500), transparent: true, segmentsHeight: 6, radius:5, asset: imgs[3],

				//when coin is clicked, play a sound
				clickFunction: function(c) {
					c.hide();
					ping.play();
				}
			});
		world.add(coin);
	}

	//create fish container obejcts
	for (var fishCount = 0; fishCount < 80; fishCount++) {
		var fishCont = new Container3D({x: random(-600, 100), y: random(20, 60), z: random(-500, 500)});
		fishes.push(fishCont);
		var newFish = new Fish(fishCont);
	}

	//perlin noise!! please work dear god
	noiseDetail(24);

	//add 3D sandcastle
	castle = new OBJ({
		asset: 'castle-obj',
		mtl: 'castle-mtl',
		x: random(-500, 500),
		y: -1.5,
		z: random(-500, 500),
		rotationX:0,
		rotationY:180,
		scaleX:5,
		scaleY:5,
		scaleZ:5,
	});

	world.add(castle);

	//play underwater sounds
	glub.play();
	glub.loop();

 }

function draw() {

	//player movement
	if (mouseIsPressed) {
		world.moveUserForward(0.6);
	}

	//nudge each composite fish object across the environment
	for (var eachFish = 0; eachFish < fishes.length; eachFish++) {
		fishes[eachFish].nudge(random(-1, 5)/20, perlinMove(), random(-5, 5)/100);
	}

}

//helper function to deal with perlin noise
function perlinMove() {
	var offset = random(0,1000);
	var movement = map(noise(offset), 0, 1, -1, 1);
	offset += 0.01;
	return movement;
}

//fish class for the composite objects
class Fish {
	constructor(container) {

		//needed to instantiate container outside so that we can add the container to an array
		this.fish = container;

		//add elements to container, add container to world
		var tail = new Cone({x:0.1, red:211, green:172, blue:116, radiusTop: 0.7, scaleX: 2, scaleY: 2, scaleZ: 2, radiusBottom: 0.1, rotationZ: 90, asset: imgs[5]});
		var body = new Sphere({x:1, red:211, green:172, blue:116, transparent: true, scaleX: 2, scaleY: 2, scaleZ: 2, segmentsHeight:4, segmentsWidth: 8, asset: imgs[5]});
		this.fish.addChild(tail);
		this.fish.addChild(body);

		// add the Container to the world
		world.add(this.fish);
	}

}

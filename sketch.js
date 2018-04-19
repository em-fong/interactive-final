var bckgrnd;
var pin;
var bust;
var folio;
var bowl;

function preload() {
  bckgrnd = loadImage("assets/map.jpg");
  pin = loadImage("assets/pin.png");
  bust = loadImage("assets/bust.png");
  folio = loadImage("assets/folio.png");
  bowl = loadImage("assets/bowl.png");
}

function setup() {
  var canv = createCanvas(1000, 500);
  canv.parent("#sketch");
  background(0);
  imageMode(CENTER);
  noStroke();
}

function draw() {
  image(bckgrnd, 500, 250, 1000, 500);
  image(pin, 555, 240, 50, 40);
  image(pin, 640, 215, 50, 40);
  image(pin, 610, 220, 50, 40);
  console.log(mouseX, mouseY);

  if (mouseX > 545 && mouseX < 565 && mouseY > 190 && mouseY < 280) {
    fill(255, 0, 0);
    rect(420, 280, 180, 200);
    image(bust, 510, 400, 80, 140);
    fill(255);
    textSize(12);
    text("Alexander the Great", 455, 300);
    text("(356 to 323 BCE)", 465, 320);
  }

  if (mouseX > 630 && mouseX < 650 && mouseY > 200 && mouseY < 240) {
    fill(255, 0, 0);
    rect(420, 280, 180, 200);
    image(folio, 510, 400, 100, 100);
    fill(255);
    textSize(10);
    text("Khamsa Folios 223 verso, 224 recto", 430, 300);
    text("Opening Page of the Fifth Poem", 440, 320);
    text("Sadd-i Iskandari (Alexander's Wall)", 435, 340);
  }

  if (mouseX > 600 && mouseX < 620 && mouseY > 200 && mouseY < 240) {
    fill(255, 0, 0);
    rect(420, 280, 180, 200);
    image(bowl, 510, 390, 100, 100);
    fill(255);
    textSize(15);
    text("Footed Bowl with", 450, 310);
    text(" Zodiac Signs", 460, 330);
  }

}

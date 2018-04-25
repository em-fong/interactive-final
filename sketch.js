//background image
var bckgrnd;

//pin objects
var alex;
var fixedStars;
var kinik;
var amheida;
var mechanism;
var pub;
var test;

//array that stores all the pin objects
var store = []

//html interface
var btns;
var slide;

// global variable to keep track of the current button value
var buttonValue = "";

function preload() {
  bckgrnd = loadImage("assets/map.jpg");
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

  btns = document.getElementsByTagName('button');
  slide = document.getElementById('slide');


  //create pins — sorry for the nuts constructor
  alex = new Pin("Exhibition", "red", 545, 260, "https://dl.airtable.com/r6avmEATCG5CKIEgmGeK_c308e18b-9996-4278-ba7e-dc93f4c7b380.png", "Alexander the Great", "", "", "Dimensions: H. 8.9 cm; W. 5.1 cm; D. 3.8 cm", "Medium: Marble", "Origin: Africa(?)", "100BCE", "100CE", "", "", 1);


  fixedStars = new Pin("Exhibitions", "red", 615, 240, "https://dl.airtable.com/hRZcWj7RL6Sz79pJ4aYe_full_a055d014-f89f-4900-b570-3effe9b7c0ac.png", "Book on the Shapes of the Fixed Stars (Kitab suwar al-kawakib al-thabita) The Constellation of Corvus the Raven", "Author: Abd al-Rahman ibn Umar Sufi (903-986) Copyist: Unknown", "Language: Arabic", "Dimensions: Folio: H. 20 cm; W. 14.6 cm", "Medium: Ink, opaque watercolor, and gold on paper", "Origin: Iran", "16th Century", "", "", "", 4);


  kinik = new Pin("Excavations", "green", 565, 225, "https://dl.airtable.com/nx3l3h8eRoGaxPMUwnPx_full_kinik2_1024.jpg", "Kinik Hoyuk", "", "", "", "", "Origin: Nigde, Turkey", "9th Century BCE", "8th Century BCE", "http://www.kinikhoyuk.org/", "Project Leader: Lorenzo d'Alfonso", 3);


  amheida = new Pin("Excavations", "green", 560, 260, "https://dl.airtable.com/yU1gNdZuT9aLFzdAslOA_full_home2.jpg", "NYU Excavations at Amheida", "", "", "", "", "Origin: Dakhleh Oasis, Egypt", "1st Century AD", "4th Century AD",  "http://www.kinikhoyuk.org/", "Project Leader: Roger Bagnall", 6)


  mechanism = new Pin("Research", "blue", 535, 230, "https://dl.airtable.com/yWJaGWWjQXKpHlBGLsEg_full_NAMA_Machine_d'Anticyth%C3%A8re_1.jpg", "Antikythera Mechanism", "", "", "", "", "Origin: Antikythera, Greece", "1st Century BCE", "2nd Century BCE", "http://i6.cims.nyu.edu/~ef1389/final/vr-final/index.html", "Project Leader: Alexander Jones", 2);


  pub = new Pin("Publications", "black", 550, 250, "https://dl.airtable.com/twrJtAlNSJqyk1MRByQ9_full_amheida.jpeg", "Amheida I: Ostraka from Trimithis 1", "Author: Roger Bagnall", "Summary: Catalog and analysis of 455 inscribed ostraka from the NYU excavations at Amheida, Egypt", "", "", "Origin: Dakhleh Oasis, Egypt", "3rd Century AD", "4th Century AD", "http://dlib.nyu.edu/awdl/isaw/amheida-i-otrim-1/", "", 5);



  store.push(alex);
  store.push(fixedStars);
  store.push(kinik);
  store.push(amheida);
  store.push(mechanism);
  store.push(pub);


  // CK - add event listeners for all buttons
  for (var i = 0; i < btns.length; i++) {
    btns[i].addEventListener('click', function(event) {
      // set a global variable equal to the value of the button
      // we will use this in 'draw' to figure out which button was
      // most recently pressed
      buttonValue = event.currentTarget.innerHTML;
    });
  }

}

function draw() {
  image(bckgrnd, 500, 250, 1000, 500);

  // CK
  // visit each store item and make it visible / invisible based
  // on which button is pressed
  for (var i = 0; i < store.length; i++) {

    // first handle button info
    if (buttonValue != 'Show All' && store[i].category !== buttonValue) {
      store[i].show = false;
    }
    // next handle slider info
    else if (store[i].age <= parseInt(slide.value)){
      store[i].show = true;
      store[i].pinActive();
    }
    else {
      store[i].show = false;
    }
  }
}

function mousePressed() {
//  if (mouseX > 545 && mouseX < 565 && mouseY > 190 && mouseY < 280) {
//    test.displayInfo();
//  }

  if (mouseX > 530 && mouseX < 555 && mouseY > 190 && mouseY < 280) {
    alex.displayInfo();
  }

  if (mouseX > 600 && mouseX < 620 && mouseY > 230 && mouseY < 250) {
    fixedStars.displayInfo();
  }

  if (mouseX > 550 && mouseX < 580 && mouseY > 210 && mouseY < 240) {
    kinik.displayInfo();
  }

  if (mouseX > 550 && mouseX < 575 && mouseY > 190 && mouseY < 280) {
    amheida.displayInfo();
  }

  if (mouseX > 520 && mouseX < 550 && mouseY > 220 && mouseY < 240) {
    mechanism.displayInfo();
  }

  if (mouseX > 530 && mouseX < 560 && mouseY > 240 && mouseY < 260) {
    pub.displayInfo();
  }
}

class Pin {
  constructor(category, color, x, y, imgURL, title, artist, language, dimensions, medium, location, startDateRange, endDateRange, siteURL, projectLeader, ageID) {
    this.category = category;
    this.color = color;
    this.x = x;
    this.y = y;
    this.img = imgURL;
    this.title = title;
    this.artist = artist;
    this.lang = language;
    this.dims = dimensions;
    this.medium = medium;
    this.loc = location;
    this.start = startDateRange;
    this.end = endDateRange;
    this.web = siteURL;
    this.lead = projectLeader;
    this.age = ageID;
    this.show = true;
  }

  pinActive() {
    if (this.show) {
      if (this.color === "red") {
        fill(255, 0, 0);
      } else if (this.color === "green") {
        fill(0, 255, 0);
      } else if (this.color === "blue") {
        fill(0, 0, 255);
      } else {
        fill(0);
      }
      ellipse(this.x, this.y, 15, 15);
    }
  }

  displayInfo() {
    if (this.show) {
      document.getElementById("a").innerHTML = this.title;
      document.getElementById("image").src = this.img;
      document.getElementById("link").href = this.web;
      document.getElementById("link").innerHTML = this.web;
      document.getElementById("b").innerHTML = this.artist;
      document.getElementById("c").innerHTML = this.dims;
      document.getElementById("d").innerHTML = this.lang;
      document.getElementById("e").innerHTML = this.medium;
      document.getElementById("f").innerHTML = this.loc;
      document.getElementById("g").innerHTML = this.lead;

      if (this.end === "") {
        document.getElementById("h").innerHTML = this.start;
      } else {
        document.getElementById("h").innerHTML = this.start + "-" + this.end;
      }
    }
  }
}


//UNUSED CLASs
class Exhibition {
  constructor(x, y, imgURL, title, artist, language, dimensions, medium, location, startDateRange, endDateRange, ageId) {
    this.x = x;
    this.y = y;
    this.img = imgURL;
    this.title = title;
    this.artist = artist;
    this.lang = language;
    this.dims = dimensions;
    this.medium = medium;
    this.loc = location;
    this.start = startDateRange;
    this.end = endDateRange;
    this.id = 4;
    this.show = true;
    this.category = 'Exhibitions';
  }

  pinActive() {
    if(this.show){
      fill(255, 0, 0);
      ellipse(this.x, this.y, 15, 15);
    }
  }

  displayInfo() {
    document.getElementById("title").innerHTML = this.title;
    document.getElementById("image").src = this.img;
    document.getElementById("artist").innerHTML = this.artist;
    document.getElementById("dimension").innerHTML = this.dims;
    document.getElementById("language").innerHTML = this.lang;
    document.getElementById("medium").innerHTML = this.medium;
    document.getElementById("origin").innerHTML = this.loc;

    if (this.end === "") {
      document.getElementById("dates").innerHTML = this.start;
    } else {
      document.getElementById("dates").innerHTML = this.start + "-" + this.end;
    }
  }
}

const len = 784;
const total_data = 1000;

const CAT = 0;
const RAINBOW = 1;
const TRAIN = 2;

categories = ["cat", "rainbow", "train"];
categories2 = ["bee", "bread", "cat", "crab", "dog", "dragon", "fish", "flower", "frog", "hat", "horse", "knife", "leaf",
              "lollipop", "monkey", "mug", "mushroom", "panda", "pig", "rabbit", "rainbow", "scissors", "shoes", "snail",
              "star", "sword", "train", "tree", "umbrella", "winglass"];

let nn;

// 30 different categories 
let bees_data;
let bread_data;
let cats_data;
let crabs_data;
let dogs_data;
let dragons_data;
let fish_data;
let flowers_data;
let frogs_data;
let hats_data;
let horses_data;
let knives_data;
let leaves_data;
let lollipops_data;
let monkeys_data;
let mugs_data;
let mushrooms_data;
let pandas_data;
let pigs_data;
let rabbits_data;
let rainbows_data;
let scissors_data;
let shoes_data;
let snails_data;
let stars_data;
let swords_data;
let trains_data;
let trees_data;
let umbrellas_data;
let wineglass_data;

let bees = {};
let bread = {};
let cats = {};
let crabs = {};
let dogs = {};
let dragons = {};
let fish = {};
let flowers = {};
let frogs = {};
let hats = {};
let horses = {};
let knives = {};
let leaves = {};
let lollipops = {};
let monkeys = {};
let mugs = {};
let mushrooms = {};
let pandas = {};
let pigs = {};
let rabbits = {};
let rainbows = {};
let scissors = {};
let shoes = {};
let snails = {};
let stars = {};
let swords = {};
let trains = {};
let trees = {};
let umbrellas = {};
let wineglass = {};

function preload() {
  bees_data = loadBytes('Data/bees1000.bin');
  bread_data = loadBytes('Data/breads1000.bin');
  cats_data = loadBytes('Data/cats1000.bin');
  crabs_data = loadBytes('Data/crabs1000.bin');
  dogs_data = loadBytes('Data/dogs1000.bin');
  dragons_data = loadBytes('Data/dragons1000.bin');
  fish_data = loadBytes('Data/fish1000.bin');
  flowers_data = loadBytes('Data/flowers1000.bin');
  frogs_data = loadBytes('Data/frogs1000.bin');
  hats_data = loadBytes('Data/hats1000.bin');
  horses_data = loadBytes('Data/horses1000.bin');
  knives_data = loadBytes('Data/knives1000.bin');
  leaves_data = loadBytes('Data/leaves1000.bin');
  lollipops_data = loadBytes('Data/lollipops1000.bin');
  monkeys_data = loadBytes('Data/monkeys1000.bin');
  mugs_data = loadBytes('Data/mugs1000.bin');
  mushrooms_data = loadBytes('Data/mushrooms1000.bin');
  pandas_data = loadBytes('Data/pandas1000.bin');
  pigs_data = loadBytes('Data/pigs1000.bin');
  rabbits_data = loadBytes('Data/rabbits1000.bin');
  rainbows_data = loadBytes('Data/rainbows1000.bin');
  scissors_data = loadBytes('Data/scissors1000.bin');
  shoes_data = loadBytes('Data/shoes1000.bin');
  snails_data = loadBytes('Data/snails1000.bin');
  stars_data = loadBytes('Data/stars1000.bin');
  swords_data = loadBytes('Data/swords1000.bin');
  trains_data = loadBytes('Data/trains1000.bin');
  trees_data = loadBytes('Data/trees1000.bin');
  umbrellas_data = loadBytes('Data/umbrellas1000.bin');
  wineglass_data = loadBytes('Data/wineglass1000.bin');
}

function setup() {
  createCanvas(280, 280);
  background(255);

  // prepData(bees, bees_data);
  // prepData(bread, bread_data);
  // prepData(cats, cats_data);
  // prepData(crabs, crabs_data);
  // prepData(dogs, dogs_data);
  // prepData(dragons, dragons_data);
  // prepData(fish, fish_data);
  // prepData(flowers, flowers_data);
  // prepData(frogs, frogs_data);
  // prepData(hats, hats_data);
  // prepData(horses, horses_data);
  // prepData(knives, knives_data);
  // prepData(leaves, leaves_data);
  // prepData(lollipops, lollipops_data);
  // prepData(monkeys, monkeys_data);
  // prepData(mugs, mugs_data);
  // prepData(mushrooms, mushrooms_data);
  // prepData(pandas, pandas_data);
  // prepData(pigs, pigs_data);
  // prepData(rabbits, rabbits_data);
  // prepData(rainbows, rainbows_data);
  // prepData(scissors, scissors_data);
  // prepData(shoes, shoes_data);
  // prepData(snails, snails_data);
  // prepData(stars, stars_data);
  // prepData(swords, swords_data);
  // prepData(trains, trains_data);
  // prepData(trees, trees_data);
  // prepData(umbrellas, umbrellas_data);
  // prepData(wineglass, wineglass_data);

  prepData(cats, cats_data, CAT);
  prepData(trains, trains_data, TRAIN);
  prepData(rainbows, rainbows_data, RAINBOW);

  // Creating the Neural Network
  nn = new NeuralNetwork(784, 64, 3);

  // Creating a training set
  let training = [];
  training = training.concat(cats.training);
  training = training.concat(rainbows.training);
  training = training.concat(trains.training);

  let testing = [];
  testing = testing.concat(cats.testing);
  testing = testing.concat(rainbows.testing);
  testing = testing.concat(trains.testing);

  let trainButton = select('#train');
  let epochCounter = 0;
  trainButton.mousePressed(function() {
    trainEpoch(training);
    epochCounter++;
    console.log("Trained for " + epochCounter + " Epoch");
  });

  let testButton = select('#test');
  testButton.mousePressed(function() {
    let percent = testAll(testing);
    console.log("Percent Correct: " + nf(percent,2,2) + "%" );
  });

  let guessButton = select('#guess');
  guessButton.mousePressed(function() {
    let inputs = [];
    let img = get();
    img.resize(28,28);
    //console.log(img);
    img.loadPixels();

    for (let i = 0; i < len; i++){
      let bright = img.pixels[i*4];
      inputs[i] = (255 - bright) / 255.0;

    }
    //console.log(inputs);

    let guess = nn.predict(inputs);
    let m = max(guess);
    let classification = guess.indexOf(m);
    console.log("Guess:" + categories[classification]);
  });

  let clearButton = select('#clearcanvas');
  clearButton.mousePressed(function() {
    background(255);
  })

  // for ( let i = 1; i < 6; i++) {
  //   trainEpoch(training);
  //   console.log("Trained for " + i + " Epoch");
  //   console.log("testing result:");

  //   let percent = testAll(testing);
  //   console.log("% Correct: " + percent);
  // }
 



  
}
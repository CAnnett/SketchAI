const len = 784;
const total_data = 1500;

const BEE = 0;
const BREAD = 1;
const CAT = 2;
const CRAB = 3;
const DOG = 4;
const DRAGON = 5;
const FISH = 6;
const FLOWER = 7;
const FROG = 8;
const HAT = 9;
const HORSE = 10;
const KNIFE = 11;
const LEAF = 12;
const LOLLIPOP = 13;
const MONKEY = 14;
const MUG = 15;
const MUSHROOM = 16;
const PANDA = 17;
const PIG = 18;
const RABBIT = 19;
const RAINBOW = 20;
const SCISSORS = 21;
const SHOES = 22;
const SNAIL = 23;
const STAR = 24;
const SWORD = 25;
const TRAIN = 26;
const TREE = 27;
const UMBRELLA = 28;
const WINEGLASS = 29;

var categories = ["bee", "bread", "cat", "crab", "dog", "dragon", "fish", "flower", "frog", "hat", "horse", "knife", "leaf",
              "lollipop", "monkey", "mug", "mushroom", "panda", "pig", "rabbit", "rainbow", "scissors", "shoes", "snail",
              "star", "sword", "train", "tree", "umbrella", "wineglass"];

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
  createCanvas(420, 420);
  background(255);

  prepData(bees, bees_data, BEE);
  prepData(bread, bread_data, BREAD);
  prepData(cats, cats_data, CAT);
  prepData(crabs, crabs_data, CRAB);
  prepData(dogs, dogs_data, DOG);
  prepData(dragons, dragons_data, DRAGON);
  prepData(fish, fish_data, FISH);
  prepData(flowers, flowers_data, FLOWER);
  prepData(frogs, frogs_data, FROG);
  prepData(hats, hats_data, HAT);
  prepData(horses, horses_data, HORSE);
  prepData(knives, knives_data, KNIFE);
  prepData(leaves, leaves_data, LEAF);
  prepData(lollipops, lollipops_data, LOLLIPOP);
  prepData(monkeys, monkeys_data, MONKEY);
  prepData(mugs, mugs_data, MUG);
  prepData(mushrooms, mushrooms_data, MUSHROOM);
  prepData(pandas, pandas_data, PANDA);
  prepData(pigs, pigs_data, PIG);
  prepData(rabbits, rabbits_data, RABBIT);
  prepData(rainbows, rainbows_data, RAINBOW);
  prepData(scissors, scissors_data, SCISSORS);
  prepData(shoes, shoes_data, SHOES);
  prepData(snails, snails_data, SNAIL);
  prepData(stars, stars_data, STAR);
  prepData(swords, swords_data, SWORD);
  prepData(trains, trains_data, TRAIN);
  prepData(trees, trees_data, TREE);
  prepData(umbrellas, umbrellas_data, UMBRELLA);
  prepData(wineglass, wineglass_data, WINEGLASS);

  // Creating the Neural Network
  nn = new NeuralNetwork(784, 64, 30);

  // Creating a training set
  let training = [];
  training = training.concat(bees.training);
  training = training.concat(bread.training);
  training = training.concat(cats.training);
  training = training.concat(crabs.training);
  training = training.concat(dogs.training);
  training = training.concat(dragons.training);
  training = training.concat(fish.training);
  training = training.concat(flowers.training);
  training = training.concat(frogs.training);
  training = training.concat(hats.training);
  training = training.concat(horses.training);
  training = training.concat(knives.training);
  training = training.concat(leaves.training);
  training = training.concat(lollipops.training);
  training = training.concat(monkeys.training);
  training = training.concat(mugs.training);
  training = training.concat(mushrooms.training);
  training = training.concat(pandas.training);
  training = training.concat(pigs.training);
  training = training.concat(rabbits.training);
  training = training.concat(rainbows.training);
  training = training.concat(scissors.training);
  training = training.concat(shoes.training);
  training = training.concat(snails.training);
  training = training.concat(stars.training);
  training = training.concat(swords.training);
  training = training.concat(trains.training);
  training = training.concat(trees.training);
  training = training.concat(umbrellas.training);
  training = training.concat(wineglass.training);

  let testing = [];
  testing = testing.concat(bees.testing);
  testing = testing.concat(bread.testing);
  testing = testing.concat(cats.testing);
  testing = testing.concat(crabs.testing);
  testing = testing.concat(dogs.testing);
  testing = testing.concat(dragons.testing);
  testing = testing.concat(fish.testing);
  testing = testing.concat(flowers.testing);
  testing = testing.concat(frogs.testing);
  testing = testing.concat(hats.testing);
  testing = testing.concat(horses.testing);
  testing = testing.concat(knives.testing);
  testing = testing.concat(leaves.testing);
  testing = testing.concat(lollipops.testing);
  testing = testing.concat(monkeys.testing);
  testing = testing.concat(mugs.testing);
  testing = testing.concat(mushrooms.testing);
  testing = testing.concat(pandas.testing);
  testing = testing.concat(pigs.testing);
  testing = testing.concat(rabbits.testing);
  testing = testing.concat(rainbows.testing);
  testing = testing.concat(scissors.testing);
  testing = testing.concat(shoes.testing);
  testing = testing.concat(snails.testing);
  testing = testing.concat(stars.testing);
  testing = testing.concat(swords.testing);
  testing = testing.concat(trains.testing);
  testing = testing.concat(trees.testing);
  testing = testing.concat(umbrellas.testing);
  testing = testing.concat(wineglass.testing);

  let trainButton = select('#train');
  let epochCounter = 0;
  document.getElementById("trained").innerHTML = " " + epochCounter + " epochs";
  trainButton.mousePressed(function() {
    setTimeout(function(){
      trainEpoch(training);
      epochCounter++;
      console.log("Trained for " + epochCounter + " Epoch");
      document.getElementById("trained").innerHTML = " " + epochCounter + " epochs";
    }, 0);
    
  });

  let fiveButton = select('#fiveTrain');
  fiveButton.mousePressed(function() {
    setTimeout(function(){
      fiveEpochs(training);
      epochCounter = epochCounter + 5;
      console.log("Trained for " + epochCounter + " Epoch");
      document.getElementById("trained").innerHTML = " " + epochCounter + " epochs";
    }, 0);
    
  });

  let testButton = select('#test');
  testButton.mousePressed(function() {
    let percent = testAll(testing);
    console.log("Percent Correct: " + nf(percent,2,2) + "%" );
    document.getElementById("tested").innerHTML = " " + nf(percent,2,2) + "%";
  });

  let guessButton = select('#guess');
  guessButton.mousePressed(function() {
    let inputs = [];
    let img = get();
    img.resize(28,28);
    img.loadPixels();

    for (let i = 0; i < len; i++){
      let bright = img.pixels[i*4];
      inputs[i] = (255 - bright) / 255.0;

    }

    let guess = nn.predict(inputs);
    let m = max(guess);
    let classification = guess.indexOf(m);
    let finalguess = categories[classification];
    console.log("Guess:" + categories[classification]);
    document.getElementById("guessed").innerHTML = finalguess;
    if (finalguess === drawprompt){
      document.getElementById("result").innerHTML = "I got it right! :)";
    }if (finalguess != drawprompt) {
      document.getElementById("result").innerHTML = "Aw I got it wrong :(";
    }
    
    
  });

  let clearButton = select('#clearcanvas');
  clearButton.mousePressed(function() {
    background(255);
  })

  function random_prompt(categories){
    return categories[Math.floor(Math.random()*categories.length)];
  }
  
  let drawprompt = random_prompt(categories);
  document.getElementById("drawprompt").innerHTML = drawprompt;
  console.log(drawprompt);

  let promptButton = select('#promptbutton');
  promptButton.mousePressed(function() {
    drawprompt = random_prompt(categories);
    document.getElementById("drawprompt").innerHTML = drawprompt;
    console.log(drawprompt);
  })

}
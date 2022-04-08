nn = NeuralNetwork.deserialize(sessionStorage.getItem('nn'));

async function please(gamePrompts){
    console.log(gamePrompts);
}

let prompt1 = gamePrompts[0];
let prompt2 = gamePrompts[1];
let prompt3 = gamePrompts[2];
let prompt4 = gamePrompts[3];
let prompt5 = gamePrompts[4];
promptcounter = 0;

async function newPrompt(gamePrompts){
    if (promptcounter > 4){
        promptcounter = 0;
    }
    let currentPrompt = gamePrompts[promptcounter];
    promptcounter++;
    console.log(currentPrompt);
    document.getElementById("currentprompt").innerHTML = currentPrompt;
}

let guesses = [];

async function guessSketch(){
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
    guesses[promptcounter - 1] = finalguess;
    console.log(guesses);

    newPrompt(gamePrompts);
    background(255);


    correct = 0;
    if (guesses.length === 5){
        for (var i = 0; i < guesses.length; ++i) {
            if (guesses[i] === gamePrompts[i]){
                correct++;
            }
        }
        console.log(correct + "/5");
    }
}



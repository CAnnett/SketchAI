promptcounter = 0;

let prompt1 = gamePrompts[0]
let prompt2 = gamePrompts[1];
let prompt3 = gamePrompts[2];
let prompt4 = gamePrompts[3];
let prompt5 = gamePrompts[4];

async function newPrompt(gamePrompts){
    var button = document.getElementById("play");
    button.style.visibility = "hidden";
    if (promptcounter > 4){
        promptcounter = 0;
    }
    let currentPrompt = gamePrompts[promptcounter];
    promptcounter++;
    console.log(currentPrompt);
    document.getElementById("currentprompt").innerHTML = currentPrompt;
}

let guesses = [];
let inputs = [];
let basedImages = [];
let j = 0;

async function guessSketch(){
    let imageBase64String = c.elt.toDataURL();
    basedImages.push(imageBase64String);

    let img = get();
    console.log(img);
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
        document.getElementById("score").innerHTML = correct;
        gameEnd();
    }
}


async function gameEnd() {

    var gamediv = document.getElementById("mainGame");
    gamediv.style.display = "none";

    var results = document.getElementById("afterGame");
    results.style.display = "block";

    document.getElementById("img1").src = basedImages[0];
    document.getElementById("img2").src = basedImages[1];
    document.getElementById("img3").src = basedImages[2];
    document.getElementById("img4").src = basedImages[3];
    document.getElementById("img5").src = basedImages[4];
    document.getElementById("prompt1").innerHTML = gamePrompts[0];
    document.getElementById("prompt2").innerHTML = gamePrompts[1];
    document.getElementById("prompt3").innerHTML = gamePrompts[2];
    document.getElementById("prompt4").innerHTML = gamePrompts[3];
    document.getElementById("prompt5").innerHTML = gamePrompts[4];

    document.getElementById("guess1").innerHTML = guesses[0];
    document.getElementById("guess2").innerHTML = guesses[1];
    document.getElementById("guess3").innerHTML = guesses[2];
    document.getElementById("guess4").innerHTML = guesses[3];
    document.getElementById("guess5").innerHTML = guesses[4];
}

async function saveImages(prompt, j){
    $.ajax({
        url: '/getarray',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({"image": basedImages[j]})
    })

        let promptData = prompt[j];
        $.post(
            "http://localhost:3000/game/1/" + promptData,
            function(data) {
            }
        );
        
}



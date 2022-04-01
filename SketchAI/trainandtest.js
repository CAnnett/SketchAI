//Look into adding a softmax layer
//Also look into making it asynchronous so it doesn't freeze up the whole site

function trainEpoch (training) {
    console.log("training...")
    shuffle(training, true);
  
    //Training 1 epoch
    for (let i=0; i < training.length; i++) {
      let data = training[i];
      let inputs = Array.from(data).map(x => x / 255);
      //console.log(inputs);
      let label = training[i].label;
      //console.log(label);
      let targets = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
      //let targets = [0,0,0];
      targets[label] = 1;
  
      nn.train(inputs, targets);
  
    }
  }

function testAll(testing) {
    let correct = 0;
    console.log("testing...");
    for (let i=0; i < testing.length; i++) {
    //for (let i=0; i < 1; i++) {
      let data = testing[i];
      let inputs = Array.from(data).map(x => x / 255);
      
      let label = testing[i].label;
      let guess = nn.predict(inputs);
  
      let m = max(guess);
      let classification = guess.indexOf(m);
      // console.log(classification);
      // console.log(label);
  
      if (classification === label) {
        correct++;
      }
      
    }
    console.log(correct);
    let percent = 100 * correct / testing.length;
    return percent;
  }
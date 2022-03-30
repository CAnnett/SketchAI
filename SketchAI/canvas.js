function draw() {
    strokeWeight(7);
    stroke(0);
    if (mouseIsPressed){
    line(pmouseX, pmouseY, mouseX, mouseY);
    }
}
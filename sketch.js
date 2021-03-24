let steps;
let size;

function setup() {
  steps = 20;
  size = 800;

  createCanvas(size, size);
  noStroke();
  background(0);
  fill(255, 240, 230);
  blendMode(OVERLAY);
  frameRate(1);
}

function draw() {
  clear();
  fill(215, 150, 60);
  let s = generate_string(8);
  display(s);
  fill(185, 50, 130);
  s = generate_string(8);
  display(s);
  fill(80, 190, 155);
  s = generate_string(8);
  display(s);
}

function generate_string(d) {
  if (d == 0) {
    let r = random(5);
    if (r < 1) return "W";
    return "B";
  }

  let r = random(10 + (d * 8));
  if (r < 5) return "W";
  if (r < 10) return "B";
  let ul = generate_string(d - 1);
  let ur = generate_string(d - 1);
  let ll = generate_string(d - 1);
  let lr = generate_string(d - 1);
  return "[" + ul + "-" + ur + "/" + ll + "-" + lr + "]";
}

function display(s) {
  let depth = 0;
  for (let i = 0; i < s.length; i++) {
    let t = s[i];
    let cur_size = size / pow(2, depth);
    if (t == "B") {
      rect(0, 0, cur_size - 1, cur_size - 1);
    } else if (t == "[") {
      depth++;
    } else if (t == "]") {
      translate(-cur_size, -cur_size);
      depth--;
    } else if (t == "-") {
      translate(cur_size, 0);
    } else if (t == "/") {
      translate(-cur_size, cur_size);
    }
  }
}

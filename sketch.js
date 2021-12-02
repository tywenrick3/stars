let mode;
let stars = [];
let lines = [];
let positions = [];
let total;

class Star {
	constructor(
		xPos = floor(random(0, width)),
		yPos = floor(random(0, height)),
		radius = floor(random(1, 9)),
		speed = floor(random(2, 8)),
		r = floor(random(200, 255)),
		g = floor(random(200, 255)), // TODO: one color variable
		b = floor(random(200, 255)),
		shooting = floor(random(0, 100))
	) {
		this.xPos = xPos;
		this.yPos = yPos;
		this.speed = speed;
		this.radius = radius;
		this.shooting = shooting;
		this.r = r;
		this.b = b;
		this.g = g;
		let temp = random(0, 10);
		if (temp < 5) {
			this.speed *= -1;
		}
	}

	move() {
		if (this.shooting >= 97) {
			this.xPos += this.speed;
		}
	}

	display() {
		fill(color(this.r, this.b, this.g));
		ellipse(this.xPos, this.yPos, this.radius);
	}
}

class Line {
	constructor(x1, y1, x2, y2) {
		this.x1 = x1;
		this.x2 = x2;
		this.y1 = y1;
		this.y2 = y2;
	}

	display() {
		stroke('blue'); // TODO: Line Color interactable?
		strokeWeight(2);
		line(this.x1, this.y1, this.x2, this.y2);
	}

	getDist() {
		let res = dist(this.x1, this.y1, this.x2, this.y2);
		return res;
	}
}

//^^^^^Objects^^^^^

function setup() {
	createCanvas(800, 600);
	reset();
}

function draw() {
	if (mode == 0) {
		start();
	}
	if (mode == 1) {
		main();
	}
	if (mode == 2) {
		helpMenu();
	}
}

function helpMenu() {
	background('black');
	textAlign(CENTER);
	fill('white');
	textSize(72);
	textFont('semplicitapro, sans-serif');
	text('Help', width / 2, height / 2);
	textSize(22);
	textFont('semplicitapro, sans-serif');
	text(
		'double-click stars to draw a constellation!',
		width / 2,
		height / 2 + 50
	);
	textSize(18);
	text('press esc', width / 2, height / 2 + 250);
}

function start() {
	background('black');
	noStroke();
	textAlign(CENTER);
	fill('white');
	textSize(72);
	textFont('nasalization, sans-serif');
	text('stars', width / 2, height / 2);
	textSize(18);
	text('press enter', width / 2, height / 2 + 250);
}

function main() {
	background('black');
	noStroke();
	textStyle(NORMAL);
	fill('blue');
	textFont('semplicitapro, sans-serif');
	textSize(14);
	text('press esc to reset', width / 2, height / 2 + 290);
	textSize(20);

	for (let i = 0; i < stars.length; i++) {
		stars[i].display();
		stars[i].move();
	}

	for (let i = 0; i < lines.length; i++) {
		lines[i].display();
	}

	fill('blue');
	noStroke();
	text('Light Years: ' + floor(total) / 100 / 2, width / 2, 30);
}

function mouseClicked() {
	if (mouseX <= width && mouseX >= 0 && mouseY <= height && mouseY >= 0) {
		if (positions.length >= 4) {
			positions.shift();
			positions.shift();
		}

		positions.push(mouseX, mouseY);

		if (positions.length == 4) {
			lines.push(
				new Line(positions[0], positions[1], positions[2], positions[3])
			);
			total += lines[lines.length - 1].getDist();
		}

		// Debugging Logs below:
		// console.log('Positions: ', positions);
		// console.log('Lines: ', lines);
		// console.log('Total: ', total);
	}
}

function keyPressed() {
	if (keyCode == 13 && mode == 0) {
		mode = 1;
	}
	if (keyCode == 27 && (mode == 1 || mode == 2)) {
		reset();
	}
	if (keyCode == 72 && mode == 0) {
		mode = 2;
	}
}

function reset() {
	while (stars.length > 0) {
		stars.pop();
	}
	while (positions.length > 0) {
		positions.pop();
	}
	while (lines.length > 0) {
		lines.pop();
	}
	background('black');
	mode = 0;
	total = 0;
	num_of_stars = floor(random(250, 350));
	for (let i = 0; i < num_of_stars; i++) {
		stars.push(new Star());
	}
}

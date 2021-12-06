let mode;
let stars = [];
let lines = [];
let positions = [];
let total;
let bin = 0;
// dark purple, dark blue, pink-red, light-blue,
// light-purple, white
const color_pal = [
	'#1d1135',
	'#0c164f',
	'#ba1e68',
	'#5643fd',
	'#7649fe',
	'#fcfbfe',
	'black',
	'#FFCD01',
];

let lineColor = color_pal[3];

class Star {
	constructor(
		xPos = floor(random(0, width)),
		yPos = floor(random(0, height)),
		radius = floor(random(1, 9)),
		speed = floor(random(2, 8)),
		r = floor(random(200, 255)),
		g = floor(random(200, 255)), // TODO: one color variable
		b = floor(random(200, 255)),
		shooting = floor(random(0, 100)),
		c = floor(random(200, 255))
	) {
		this.xPos = xPos;
		this.yPos = yPos;
		this.speed = speed;
		this.radius = radius;
		this.shooting = shooting;
		this.r = r;
		this.b = b;
		this.g = g;
		this.c = c;
		this.diagonal = floor(random(0, 10));
		let temp = random(0, 10);
		if (temp < 5) {
			this.speed *= -1;
		}
	}

	move() {
		if (this.shooting >= 98) {
			this.xPos += this.speed;
			if (this.diagonal >= 9) {
				this.yPos += this.speed;
			}
		}
	}

	display() {
		fill(this.c);
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
		stroke(lineColor); // TODO: Line Color interactable?
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
	startStars = floor(random(250, 350));
	for (let i = 0; i < startStars; i++) {
		stars.push(new Star());
	}
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
	background(color_pal[0]);
	textAlign(CENTER);
	fill(color_pal[5]);
	textSize(22);
	textFont('semplicitapro, sans-serif');
	text('Click stars to draw a constellation!', width / 2, height / 2 - 50);
	text(
		'Press space to change the color of your lines!',
		width / 2,
		height / 2
	);
	text(
		'Total distance of your constellation is tracked!',
		width / 2,
		height / 2 + 50
	);
	textSize(18);
	text('press esc', width / 2, height / 2 + 250);
}

function start() {
	background(color_pal[1]);
	noStroke();
	textAlign(CENTER);
	textSize(72);
	for (let i = 0; i < stars.length; i++) {
		stars[i].display();
		stars[i].move();
	}
	fill(color_pal[4]);
	textFont('nasalization, sans-serif');
	text('stars', width / 2, height / 2);
	textSize(18);
	text("press enter or 'h' for help", width / 2, height / 2 + 250);
}

function main() {
	background('black');
	noStroke();
	textStyle(NORMAL);
	fill('blue');
	textFont('semplicitapro, sans-serif');
	textSize(20);

	for (let i = 0; i < stars.length; i++) {
		stars[i].display();
		stars[i].move();
	}

	for (let i = 0; i < lines.length; i++) {
		lines[i].display();
	}

	fill('#ba1e68');
	noStroke();
	textAlign(LEFT);
	text('Light Years: ' + floor(total) / 100 / 2, 20, 30);
	textSize(18);
	text('press esc to reset', 20, height / 2 + 290);
}

function mouseClicked() {
	if (mouseX <= width && mouseX >= 0 && mouseY <= height && mouseY >= 0) {
		numshooting = floor(random(3, 10));
		for (let i = 0; i < numshooting; i++) {
			stars.push(
				new Star(
					floor(random(0, width)),
					floor(random(0, height)),
					floor(random(1, 9)),
					floor(random(2, 8)),
					floor(random(200, 255)),
					floor(random(200, 255)),
					floor(random(200, 255)),
					99
				)
			);
		}
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
		console.log('Positions: ', positions);
		console.log('Lines: ', lines);
		console.log('Total: ', total);
		console.log('------------');
	}
}

function keyPressed() {
	// Enter
	if (keyCode == 13 && mode == 0) {
		while (stars.length > 0) {
			stars.pop();
		}
		num_of_stars = floor(random(250, 350));
		for (let i = 0; i < num_of_stars; i++) {
			stars.push(new Star());
		}
		mode = 1;
	}
	// Esc
	if (keyCode == 27 && (mode == 1 || mode == 2)) {
		reset();
	}
	// H
	if (keyCode == 72 && mode == 0) {
		mode = 2;
	}
	// Space
	if (keyCode == 32 && mode == 1) {
		// Color Switching
		if (bin == 0) {
			lineColor = color_pal[2];
			bin = 1;
		} else if (bin == 1) {
			lineColor = color_pal[3];
			bin = 2;
		} else if (bin == 2) {
			lineColor = color_pal[7];
			bin = 0;
		}
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
	lineColor = color_pal[3];
	mode = 0;
	total = 0;
	num_of_stars = floor(random(250, 350));
	for (let i = 0; i < num_of_stars; i++) {
		stars.push(new Star());
	}
}

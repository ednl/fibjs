const steps = 50;
const x0 = 300;
const x1 = 700;
const y = 400;

var f0, f1, d0, d1;  // fixed circles
var x2, f2, d2;      // moving circle
var step, ratio, moving, factor;
var movestep, numstep, growstep;

function initfib(first, second) {
	f0 = first;
	f1 = second;
	d0 = sqrt(f0) * factor;
	d1 = sqrt(f1) * factor;
	const num = max(f0, f1);
	const den = min(f0, f1);
	ratio = '' + num + ' / ' + den + ' = ' + (den ? num / den : '?');
	moving = false;
}

function resetfib() {
	factor = 20;
	initfib(0, 1);
}

function nextfib() {
	if (d0 > height || d1 > height) {
		factor /= 20;
	}
	if (f1 > f0) {
		initfib(f0 + f1, f1);
	} else {
		initfib(f0, f0 + f1);
	}
}

function setup() {
	createCanvas(1000, 800);
	strokeWeight(1);
	stroke(0);
	textAlign(CENTER, CENTER);
	textSize(16);
	resetfib();
}

function draw() {
	// Clear screen
	background(51);

	// Draw two fixed circles in the right overlapping order
	fill(255);
	if (f0 < f1) {
		circle(x0, y, d0);
		circle(x1, y, d1);
	} else {
		circle(x1, y, d1);
		circle(x0, y, d0);
	}

	if (moving) {
		// Moving circle
		fill(102, 153, 255, 150);
		circle(x2, y, d2);
		fill(0);
		text('' + round(f2), x2, y);

		// Advance animation
		if (++step > steps) {
			// Destination reached
			nextfib();
		} else {
			// Next step
			x2 += movestep;
			f2 += numstep;
			d2 += growstep;
		}
	}

	// Numbers on top always visible
	fill(0);
	text('' + f0, x0, y);
	text('' + f1, x1, y);
	fill(255, 255, 0);
	text(ratio, width / 2, height - 20);

	//
	if (mouseIsPressed) {
		if (mouseButton === LEFT) {
			if (!moving) {
				step = 0;
				if (f1 > f0) {
					x2 = x1;
					f2 = f1;
					d2 = d1;
					movestep = (x0 - x1) / steps;
					numstep = f0 / steps;
					growstep = (sqrt(f0 + f1) * factor - d1) / steps;
				} else {
					x2 = x0;
					f2 = f0;
					d2 = d0;
					movestep = (x1 - x0) / steps;
					numstep = f1 / steps;
					growstep = (sqrt(f0 + f1) * factor - d0) / steps;
				}
				moving = true;
			}
		} else {
			if (mouseX < width && mouseY < height) {
				resetfib();
			}
		}
	}
}

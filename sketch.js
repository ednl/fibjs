const factor = 8;
const steps = 20;
const x0 = 300;
const x1 = 700;
const y = 450;

var f0 = 0, f1 = 1;
var f2 = f0 + f1;

var moving = false;
var step, dir;

document.oncontextmenu = function() {
    return false;
}

function setup() {
	createCanvas(1024, 900);
	strokeWeight(1);
	stroke(0);
	textAlign(CENTER, CENTER);
	textSize(16);
}

function mousePressed() {
	if (mouseButton === LEFT) {
		if (!moving) {
			step = 0;
			movestep = abs(x1 - x0) / steps;
			growstep = min(f0, f1) / steps;
			dir = f1 > f0 ? -1 : 1;
			moving = true;
			return false;
		}
	} else if (mouseButton === RIGHT) {
		if (mouseX >= 0 && mouseX <= width && mouseY >= 0 && mouseY <= height) {
			moving = false;
			f0 = 0;
			f1 = 1;
			return false;
		}
	}
}

function draw() {
	background(102);
	fill(255);
	if (f0 < f1) {
		circle(x0, y, 2 * sqrt(f0) * factor);
		circle(x1, y, 2 * sqrt(f1) * factor);
	} else {
		circle(x1, y, 2 * sqrt(f1) * factor);
		circle(x0, y, 2 * sqrt(f0) * factor);
	}

	fill(0);
	text('' + f0, x0, y);
	text('' + f1, x1, y);

	if (f0 > 0 && f1 > 0) {
		const n = max(f0, f1);
		const d = min(f0, f1);
		const phi = round(n / d, 6);
		text('' + n + ' / ' + d + ' = ' + phi, width / 2, height - 20);
	}

	if (moving) {
		fill(153);
		if (dir == -1) {
			circle(x1 - step * movestep, y, 2 * sqrt(f1 + step * growstep) * factor);
		} else {
			circle(x0 + step * movestep, y, 2 * sqrt(f0 + step * growstep) * factor);
		}
		step++;
		if (step > steps) {
			moving = false;
			if (dir == -1) {
				f0 += f1;
			} else {
				f1 += f0;
			}
		}
	}
}

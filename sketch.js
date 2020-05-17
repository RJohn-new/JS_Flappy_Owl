var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

var bird = new Image();
var bg = new Image();
var topPipe = new Image();
var botPipe = new Image();


bg.src = "bg.png";
bird.src = "owl.png";
topPipe.src = "TopPipe.png";
botPipe.src = "BottomPipe.png";

var gap = 125;
var place = topPipe.height + gap;

var bX = 100;
var bY = 300;
var gravity = 1;
var score = 0;

document.addEventListener("keydown", jump);
function jump() {
	bY += -30;
}

var pipes = [];
pipes[0] = {
	x : canvas.width,
	y : 0
};

function draw() {
	ctx.drawImage(bg, 0, 0);
	ctx.drawImage(bird, bX, bY);
	for (let i = 0; i < pipes.length; ++i) {
		ctx.drawImage(topPipe, pipes[i].x, pipes[i].y);
		ctx.drawImage(botPipe, pipes[i].x, pipes[i].y + place);
		
		pipes[i].x -= 2;
		
		if (pipes[i].x == 280) {
			pipes.push({
				x : canvas.width,
				y : Math.min(Math.floor(Math.random() * topPipe.height) - (topPipe.height / 2), 0)
			});
		}
		
		if (bX + bird.width >= pipes[i].x && bX <= pipes[i].x + topPipe.width && (bY <= pipes[i].y + topPipe.height 
			|| bY + bird.height >= pipes[i].y + place) || bY + bird.height >= canvas.height) {
			location.reload();
		}
		if (pipes[i].x == 100) score++;
		if (pipes[i].x ==0-pipes[i].width) pipes.splice(i, 1);
	}
	
	bY += gravity;
	
	ctx.fillStyle = "#000";
	ctx.font = "20px Arial";
	ctx.fillText("Score: " + score, 10, canvas.height - 20);
	
	requestAnimationFrame(draw);
	
	
}
draw();
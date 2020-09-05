var c = document.getElementById("main");
c.width = 400;
c.height = 400;
var g = c.getContext("2d");
var snake = [{x:200,y:200},{x:200,y:210}];
var dir=3;//left up right down: 1 2 3 4
window.addEventListener('keydown',this.changeDir,false);
var food_x = Math.round((c.width-10)*Math.random()/10)*10;
var food_y = Math.round((c.height-10)*Math.random()/10)*10;
var gameon=true;
function myFunc(){
	setTimeout(
	function onTick(){
		g.fillStyle = "#000000";
		g.fillRect(0,0,c.width,c.height);
		move();
		drawSnake();
		if(gameon)
		myFunc();
	},100);
}

myFunc();

function drawSnake(){
if(gameon){
	var l = snake.length;
	var i=0;
	g.fillStyle = "white";
	for(i=0;i<l;i++){
		g.fillRect(snake[i].x,snake[i].y,10,10);
	}
	g.fillStyle = "red";
	g.fillRect(food_x,food_y,10,10);}
	else{
	g.fillStyle = "white";
	g.fillText("Game Over",180,190);
	g.fillText("Press any key to restart",180,210);
	}
}
function move(){
	var l = snake.length;
	var i=0;
	var tail = {x:snake[l-1].x,y:snake[l-1].y};
	for(i=l-1;i>0;i--){
		snake[i].x = snake[i-1].x;
		snake[i].y = snake[i-1].y;
	}
	if(dir==1)
		snake[0].x-=10;
	else if(dir==2)
		snake[0].y-=10;
	else if(dir==3)
		snake[0].x+=10;
	else if(dir==4)
		snake[0].y+=10;
	if(collided()){
		gameon=false;
	}
	if(snake[0].x<0)gameon=false;
	if(snake[0].y<0)gameon=false;
	if(snake[0].x>400)gameon=false;
	if(snake[0].y>400)gameon=false;
	if(snake[0].x == food_x && snake[0].y==food_y){
		snake[l] = tail;
		food_x = Math.round((c.width-10)*Math.random()/10)*10;
		food_y = Math.round((c.height-10)*Math.random()/10)*10;
	}
}

function collided(){
	var l = snake.length;
	var i=0;
	var j=0;
	for(i=0;i<l;i++){
		for(j=0;j<l;j++){
			if(i!=j && snake[i].x==snake[j].x && snake[i].y==snake[j].y)
			return true;
		}
	}
	return false;
}

function changeDir(event){
	if(gameon){
	var key = dir;
	if(event.keyCode==37 && dir!=3)dir=1;
	else if(event.keyCode==38 && dir!=4)dir=2;
	else if(event.keyCode==39 && dir!=1)dir=3;
	else if(event.keyCode==40 && dir!=2)dir=4;}
	else{gameon=true;myFunc();snake = [{x:200,y:200},{x:200,y:210}];dir=3;}
}



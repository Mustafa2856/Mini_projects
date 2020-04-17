const algoselect = document.getElementById("algoselect");
algoselect.onchange = (event) => {current=algoselect.value;}
let current = algoselect.value;
let grid = [];
const display = document.getElementById("display");
let g = display.getContext("2d");
const cellsize = 10;
const w = Math.floor(display.width/cellsize);
const h = Math.floor(display.height/cellsize);
for(let i=0;i<w;i++){
	grid[i] = [];
	for(let j=0;j<h;j++)
		grid[i][j] = {x:i,y:j,type:0,parent:null,globalv:Infinity,localv:Infinity,path:false};
}
let startx=0;
let starty=0;
grid[startx][starty].type=2;
let endx=w-1;
let endy=h-1;
grid[endx][endy].type=3;

display.onclick = (event) => {
	let x = Math.floor(event.offsetX/cellsize);
	let y = Math.floor(event.offsetY/cellsize);
	if(event.shiftKey){
		for(let i=0;i<w;i++){
			for(let j=0;j<h;j++){
				if(grid[i][j].type==2)grid[i][j].type=0;
			}
		}
		startx = x;starty = y;
		grid[x][y].type=2;
	}
	else if(event.ctrlKey){
		for(let i=0;i<w;i++){
			for(let j=0;j<h;j++){
				if(grid[i][j].type==3)grid[i][j].type=0;
			}
		}
		endx = x;endy = y;
		grid[x][y].type=3;
	}else{
		if(grid[x][y].type==1)grid[x][y].type=0;
		else grid[x][y].type=1;
	}
	draw();
}

const draw = () => {
	g.fillStyle = "grey";
	g.fillRect(0,0,display.width,display.height);
	g.fillStyle = "white";
	for(let i=0;i<w;i++){
		for(let j=0;j<h;j++){
			if(grid[i][j].type == 3)g.fillStyle = "red";
			else if(grid[i][j].path)g.fillStyle = "yellow";
			else if(grid[i][j].type==0 && grid[i][j].globalv==Infinity)g.fillStyle = "white";
			else if(grid[i][j].type == 1)g.fillStyle = "blue";
			else if(grid[i][j].type == 2)g.fillStyle = "green";
			else g.fillStyle = "pink";
			g.fillRect(i*cellsize+1,j*cellsize+1,cellsize-2,cellsize-2);
		}
	}
}

draw();

const genb = document.getElementById("gen");
genb.onclick = (event) => {
	generate();
}

const startb = document.getElementById("start");
startb.onclick = (event) => {
	if(current=="A star")
		astar();
}

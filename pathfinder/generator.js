const generate = () => {
	genptr=0;
	gen[genptr] = {x:startx,y:starty};
	for(let i=0;i<w;i++){
		for(let j=0;j<h;j++){
			grid[i][j].parent=null;
			grid[i][j].globalv=Infinity;
			grid[i][j].localv=Infinity;
			grid[i][j].path=false;
		}
	}
	grid[startx][starty].localv = 0;
	grid[startx][starty].globalv = grid[startx][starty].localv + hueristic(startx,starty);
	for(let i=0;i<w;i++){
		for(let j=0;j<h;j++){
			grid[i][j].type=1;
		}
	}
	grid[startx][starty].type=2;
	grid[endx][endy].type=3;
	if(starty<h-1)grid[startx][starty+1].type=0;
	if(starty>0)grid[startx][starty-1].type=0;
	if(startx<w-1)grid[startx+1][starty].type=0;
	if(startx>0)grid[startx-1][starty].type=0;
	if(endy<h-1)grid[endx][endy+1].type=0;
	if(endy>0)grid[endx][endy-1].type=0;
	if(endx<w-1)grid[endx+1][endy].type=0;
	if(endx>0)grid[endx-1][endy].type=0;
	genstep();
}

let gen = [];
let genptr=-1;
let avail = [];

const genstep = () => {
	let cur = gen[genptr];
	check(cur);
	let r = avail.length;
	if(r==0){
		if(genptr!=0)
		{genptr--;
		genstep();}else draw();
	}else{
		r = Math.floor(r*Math.random());
		r = avail[r];
		if(r==0){
			grid[cur.x-1][cur.y].type=0;
			grid[cur.x-2][cur.y].type=0;
			cur.x = cur.x-2;
		}
		else if(r==1){
			grid[cur.x][cur.y-1].type=0;
			grid[cur.x][cur.y-2].type=0;
			cur.y = cur.y-2;
		}
		else if(r==2){
			grid[cur.x+1][cur.y].type=0;
			grid[cur.x+2][cur.y].type=0;
			cur.x = cur.x+2;
		}
		else if(r==3){
			grid[cur.x][cur.y+1].type=0;
			grid[cur.x][cur.y+2].type=0;
			cur.y = cur.y+2;
		}
		genptr++;
		gen[genptr]={x:cur.x,y:cur.y};
		genstep();
	}
}

const check = (cur) => {
	avail = [];
	if(cur.x > 1 && grid[cur.x-2][cur.y].type==1)
	avail.push(0);
	if(cur.y > 1 && grid[cur.x][cur.y-2].type==1)
	avail.push(1);
	if(grid[cur.x+2] && grid[cur.x+2][cur.y].type==1)
	avail.push(2);
	if(grid[cur.x][cur.y+2] && grid[cur.x][cur.y+2].type==1)
	avail.push(3);
}

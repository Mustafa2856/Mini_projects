const dsort = (ptr) => {
	if(ptr<=0)return;
	dmergesort(0,ptr);
}

function dmergesort(s,e){
        if(s<e){
            let m = Math.floor((s+e)/2);
            dmergesort(s,m);
            dmergesort(m+1,e);
            dmerge(s,e,m);
        }
    }

function dmerge(s,e,m){
        let i1=s;let i2=m+1;
        let c = [];let count=0;
        while(i1<=m && i2<=e){
            if((dstep[i1].localv)>(dstep[i2].localv)){
                c[count]=dstep[i1];
                i1++;
                count++;
            }
            else{
                c[count]=dstep[i2];
                i2++;
                count++;
            }
        }
        while(i1<=m){
            c[count]=dstep[i1];
            i1++;
            count++;
        }
        while(i2<=e){
            c[count]=dstep[i2];
            i2++;
            count++;
        }
        for(let i=s;i<=e;i++)dstep[i]=c[i-s];
    }

const dijik = () => {
	dstep = [];
	dfound=false;
	dstepptr=0;
	for(let i=0;i<w;i++){
		for(let j=0;j<h;j++){
			grid[i][j].parent=null;
			grid[i][j].globalv=Infinity;
			grid[i][j].localv=Infinity;
			grid[i][j].path=false;
		}
	}
	grid[startx][starty].localv = 0;
	//grid[startx][starty].globalv = grid[startx][starty].localv + hueristic(startx,starty);
	dstep[dstepptr] = grid[startx][starty];
	dijikstep();
}

let dstep = [];
let dstepptr = -1;
let dfound=false;

const dijikstep = () => {
	draw();
	setTimeout(
	() => {
		let check = dstep[dstepptr];
		dstepptr--;
		if(check.x == endx && check.y==endy)
		dfound=true;
		if(check.x<(w-1)){
			if(grid[check.x+1][check.y].localv>(grid[check.x][check.y].localv+1) && grid[check.x+1][check.y].type!=1){
				dstepptr++;
				grid[check.x+1][check.y].localv = grid[check.x][check.y].localv+1;
				grid[check.x+1][check.y].globalv = grid[check.x][check.y].localv+1+ hueristic(check.x+1,check.y);
				grid[check.x+1][check.y].parent = grid[check.x][check.y];
				dstep[dstepptr] = grid[check.x+1][check.y];
			}
		}
		if(check.y<(h-1)){
			if(grid[check.x][check.y+1].localv>(grid[check.x][check.y].localv+1) && grid[check.x][check.y+1].type!=1){
				dstepptr++;
				grid[check.x][check.y+1].localv = grid[check.x][check.y].localv+1;
				grid[check.x][check.y+1].globalv = grid[check.x][check.y].localv+1+ hueristic(check.x,check.y+1);
				grid[check.x][check.y+1].parent = grid[check.x][check.y];
				dstep[dstepptr] = grid[check.x][check.y+1];
			}
		}
		if(check.x>0){
			if(grid[check.x-1][check.y].localv>(grid[check.x][check.y].localv+1) && grid[check.x-1][check.y].type!=1){
				dstepptr++;
				grid[check.x-1][check.y].localv = grid[check.x][check.y].localv+1;
				grid[check.x-1][check.y].globalv = grid[check.x][check.y].localv+1+ hueristic(check.x-1,check.y);
				grid[check.x-1][check.y].parent = grid[check.x][check.y];
				dstep[dstepptr] = grid[check.x-1][check.y];
			}
		}
		if(check.y>0){
			if(grid[check.x][check.y-1].localv>(grid[check.x][check.y].localv+1) && grid[check.x][check.y-1].type!=1){
				dstepptr++;
				grid[check.x][check.y-1].localv = grid[check.x][check.y].localv+1;
				grid[check.x][check.y-1].globalv = grid[check.x][check.y].localv+1+ hueristic(check.x,check.y-1);
				grid[check.x][check.y-1].parent = grid[check.x][check.y];
				dstep[dstepptr] = grid[check.x][check.y-1];
			}
		}
		dsort(dstepptr);
		if(dfound){
			let s = grid[endx][endy];
			while(s.parent!=null){
				grid[s.x][s.y].path=true;
				s=grid[s.x][s.y].parent;
			}
			draw();
		}
		if(dstepptr!=-1 && !dfound)dijikstep();
	},1);
}

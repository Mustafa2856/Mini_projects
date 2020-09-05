const msort = (ptr) => {
	if(ptr<=0)return;
	mmergesort(0,ptr);
}

function mmergesort(s,e){
        if(s<e){
            let m = Math.floor((s+e)/2);
            mmergesort(s,m);
            mmergesort(m+1,e);
            mmerge(s,e,m);
        }
    }

function mmerge(s,e,m){
        let i1=s;let i2=m+1;
        let c = [];let count=0;
        while(i1<=m && i2<=e){
            if((mstep[i1].globalv-mstep[i1].localv)>(mstep[i2].globalv-mstep[i2].localv)){
                c[count]=mstep[i1];
                i1++;
                count++;
            }
            else{
                c[count]=mstep[i2];
                i2++;
                count++;
            }
        }
        while(i1<=m){
            c[count]=mstep[i1];
            i1++;
            count++;
        }
        while(i2<=e){
            c[count]=mstep[i2];
            i2++;
            count++;
        }
        for(let i=s;i<=e;i++)mstep[i]=c[i-s];
    }

const mastar = () => {
	mstep = [];
	mfoundastar=false;
	mstepptr=0;
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
	mstep[mstepptr] = grid[startx][starty];
	mastarstep();
}

let mstep = [];
let mstepptr = -1;
let mfoundastar=false;

const mastarstep = () => {
	draw();
	setTimeout(
	() => {
		let check = mstep[mstepptr];
		mstepptr--;
		if(check.x == endx && check.y==endy)
		mfoundastar=true;
		if(check.x<(w-1)){
			if(grid[check.x+1][check.y].localv>(grid[check.x][check.y].localv+1) && grid[check.x+1][check.y].type!=1){
				mstepptr++;
				grid[check.x+1][check.y].localv = grid[check.x][check.y].localv+1;
				grid[check.x+1][check.y].globalv = grid[check.x][check.y].localv+1+ hueristic(check.x+1,check.y);
				grid[check.x+1][check.y].parent = grid[check.x][check.y];
				mstep[mstepptr] = grid[check.x+1][check.y];
			}
		}
		if(check.y<(h-1)){
			if(grid[check.x][check.y+1].localv>(grid[check.x][check.y].localv+1) && grid[check.x][check.y+1].type!=1){
				mstepptr++;
				grid[check.x][check.y+1].localv = grid[check.x][check.y].localv+1;
				grid[check.x][check.y+1].globalv = grid[check.x][check.y].localv+1+ hueristic(check.x,check.y+1);
				grid[check.x][check.y+1].parent = grid[check.x][check.y];
				mstep[mstepptr] = grid[check.x][check.y+1];
			}
		}
		if(check.x>0){
			if(grid[check.x-1][check.y].localv>(grid[check.x][check.y].localv+1) && grid[check.x-1][check.y].type!=1){
				mstepptr++;
				grid[check.x-1][check.y].localv = grid[check.x][check.y].localv+1;
				grid[check.x-1][check.y].globalv = grid[check.x][check.y].localv+1+ hueristic(check.x-1,check.y);
				grid[check.x-1][check.y].parent = grid[check.x][check.y];
				mstep[mstepptr] = grid[check.x-1][check.y];
			}
		}
		if(check.y>0){
			if(grid[check.x][check.y-1].localv>(grid[check.x][check.y].localv+1) && grid[check.x][check.y-1].type!=1){
				mstepptr++;
				grid[check.x][check.y-1].localv = grid[check.x][check.y].localv+1;
				grid[check.x][check.y-1].globalv = grid[check.x][check.y].localv+1+ hueristic(check.x,check.y-1);
				grid[check.x][check.y-1].parent = grid[check.x][check.y];
				mstep[mstepptr] = grid[check.x][check.y-1];
			}
		}
		msort(mstepptr);
		if(mfoundastar){
			let s = grid[endx][endy];
			while(s.parent!=null){
				grid[s.x][s.y].path=true;
				s=grid[s.x][s.y].parent;
			}
			draw();
		}
		if(mstepptr!=-1 && !mfoundastar)mastarstep();
	},1);
}

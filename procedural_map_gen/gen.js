//generates maps 

class noise{

	constructor(height,width){
		this.height = height;
		this.width = width;
		this.map = [];
		for(let i=0;i<height;i++){
			this.map[i] = [];
			for(let j=0;j<width;j++)this.map[i][j] = Math.random();
		}
	}
	
	drawmap(){
		for(let i=0;i<this.height;i++){
			for(let j=0;j<this.width;j++){
				let color = "rgb(";
				color = color + this.map[i][j] + ",0,0)";
				console.log(color);
				g.fillStyle = color;
				g.fillRect(j,i,1,1);	
			}
		}
	}
	
}

let c = new noise(500,1000);
c.drawmap();

const alg = document.getElementById("algoselect");
let current = "Bubble Sort";
alg.onchange = (event) => {current = alg.value;nextstep();}
let arr = [];
let slider = document.getElementById('size');
let size=slider.value;
slider.onchange = (event) => {
	size=slider.value;arr=[];
	for(let i=0;i<size;i++)
		arr[i] = i+1;
	draw();
}
for(let i=0;i<size;i++)
arr[i] = i+1;
const shuffle = () => {
	for(let i=0;i<arr.length*2;i++){
		let j1 = Math.floor(arr.length*Math.random());
		let j2 = Math.floor(arr.length*Math.random());
		let temp = arr[j1];
		arr[j1]=arr[j2];
		arr[j2]=temp;
	}
}

const canvas = document.getElementById("display");
let g = canvas.getContext("2d");
const draw = (a,b) => {
	g.fillStyle = "black";
	g.fillRect(0,0,canvas.width,canvas.height);
	g.fillStyle = "white";
	let w = 1300/arr.length;let h=500/arr.length;
	for(let i=0;i<arr.length;i++){
		g.fillRect(i*w,500-arr[i]*h,w,arr[i]*h);
	}
	if(a){g.fillStyle = "red";g.fillRect(a*w,500-arr[a]*h,w,arr[a]*h);}
	if(b){g.fillStyle = "red";g.fillRect(b*w,500-arr[b]*h,w,arr[b]*h);}
}
draw();

const shuffler = document.getElementById("shuffle");
shuffler.onclick = (event) => {
	shuffle();
	draw();
}

const starter = document.getElementById("start");
starter.onclick = (event) => {
	nextstep();
	draw();
}

const nextstep = () => {
	if(current=="Bubble Sort")
		bubble();
	if(current=="Insertion Sort")
		insertion();
	if(current=="Quick Sort")
		quick();
	if(current=="Merge Sort")
		merge();
}

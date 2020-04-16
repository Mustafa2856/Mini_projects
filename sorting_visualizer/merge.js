const merge = () => {
	le=[];re=[];stp=-1;
	mergestack(0,arr.length-1);
	stp++;le[stp]=0;re[stp]=arr.length-1;
	mergestep(0,-1,-1,0,[]);
}
function mergestack(s,e){
	if(s<e){
		let m = Math.floor((s+e)/2);
		mergestack(s,m);
		if(s!=m){
		stp++;
		le[stp]=s;
		re[stp]=m;}
		mergestack(m+1,e);
		if(m+1!=e){
		stp++;
		le[stp]=m+1;
		re[stp]=e;}
	}
}
let le = [];
let re = [];
let stp=-1;

function drawmerging(arr1,s,a){
	g.fillStyle = "black";
	let w = 1300/arr.length;let h=500/arr.length;
	g.fillRect(s*w,0,w*arr1.length,500);
	g.fillStyle = "white";
	for(let i=0;i<arr1.length;i++){
		g.fillRect(s*w+i*w,500-arr1[i]*h,w,arr1[i]*h);
	}a=a-1;
	if(a){g.fillStyle = "red";g.fillRect(s*w+a*w,500-arr1[a]*h,w,arr1[a]*h);}
}

function mergestep(p,i1,i2,count,arr1){
	setTimeout(
	function onTick(){
		draw();
		if(p<le.length){
		drawmerging(arr1,le[p],count);
			let s = le[p];
			let e = re[p];
			let m = Math.floor((s+e)/2);
			if(i1==-1 && i2==-1){
				i1=s;i2=m+1;
			}
			if(i1<=m && i2<=e){
				if(arr[i1]<arr[i2]){
					arr1[count]=arr[i1];i1++;count++;mergestep(p,i1,i2,count,arr1);
				}else{
					arr1[count]=arr[i2];i2++;count++;mergestep(p,i1,i2,count,arr1);
				}
			}else if(i1<=m){
				arr1[count]=arr[i1];i1++;count++;mergestep(p,i1,i2,count,arr1);
			}else if(i2<=e){
				arr1[count]=arr[i2];i2++;count++;mergestep(p,i1,i2,count,arr1);
			}else{
				for(let i=0;i<arr1.length;i++)arr[s+i]=arr1[i];
				mergestep(p+1,-1,-1,0,[]);
			}
		}
	},10);
}


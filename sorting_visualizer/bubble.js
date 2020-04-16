const bubble = () => {
	bubblestep(0,0);
}

function bubblestep(i,j){
if(current=="Bubble Sort"){
	setTimeout(
	function onTick(){
		if(arr[j]>arr[j+1]){
			let t = arr[j];
			arr[j]=arr[j+1];
			arr[j+1]=t;
		}
		draw(j);
		if(i==arr.length-1){darw();}
		else if(j==arr.length-i-1)bubblestep(i+1,0);
		else bubblestep(i,j+1);
	},10);}
}


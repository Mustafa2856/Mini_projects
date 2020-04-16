const insertion = () => {
	ifin=false;
	insertionstep(1,0,arr[1]);
}

let ifin=false;

function insertionstep(i,j,value){
if(current=="Insertion Sort"){
	setTimeout(
	function onTick(){
		draw(j);
		if(j>=0 && arr[j]>value){
			arr[j+1]=arr[j];
			arr[j]=value;
			j--;
			insertionstep(i,j,value);
		}
		else if(!ifin){
			arr[j+1]=value;
			if(i<arr.length-1){
				i++;
				value=arr[i];
				j=i-1;
				insertionstep(i,j,value);
			}
			else{ifin=true;draw();}
		}
	},10);}
}


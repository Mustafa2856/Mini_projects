const quick = () => {
	qfin=false;
	l=[];r=[];
	sp=0;
	l[sp]=0;
	r[sp]=arr.length-1;
	pos=0;startf=true;
	quickstep(l[0],r[0],sp);
}
let qfin=false;
let l = [];
let r = [];
let sp=0;
let pos;let startf=true;

function quickstep(s,e,c){
if(current=="Quick Sort"){
	setTimeout(
	function onTick(){
		draw(pos);
		if(c==0){
			s=l[sp+1];e=r[sp+1];
			if(s<pos-1){
				sp++;
				l[sp]=s;
				r[sp]=pos-1;
			}
			if(pos+1<e && !startf){
				sp++;
				l[sp]=pos+1;
				r[sp]=e;
			}
			if(sp!=-1){
			sp--;startf=false;
			pos = l[sp+1];
			quickstep(l[sp+1],r[sp+1],1);}if(sp==-1){draw();}
		}
		else if(c==1){
			while(arr[pos]<=arr[e] && pos!=e)
				e--;
			if(pos==e)
				quickstep(s,e,0);
			else if(arr[pos]>arr[e]){
				let t = arr[pos];
				arr[pos]=arr[e];
				arr[e]=t;
				pos=e;
				quickstep(s,e,2);
			}
		}
		else if(c==2){
			while(arr[pos]>=arr[s] && pos!=s)
				s++;
			if(pos==s)
				quickstep(s,e,0);
			else if(arr[pos]<arr[s]){
				let t = arr[pos];
				arr[pos]=arr[s];
				arr[s]=t;
				pos=s;
				quickstep(s,e,1);
			}
		}
	},10);}
}


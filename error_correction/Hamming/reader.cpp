#include <iostream>
#include <vector>
#include <ctime>

void print128(__uint128_t dat){
    printf("%016llx",dat>>64);
    printf("%016llx\n",dat); 
}

__uint128_t hex_to_int(std::string hex){
    __uint128_t b=0,k=1;uint16_t len = hex.length();
    for(int i=0;i<len;i++){
        if(hex[i]>57){
            k = hex[i]-87;
            b|= k<<((len-i-1)<<2);
        }else{
            k = hex[i]-48;
            b|= k<<((len-i-1)<<2);
        }
    }
    return b;
}

int main(){
    std::vector<std::string> hex;int len;
    std::cin>>len;
    for(int i=0;i<len;i++){
        hex.push_back("");
        std::cin>>hex[i];
    }
    std::vector<__uint128_t> blocks;__uint128_t k=1;int c=0;
    for(int i=0;i<len;i++)
    blocks.push_back(hex_to_int(hex[i]));
    //simulating error
    srand((unsigned)time(0));
    for(int i=0;i<len;i++){
        int c = rand()%128;
        blocks[i]^=k<<c;
    }
    uint8_t parity=0,count=0;
    for(int i=0;i<len;i++){
        parity=0;
        for(uint8_t j=0;j<128;j++){
            if(blocks[i]&(k<<j)){
            parity^=j;count++;}
        }
        blocks[i]^= k<<parity;
    }
    uint8_t data[len*15+1];
    for(int i=0;i<len*15+1;i++)data[i]=0;
    for(int i=0;i<len;i++){
        c=0;
        for(int j=0;j<128;j++){
            if(!(j&(j-1)))continue;
            data[i*15+c/8]|= (uint8_t)((blocks[i]&(k<<j))>>(j-c%8));
            c++;
        }
    }
    std::cout<<data<<std::endl;
    return 0;
}

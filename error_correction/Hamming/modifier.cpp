#include <iostream>
#include <vector>

void print128(__uint128_t dat){
    printf("%016llx",dat>>64);
    printf("%016llx\n",dat); 
}

int main(){
    std::string rawdata;
    std::getline(std::cin,rawdata);
    std::vector<uint8_t> bytes;
    uint16_t len = rawdata.length();
    for(int i=0;i<len;i++)bytes.push_back(rawdata[i]);
    for(int i=0;i<len%15;i++)bytes.push_back(0);
    len+=(15 - len%15)%15;
    std::vector<__uint128_t> blocks;
    for(int i=0;i<len/15;i++){
        blocks.push_back(0);
        int c=3;
        for(int j=0;j<120;j++){
            c+=!(c&(c-1));
            blocks[i]|=(__uint128_t)(bytes[i*15+j/8]&1<<(j%8))<<(c-j%8);
            c++;
        }
        uint8_t parity=0,count=0;__uint128_t k=1;
        for(uint8_t j=0;j<128;j++){
            if(blocks[i]&(k<<j)){
            parity^=j;count++;}
        }
        for(int j=0;j<8;j++){
            blocks[i]|=k<<((1<<j)&parity);
            if(k<<((1<<j)&parity))count++;
        }
        blocks[i]|= count&1;
    }
    printf("%d\n",len/15);
    for(int i=0;i<len/15;i++)print128(blocks[i]);
    return 0;
}

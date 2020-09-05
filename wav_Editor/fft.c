#include <stdio.h>
#include <math.h>
#include <stdlib.h>

#define SIZE 10000000
#define BATCH 16388
#define PI 3.14159265F

typedef struct{double re;double im;} Complex;

int data[SIZE];
short left[SIZE],right[SIZE];
Complex tran[SIZE/BATCH][BATCH];
Complex tmp[BATCH];

void fft(Complex *v,int n,Complex *tmp){
    if(n<=1)return;
    Complex z,w,*vo,*ve;
    ve = tmp;
    vo = tmp + n/2;
    for(int i=0;i<n/2;i++){
        ve[i] = v[2*i];
        vo[i] = v[2*i+1];
    }
    fft(ve,n/2,v);
    fft(vo,n/2,v);
    for(int i=0;i<n/2;i++){
        w.re = cos(2*PI*i/(float)n);
        w.im = -sin(2*PI*i/(float)n);
        z.re = w.re * vo[i].re - w.im * vo[i].im;
        z.im = w.re * vo[i].im + w.im * vo[i].re;
        v[i].re = ve[i].re + z.re;
        v[i].im = ve[i].im + z.im;
        v[i+n/2].re = ve[i].re - z.re;
        v[i+n/2].im = ve[i].im - z.im;
    }
}

void ifft(Complex *v,int n,Complex *tmp){
    if(n<=1)return;
    Complex z,w,*vo,*ve;
    ve = tmp;
    vo = tmp + n/2;
    for(int i=0;i<n/2;i++){
        ve[i] = v[2*i];
        vo[i] = v[2*i+1];
    }
    ifft(ve,n/2,v);
    ifft(vo,n/2,v);
    for(int i=0;i<n/2;i++){
        w.re = cos(2*PI*i/(float)n);
        w.im = sin(2*PI*i/(float)n);
        z.re = w.re * vo[i].re - w.im * vo[i].im;
        z.im = w.re * vo[i].im + w.im * vo[i].re;
        v[i].re = (ve[i].re + z.re)/2;
        v[i].im = (ve[i].im + z.im)/2;
        v[i+n/2].re = (ve[i].re - z.re)/2;
        v[i+n/2].im = (ve[i].im - z.im)/2;
    }
}

int main(){
    FILE *file = fopen("test11.wav","rb");
    char head[40];
    int size;
    fread(head,1,40,file);
    fread(&size,4,1,file);
    size>>=2;
    fread(data,4,size,file);
    for(int i=0;i<size;i++){
        left[i] = (short)(data[i]&0xffff);
        right[i] = (short)((data[i]>>16)&0xffff);
        tran[i/BATCH][i%BATCH].re = left[i];
        tran[i/BATCH][i%BATCH].im = 0;
    }
    printf("Performing fft ... ");
    for(int i=0;i<size/BATCH;i++){
        fft(tran[i],BATCH,tmp);
    }
    ///////////////////////////////////////////////////////////////////////////////////////////////////////
    int start=80,end=200;float factor1=10;
    for(int i=0;i<size/BATCH;i++){
        for(int j=start;j<end;j++){
            tran[i][j].re*=factor1;
            tran[i][j].im*=factor1;
        }
        for(int j=end;j<BATCH;j++){
            tran[i][j].re=0;
            tran[i][j].im=0;
        }
        for(int j=0;j<start;j++){
            tran[i][j].re=0;
            tran[i][j].im=0;
        }
    }
    //////////////////////////////////////////////////////////////////////////////////////////////////////
    printf("Done\nPerforming inverse fft ... ");
    for(int i=0;i<size/BATCH;i++){
        ifft(tran[i],BATCH,tmp);
        for(int j=0;j<BATCH;j++){
            left[i*BATCH + j] = (short)(tran[i][j].re);
        }
    }
    printf("Done \n");
    FILE *out = fopen("output.wav","wb");
    fwrite(head,1,40,out);
    size = (size/BATCH) * BATCH;
    size<<=2;
    fwrite(&size,4,1,out);
    size>>=2;
    for(int i=0;i<size;i++){
        data[i] = (((int)left[i])&0xffff) | (((int)left[i])<<16);
    }
    fwrite(data,4,size,out);
    return 0;
}
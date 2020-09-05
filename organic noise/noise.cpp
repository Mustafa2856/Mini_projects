#include <iostream>
class Noise{
private:
    uint seed;
    uint seedx;
    uint seedy;
public:
    Noise(uint s){
        seed = s;
        srand(seed);
        seedx = rand();
        seedy = rand();
    }

    float getval(float x){
        srand(seed + (uint)x);
        float x0 = ((float)rand())/RAND_MAX;
        srand(seed + (uint)x + 1);
        float x1 = ((float)rand())/RAND_MAX;
        float r = x - (uint)x;
        r = 3*r*r - 2*r*r*r;
        r = x0 + (x1-x0)*r;
        return r;
    }

    float getval(float x,float y){
        srand(seedx + (uint)(x));
        uint x0 = rand();
        srand(seedx + (uint)(x + 1));
        uint x1 = rand();
        srand(seedy + (uint)(y));
        uint y0 = rand();
        srand(seedy + (uint)(y + 1));
        uint y1 = rand();
	srand(x0+y0);
        float p0 = ((float)rand())/RAND_MAX;
	srand(x1+y0);
        float p1 = ((float)rand())/RAND_MAX;
	srand(x0+y1);
        float p2 = ((float)rand())/RAND_MAX;
	srand(x1+y1);
        float p3 = ((float)rand())/RAND_MAX;
        float rx = x - (uint)x;
        rx = 3*rx*rx - 2*rx*rx*rx;
        float rx1 = p0 + (p1-p0)*rx;
        float rx2 = p2 + (p3-p2)*rx;
        float ry = y - (uint)y;
        ry = 3*ry*ry - 2*ry*ry*ry;
        ry = rx1 + (rx2-rx1)*ry;
        return ry;
    }
};

#define OLC_PGE_APPLICATION
#include "olcPixelGameEngine.h"
#include "noise.h"
#include <vector>
#include <iostream>

const int HEIGHT = 600;
const int WIDTH = 1200;

class Game : public olc::PixelGameEngine
{
public:
    Noise gen=Noise(rand());
	Noise gen1=Noise(rand());
	Noise gen2=Noise(rand());
	float buffer[WIDTH][HEIGHT];
	olc::vi2d buff_pointer;
	olc::vi2d pos;
	olc::HWButton left,right,up,down;

	Game()
	{
		sAppName = "Procedural Generation";
	}

	void setVal(int x,int y){
		buffer[x][y] = 
						0.60 * gen.getval(((x - buff_pointer.x)%WIDTH  + pos.x)/100.0,
							((y - buff_pointer.y)%HEIGHT + pos.y)/100.0) +
						0.35 * gen1.getval(((x - buff_pointer.x)%WIDTH + pos.x)/50.0,
							((y - buff_pointer.y)%HEIGHT + pos.y)/50.0) + 
						0.05 * gen2.getval(((x - buff_pointer.x)%WIDTH + pos.x)/10.0,
							((y - buff_pointer.y)%HEIGHT + pos.y)/10.0);
	}
	
	void move_x(int dx){
		int dir = dx>0?1:-1;
		buff_pointer.x+=dx;
		buff_pointer.x%=WIDTH;
		pos.x+=dx;
		for(int y = 0; y < HEIGHT; y++){
			for(int x = 0; x < WIDTH; x++){
				setVal(x,y);
			}
		}
	}

	void move_y(int dy){
		int dir = dy>0?1:-1;
		buff_pointer.y+=dy;
		buff_pointer.y%=HEIGHT;
		pos.y+=dy;
		for(int x = 0;x < WIDTH; x++){
			for(int y = dy;y!= 0; y-=dir){
				setVal(x,y);
			}
		}
	}

public:
	bool OnUserCreate() override
	{
		buff_pointer = {0,0};
		pos = {0,0};
		for (int x = 0; x < WIDTH; x++){
			for (int y = 0; y < HEIGHT; y++){
		        setVal(x,y);
			}
		}
		return true;
	}

	bool OnUserUpdate(float fElapsedTime) override
	{
		left = GetKey(olc::LEFT);
		right = GetKey(olc::RIGHT);
		up = GetKey(olc::UP);
		down = GetKey(olc::DOWN);
		if(up.bHeld)move_y((int)(-100 * fElapsedTime));
		else if(down.bHeld)move_y((int)(100 * fElapsedTime));
		else if(left.bHeld)move_x((int)(-100 * fElapsedTime));
		else if(right.bHeld)move_x((int)(100 * fElapsedTime));
		float a;
		for(int x = 0;x < WIDTH; x++){
			for(int y = 0;y< HEIGHT; y++){
				a = buffer[(x + buff_pointer.x)%WIDTH][(y + buff_pointer.y)%HEIGHT];
				olc::Pixel f = olc::BLUE;
				if(a>.3)f= olc::CYAN;
				if(a>.5)f= olc::GREEN;
				if(a>.7)f= olc::DARK_GREY;
				if(a>.9)f= olc::WHITE;
		        Draw(x,y,olc::Pixel(255*a,255*a,255*a));
				if(x==buff_pointer.x || y== buff_pointer.y)Draw(x,y,olc::RED);
			}
		}
		return true;
	}
};

int main()
{
	srand(std::time(NULL));
	Game demo;
	if (demo.Construct(WIDTH,HEIGHT,1,1))
		demo.Start();
	return 0;
}

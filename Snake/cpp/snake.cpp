#define OLC_PGE_APPLICATION
#include "olcPixelGameEngine.h"
#include <vector>
class Snake
{
public:
    std::vector<std::pair<int,int>> snake;
    int size;
    int dir;
    /*
        dir: 0 -> right
             1 -> down
             2 -> left
             3 -> up
    */
public:
    Snake(){
        snake.push_back(std::make_pair(0,-1));
        snake.push_back(std::make_pair(0,0));
        size = 2;
        dir = 0;
    }

    bool isColliding(){
        bool collided = false;
        for(int i=0;i<size-1;i++){
            if(snake[size-1].first==snake[i].first && snake[size-1].second==snake[i].second)
            {
                collided = true;
                break;
            }
        }
        return collided;
    }

    void move(bool grow){
        std::pair<int,int> new_head_pos = std::make_pair(snake[size-1].first,snake[size-1].second);
        if(dir==0)new_head_pos.second += 1;//right
        if(dir==1)new_head_pos.first += 1;//down
        if(dir==2)new_head_pos.second -= 1;//left
        if(dir==3)new_head_pos.first -= 1;//up
        if(grow){
            snake.push_back(new_head_pos);
            size++;
        }
        else{
            for(int i=0;i<size-1;i++){
                snake[i].first = snake[i+1].first;
                snake[i].second = snake[i+1].second;
            }
            snake[size-1].first = new_head_pos.first;
            snake[size-1].second = new_head_pos.second;
        }
    }

    void reset(){
        snake.clear();
        snake.push_back(std::make_pair(0,-1));
        snake.push_back(std::make_pair(0,0));
        size = 2;
        dir = 0;
    }
};

class Game : public olc::PixelGameEngine
{
private:
    Snake snake;
    float time;
    olc::HWButton left,right,up,down;
    std::pair<int,int> apple;

public:
	Game()
	{
		sAppName = "Snake";
	}

public:
    bool isColliding(){
        bool collided = false;
        if(fabs(snake.snake[snake.size-1].first)>ScreenHeight()/2)collided=true;
        if(fabs(snake.snake[snake.size-1].second)>ScreenWidth()/2)collided=true;
        collided |= snake.isColliding();
        return collided;
    }

    void setApple(){
        apple.first = rand()%(ScreenHeight()) - ScreenHeight()/2;
        apple.second = rand()%(ScreenWidth()) - ScreenWidth()/2;
    }

	bool OnUserCreate() override
	{
        time=0;
		return true;
	}

	bool OnUserUpdate(float fElapsedTime) override
	{
        left = GetKey(olc::LEFT);
        right = GetKey(olc::RIGHT);
        up = GetKey(olc::UP);
        down = GetKey(olc::DOWN);
        if(left.bPressed && snake.dir!=0)snake.dir=2;
        else if(right.bPressed && snake.dir!=2)snake.dir=0;
        else if(up.bPressed && snake.dir!=1)snake.dir=3;
        else if(down.bPressed && snake.dir!=3)snake.dir=1;

        int width=ScreenWidth()/2;
        int height = ScreenHeight()/2;
        FillRect(0,0,width*2,height*2,olc::BLACK);
		for (int i = 0; i < snake.size; i++)
			Draw(snake.snake[i].second + width,snake.snake[i].first+ height, olc::GREEN);
        Draw(apple.second + width,apple.first + height,olc::RED);
        time+=fElapsedTime;
        if(time>0.1){
            time=0;
            if(apple.first==snake.snake[snake.size-1].first && apple.second==snake.snake[snake.size-1].second)
            {
                snake.move(true);
                setApple();
            }
            else
            snake.move(false);
            if(isColliding()){
                snake.reset();
                setApple();
            }
        }
		return true;
	}

    
};


int main()
{
	Game main;
	if (main.Construct(50,50,10,10))
		main.Start();
	return 0;
}
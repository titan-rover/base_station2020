#ifndef IMU_H
#define IMU_H

#include <string>
#include <iostream>
#include <sstream>
#include <stdlib.h>

struct Quaternion{
    float x = 0.0;
    float y = 0.0;
    float z = 0.0;
    float w = 0.0;
};

struct Vector3{
    float x = 0.0;
    float y = 0.0;
    float z = 0.0;
};


class Imu{

public:
    Quaternion orientation;
    float orientation_covariance[9];
    Vector3 angular_velocity;
    float angular_velocity_covariance[9];
    Vector3 linear_acceleration;
    float linear_acceleration_covariance[9];

    Imu(){
        for (int i=0; i<9; i++){
            orientation_covariance[i] = 0.0;
            angular_velocity_covariance[i] = 0.0;
            linear_acceleration_covariance[i] = 0.0;
        }
    }

    Imu(std::string str){
        for (int i=0; i<9; i++){
            orientation_covariance[i] = 0.0;
            angular_velocity_covariance[i] = 0.0;
            linear_acceleration_covariance[i] = 0.0;
        }

        char rd[256] = {0};
        std::istringstream stm(str);
        while (!stm.eof()){

            stm.read(rd, 1);
            if (rd[0] == '\"'){

                stm.getline(rd, 100, '\"');
                if (std::string(rd) == "orientation"){
                    for (int i=0; i<256; i++)
                        rd[i] = 0;

                    while(true){
                        while((rd[0] != '\"') && (rd[0] != '}'))
                            stm.read(rd, 1);

                        if (rd[0] == '}')
                            break;

                        stm.getline(rd, 100, '\"');
                        if (std::string(rd) == "y"){
                            stm.read(rd, 2);
                            stm.getline(rd, 100, ',');
                            orientation.y = std::stof(std::string(rd));
                        }
                        else if (std::string(rd) == "x"){
                            stm.read(rd, 2);
                            stm.getline(rd, 100, ',');
                            orientation.x = std::stof(std::string(rd));
                        }
                        else if (std::string(rd) == "z"){
                            stm.read(rd, 2);
                            stm.getline(rd, 100, ',');
                            orientation.z = std::stof(std::string(rd));
                        }
                        else if (std::string(rd) == "w"){
                            stm.read(rd, 2);
                            stm.getline(rd, 100, ',');
                            orientation.w = std::stof(std::string(rd));
                        }

                        for (int i=0; i<256; i++)
                            rd[i] = 0;
                    }
                }
                for (int i=0; i<256; i++)
                    rd[i] = 0;
                // if (rd == "linear_acceleration_covariance"){
                //     while(rd[0] != '['){
                //         stm.read(rd, 1);
                //     }
                //     for (int i = 0; i<9; i++){
                //         float f;
                //         stm >> f;
                //         linear_acceleration_covariance[i] = f;
                //     }
                // }
                // else if (rd == "linear_acceleration_covariance"){
                //     while(rd[0] != '['){
                //         stm.read(rd, 1);
                //     }
                //     for (int i = 0; i<9; i++){
                //         float f;
                //         stm >> f;
                //         linear_acceleration_covariance[i] = f;
                //     }
                // }
            }
        }
    }

    ~Imu(){}
};

#endif // IMU_H

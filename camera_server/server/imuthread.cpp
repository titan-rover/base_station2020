#include "imuthread.h"
#include "imu.h"

void ImuThread::getImuData(Imu imu) {
    roll = imu.orientation.x;
    pitch = imu.orientation.y;
}

void ImuThread::run() {
    for (;;) {
        QThread::msleep(1);
        emit sendImuData(roll, pitch);
    }
}

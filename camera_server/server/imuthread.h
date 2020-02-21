#ifndef IMUTHREAD_H
#define IMUTHREAD_H
#include <QThread>
#include "imu.h"
class ImuThread : public QThread
{
    Q_OBJECT
public:
    void run(void);
    void getImuData(Imu imu);
signals:
    void sendImuData(float roll, float pitch);
private:
    float roll, pitch;
};


#endif // IMUTHREAD_H

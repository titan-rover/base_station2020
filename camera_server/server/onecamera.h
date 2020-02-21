#ifndef ONECAMERA_H
#define ONECAMERA_H

#include <QResizeEvent>
#include <QWidget>

// OpenCV
#include "opencv2/opencv.hpp"
#include "videolistenerthread.h"
#include "../packetdefinitions.hpp"


namespace Ui {
class oneCamera;
}

class oneCamera : public QWidget
{
    Q_OBJECT

public:
    explicit oneCamera(QWidget *parent = nullptr);

    void isPopup();

    void setViewIndex(int id) {
        m_id = id;
    }

    int getViewIndex() {
       return m_id;
    }

    void setCameraId(QString cameraId) {
        m_currentCamera = cameraId;
    }

    QString getCameraId() {
        return m_currentCamera;
    }

    void set_pitch_bounds(QPixmap const&);

    void set_roll_bounds(QPixmap const&);

    ~oneCamera();

signals:
    void requestPopup(int videoListenerIndex);
    void requestPause(const QString cameraId);
    void qualityChanged(int viewIndex, QString cameraId, int quality);

public slots:
    void drawFrame(cv::Mat frame);
    void imuDataReceive(float roll, float pitch);

private slots:
    void popupButtonClicked();
    void pauseButtonClicked();
    void qualityButtonClicked();
    void start_rotating_clockwise();
    void start_rotating_counterclockwise();

private:
    Ui::oneCamera *ui;
    QPixmap myPixmap;
    int m_id;
    QString m_currentCamera;
    QPainter* painter;
    int rotate_degree;
    int pitch_dot, pitch_bounds_x1, pitch_bounds_y1,
        pitch_bounds_x2, pitch_bounds_y2;
    int roll_dot, roll_bounds_x1, roll_bounds_y1,
        roll_bounds_x2, roll_bounds_y2;
    int min_red_pitch, max_red_pitch, min_orange_pitch,
        max_orange_pitch;
    int min_red_roll, max_red_roll, min_orange_roll,
        max_orange_roll;
    float roll_, pitch_;
};

#endif // ONECAMERA_H

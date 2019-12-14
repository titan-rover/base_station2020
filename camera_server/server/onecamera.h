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

    ~oneCamera();

signals:
    void requestPopup(int videoListenerIndex);
    void requestPause(const QString cameraId);
    void qualityChanged(int viewIndex, QString cameraId, int quality);

public slots:
    void drawFrame(cv::Mat frame);

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
};

#endif // ONECAMERA_H

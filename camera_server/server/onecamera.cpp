#include "onecamera.h"
#include "ui_onecamera.h"

#include <QPushButton>
#include <QDebug>
#include <QPainter>
#include <QRandomGenerator>

oneCamera::oneCamera(QWidget *parent) :
    QWidget(parent),
    ui(new Ui::oneCamera),
    painter(new QPainter),
    rotate_degree(0),
    pitch_dot(0),
    roll_dot(0)
{
    ui->setupUi(this);
    QRadioButton* qualityLowButton = ui->lowQualityButton;
    qualityLowButton->setChecked(true);
    QRadioButton* qualityMediumButton = ui->mediumQualityButton;
    QRadioButton* qualityHighButton = ui->highQualityButton;

    QObject::connect(qualityLowButton, &QRadioButton::clicked, this, &oneCamera::qualityButtonClicked);
    QObject::connect(qualityMediumButton, &QRadioButton::clicked, this, &oneCamera::qualityButtonClicked);
    QObject::connect(qualityHighButton, &QRadioButton::clicked, this, &oneCamera::qualityButtonClicked);

    QPushButton* popupButton = ui->popNewScreenButton;
    QObject::connect(popupButton, &QPushButton::clicked, this, &oneCamera::popupButtonClicked);

    QPushButton* pauseButton = ui->pauseButton;
    QObject::connect(pauseButton, &QPushButton::clicked, this, &oneCamera::pauseButtonClicked);

    QPushButton* clockwiseButton = ui->clockwiseButton;
    QObject::connect(clockwiseButton, &QPushButton::clicked, this, &oneCamera::start_rotating_clockwise);

    QPushButton* counterClockwiseButton = ui->counterClockwiseButton;
    QObject::connect(counterClockwiseButton, &QPushButton::clicked, this, &oneCamera::start_rotating_counterclockwise);
}

oneCamera::~oneCamera() {
    delete ui;
}

void oneCamera::pauseButtonClicked(){
    emit requestPause(m_currentCamera);
}

void oneCamera::isPopup() {
    delete ui->verticalLayout;
    delete ui->highQualityButton;
    delete ui->mediumQualityButton;
    delete ui->pauseButton;
    delete ui->popNewScreenButton;
    delete ui->lowQualityButton;
}

void oneCamera::popupButtonClicked() {
    emit requestPopup(m_id);
}

void oneCamera::qualityButtonClicked() {
    int quality;
    if(ui->lowQualityButton->isChecked()) {
        quality = 0;
    } else if(ui->mediumQualityButton->isChecked()) {
        quality = 1;
    } else if (ui->highQualityButton->isChecked()) {
        quality = 2;
    }

    emit qualityChanged(m_id, m_currentCamera, quality);
}

void oneCamera::drawFrame(cv::Mat frame){
//    qDebug() << frame.cols << " " << frame.rows;
    // Set the color table (used to translate colour indexes to qRgb values)
    QVector<QRgb> colorTable;
    for (int i=0; i<256; i++)
        colorTable.push_back(qRgb(i,i,i));
    // Create QImage with same dimensions as input Mat
    QImage img(frame.data, frame.cols, frame.rows, frame.step, QImage::Format_RGB888);
    img.setColorTable(colorTable);
    QPixmap the_camera_feed(QPixmap::fromImage(img.scaled(ui->cameraPic->size())));
    QPixmap drawingOverlay(ui->cameraPic->size());
    drawingOverlay.fill(Qt::transparent);
    QTransform rotatingCamera;
    rotatingCamera.translate(drawingOverlay.width() / 2, drawingOverlay.height() / 2);
    rotatingCamera.rotate(rotate_degree);
    rotatingCamera.translate(-drawingOverlay.width() / 2, -drawingOverlay.height() / 2);
    set_pitch_bounds(drawingOverlay);
    set_roll_bounds(drawingOverlay);
    {
    painter->begin(&drawingOverlay);
    painter->setRenderHints(QPainter::Antialiasing|QPainter::SmoothPixmapTransform, true);
    painter->setTransform(rotatingCamera);
    painter->drawPixmap(0, 0, the_camera_feed);
    painter->setPen(QPen(Qt::black, 10));
    painter->drawLine(pitch_bounds_x1, pitch_bounds_y1, pitch_bounds_x2, pitch_bounds_y2);
    if (pitch_dot < min_red_pitch || pitch_dot > max_red_pitch)
        painter->setPen(QPen(Qt::red, 20));
    else if ((pitch_dot >= min_red_pitch && pitch_dot < min_orange_pitch) ||
             (pitch_dot > max_orange_pitch && pitch_dot <= max_red_pitch))
        painter->setPen(QPen(QColor(0xFF, 0xA0, 0x00), 20));
    else
        painter->setPen(QPen(Qt::green, 20));
    painter->drawPoint(pitch_bounds_x1, pitch_dot + pitch_);
    if (roll_dot < min_red_roll || roll_dot > max_red_roll) {
        painter->setPen(QPen(Qt::red, 10));
    }
    else if ((roll_dot >= min_red_roll && roll_dot < min_orange_roll) ||
             (roll_dot >= max_orange_roll && roll_dot <= max_red_roll)) {
        painter->setPen(QPen(QColor(0xFF, 0xA0, 0x00), 10));
    }
    else {
        painter->setPen(QPen(Qt::green, 10));
    }
    painter->drawLine(roll_bounds_x1, roll_bounds_y1 + roll_, roll_bounds_x2, roll_bounds_y2 - roll_);
    painter->end();
    }
    ui->cameraPic->setPixmap(
                drawingOverlay.scaled(
                    ui->cameraPic->size(),
                    Qt::KeepAspectRatio,
                    Qt::SmoothTransformation));
}


void oneCamera::start_rotating_clockwise() {
    rotate_degree+=45;
}
void oneCamera::start_rotating_counterclockwise() {
    rotate_degree-=45;
}

void oneCamera::set_pitch_bounds(QPixmap const& base) {
        pitch_bounds_x1 = base.width() - (base.width() * .1);
        pitch_bounds_y1 = base.height() * .25;
        pitch_bounds_x2 = pitch_bounds_x1;
        pitch_bounds_y2 = base.height() - (pitch_bounds_y1);
        pitch_dot = ((pitch_bounds_y2 + pitch_bounds_y1) / 2);
        min_red_pitch = pitch_dot - (pitch_dot * 0.3);
        max_red_pitch = pitch_dot + (pitch_dot * 0.3);
        min_orange_pitch = pitch_dot - (pitch_dot * 0.1);
        max_orange_pitch = pitch_dot + (pitch_dot * 0.1);
        pitch_dot += pitch_;
}

void oneCamera::set_roll_bounds(QPixmap const& base) {
    roll_bounds_x1 = base.width() * .25;
    roll_bounds_y1 = (base.height() - (base.height() * 0.1));
    roll_bounds_x2 = (base.width() - (roll_bounds_x1));
    roll_bounds_y2 = roll_bounds_y1;
    min_red_roll = roll_bounds_y1 - (roll_bounds_y1 * 0.07);
    max_red_roll = roll_bounds_y1 + (roll_bounds_y1 * 0.07);
    min_orange_roll = roll_bounds_y1 - (roll_bounds_y1 * 0.02);
    max_orange_roll = roll_bounds_y1 + (roll_bounds_y1 * 0.03);
    roll_dot = roll_bounds_y1 + roll_;
}

void oneCamera::imuDataReceive(float roll, float pitch) {

    pitch_ = (pitch/3.14) * (ui->cameraPic->height());
    roll_ = (roll/3.14) * (ui->cameraPic->width());
}

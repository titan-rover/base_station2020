#include <QtCore>
#include <QtGui>
#include <QApplication>
#include <QLabel>
#include <QString>
#include "rosGui.h"

RosGui::RosGui()
{
  //Sets up the GUI
  m_window = new QWidget;
  layout = new QHBoxLayout;
  textLabel = new QLabel("placeholer");
  layout->addWidget(textLabel);
  m_window->setLayout(layout);
  m_window->show();

  //rosGuiPtr = &RosGui;
}

//For updating the label on the GUI
void RosGui::setLabel(QString q)
{
  textLabel->setText(q);
}

//RosGui rosGui;
int testing = 5;

int main(int argc, char **argv)
{
  //Displays application
  QApplication app(argc, argv);

  //Creates the GUI and a pointer to it
  RosGui rosGui;
  //rosGuiPtr = &rosGui;

  return app.exec();
}

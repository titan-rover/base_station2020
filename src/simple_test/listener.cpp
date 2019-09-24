#include "ros/ros.h"
#include "std_msgs/String.h"
#include "std_msgs/Int8.h"
#include <QtCore>
#include <QtGui>
#include <QApplication>
#include <QLabel>
#include <QString>
#include <thread>
#include "rosGui.h"
//#include "uiFile.cpp"

RosGui *rgPtr; //pointer to RosGui object created in main
QString theInfo = "placeholder";

//For updating the label on the GUI
void RosGui::setLabel(QString q)
{
  textLabel->setText(q);
}

void chatterCallback(const std_msgs::Int8::ConstPtr& msg)
{
  ROS_INFO("I heard: [%d]", msg->data);
  //Turns the Int8 into a QString
  theInfo = QString::number(msg->data);
  
  //Changes the label to the new Int8
  //#ifndef _ROSGUI_H
  //rosGui.setLabel(theInfo);
  //I would like to call setLabel(theInfo) from rosGui.cpp/h from here
  //testing = 5;
}

//Spins ros - callback updates
void spinRos()
{
  ros::spin();
}

//int testing = 5;

//runs the GUI and the ros listener
int main(int argc, char **argv)
{ 
  ros::init(argc, argv, "listener");
  ros::NodeHandle n;

  // subscribe to chatter with buffer size 1000
  // when a message comes, call the function chatterCallback
  ros::Subscriber sub = n.subscribe("chatter", 1000, chatterCallback);

  // enter a loop to listen and pump callbacks.
  ros::spin();
  return 0;
}

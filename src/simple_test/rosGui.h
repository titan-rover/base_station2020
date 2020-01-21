//Makes this part of the UI a class
//(Has to be outside of main)
class RosGui
{
public:
  RosGui();
  void setLabel(QString q);
  //RosGui * rosGuiPtr;
private:
  QWidget *m_window;
  QHBoxLayout *layout;
  QLabel *textLabel;
};

#ifndef _ROSGUI_H
#define _ROSGUI_H

extern RosGui rosGui;
//void setLabel(QString q);
extern int testing;

#endif
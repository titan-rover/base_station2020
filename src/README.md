# How to use fake_sensor_test

1. Source your catkin workspace
    ```console
    # source catkin_ws/devel/setup.bash
    ```

2. Start the rosbridge_server 
    ```console
    # roslaunch rosbridge_server rosbridge_websocket.launch
    ```
3. Start a test from the terminal 
    ```console
    # rosrun fake_sensor_test [filename]
    # rosrun fake_sensor_test mobility.py  
    ```
1.Run the commands
    mkdir -p ~/catkin_ws/src
    cd ~/catkin_ws/
    catkin_make

2. Download from github.com/titan-rover/base_station
   Open up the files until you the folder called src
   Open up the folder src
   Transfer the folder simple_test to your newly created src folder in catkin_ws
   run the command catkin_make again 
3. Open up terminal on your desktop
   right click on your desktop and click on open terminal
   run the code:
     roscore

4. Now go back to the folder catkin_make
   Open a terminal there
   run the code:
     source devel/setup.bash
   after that is done run the code:
     cd /src
     roslaunch simple_test ros9-15run.launch
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
UI Window responsible for:
## UI Window responsible for:
- Displaying various data received over ROS
- Input to sends GPS destination coordinates over ROS, where destLat and destLon are both string[] types

## Editting and Testing:
**Requirements:**
- Nodejs installed (nvm recommended - [Link](https://github.com/nvm-sh/nvm#installation-and-update))
**Setup**
- Install dependencies `npm install`
- Start the app `npm start`
- Verify it's working, `Ctrl C` to stop hosting the app

Any time you need to edit and test now just run `npm start`, any changes to the src files will automatically reload the app while it's being hosted

## Deploying the App to the Base Station
**Build the App**
- Run `npm run build` to create the build production of the app, stored in the build directory
- Copy the build directory and the Launch.js file to the Base Station
**Basestation Setup**
- Has node installed
- In the app directory make sure express is installed `npm install express`
- Run `node Launch.js`
- Open browser to localhost:9000

You can edit the port within the Launch.js file
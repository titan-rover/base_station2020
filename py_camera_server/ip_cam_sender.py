import cv2
import subprocess as sp
if __name__ == "__main__":
    rtsp_server = 'https://controls.titanrover.com/' # push server (output server)
    
    #pull rtsp data, or your cv cap.  (input server)
    cap = cv2.VideoCapture(
        'rtsp://192.168.1.90/:554/stream0')
    
    
    sizeStr = str(int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))) + \
        'x' + str(int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT)))
    fps = int(cap.get(cv2.CAP_PROP_FPS))
    
    command = ['ffmpeg',
               '-re',
               '-s', sizeStr,
               '-r', str(fps),  # rtsp fps (from input server)
               '-i', '-',
               
               # You can change ffmpeg parameter after this item.
               '-pix_fmt', 'yuv420p',
               '-r', '30',  # output fps
               '-g', '50',
               '-c:v', 'libx264',
               '-b:v', '2M',
               '-bufsize', '64M',
               '-maxrate', "4M",
               '-preset', 'veryfast',
               '-rtsp_transport', 'tcp',
               '-segment_times', '5',
               '-f', 'rtsp',
               rtsp_server]

    process = sp.Popen(command, stdin=sp.PIPE)

    while(cap.isOpened()):
        ret, frame = cap.read()
        ret2, frame2 = cv2.imencode('.png', frame)
        process.stdin.write(frame2.tobytes())
import os
import sys
import cv2
import numpy as np

os.chdir(sys.path[0])
img = np.zeros((200, 200, 3))
cv2.imwrite("./test.png", img)
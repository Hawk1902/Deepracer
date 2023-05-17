import numpy as np
import pandas as pd
import io
import os
import matplotlib.pyplot as plt
import ipywidgets as widgets
from IPython.display import display
import os
import sys
csv_file_path = sys.argv[1]
df = pd.read_csv(csv_file_path)

modelName = sys.argv[2]
imgFilename = csv_file_path.split("/")[-1].split(".")[0]

from IPython.display import Image

df1 = pd.read_csv(csv_file_path)

waypoints1 = np.load('scripts/reinvent_base1.npy')
print('Waypoint size: ', waypoints1.size)

fig, ax = plt.subplots()
ax.scatter(waypoints1[:, 0], waypoints1[:, 1], s=5)

values = df1.loc[df1['episode_status'] == 'off_track', 'closest_waypoint']
print('Values: ', values)

for i in range(values.shape[0]):
    waypoint_num = int(values.iloc[i])
    x, y = waypoints1[waypoint_num, 0], waypoints1[waypoint_num, 1]
    ax.scatter(x, y, s=50, marker='x', color='red')
    ax.text(x, y, str(waypoint_num), fontsize=10, ha='center', va='center')

ax.set_xlabel('X')
ax.set_ylabel('Y')
ax.set_title('Waypoint crash location')

# create img sub-folder for the model name
img_path = 'data/' + modelName + '/img/'
if not os.path.exists(img_path):
    os.makedirs(img_path)
    print(f'Directory created: {img_path}')
else:
    print(f'Directory already exists: {img_path}')


plt.savefig(img_path  + "crash.png", dpi=200)
# Image(filename='img/crash.png')




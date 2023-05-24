import numpy as np
import pandas as pd
import io
import os
import matplotlib.pyplot as plt
import ipywidgets as widgets
from IPython.display import display
import os
import sys
import glob
import os
from IPython.display import Image

eval_csv = sys.argv[1]
training_csv = sys.argv[2]
evaluation_logs = sys.argv[3]
model_name = eval_csv.split("/")[-1].split(".")[0].split("-")[-1]

df = pd.read_csv(eval_csv)
waypoints = np.load('scripts/reinvent_base1.npy')

#---------------------------------------------------------------------------------------------

# crash-modelname.png
fig, ax = plt.subplots()
ax.scatter(waypoints[:, 0], waypoints[:, 1], s=5)

values = df.loc[df['episode_status'] == 'off_track', 'closest_waypoint']

for i in range(values.shape[0]):
    waypoint_num = int(values.iloc[i])
    x, y = waypoints[waypoint_num, 0], waypoints[waypoint_num, 1]
    ax.scatter(x, y, s=50, marker='x', color='red')
    ax.text(x, y, str(waypoint_num), fontsize=10, ha='center', va='center')

ax.set_title('Waypoint crash location')
crash_img_name = "crash-" + model_name
plt.savefig('public/' + crash_img_name, dpi=200)

#---------------------------------------------------------------------------------------------

# reward-modelname.png

# Get the rewards for each waypoint
waypoint_rewards = []
for i in range(len(waypoints)):
    waypoint_reward = df[df['closest_waypoint'] == i]['reward'].sum()
    waypoint_rewards.append(waypoint_reward)

# Define color map with green for high rewards, yellow for medium rewards, and red for low rewards
colors = []
for reward in waypoint_rewards:
    if reward >= max(waypoint_rewards) * 0.75:
        colors.append('green')
    elif reward >= max(waypoint_rewards) * 0.25:
        colors.append('yellow')
    else:
        colors.append('red')

# Plot the track and color the waypoints based on the reward
fig, ax = plt.subplots()
ax.scatter(waypoints[:, 0], waypoints[:, 1], s=5, c=colors)
ax.set_title('Reward by waypoint')

# Create a color legend
legend_elements = [plt.scatter([], [], marker='o', color='green', label='High rewards'),
                   plt.scatter([], [], marker='o', color='yellow', label='Medium rewards'),
                   plt.scatter([], [], marker='o', color='red', label='Low rewards')]
ax.legend(handles=legend_elements)

reward_img_name = "reward-" + model_name
plt.savefig('public/' + reward_img_name, dpi=200)

# Find the waypoint with the highest and lowest reward
max_reward = max(waypoint_rewards)
max_reward_index = waypoint_rewards.index(max_reward)
min_reward = min(waypoint_rewards)
min_reward_index = waypoint_rewards.index(min_reward)

#---------------------------------------------------------------------------------------------

# track-modelname.png
# trajectory-modelname.png

df = pd.read_csv(training_csv)

inner_waypoints = waypoints[:, 0:2]
outer_waypoints = waypoints[:, 2:4]
plt.plot(inner_waypoints[:, 0], inner_waypoints[:, 1], 'r', label='Inner Waypoints')
plt.plot(outer_waypoints[:, 0], outer_waypoints[:, 1], 'b', label='Outer Waypoints')
plt.xlabel('X')
plt.ylabel('Y')
plt.title('DeepRacer Track')
plt.legend()
track_img_name = "track-" + model_name + ".png"
plt.savefig('public/' + track_img_name, dpi=200)

plt.scatter(df['X'], df['Y'], c=df.index, cmap='viridis', s=1)
plt.colorbar(label='Time step')
plt.xlabel('X')
plt.ylabel('Y')
plt.title('Car Trajectory')
trajectory_img_name = "trajectory-" + model_name + ".png"
plt.savefig('public/' + trajectory_img_name, dpi=200)

#---------------------------------------------------------------------------------------------


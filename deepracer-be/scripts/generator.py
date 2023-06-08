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

# another-img-modelname.png

# from deepracer.tracks import TrackIO, Track

# from deepracer.logs import     AnalysisUtils as au,     SimulationLogsIO as slio,     EvaluationUtils as eu,     PlottingUtils as pu

# import warnings
# warnings.filterwarnings('ignore')

# from datetime import datetime

# """Plot graphs for evaluations
#         """
# from math import ceil

# # evaluations = evaluation_logs
# evaluations = pd.read_csv(evaluation_logs)
# # evaluations = pd.DataFrame(evaluation_logs)
# groupby_field = "episode"
# graphed_value = "speed"

# if groupby_field not in evaluations:
#     if 'unique_episode' in evaluations:
#         groupby_field = 'unique_episode'
#         print("Grouping by 'unique_episode'")

# streams = evaluations.sort_values(
#     'tstamp', ascending=False).groupby('stream', sort=False)

# for _, stream in streams:
#     episodes = stream.groupby(groupby_field)
#     ep_count = len(episodes)

#     rows = ceil(ep_count / 3)
#     columns = min(ep_count, 3)
    
#     plt.figure(figsize=(10,5))
#     fig, axes = plt.subplots(rows, columns, figsize=(7*columns, 5*rows))
#     fig.tight_layout(pad=0.4, w_pad=0.5, h_pad=7.0)

#     for id, episode in episodes:
#         if rows == 1:
#             ax = axes[id % 3]
#         elif columns == 1:
#             ax = axes[int(id/3)]
#         else:
#             ax = axes[int(id / 3), id % 3]

#         pu.PlottingUtilsCustom.plot_grid_world(
#             episode, waypoints, graphed_value, ax=ax)
        
#     plt.subplots_adjust(top=0.85)
#     another_img_name = "xxxxx"
#     plt.savefig('public/' + another_img_name, dpi=200)
#     plt.show()
#     plt.clf()
    
# -----fix up

# class PlottingUtilsCustom(pu):
#     @staticmethod
#     def plot_evaluations_save(evaluations, track: Track, path, graphed_value='speed', groupby_field='episode'):
#         """Plot graphs for evaluations
#         """
#         from math import ceil

#         if groupby_field not in evaluations:
#             if 'unique_episode' in evaluations:
#                 groupby_field = 'unique_episode'
#                 print("Grouping by 'unique_episode'")

#         streams = evaluations.sort_values(
#             'tstamp', ascending=False).groupby('stream', sort=False)

#         for _, stream in streams:
#             episodes = stream.groupby(groupby_field)
#             ep_count = len(episodes)

#             rows = ceil(ep_count / 3)
#             columns = min(ep_count, 3)
            
#             plt.figure(figsize=(10,5))
#             fig, axes = plt.subplots(rows, columns, figsize=(7*columns, 5*rows))
#             fig.tight_layout(pad=0.4, w_pad=0.5, h_pad=7.0)

#             for id, episode in episodes:
#                 if rows == 1:
#                     ax = axes[id % 3]
#                 elif columns == 1:
#                     ax = axes[int(id/3)]
#                 else:
#                     ax = axes[int(id / 3), id % 3]

#                 PlottingUtilsCustom.plot_grid_world(
#                     episode, track, graphed_value, ax=ax)
                
#             plt.subplots_adjust(top=0.85)
#             plt.savefig(path)
#             plt.show()
#             plt.clf()
            
#     @staticmethod
#     def plot_grid_world_save(
#             episode_df,
#             track: Track,
#             path,
#             graphed_value='speed',
#             min_progress=None,
#             cmap=None):
#         episode_df.loc[:, 'distance_diff'] = ((episode_df['x'].shift(1) - episode_df['x']) ** 2 + (
#             episode_df['y'].shift(1) - episode_df['y']) ** 2) ** 0.5

#         distance = np.nansum(episode_df['distance_diff'])
#         lap_time = np.ptp(episode_df['tstamp'].astype(float))
#         velocity = distance / lap_time
#         average_speed = np.nanmean(episode_df['speed'])
#         progress = np.nanmax(episode_df['progress'])

#         if not min_progress or progress > min_progress:

#             distance_lap_time = 'Distance, progress, lap time = %.2f m, %.2f %%, %.2f s' % (
#                 distance, progress, lap_time
#             )
#             speed_velocity = 'Average speed, velocity = %.2f (Gazebo), %.2f m/s' % (
#                 average_speed, velocity
#             )

#             fig = plt.figure(figsize=(16, 10))
#             ax = fig.add_subplot(1, 1, 1)

#             line = LineString(track.inner_border)
#             PlottingUtils._plot_coords(ax, line)
#             PlottingUtils._plot_line(ax, line)

#             line = LineString(track.outer_border)
#             PlottingUtils._plot_coords(ax, line)
#             PlottingUtils._plot_line(ax, line)

#             if cmap is None:
#                 cmap = plt.get_cmap('plasma')

#             episode_df.plot.scatter('x', 'y', ax=ax, s=3, c=graphed_value,
#                                     cmap=cmap)

#             subtitle = '%s\n%s\n%s' % (
#                 ('Stream: %s, ' % episode_df['stream'].iloc[0]
#                  ) if 'stream' in episode_df.columns else '',
# #                 datetime.fromtimestamp(episode_df['tstamp'].iloc[0]),
#                 distance_lap_time,
#                 speed_velocity)
#             ax.set_title(subtitle)
#             plt.subplots_adjust(top=0.85)
#             plt.savefig(path)
#             plt.show()
#             plt.clf()

# # 20230419092331
# logs = [evaluation_logs, "20230419092331"]

# # log_files = glob.glob(os.path.join(evaluation_logs, "*.log"))
# # logs = [[os.path.basename(log_file), 'Graph'] for log_file in log_files]

# #Loads all the logs from the above time range
# bulk = slio.load_a_list_of_logs(logs)

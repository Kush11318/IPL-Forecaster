# 🏏 IPL Forecaster – A Flexible Deep Learning-Based Score Prediction System

IPL Forecaster is an intelligent, modular cricket analytics system that uses deep learning to predict IPL match scores. What sets it apart? Users are empowered to upload any IPL-related CSV dataset — match history, player stats, ball-by-ball data, etc. — and the system intelligently interprets, processes, and uses the data to train and generate accurate score predictions.

---

## 📘 Key Features

- ✅ Upload any structured IPL-related .csv file
- 🔍 Automatic file detection (e.g., matches, deliveries, batters)
- 🧠 Deep learning-based score prediction engine
- 🧼 Smart preprocessing and feature extraction
- 📊 Performance evaluation included (MAE, prediction vs actuals)

---

## 📂 Supported Input Files

The system accepts any IPL dataset in .csv format, including (but not limited to):

| Type         | Description                              | Sample Columns                      |
|--------------|------------------------------------------|-------------------------------------|
| matches.csv   | Match-level data                     | team1, team2, venue, runs, etc. |
| batters.csv   | Player batting stats (seasonal)      | Player Name, Team, SR, AVG, etc. |
| deliveries.csv| Ball-by-ball match data              | match_id, batsman, runs, wicket, etc. |

> ⚙ The system auto-detects file type based on column names and processes accordingly.

---

## 🎯 Problem Statement

> Predict the final score (target_runs) of a team based on match conditions, team composition, and historical performance — dynamically using user-supplied datasets.

---

## 🧠 Technical Overview

- Preprocessing:
  - Column detection and validation
  - Team name mapping
  - Feature engineering (SR, AVG, wickets, etc.)

- Model:
  - Fully connected neural network
  - Built using TensorFlow/Keras
  - Optimized for MAE loss

- Evaluation:
  - Mean Absolute Error (MAE)
  - Sample output comparisons

---

## 🛠 Tech Stack

- Python 3.10+
- pandas, numpy
- scikit-learn
- TensorFlow/Keras
- Matplotlib, Seaborn

---

## 💼 Use Cases

- Build custom score predictors using your own IPL dataset
- Analyze fantasy league data or custom match formats
- Educational use for learning ML on sports datasets

---

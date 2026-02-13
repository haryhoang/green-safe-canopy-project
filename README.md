# Green Safe - Smart Urban Tree Monitoring System (AIoT)

![Project Status](https://img.shields.io/badge/Status-Prototype-green)
![Achievement](https://img.shields.io/badge/Achievement-Top%205%20Spark%20It%20Up-orange)
![Tech Stack](https://img.shields.io/badge/Stack-React%20|%20TypeScript%20|%20Vite%20|%20Gemini-blue)

> **Top 5 Finalist - SPARK IT UP Innovation Contest 2025 (UIT)**
> Team member:
> Hoang Gia Hung
> Nguyễn Tấn Đạt
> Hoàng Công Thọ
>
> 
> Idea Model:
> <img width="1024" height="572" alt="image" src="https://github.com/user-attachments/assets/e5fd4818-c205-4252-8aa0-900fdada204e" />


[Green Safe Dashboard]
<img width="1878" height="919" alt="image" src="https://github.com/user-attachments/assets/52d3e149-bead-4d2f-bc85-ca373d51a442" />



##  Introduction

**Green Safe** is a comprehensive AIoT solution designed to solve the problem of urban trees falling during storm seasons. The system combines **Edge Computing (IoT Nodes)** and **Cloud Analytics** to monitor tree health in real-time.

This repository contains the **Frontend Dashboard** source code, serving as the central command center for city managers to visualize data and receive AI-driven alerts.

##  Key Features

*   **📊 Real-time Dashboard:** Visualizes critical metrics such as Wind Speed, Tilt Angle, and Tree Health Status from thousands of IoT nodes.
*   **🗺️ Digital Map Integration:** Interactive map showing the precise location of trees and highlighting high-risk zones (Red Zones).
*   **🤖 Gemini AI Assistant:** Integrated **Google Gemini API** to analyze sensor data and provide instant risk assessment reports in natural language (e.g., *"Tree T-1092 at Nguyen Trai St. has a high risk of falling"*).
*   **⚡ LoRaWAN Connectivity Status:** Monitors the connection health of the hardware network.

##  Tech Stack

This project is built with a modern and performance-focused stack:

*   **Core:** [React](https://reactjs.org/) (v18)
*   **Build Tool:** [Vite](https://vitejs.dev/) (For ultra-fast development)
*   **Language:** [TypeScript](https://www.typescriptlang.org/) (For type safety and robust logic)
*   **Styling:** Tailwind CSS (Responsive & Dark Mode UI)
*   **AI Integration:** Google Gemini API
*   **Deployment:** Vercel

##  System Architecture (Overview)

Although this repo focuses on the Web Interface, the full Green Safe ecosystem includes:

1.  **Hardware Node (Edge):** ESP32 + MPU6050 (Gyroscope) + LoRaWAN Module.
2.  **Connectivity:** LoRa Gateway -> The Things Network (TTN).
3.  **Backend/Database:** InfluxDB (Time-series data).
4.  **Frontend (This Repo):** React Dashboard for visualization.

##  Getting Started

Green_Safe_Canopy_project/
├── firmware/              
│   ├── main.ino
│   └── lora_config.h
├── src/                   
│   ├── components/
│   ├── assets/
│   └── index.tsx
├── docs/                  
│   ├── Spark_It_Up_Slides.pdf
│   └── System_Architecture.png
├── README.md              
├── package.json
└── vite.config.ts

```bash
# 1. Clone the repository
git clone https://github.com/haryhoang/Green_Safe_Canopy_project.git

# 2. Navigate to the project directory
cd Green_Safe_Canopy_project

# 3. Install dependencies
npm install

# 4. Start the development server
npm run dev

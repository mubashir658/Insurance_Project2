# Customer Behavior Project

## Overview

This project is an insurance management system built with React and Vite, designed to classify customers as "Prominent" or "Non-Prominent" using a deep learning model. It provides a user-friendly interface for viewing health insurance policies, fetching policy details, and managing customer interactions, aimed at assisting insurance companies like United India Insurance in tailoring their offerings.

## Features

- View health insurance policies with detailed descriptions
- Fetch policy details from a backend API
- Classify customers as "Prominent" or "Non-Prominent" using a deep learning model
- Agent dashboard for managing customer data and feedback
- Q&A tool for answering customer queries
- Offline functionality for accessibility in low-connectivity areas

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- Python (v3.8 or higher)
- npm (v7 or higher)
- MongoDB (local or cloud instance)
- Git

### Python virtual environment (recommended)

We recommend using a Python virtual environment for the deep learning (DL) service to avoid dependency conflicts.

On Windows (PowerShell):

```powershell
python -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install --upgrade pip
```

On macOS / Linux:

```bash
python3 -m venv .venv
source .venv/bin/activate
pip install --upgrade pip
```

### Setup Instructions

Follow these steps to set up and run the project locally:

1. **Clone the Repository**\
   Open a terminal and clone the repository:

   ```bash
   git clone https://github.com/mubashir658/Insurance_Project2.git
   ```

2. **Navigate to the Project Directory**\
   Move into the project directory:

   ```bash
   cd Insurance_Project2
   ```

3. **Install Frontend Dependencies**\
   Open a terminal for the frontend, navigate to the `frontend` directory, and install dependencies:

   ```bash
   cd frontend
   npm install
   ```

4. **Install Backend Dependencies**\
   Open a second terminal for the backend, navigate to the `backend` directory, and install dependencies:

   ```bash
   cd backend
   npm i
   ```

5. **Seed Policies Data**\
   In the same backend terminal, populate the MongoDB database with initial policy data:

   ```bash
   node scripts/seedPolicies.js
   ```

6. **Run the Deep Learning Model**\
   Open a third terminal for the DL model, activate your Python venv (if using), navigate to the `dl` directory, and start the Flask server:

   ```bash
   cd dl
   python app.py
   ```

   Ensure your Python environment has TensorFlow/Keras installed.
   
   Example (install DL dependencies):

```bash
pip install -r dl/requirements.txt
```


7. **Run the Backend**\
   In the backend terminal (second terminal), start the Node.js backend server:

   ```bash
   npm start
   ```

8. **Run the Frontend**\
   In the frontend terminal (first terminal), start the React development server:

   ```bash
   npm run dev
   ```

9. **Access the Website**\
   Once all three servers are running, open your browser and navigate to `http://localhost:5173` (or the port specified by Vite). The website is now ready to use, allowing you to explore policies, classify customers, and manage interactions.

## Technologies Used

- **Frontend**: React, Vite, Axios (for API requests)
- **Backend**: Node.js, Express.js, Flask (for deep learning integration)
- **Database**: MongoDB (for storing customer, policy, and enrollment data)
- **Deep Learning**: TensorFlow/Keras (for customer prominence prediction)

## Deep Learning (DL) Service - Details & Dependencies

The DL service is contained in the `dl/` folder and exposes a Flask endpoint (typically `/predict`) that the backend calls. The model file and required artifacts are stored in `dl/` and include:

- `prominence_model.h5` — trained Keras model
- `scaler.pkl` / other preprocessing artifacts (may be present)
- any label encoders or mapping files (joblib `.pkl` files)





Notes:
- If you have a GPU and want GPU-accelerated TensorFlow, install the appropriate `tensorflow` package for your platform. For CPU-only machines, `tensorflow` works but you may also use `tensorflow-cpu` where appropriate.
- If `dl/requirements.txt` is missing, the commands above will fail; the repository includes a recommended `dl/requirements.txt` file (created alongside this README update).
- **Deployment**: Docker (optional for containerized deployment)

## Project Structure

- `frontend/`: Contains the React frontend built with Vite.
- `backend/`: Houses the Node.js/Express.js backend and MongoDB integration.
- `dl/`: Includes the Flask server and TensorFlow/Keras deep learning model.
- `scripts/`: Contains utility scripts like `seedPolicies.js` for database seeding.


## License

This project is licensed under the KMIT License. See the LICENSE file for details.

## Contributing

Contributions are welcome! Please fork the repository, create a new branch, and submit a pull request with your changes. Ensure your code follows the project’s style guidelines and includes appropriate tests.

## Contact

For questions or support, please contact the project maintainer at mohammedmubashirali658@gmail.com or open an issue on the GitHub repository.

---

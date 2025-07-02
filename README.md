# 🎬 Movie Management Platform

A full-stack web application for managing a collection of movies. Users can upload movie files, view details, and play videos directly in the browser.

---

## Tech Stack

**Frontend**

* Vue 3
* Vuex
* Vue Router
* Axios
* Vite

**Backend**

* Python 3
* Django REST Framework
* Celery
* Redis

---

## Prerequisites

Before you begin, ensure you have the following installed (all of these are assuming you are using Windows):

* **Python 3.10+**
* **Node.js (v16 or later)**
* **npm or yarn**
* **Redis (for Windows, Redis for Windows binaries)**
* **Git (optional, for cloning the project)**

---

## Project Setup

### 1. Clone the repository

```bash
git clone https://github.com/riaqliu/movie-management-platform.git
cd movie-management-platform
```

---

### 2. Backend (Django)

#### a. Set up virtual environment and install dependencies

```bash
cd django_backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
```

#### b. Run migrations and start the server

```bash
python manage.py migrate
python manage.py runserver
```

#### c. Start Redis (for Celery)

```bash
cd "C:\Program Files\Redis"
redis-server.exe
```

#### d. Start Celery worker

```bash
celery -A django_backend worker --pool=solo --loglevel=info
```

---

### 3. Frontend (Vue)

#### a. Install dependencies

```bash
cd vue-frontend
npm i
```

#### b. Run the development server

```bash
npm run dev
```

---

## Demo Instructions

To test the app manually:

1. **Upload a Movie File**

   * Navigate to the frontend.
   * Use the upload interface to select and upload a video file.

2. **Video Playback**

   * After upload, the movie should appear in the list.
   * Click the thumbnail to view and play the video.

3. **Demo Video**

   * [Watch Demo Video](https://example.com/demo) *(Replace with actual URL once available)*

---

## Known Issues or Limitations

* File upload size is limited to the default Django media settings.
* Redis must be started manually on Windows (may require admin permissions).
* Video encoding/thumbnail generation is basic and synchronous.
* No authentication or user roles implemented (yet).
* UI is functional but minimal.

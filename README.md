# 🎬 Movie Management Platform

A full-stack web application for managing a collection of movies. Users can upload movie files, view details, and play videos directly in the browser.

---

## Tech Stack

**Frontend**

* Vue
* Axios

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
* **npm**
* **Redis**

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

Follow these steps to manually test the application:

### 1. **Upload a Movie File**

* Navigate to the frontend.
* Click the **Upload** button to open the upload interface.
* Fill in the video details (title, description, etc.).
* Click **Save** to upload the video to the server.

### 2. **Video Playback**

* After uploading, the video will appear in the catalog.
* Videos are also displayed as a carousel on the player page.
* Click a video thumbnail to open the player page and view the video.

### 3. **Edit a Video**

* On the player or catalog view, click the **Edit** button to go to the editor page.
* Modify the video title, description, or replace the video file.
* Click **Save** to apply changes.
* Click **Back** to return to the previous page.

### 4. **Delete a Video**

* While on the editor page, click the **Delete** button.
* Confirm deletion in the modal by clicking **Yes**.
* The video will be removed from the catalog.

**Demo Video**

   * [Watch Demo Video](https://example.com/demo)

---

## Known Issues or Limitations

* File upload size is limited to the default Django media settings.
* Redis must be started manually on Windows (may require admin permissions).
* Video encoding/thumbnail generation is basic and synchronous.
* No authentication or user roles implemented (yet).
* UI is functional but minimal.

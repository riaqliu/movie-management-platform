# Movie-management-platform

**Prerequisites**

- Python 3.x
- Django
- Redis
- Celery

## Setup Instructions

### Vue frontend

### Django backend

1. Run Django Server

    ```shell
        python ./manage.py runserver
    ```

2. Run celery

    ```shell
        celery -A django_backend worker --pool=solo --loglevel=info
    ```

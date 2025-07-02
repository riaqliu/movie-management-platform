import os
from moviepy import VideoFileClip
from django.core.files import File
from tempfile import NamedTemporaryFile
from PIL import Image
from celery import shared_task
from .models import Movie, Thumbnail


@shared_task
def generate_thumbnail_for_movie(movie_id):
    try:
        movie = Movie.objects.get(id=movie_id)
        video_path = movie.video_file.path

        # Use MoviePy to capture frame at 1 second
        clip = VideoFileClip(video_path)
        frame = clip.get_frame(1.0)  # Numpy array

        # Save frame to temp file
        temp_file = NamedTemporaryFile(delete=False, suffix=".jpg")
        img = Image.fromarray(frame)
        img.save(temp_file.name, "JPEG")

        # Save thumbnail to Thumb model
        with open(temp_file.name, 'rb') as f:
            thumb = Thumbnail.objects.create(image_file=File(f, name=os.path.basename(temp_file.name)))
            movie.thumb = thumb
            movie.save()

        os.unlink(temp_file.name)

    except Exception as e:
        print("Thumbnail generation failed:", e)


# Sanity check
@shared_task
def add(x, y):
    return x + y

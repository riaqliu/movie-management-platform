from django.db import models


class Movie(models.Model):
    title = models.CharField(max_length=255, default="Untitled Video")
    description = models.TextField(blank=True)
    date_added = models.DateField(auto_now_add=True)
    video_file = models.FileField(upload_to='videos/', null=False)

    def __str__(self):
        return self.title


class Thumbnail(models.Model):
    image_file = models.FileField(upload_to='thumb/', null=False)
    movie = models.ForeignKey(Movie, on_delete=models.CASCADE, related_name="thumbnails")

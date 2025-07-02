from django.db import models


class Thumbnail(models.Model):
    image_file = models.FileField(upload_to='thumb/', null=False)


class Movie(models.Model):
    title = models.CharField(max_length=255, default="Untitled Video")
    description = models.TextField(blank=True)
    date_added = models.DateField(auto_now_add=True)
    video_file = models.FileField(upload_to='videos/', null=False)
    thumb = models.OneToOneField(Thumbnail, on_delete=models.CASCADE, null=True, blank=True)

    def __str__(self):
        return self.title

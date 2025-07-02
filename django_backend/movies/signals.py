import os
from django.db.models.signals import post_delete
from django.dispatch import receiver
from .models import Movie, Thumbnail


@receiver(post_delete, sender=Movie)
def delete_video_file(sender, instance, **kwargs):
    print("DELETED VIDEO FILE!")
    if instance.video_file and instance.video_file.path:
        try:
            os.remove(instance.video_file.path)
        except FileNotFoundError:
            pass


@receiver(post_delete, sender=Thumbnail)
def delete_thumb_file(sender, instance, **kwargs):
    if instance.image_file and instance.image_file.path:
        try:
            os.remove(instance.image_file.path)
        except FileNotFoundError:
            pass

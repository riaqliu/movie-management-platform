from django.apps import AppConfig
import importlib


class MoviesConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'movies'

    def ready(self):
        importlib.import_module("movies.signals")

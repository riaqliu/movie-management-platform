from rest_framework import serializers
from .models import Movie


class MovieSerializer(serializers.ModelSerializer):
    class Meta:
        model = Movie
        fields = '__all__'

    def validate_video_file(self, file):
        if not file.name.lower().endswith('.mp4'):
            raise serializers.ValidationError("Unsupported file type")
        return file

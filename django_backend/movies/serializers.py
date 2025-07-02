from rest_framework import serializers
from .models import Movie, Thumbnail


class ThumbSerializer(serializers.ModelSerializer):
    class Meta:
        model = Thumbnail
        fields = ['id', 'image_file']


class MovieSerializer(serializers.ModelSerializer):
    thumbnail = ThumbSerializer(source='thumb', read_only=True)

    class Meta:
        model = Movie
        fields = '__all__'

    def validate_video_file(self, file):
        if not file.name.lower().endswith('.mp4'):
            raise serializers.ValidationError("Unsupported file type")
        return file

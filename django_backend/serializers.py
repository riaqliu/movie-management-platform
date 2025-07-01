from rest_framework import serializers


class MovieSerializer(serializers.Serializer):
    title = serializers.CharField(max_length=255)
    description = serializers.CharField(max_length=255)
    date_added = serializers.DateField()
    video_file = serializers.FileField()

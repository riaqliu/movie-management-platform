# Generated by Django 5.2.3 on 2025-07-02 11:43

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('movies', '0003_alter_movie_title_thumbnail'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='thumbnail',
            name='movie',
        ),
        migrations.AddField(
            model_name='movie',
            name='thumb',
            field=models.OneToOneField(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='movies.thumbnail'),
        ),
    ]

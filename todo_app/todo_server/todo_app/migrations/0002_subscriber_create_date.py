# Generated by Django 4.2.16 on 2024-10-30 16:14

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('todo_app', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='subscriber',
            name='create_date',
            field=models.DateField(blank=True, default=django.utils.timezone.now),
        ),
    ]

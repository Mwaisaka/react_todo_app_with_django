# Generated by Django 4.2.16 on 2024-11-05 17:37

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('todo_app', '0006_alter_task_user'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='task',
            name='user',
        ),
    ]

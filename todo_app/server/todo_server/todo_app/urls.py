from django.urls import path
from . import views

urlpatterns = [
    path('',views.home, name='todo_app'),
    path('',views.main, name='main'),
    path('tasks/',views.tasks, name='tasks'),
    path('tasks/details/<int:id>',views.details, name='details'),
    path('testing/',views.testing, name='testing'),
    path('tasks/add/', views.add_task, name='add_task'),
    path('tasks/delete/<int:id>/', views.delete_task, name='delete_task'),  
    path('tasks/edit/<int:id>/', views.edit_task, name='edit_task'),
]

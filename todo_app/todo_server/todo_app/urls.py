from rest_framework.authtoken.views import obtain_auth_token
from rest_framework_simplejwt.views import TokenRefreshView
from django.urls import path
from . import views

urlpatterns = [
    path('auth/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api-token-auth/', obtain_auth_token),
    path('',views.home, name='todo_app'),
    path('',views.main, name='main'),
    path('tasks/',views.tasks, name='tasks'),
    path('subscribers/',views.subscribers, name='subscribers'),
    path('tasks/details/<int:id>',views.details, name='details'),
    path('testing/',views.testing, name='testing'),
    path('tasks/add_task/', views.add_task, name='add_task'),
    path('tasks/delete/<int:id>/', views.delete_task, name='delete_task'),  
    path('tasks/edit/<int:id>/', views.edit_task, name='edit_task'),
    path("add_subscriber/", views.add_subscriber, name="add_subscriber"),
    path('login/', views.login, name="login"),
    path('subscribers/delete/<int:id>/', views.delete_subscriber, name='delete_subscriber'),
    path('reset_password/', views.reset_password, name='reset_password'),
]

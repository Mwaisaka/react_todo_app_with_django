from django.shortcuts import render
from .models import Task
from django.http import HttpResponse
from django.template import loader


def todo(request):
    # return HttpResponse("Hello World!Welcome to the ToDo App Home Page!")
    template = loader.get_template('todoapp.html')
    return HttpResponse(template.render())

def tasks(request):
  mytasks = Task.objects.all().values()
  template = loader.get_template('tasks.html')
  context = {
    'mytasks': mytasks,
  }
  return HttpResponse(template.render(context, request))
# def home(request):
#     return HttpResponse("Hello World!Welcome to the ToDo App Home Page!")
    
# Create your views here.

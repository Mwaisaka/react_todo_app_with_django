from django.shortcuts import render

from django.http import HttpResponse
from django.template import loader

def todo(request):
    # return HttpResponse("Hello World!Welcome to the ToDo App Home Page!")
    template = loader.get_template('todoapp.html')
    return HttpResponse(template.render())

def home(request):
    return HttpResponse("Hello World!Welcome to the ToDo App Home Page!")
    
# Create your views here.

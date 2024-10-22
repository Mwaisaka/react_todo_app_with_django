from django.shortcuts import render
from .models import Task
from django.http import HttpResponse, JsonResponse
from django.template import loader


def main(request):
    # return HttpResponse("Hello World!Welcome to the ToDo App Home Page!")
    template = loader.get_template('main.html')
    return HttpResponse(template.render())

# def tasks(request):
#   mytasks = Task.objects.all().values()
#   template = loader.get_template('tasks.html')
#   context = {
#     'mytasks': mytasks,
#   }
#   return HttpResponse(template.render(context, request))

def tasks(request):
    tasks = Task.objects.all().values()
    return JsonResponse(list(tasks), safe=False)

def details(request,id):
  mytask = Task.objects.get(id=id)
  template = loader.get_template('details.html')
  context = {
    'mytask': mytask,
  }
  return HttpResponse(template.render(context, request))

def testing(request):
  template = loader.get_template("template.html")
  context = {
    'tasks': ['Reading', 'Hiking', 'Swimming'], 
  }
  return HttpResponse(template.render(context, request))
# def home(request):
#     return HttpResponse("Hello World!Welcome to the ToDo App Home Page!")
    
# Create your views here.

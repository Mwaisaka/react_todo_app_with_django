from django.shortcuts import render
from .models import Task
from django.http import HttpResponse, JsonResponse
from django.template import loader
from django.views.decorators.csrf import csrf_exempt
import json

# Create your views here.

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
    
@csrf_exempt  # Exempting CSRF for API requests (can be handled better for production)
def add_task(request):
  if request.method=="POST":
    try:
      data=json.loads(request.body) # Parse JSON data from the request body
      task_name=data.get("task") # Extract 'task' from the request payload
      
      if task_name:
        # Create a new task
          new_task = Task(task=task_name, completed=False)
          new_task.save()
          
          # Return the newly created task as JSON response
          return JsonResponse({
              'id': new_task.id,
              'task': new_task.task,
              'completed': new_task.completed,
              'create_date': new_task.create_date.strftime('%Y-%m-%d'),
          }, status=201)
      else:
          return JsonResponse({'error': 'Task name is required'}, status=400)
    except json.JSONDecodeError:
        return JsonResponse({'error': 'Invalid JSON payload'}, status=400)
  else:
      return JsonResponse({'error': 'POST request required'}, status=405)
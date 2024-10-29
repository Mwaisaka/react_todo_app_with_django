from django.shortcuts import render
from .models import Task
from django.http import HttpResponse, JsonResponse
from django.template import loader
from django.views.decorators.csrf import csrf_exempt
from django.shortcuts import get_object_or_404
import json
from datetime import datetime

# Create your views here.

def main(request):
    return HttpResponse("Hello World!Welcome to the ToDo App Home Page!")
    template = loader.get_template('main.html')
    return HttpResponse(template.render())

def tasks(request):
  mytasks = Task.objects.all().values()
  template = loader.get_template('tasks.html')
  context = {
    'mytasks': mytasks,
  }
  return HttpResponse(template.render(context, request))

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
def home(request):
    return HttpResponse("Hello World!Welcome to the ToDo App Home Page!")
    
@csrf_exempt  # Exempting CSRF for API requests (can be handled better for production)
def add_task(request):
  if request.method=="POST":
    try:
      data=json.loads(request.body) # Parse JSON data from the request body
      task_name=data.get("task") # Extract 'task' from the request payload
      due_date_str = data.get("due_date") # Capture due date from the payload
      
      if task_name:
          due_date = (
                    datetime.strptime(due_date_str, '%Y-%m-%d') if due_date_str else None
                )
        # Create a new task
          new_task = Task(task=task_name, completed=False, due_date=due_date)
          new_task.save()
          
          # Return the newly created task as JSON response
          return JsonResponse({
              'id': new_task.id,
              'task': new_task.task,
              'completed': new_task.completed,
              'create_date': new_task.create_date.strftime('%Y-%m-%d'),
              'due_date': new_task.due_date.strftime('%Y-%m-%d') if new_task.due_date else None,
          }, status=201)
      else:
          return JsonResponse({'error': 'Task name is required'}, status=400)
    except json.JSONDecodeError:
        return JsonResponse({'error': 'Invalid JSON payload'}, status=400)
  else:
      return JsonResponse({'error': 'POST request required'}, status=405)
    
@csrf_exempt  # Exempting CSRF for API requests (can be handled better for production)
def delete_task(request, id):
  if request.method == 'DELETE':
    try:
      # Try to delete the task with the given id
      task = get_object_or_404(Task, id=id)
      task.delete()
      return JsonResponse({'message': 'Task deleted successfully'}, status=200)
    except Task.DoesNotExist:
      return JsonResponse({'error': 'Task does not exist'}, status=404)
  else:
    return JsonResponse({'error': 'Delete request required'}, status=405)

@csrf_exempt  # Exempting CSRF for API requests (can be handled better for production)
def edit_task(request, id):
  if request.method == 'PUT':
    try:
      # Retrieve the task by id
      task=get_object_or_404(Task, id=id)
      
      # Parse the JSON data from the request body
      data=json.loads(request.body)
      task_name=data.get('task', task.task)
      due_date_str=data.get('due_date')
      completed=data.get('completed',task.completed) # Use existing completion status if not provided
      
      # Update task attributes if provided
      if task_name is not None:
          task.task = task_name
      if due_date_str:
          task.due_date = datetime.strptime(due_date_str, '%Y-%m-%d')
      task.completed = completed
      
      # Save the udapted task
      task.save()
      
      # Return the updated task as a JSON response
      return JsonResponse({
        'id': task.id,
        'task': task.task,
        'completed': task.completed,
        'create_date': task.create_date.strftime('%Y-%m-%d'),
        'due_date': task.due_date.strftime('%Y-%m-%d') if task.due_date else None,
        },status=200)
    except json.JSONDecodeError:
      return JsonResponse({'error': 'Invalid JSON payload'}, status=400)
  else:
    return JsonResponse({'error': 'PUT request required'}, status=405)
from django.shortcuts import render
from .models import Task, Subscriber
from django.http import HttpResponse, JsonResponse
from django.template import loader
from django.views.decorators.csrf import csrf_exempt
from django.shortcuts import get_object_or_404
import json
from datetime import datetime
from django.contrib.auth.hashers import make_password
from django.contrib.auth import authenticate
from django.contrib.auth.decorators import login_required
from django.contrib.auth import login as django_login
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication

# Create your views here.

def main(request):
    # return HttpResponse("Hello World!Welcome to the ToDo App Home Page!")
    template = loader.get_template('main.html')
    return HttpResponse(template.render())

def show_tasks(request):
  mytasks = Task.objects.all().values()
  template = loader.get_template('tasks.html')
  context = {
    'mytasks': mytasks,
  }
  return HttpResponse(template.render(context, request))

@api_view(['GET'])
@authentication_classes([JWTAuthentication])  # Apply JWT authentication
@permission_classes([IsAuthenticated])  # Restrict to authenticated users
@csrf_exempt  # Exempting CSRF for API requests (can be handled better for production)
def tasks(request):
    tasks = Task.objects.filter(user_id=request.user.id).values()
    return JsonResponse(list(tasks), safe=False)
  
def subscribers(request):
    subscribers = Subscriber.objects.all().values()
    return JsonResponse(list(subscribers), safe=False)

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

@api_view(['POST'])
@authentication_classes([JWTAuthentication])  # Apply token-based authentication
@permission_classes([IsAuthenticated])  # Restrict to authenticated users only
@csrf_exempt  # Exempting CSRF for API requests (can be handled better for production)
def add_task(request):
  if not request.user.is_authenticated:
        return JsonResponse({'error': 'User is not authenticated'}, status=403)
  
  if request.method=="POST":
    try:
      data=json.loads(request.body) # Parse JSON data from the request body
      task_name=data.get("task") # Extract 'task' from the request payload
      due_date_str = data.get("due_date") # Capture due date from the payload
      
      if task_name:
        
        # Normalize task name (strip leading/trailing spaces and lowercase)
          # task_name = task_name.strip().lower()
          
        # Check if the task already exists for the user (same task name and user)
          existing_task = Task.objects.filter(task=task_name, user_id=request.user.id).first()
          
          if existing_task:
              return JsonResponse({'error': 'Task with the same name already exists'}, status=400)
          
          due_date = (
                    datetime.strptime(due_date_str, '%Y-%m-%d') if due_date_str else None
                )
        # Create a new task
          new_task = Task(task=task_name, completed=False, due_date=due_date, user_id=request.user.id)
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

@api_view(['DELETE'])
@authentication_classes([JWTAuthentication])  # Apply token-based authentication
@permission_classes([IsAuthenticated])  # Restrict to authenticated users only
@csrf_exempt  # Exempting CSRF for API requests (can be handled better for production)
def delete_task(request, id):
  if not request.user.is_authenticated:
        return JsonResponse({'error': 'User is not authenticated'}, status=403)
      
  if request.method == 'DELETE':
    try:
      # Try to delete the task with the given id
      # task = get_object_or_404(Task, id=id)
      task = get_object_or_404(Task, id=id)
      task.delete()
      return JsonResponse({'message': 'Task deleted successfully'}, status=200)
    except Task.DoesNotExist:
      return JsonResponse({'error': 'Task does not exist'}, status=404)
  else:
    return JsonResponse({'error': 'Delete request required'}, status=405)

@api_view(['PUT'])
@authentication_classes([JWTAuthentication])  # Apply token-based authentication
@permission_classes([IsAuthenticated])  # Restrict to authenticated users only
@csrf_exempt  # Exempting CSRF for API requests (can be handled better for production)
def edit_task(request, id):
  if not request.user.is_authenticated:
        return JsonResponse({'error': 'User is not authenticated'}, status=403)
      
  if request.method == 'PUT':
    try:
      # Retrieve the task by id
      # task=get_object_or_404(Task, id=id)
      
      task = get_object_or_404(Task, id=id, user_id=request.user.id)
      
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
  
@csrf_exempt  # Disable CSRF for this endpoint (not recommended for production without extra security)
def add_subscriber(request):
  if request.method == 'POST':
    try:
      # Pass JSON data from request
      data=json.loads(request.body)
      username = data.get("username")
      fullname = data.get("fullname")
      email = data.get("email")
      password = data.get("password")
      
      # Validate required fields
      if not all([username, fullname, email, password]):
          return JsonResponse({"error": "All fields are required"}, status=400)
        
      # Create a new subscriber
      new_subscriber=Subscriber.objects.create_user(
        username=username, 
        fullname=fullname,
        email=email, 
        password=password, #Hash the password
      )
      
      new_subscriber.save()
      
      # Return the new subscriber
      return JsonResponse(
        {
          "id": new_subscriber.id,
          "username":new_subscriber.username,
          "email":new_subscriber.email,
          'create_date': new_subscriber.create_date.strftime('%Y-%m-%d'),
          },status=201)
    except json.JSONDecodeError:
      return JsonResponse({"error":"Invalid JSOn payload"},status=400)
    except Exception as e:
      return JsonResponse({"error":str(e)},status=500)
  else:
    return JsonResponse({"error":"Post request required"},status=405)

@csrf_exempt  # Exempting CSRF for API requests (can be handled better for production)
def login(request):
  if request.method == 'POST':
    try:
      # Parse JSON data from the request body
      data=json.loads(request.body)
      username = data.get("username")
      password = data.get("password")
      
      # Validate required fields
      if not all([username, password]):
          return JsonResponse({"error": "Username and password are required"}, status=400)
      
      # Check if the user exists
      # subscriber_exists = Subscriber.objects.filter(username=username).exists()
      # if not subscriber_exists:
      #     return JsonResponse({"error": "Invalid username or password"}, status=401)
        
      # Authenticate user
      # subscriber = authenticate(username=username, password=password)
      subscriber = authenticate(request, username=username, password=password)
      
      if subscriber is not None:
        # If using session-based authentication
        # django_login(request, subscriber)
        
        # Generate JWT token
        refresh = RefreshToken.for_user(subscriber)
                
        # Sucessfully authenticated
        return JsonResponse({
          'message': "Login successful",
          'token': str(refresh.access_token),
          'refresh_token': str(refresh),
          'subscriber': {
            'id': subscriber.id,
            'username': subscriber.username,
            'fullname': subscriber.fullname,
          }
        }, status=200)
      else:
        # Incorrect username or password
        return JsonResponse({"error": "Invalid username or password"}, status=401)
    except json.JSONDecodeError:
      return JsonResponse({"error":"Invalid JSOn payload"},status=400)
    except Exception as e:
      return JsonResponse({"error":str(e)},status=500)
  else:
    return JsonResponse({"error":"Post request required"},status=405)
  
@csrf_exempt  # Exempting CSRF for API requests (can be handled better for production)
def delete_subscriber(request,id):
  if request.method =="DELETE":
    try:
      # Try to get a subscriber by id and delete it
      subscriber=get_object_or_404(Subscriber,id=id)
      subscriber.delete()
      return JsonResponse({"mesage":"Subscriber deleted successfully"}, status=200)
    except Subscriber.DoesNotExist:
      return JsonResponse({"error":"Subscriber does not exist"}, status=404)
  else:
    return JsonResponse({"error":"Delete request required"}, status=405)

@csrf_exempt  # Exempting CSRF for API requests (can be handled better for production)
def reset_password(request):
    if request.method == 'POST':
      try:
        # Pass json data from the request
        data=json.loads(request.body)
        email=data.get('email')
        new_password=data.get('new_password')
        confirm_new_password=data.get('confirm_new_password')
        
        # Validate required fileds
        if not all([email,new_password,confirm_new_password]):
          return JsonResponse({"error":"All fields are required"}, status=400)
        
        # Check if new password and confirm_new_password match
        if new_password != confirm_new_password:
          return JsonResponse({"error":"Passwords do not match"}, status=400)
        
        # Get the subscriber by email address
        try:
          subscriber = Subscriber.objects.get(email=email)
        except Subscriber.DoesNotExist:
          return JsonResponse({"error":"User with this email does not exist"}, status=404)
        
        # Update the password
        subscriber.password = make_password(new_password)
        subscriber.save()
        
        return JsonResponse({"success": "Password reset successfully"}, status=200)
      
      except json.JSONDecodeError:
        return JsonResponse({"error": "Invalid JSON payload"}, status=400)
      except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)
    else:
      return JsonResponse({"error": "POST request required"}, status=405)
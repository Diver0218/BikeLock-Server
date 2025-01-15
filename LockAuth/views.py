from django.shortcuts import render
from django.views.generic import View
from .scripts.auth import authenticate
from django.http import JsonResponse
import secrets
import datetime
from .models import Lock

class AuthView(View):
    
    def get(self, request, *args, **kwargs):
        now_time = datetime.datetime.now()
        token = secrets.token_hex(32)
        LockID = request.GET.get('LockID')
        lock = Lock.objects.filter(LockID=LockID)
        lock.CurrentToken = token
        lock.TokenTimestamp = now_time
        lock.save()
        return JsonResponse({'token': token})
        
        
    def post(self, request, *args, **kwargs):
        token = request.GET.get('token')
        if authenticate(token):
            return JsonResponse(status=200)
        else:
            return JsonResponse(status=401)
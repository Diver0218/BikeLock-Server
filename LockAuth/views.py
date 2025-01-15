from django.shortcuts import render
from django.views.generic import View
from .scripts.auth import authenticate
from django.http import JsonResponse
import secrets
import datetime
from models import Lock

class AuthView(View):
    
    def get(self, request, *args, **kwargs):
        now_time = datetime.datetime.now()
        token = secrets.token_hex(32)
        LockID = reuquest.GET.get('LockID')
        
        Lock.objects.update_or_create(LockID=1, defaults={'CurrentToken': token, 'TokenTimestamp': now_time})
        
        
    def post(self, request, *args, **kwargs):
        token = request.GET.get('token')
        if authenticate(token):
            return JsonResponse(status=200)
        else:
            return JsonResponse(status=401)
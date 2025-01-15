from django.shortcuts import render
from django.views.generic import View
from .scripts.auth import authenticate
from django.http import JsonResponse

class AuthView(View):
    
    def get(self, request, *args, **kwargs):
        token = request.GET.get('token')
        if authenticate(token):
            return JsonResponse(status=200)
        else:
            return JsonResponse(status=401)
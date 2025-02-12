from django.shortcuts import render
from django.views.generic import View
from .scripts.auth import authenticate
from .scripts.tidy_up_db import tidy_up_db
from django.http import JsonResponse
import secrets
import datetime
from .models import Token
from django.views.decorators.csrf import csrf_exempt
import json
from django.utils.decorators import method_decorator
from django.contrib.auth.decorators import login_required


@method_decorator(login_required, name='get')
@method_decorator(csrf_exempt, name='dispatch')
class AuthView(View):
    
    def get(self, request, *args, **kwargs):
        tidy_up_db()
        now_time = datetime.datetime.now(datetime.timezone.utc).astimezone()
        tokenSecret = secrets.token_hex(32)
        token = Token(tokenSecret=tokenSecret, timestamp=now_time)
        token.save()
        return JsonResponse({'token': tokenSecret})
        
    def post(self, request, *args, **kwargs):
        tidy_up_db()
        response = json.loads(request.body.decode())
        tokenSecret = response.get('token', None)
        print(f"Got Token: {tokenSecret}")
        if authenticate(tokenSecret):
            return JsonResponse(status=200, data={'message': 'Authenticated'})
        else:
            return JsonResponse(status=401, data={'message': 'Unauthorized'}) 
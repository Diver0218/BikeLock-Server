from django.shortcuts import render
from django.views.generic import TemplateView
from django.http import HttpResponse
from django.contrib.auth import authenticate, login
from django.shortcuts import redirect
from django.contrib.auth.mixins import LoginRequiredMixin

# Create your views here.

class ConnectView(LoginRequiredMixin, TemplateView):
    
    login_url = "/auth/login"
    
    def get(self, request, *args, **kwargs):
        
        return render(request, 'WebBluetooth/connectView.html')

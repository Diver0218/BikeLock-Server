from django.shortcuts import render
from django.views.generic import TemplateView
from django.http import HttpResponse

# Create your views here.

class ConnectView(TemplateView):
    
    def get(self, request, *args, **kwargs):
        return render(request, 'WebBluetooth/connectView.html')
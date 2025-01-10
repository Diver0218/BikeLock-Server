from django.urls import path
from . import views

urlpatterns = [
    path('', views.ConnectView.as_view(), name='connect'),
]
from django.urls import path
from . import views

urlpatterns = [
    path('', views.GPS.as_view(), name='gps'),
    path('history/', views.gps_history_view, name='gps_history_view'),
]
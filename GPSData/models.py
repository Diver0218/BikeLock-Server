from django.db import models

class GPSData(models.Model):
    
    latitude = models.FloatField()
    longitude = models.FloatField()
    timestamp = models.DateTimeField()
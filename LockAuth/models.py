from django.db import models
import uuid

class Token(models.Model):
    
    tokenSecret = models.CharField(max_length=32)
    timestamp = models.DateTimeField()

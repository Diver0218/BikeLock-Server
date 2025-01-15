from django.db import models
import uuid

class Lock(models.Model):
    
    LockID = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    CurrentToken = models.CharField(max_length=32, default='')
    TokenTimestamp = models.DateTimeField()
    # PermittedUsers = models.ManyToManyField('auth.UserManager', related_name='Locks')
    
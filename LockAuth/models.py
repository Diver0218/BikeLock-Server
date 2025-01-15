from django.db import models
import uuid

class Lock(models.Model):
    
    LockID = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    PermittedUsers = models.ManyToManyField('User', related_name='Locks')
    
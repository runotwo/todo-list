from django.db import models

class TodoItem(models.Model):
    text = models.TextField(default='')
    is_complete = models.BooleanField(default=False)
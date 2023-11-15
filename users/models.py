from django.db import models

# Create your models here.
from django.db import models
from django.contrib.auth.models import User

def upload_path(instance, filename):
    return '/'.join(['displaypictures', str(instance.title), filename])

# Create your models here.
class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    username = models.CharField(max_length= 50)
    following = models.ManyToManyField(User, related_name="followers", blank=True)
    bio = models.CharField(default="",blank=True,null=True,max_length=350)
    gender = models.CharField(max_length=15)
    profession = models.CharField(max_length=25)
    email = models.CharField(max_length=50)
    ban_status= models.IntegerField(default=0)
    profile_img = models.ImageField(upload_to='ProfileImages',blank= True, null= True)
    master_key= models.IntegerField(default=0)

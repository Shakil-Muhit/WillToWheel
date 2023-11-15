from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Post(models.Model):
    author= models.ForeignKey(User, on_delete=models.CASCADE,related_name='posts')
    upvotes= models.ManyToManyField(User, blank=True, related_name='upvotes')
    downvotes= models.ManyToManyField(User, blank= True, related_name='downvotes')
    post_type= models.CharField(max_length=20)
    car_type= models.CharField(max_length=200)
    body= models.CharField(max_length=2000)
    is_reported= models.BooleanField(default=False)


class Comment(models.Model):
    post= models.ForeignKey(Post, on_delete=models.CASCADE, related_name= 'comments')
    author= models.ForeignKey(User, on_delete=models.CASCADE, related_name= 'comments')
    body= models.CharField(max_length=1000)
    is_reported= models.BooleanField(default=False)


class Reply(models.Model):
    comment= models.ForeignKey(Comment, on_delete=models.CASCADE)
    author= models.ForeignKey(User, on_delete=models.CASCADE)
    body= models.CharField(max_length=1000)
    authorname= models.CharField(max_length=1000)

class Tag(models.Model):
    post= models.ForeignKey(Post, on_delete= models.CASCADE)
    name= models.CharField(max_length=50)
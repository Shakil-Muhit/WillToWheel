from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Profile

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model= User
        fields= ('username', 'password')

class LoginSerializer(serializers.Serializer):
    username= serializers.CharField(max_length= 50)
    password= serializers.CharField(max_length= 50)

class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model= Profile
        fields= ('user', 'username', 'following','bio', 'profession', 'ban_status','profile_img')

class DPSerializer(serializers.ModelSerializer):
    class Meta:
        model= Profile
        fields= ('profile_img',)

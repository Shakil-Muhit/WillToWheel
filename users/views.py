from django.shortcuts import render
from rest_framework import generics,status
from rest_framework.views import APIView
from rest_framework.response import Response
from django.http import HttpResponse
from rest_framework.parsers import MultiPartParser, FormParser
from django.views.decorators.csrf import ensure_csrf_cookie
from django.utils.decorators import method_decorator

from .serializers import UserSerializer, LoginSerializer, ProfileSerializer, DPSerializer
from django.contrib.auth import login, logout, authenticate
from django.contrib.auth.models import User
from django.contrib.auth.forms import UserCreationForm 
from .models import Profile
from posts.models import Post
from posts.serializers import PostSerializer

class RegisterUserView(generics.CreateAPIView):
    serializer_class= UserSerializer

    def post(self, request, format= None):
        serializer= self.serializer_class(data= request.data)
        # print(request.data)
        if serializer.is_valid():
            username= serializer.data.get('username')
            password= serializer.data.get('password')
            # user= User(username=username,password=password)
            user= User.objects.create_user(username=username,password=password)
            user.save()

            profile= Profile(user= user, username= username)
            profile.save()
            login(request,user)
            return Response(UserSerializer(User(username= username, password= password)).data, status= status.HTTP_201_CREATED)
        else : print("!!!")
        return Response(UserSerializer(User(username= username, password= password)).data, status= status.HTTP_400_BAD_REQUEST)

class LoginUserView(generics.CreateAPIView):
    serializer_class= LoginSerializer

    def post(self, request, format= None):
        serializer= self.serializer_class(data= request.data)
        print(request.data)
        if serializer.is_valid():
            username= serializer.data.get('username')
            password= serializer.data.get('password')

            user= authenticate(request, username= username, password= password)
            if user is not None:
                login(request,user)
                print(str(request.user.profile.username))
                csrf = request.COOKIES['csrftoken']
                print(csrf)

                return Response(UserSerializer(User(username=username,password=password)).data, status= status.HTTP_200_OK)
            return Response({'message': 'invalid'}, status= status.HTTP_400_BAD_REQUEST)
        return Response(serializer.errors, status= status.HTTP_400_BAD_REQUEST)

class LogoutUserView(APIView):
    def post(self, request, format= None):
        if not request.user.is_authenticated:
            return Response({'message':'Not logged in'}, status= status.HTTP_400_BAD_REQUEST)
        logout(request)
        return Response({'message': 'Successfully logged out'}, status= status.HTTP_200_OK)

def logoutView(request):
    if not request.user.is_authenticated:
        return HttpResponse('Not logged in')
    logout(request)
    return HttpResponse('Successfully logged out')

# @ensure_csrf_cookie
class UpdateDP(APIView):
    # @method_decorator(ensure_csrf_cookie)
    # def dispatch(self, *args, **kwargs):
    #     return super().dispatch(*args, **kwargs)
    # parser_classes = (MultiPartParser, FormParser)
    serializer_class= DPSerializer
    # @ensure_csrf_cookie
    def post(self, request, format= None):
        serializer= self.serializer_class(data= request.data)
        print(request.data)
        # if serializer.is_valid():
        # if not request.user.is_authenticated:
        #     return Response({'message':'Not logged in'}, status= status.HTTP_400_BAD_REQUEST)
        profile_img= request.data.get('profile_img')
        currentuser= request.user
        profile= currentuser.profile
        profile.profile_img= profile_img
        profile.save(update_fields=['profile_img'])
        print(profile.profile_img)
        return Response(DPSerializer(profile).data, status= status.HTTP_201_CREATED)
    # return Response(serializer.errors, status= status.HTTP_400_BAD_REQUEST)

class CsrfView(APIView):
    def get(self,request,format= None):
        if not request.user.is_authenticated:
            return HttpResponse('Not logged in')
        return Response({'value': request.COOKIES['csrftoken']})   

class CurrentUserDP(APIView):
    def get(self,request,format= None):
        if not request.user.is_authenticated:
            return HttpResponse('Not logged in')
        return Response({'value': request.user.profile})   

class FollowUser(generics.CreateAPIView):
    serializer_class= UserSerializer
    def post(self,request, format= None):
        if not request.user.is_authenticated:
            return Response({'message':'Not logged in'}, status= status.HTTP_400_BAD_REQUEST)
        username= request.data.get('username')
        if username is not None:
            users= User.objects.filter(username=username)
            if len(users)>0:
                user= users[0]
                currentuser= request.user
                profile= currentuser.profile
                profile.following.add(user)
                return Response({'message': 'Successfully followed '+username}, status= status.HTTP_201_CREATED)
            return Response({'User Not Found': 'User does not exist'}, status= status.HTTP_404_NOT_FOUND)
        return Response({'Bad Request': 'Invalid input'}, status= status.HTTP_400_BAD_REQUEST)
    
class UnfollowUser(generics.CreateAPIView):
    serializer_class= UserSerializer
    def post(self,request, format= None):
        if not request.user.is_authenticated:
            return Response({'message':'Not logged in'}, status= status.HTTP_400_BAD_REQUEST)
        username= request.data.get('username')
        if username is not None:
            users= User.objects.filter(username=username)
            if len(users)>0:
                user= users[0]
                currentuser= request.user
                profile= currentuser.profile
                profile.following.remove(user)
                return Response({'message': 'Successfully unfollowed '+username}, status= status.HTTP_201_CREATED)
            return Response({'User Not Found': 'User does not exist'}, status= status.HTTP_404_NOT_FOUND)
        return Response({'Bad Request': 'Invalid input'}, status= status.HTTP_400_BAD_REQUEST)

class GetCurrentUser(APIView):
    def get(self,request, format= None):
        if not request.user.is_authenticated:
            return HttpResponse('Not logged in')
        profile= request.user.profile
        return Response(ProfileSerializer(profile).data, status= status.HTTP_200_OK)
    
class GetProfile(APIView):
    serializer_class= ProfileSerializer

    def get(self, request, format= None):
        username= request.GET.get('username')
        if username != None:
            user = User.objects.filter(username=username)
            if len(user) > 0:
                return Response(ProfileSerializer(user[0].profile).data, status= status.HTTP_200_OK)
            return Response({'User Not Found': 'User does not exist'}, status= status.HTTP_404_NOT_FOUND)
        return Response({'Bad Request': 'Invalid parameters'}, status= status.HTTP_400_BAD_REQUEST)

class GetUsername(APIView):
    serializer_class= ProfileSerializer

    def get(self, request, format= None):
        username= request.GET.get('id')
        if username != None:
            user = User.objects.filter(id=int(username))
            if len(user) > 0:
                return Response( {'name' : user[0].username},status= status.HTTP_200_OK)
            return Response({'User Not Found': 'User does not exist'}, status= status.HTTP_404_NOT_FOUND)
        return Response({'Bad Request': 'Invalid parameters'}, status= status.HTTP_400_BAD_REQUEST)
    
class GetUserPosts(APIView):
    serializer_class= PostSerializer

    def get(self, request, format=None):
        username= request.GET.get('username')
        if username != None:
            user= User.objects.filter(username=username)
            if len(user)>0:
                posts= Post.objects.filter(author= user[0])
                return Response(PostSerializer(posts,many= True).data, status= status.HTTP_200_OK)
            return Response({'User Not Found': 'User does not exist'}, status= status.HTTP_404_NOT_FOUND)
        return Response({'Bad Request': 'Invalid parameters'}, status= status.HTTP_400_BAD_REQUEST)
    
class GetPostsBySearch(APIView):
    serializer_class= PostSerializer

    def get(self, request, format=None):
        search_string= request.GET.get('search_string')
        if search_string != None:
            posts= Post.objects.filter(body__icontains=search_string)
            return Response(PostSerializer(posts,many= True).data, status= status.HTTP_200_OK)
            # return Response({'User Not Found': 'User does not exist'}, status= status.HTTP_404_NOT_FOUND)
        return Response({'Bad Request': 'Invalid parameters'}, status= status.HTTP_400_BAD_REQUEST)
    
class GetUsersBySearch(APIView):
    serializer_class= ProfileSerializer

    def get(self, request, format=None):
        search_string= request.GET.get('search_string')
        if search_string != None:
            users= Profile.objects.filter(username__icontains=search_string)
            return Response(ProfileSerializer(users,many= True).data, status= status.HTTP_200_OK)
            # return Response({'User Not Found': 'User does not exist'}, status= status.HTTP_404_NOT_FOUND)
        return Response({'Bad Request': 'Invalid parameters'}, status= status.HTTP_400_BAD_REQUEST)

class GetCurrentUserPosts(APIView):
    serializer_class= PostSerializer

    def get(self, request, format=None):
        if not request.user.is_authenticated:
            return HttpResponse('Not logged in')
        username= request.user.username
        if username != None:
            user= User.objects.filter(username=username)
            if len(user)>0:
                posts= Post.objects.filter(author= user[0])
                return Response(PostSerializer(posts,many= True).data, status= status.HTTP_200_OK)
            return Response({'User Not Found': 'User does not exist'}, status= status.HTTP_404_NOT_FOUND)
        return Response({'Bad Request': 'Invalid parameters'}, status= status.HTTP_400_BAD_REQUEST)
    
class GetCurrentUserFollowing(APIView):
    serializer_class= PostSerializer

    def get(self, request, format=None):
        if not request.user.is_authenticated:
                return HttpResponse('Not logged in')
        username= request.user.username
        if username != None:
            user= User.objects.filter(username=username)
            if len(user)>0:
                username2= request.GET.get('username')
                users= User.objects.filter(username=username2)
                if len(users)>0:
                    other_user= users[0]
                    ret= False
                    if other_user in user[0].profile.following.all():
                        ret= True
                    return Response({'follow_status': ret}, status= status.HTTP_200_OK)
                return Response({'User Not Found': 'User does not exist'}, status= status.HTTP_404_NOT_FOUND)
            return Response({'User Not Found': 'User does not exist'}, status= status.HTTP_404_NOT_FOUND)
        return Response({'Bad Request': 'Invalid parameters'}, status= status.HTTP_400_BAD_REQUEST)

class GetCommunityPosts(APIView):
    serializer_class= PostSerializer

    def get(self, request, format=None):
        if not request.user.is_authenticated:
            return HttpResponse('Not logged in')
        username= request.user.username
        if username != None:
            user= User.objects.filter(username=username)
            if len(user)>0:
                posts= Post.objects.filter(author__in= user[0].profile.following.all() )
                return Response(PostSerializer(posts,many= True).data, status= status.HTTP_200_OK)
            return Response({'User Not Found': 'User does not exist'}, status= status.HTTP_404_NOT_FOUND)
        return Response({'Bad Request': 'Invalid parameters'}, status= status.HTTP_400_BAD_REQUEST)
    

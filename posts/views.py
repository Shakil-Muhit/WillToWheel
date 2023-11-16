from django.http import HttpResponse
from django.shortcuts import render
from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.response import Response
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from .models import Post, Comment, Reply, Chat, ChatText, Notification
from users.models import User
from .serializers import AddPostSerializer, AddCommentSerializer, AddReplySerializer, VoteSerializer
from .serializers import PostSerializer, CommentSerializer, ReplySerializer, PostImageSerializer,AddChatTextSerializer
from .serializers import ChatSerializer, ChatTextSerializer, NotificationSerializer, AddNotificationSerializer

# Create your views here.
class PostView(generics.CreateAPIView):
    queryset= Post.objects.all()
    serializer_class= PostSerializer

    def get(self,request,format= None):
        posts= Post.objects.all()
        serializer= PostSerializer(posts, many= True)
        return Response(serializer.data)
@method_decorator(csrf_exempt, name='dispatch')
class AddPostView(generics.CreateAPIView):
    serializer_class= AddPostSerializer

    def post(self, request, format= None):
        if not request.user.is_authenticated:
            return Response({'message': 'Not logged in'}, status= status.HTTP_400_BAD_REQUEST)
        # serializer= self.serializer_class(data= request.data)
        # if serializer.is_valid():
        body= request.data.get('body')
        post_type= request.data.get('post_type')
        car_type= request.data.get('car_type')
        post_img= request.data.get('post_img')
        post= Post(author= request.user, body= body, post_type=post_type, car_type=car_type, post_img=post_img)
        post.save()

        return Response(PostSerializer(post).data, status= status.HTTP_201_CREATED)
        # return Response({'message': 'invalid input'}, status= status.HTTP_400_BAD_REQUEST)
    
class UpdatePostView(generics.CreateAPIView):
    serializer_class= AddPostSerializer

    def post(self, request, format= None):
        if not request.user.is_authenticated:
            return Response({'message': 'Not logged in'}, status= status.HTTP_400_BAD_REQUEST)

        body= request.data.get('body')
        postid= request.data.get('post_id')
        posts = Post.objects.filter(id=postid)
        post= posts[0]
        post.body= body
        post.save(update_fields=['body'])

        return Response(PostSerializer(post).data, status= status.HTTP_201_CREATED)
    
class DeletePostView(generics.CreateAPIView):
    serializer_class= AddPostSerializer

    def post(self, request, format= None):
        if not request.user.is_authenticated:
            return Response({'message': 'Not logged in'}, status= status.HTTP_400_BAD_REQUEST)

        postid= request.data.get('post_id')
        print(postid)
        posts = Post.objects.filter(id=postid)
        if(len(posts) > 0):
            post= posts[0]
            post.delete()

            return Response({'message':'successfully deleted'}, status= status.HTTP_201_CREATED)
        return Response({'message':'successfully not deleted'}, status= status.HTTP_201_CREATED)
    
# class AddPostImageView(APIView):
#     serializer_class= PostImageSerializer
#     # @ensure_csrf_cookie
#     def post(self, request, format= None):
#         serializer= self.serializer_class(data= request.data)
#         print(request.data)
#         # if serializer.is_valid():
#         # if not request.user.is_authenticated:
#         #     return Response({'message':'Not logged in'}, status= status.HTTP_400_BAD_REQUEST)
#         postid= request.data.get('post_id')
#         postList= Post.objects.filter(id=postid)
#         if len(postList)>0 :
#             post= postList[0]
#             post_img= request.data.get('post_img')
#             post
#             currentuser= request.user
#             profile= currentuser.profile
#             profile.profile_img= profile_img
#             profile.save(update_fields=['profile_img'])
#             print(profile.profile_img)
#         return Response(DPSerializer(profile).data, status= status.HTTP_201_CREATED)

class AddCommentView(generics.CreateAPIView):
    serializer_class= AddCommentSerializer

    def post(self, request, format= None):
        if not request.user.is_authenticated:
            return Response({'message': 'Not logged in'}, status= status.HTTP_400_BAD_REQUEST)
        serializer= self.serializer_class(data= request.data)
        if serializer.is_valid():
            postid= request.data.get('post_id')
            postList= Post.objects.filter(id=postid)
            if len(postList)>0 :
                post= postList[0]
                body= request.data.get('body')
                comment= Comment(author= request.user, post=post, body= body)
                comment.save()

                return Response(AddCommentSerializer(comment).data, status= status.HTTP_201_CREATED)
            return Response({'message':'Post does not exist'}, status= status.HTTP_400_BAD_REQUEST)
        return Response({'message': 'invalid input'}, status= status.HTTP_400_BAD_REQUEST)
    
class DeleteCommentView(generics.CreateAPIView):
    serializer_class= AddCommentSerializer

    def post(self, request, format= None):
        if not request.user.is_authenticated:
            return Response({'message': 'Not logged in'}, status= status.HTTP_400_BAD_REQUEST)

        commentid= request.data.get('comment_id')
        comments = Comment.objects.filter(id=commentid)
        comment= comments[0]
        comment.delete()

        return Response({'message':'successfully deleted'}, status= status.HTTP_201_CREATED)
    
class AddReplyView(generics.CreateAPIView):
    serializer_class= AddReplySerializer

    def post(self, request, format= None):
        if not request.user.is_authenticated:
            return Response({'message': 'Not logged in'}, status= status.HTTP_400_BAD_REQUEST)
        serializer= self.serializer_class(data= request.data)
        if serializer.is_valid():
            commentid= request.data.get('comment_id')
            commentList= Comment.objects.filter(id=commentid)
            if len(commentList)>0 :
                comment= commentList[0]
                body= request.data.get('body')
                reply= Reply(author= request.user, comment= comment, body= body, authorname = request.user.username)
                reply.save()

                return Response(AddReplySerializer(reply).data, status= status.HTTP_201_CREATED)
            return Response({'message':'Comment does not exist'}, status= status.HTTP_400_BAD_REQUEST)
        return Response({'message': 'invalid input'}, status= status.HTTP_400_BAD_REQUEST)
    
class AddNotificationView(generics.CreateAPIView):
    serializer_class= AddNotificationSerializer

    def post(self, request, format= None):
        if not request.user.is_authenticated:
            return Response({'message': 'Not logged in'}, status= status.HTTP_400_BAD_REQUEST)
        serializer= self.serializer_class(data= request.data)
        if serializer.is_valid():
            post_id= request.data.get('post_id')
            username2= request.data.get('receiver_name')
            notification_type= request.user.get('notification_type')
            # commentList= Comment.objects.filter(id=commentid)
            users2= User.objects.filter(username= username2)
            username1= request.user.username
            notification= Notification(user=users2[0],notification_type=notification_type,post_id=post_id,notifier= username1)
            notification.save()
            return Response(NotificationSerializer(notification).data, status= status.HTTP_200_OK)
        return Response({'message': 'invalid input'}, status= status.HTTP_400_BAD_REQUEST)

class GetChat(APIView):
    serializer_class= ChatSerializer

    def get(self, request, format=None):
        if not request.user.is_authenticated:
            return HttpResponse('Not logged in')
        username= request.user.username
        if username != None:
            user= User.objects.filter(username=username)
            if len(user)>0:
                chats= Chat.objects.filter(user= user[0])
                username1= request.user.username
                username2= request.GET.get('texter')
                if username2 != None:
                    user2= User.objects.filter(username=username2)
                    filtered_chat= chats.filter(texter=username2)
                    print(username1)
                    print("PROBLEM "+username2)
                    if len(filtered_chat) > 0:
                        return Response(ChatSerializer(filtered_chat[0]).data, status= status.HTTP_200_OK)
                    else:
                        chat1= Chat(user=user[0], texter= username2)
                        chat1.save()
                        chat2= Chat(user=user2[0], texter= username1)
                        chat2.save()
                        
                        return Response(ChatSerializer(chat1).data, status= status.HTTP_200_OK)
                return Response({'Message': 'No texter'}, status=status.HTTP_400_BAD_REQUEST)
            return Response({'User Not Found': 'User does not exist'}, status= status.HTTP_404_NOT_FOUND)
        return Response({'Bad Request': 'Invalid parameters'}, status= status.HTTP_400_BAD_REQUEST)

class AddChatTextView(generics.CreateAPIView):
    serializer_class= AddChatTextSerializer

    def post(self, request, format= None):
        if not request.user.is_authenticated:
            return Response({'message': 'Not logged in'}, status= status.HTTP_400_BAD_REQUEST)
        serializer= self.serializer_class(data= request.data)
        if serializer.is_valid():
            username1= request.user.username
            username2= request.data.get('texter')
            users1= User.objects.filter(username=username1)
            users2= User.objects.filter(username=username2)
            print("USER1: "+username1)
            print("USER 2:"+username2)
            if len(users1)>0 and len(users2)>0 :
                user1= users1[0]
                user2= users2[0]
                body= request.data.get('body')
                
                chats1= user1.chats.filter(texter=username2)
                if len(chats1)>0 :
                    chats2= user2.chats.filter(texter= username1)
                    chat1= chats1[0]
                    chat2= chats2[0]
                    chat_text1= ChatText(chat=chat1, body=body, person=1)
                    chat_text1.save()
                    chat_text2= ChatText(chat=chat2, body=body, person=2)
                    chat_text2.save()
                    return Response(AddChatTextSerializer(chat_text1).data, status= status.HTTP_201_CREATED)
                else :
                    chat1= Chat(user=user1, texter= username2)
                    chat1.save()
                    chat_text1= ChatText(chat=chat1, body=body, person=1)
                    chat_text1.save()
                    chat2= Chat(user=user2, texter= username1)
                    chat2.save()
                    chat_text2= ChatText(chat=chat2, body=body, person=2)
                    chat_text2.save()
                    return Response(AddChatTextSerializer(chat_text1).data, status= status.HTTP_201_CREATED)

                return Response({'message':'Chat added successfully'}, status= status.HTTP_201_CREATED)
            return Response({'message':'Comment does not exist'}, status= status.HTTP_501_NOT_IMPLEMENTED)
        return Response({'message': 'invalid input'}, status= status.HTTP_400_BAD_REQUEST)

class GetCurrentUserChats(APIView):
    serializer_class= ChatSerializer

    def get(self, request, format=None):
        if not request.user.is_authenticated:
            return HttpResponse('Not logged in')
        username= request.user.username
        if username != None:
            user= User.objects.filter(username=username)
            if len(user)>0:
                chats= Chat.objects.filter(user= user[0])
                return Response(ChatSerializer(chats,many= True).data, status= status.HTTP_200_OK)
            return Response({'User Not Found': 'User does not exist'}, status= status.HTTP_404_NOT_FOUND)
        return Response({'Bad Request': 'Invalid parameters'}, status= status.HTTP_400_BAD_REQUEST)
    
class GetCurrentUserNotifications(APIView):
    serializer_class= NotificationSerializer

    def get(self, request, format=None):
        if not request.user.is_authenticated:
            return HttpResponse('Not logged in')
        username= request.user.username
        if username != None:
            user= User.objects.filter(username=username)
            if len(user)>0:
                notifications= Notification.objects.filter(user= user[0])
                return Response(NotificationSerializer(notifications,many= True).data, status= status.HTTP_200_OK)
            return Response({'User Not Found': 'User does not exist'}, status= status.HTTP_404_NOT_FOUND)
        return Response({'Bad Request': 'Invalid parameters'}, status= status.HTTP_400_BAD_REQUEST)
    
class GetChatTexts(APIView):    
    def get(self, request, format=None):
        chatid= request.GET.get('chat_id')
        if chatid != None:
            chat= Chat.objects.filter(id=chatid)
            if len(chat)>0:
                chat_texts= ChatText.objects.filter(chat=chat[0])
                return Response(ChatTextSerializer(chat_texts,many= True).data, status= status.HTTP_200_OK)
            return Response({'message': 'Post does not exist'}, status= status.HTTP_404_NOT_FOUND)
        return Response({'message':'Invalid input'}, status= status.HTTP_400_BAD_REQUEST)

class ReportPost(generics.CreateAPIView):
    serializer_class= VoteSerializer

    def post(self, request, format=None):
        if not request.user.is_authenticated:
            return Response({'message': 'Not logged in'}, status= status.HTTP_400_BAD_REQUEST)
        
        postid= request.data.get('id')
        if postid != None:
            posts= Post.objects.filter(id= postid)
            if len(posts)>0:
                post= posts[0]
                post.is_reported= True
                post.save()
                return Response(VoteSerializer(post).data,status= status.HTTP_200_OK)
            return Response({'Post Not Found': 'Post does not exist'}, status= status.HTTP_404_NOT_FOUND)
        return Response({'Bad Request': 'Invalid parameters'}, status= status.HTTP_400_BAD_REQUEST)

class ReportComment(generics.CreateAPIView):
    serializer_class= CommentSerializer

    def post(self, request, format=None):
        if not request.user.is_authenticated:
            return Response({'message': 'Not logged in'}, status= status.HTTP_400_BAD_REQUEST)
        
        commentid= request.data.filter('id')
        if commentid != None:
            comments= Post.objects.get(id= commentid)
            if len(comments)>0:
                comment= comments[0]
                comment.is_reported= True
                comment.save(update_fields=['is_reported'])
                return Response(CommentSerializer(comment).data,status= status.HTTP_200_OK)
            return Response({'Comment Not Found': 'Comment does not exist'}, status= status.HTTP_404_NOT_FOUND)
        return Response({'Bad Request': 'Invalid parameters'}, status= status.HTTP_400_BAD_REQUEST)

    
class GetPost(APIView):
    serializer_class= PostSerializer

    def get(self, request, format= None):
        postid= request.GET.get('post_id')
        if postid != None:
            post = Post.objects.filter(id=postid)
            if len(post) > 0:
                return Response(PostSerializer(post[0]).data, status= status.HTTP_200_OK)
            return Response({'Post Not Found': 'Post does not exist'}, status= status.HTTP_404_NOT_FOUND)
        return Response({'Bad Request': 'Invalid parameters'}, status= status.HTTP_400_BAD_REQUEST)
    
class GetReportedPosts(APIView):
    serializer_class= PostSerializer

    def get(self,request,format=None):
        posts= Post.objects.filter(is_reported= True)
        return Response(PostSerializer(posts,many=True).data, status= status.HTTP_200_OK)

class GetReportedComments(APIView):
    serializer_class= CommentSerializer

    def get(self,request,format=None):
        comments= Comment.objects.filter(is_reported= True)
        return Response(CommentSerializer(comments,many=True).data, status= status.HTTP_200_OK)

class GetComment(APIView):
    serializer_class= CommentSerializer

    def get(self, request, format= None):
        commentid= request.GET.get('comment_id')
        if commentid != None:
            comment = Comment.objects.filter(id=commentid)
            if len(comment) > 0:
                return Response(CommentSerializer(comment[0]).data, status= status.HTTP_200_OK)
            return Response({'Comment Not Found': 'Comment does not exist'}, status= status.HTTP_404_NOT_FOUND)
        return Response({'Bad Request': 'Invalid parameters'}, status= status.HTTP_400_BAD_REQUEST)

class GetReply(APIView):
    serializer_class= ReplySerializer

    def get(self, request, format= None):
        replyid= request.GET.get('reply_id')
        if replyid != None:
            reply = Reply.objects.filter(id=replyid)
            if len(reply) > 0:
                return Response(ReplySerializer(reply[0]).data, status= status.HTTP_200_OK)
            return Response({'Reply Not Found': 'Reply to the comment does not exist'}, status= status.HTTP_404_NOT_FOUND)
        return Response({'Bad Request': 'Invalid parameters'}, status= status.HTTP_400_BAD_REQUEST)    

class GetPostComments(APIView):
    
    def get(self, request, format=None):
        postid= request.GET.get('post_id')
        if postid != None:
            post= Post.objects.filter(id=postid)
            if len(post)>0:
                comments= Comment.objects.filter(post=post[0])
                return Response(CommentSerializer(comments,many= True).data, status= status.HTTP_200_OK)
            return Response({'message': 'Post does not exist'}, status= status.HTTP_404_NOT_FOUND)
        return Response({'message':'Invalid input'}, status= status.HTTP_400_BAD_REQUEST)

class GetCommentReplies(APIView):
    def get(self,request,format=None):
        commentid= request.GET.get('comment_id')
        if commentid != None:
            comment= Comment.objects.filter(id=commentid)
            if len(comment)>0:
                replies= Reply.objects.filter(comment=comment[0])
                return Response(ReplySerializer(replies,many= True).data, status= status.HTTP_200_OK)
            return Response({'message': 'Comment does not exist'}, status= status.HTTP_404_NOT_FOUND)
        return Response({'message':'Invalid input'}, status= status.HTTP_400_BAD_REQUEST)

def index(request):
    return HttpResponse("This is index page")
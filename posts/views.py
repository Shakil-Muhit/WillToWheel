from django.http import HttpResponse
from django.shortcuts import render
from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.response import Response
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from .models import Post, Comment, Reply
from .serializers import AddPostSerializer, AddCommentSerializer, AddReplySerializer, VoteSerializer
from .serializers import PostSerializer, CommentSerializer, ReplySerializer

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
        post= Post(author= request.user, body= body, post_type=post_type, car_type=car_type)
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
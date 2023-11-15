from rest_framework import serializers

from .models import Post, Comment, Reply, PostImage, Chat, ChatText

class PostImageSerializer(serializers.ModelSerializer):
    class Meta:
        model= PostImage
        fields= ('id','post_img')

class PostSerializer(serializers.ModelSerializer):
    # post_images= PostImageSerializer(many=True)
    class Meta:
        model= Post
        fields= ('id','author','body','is_reported','upvotes','downvotes','post_img','post_type','car_type')

class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model= Comment
        fields= ('id','author','body')

class ReplySerializer(serializers.ModelSerializer):
    class Meta:
        model= Reply
        fields= ('id', 'comment', 'body', 'author', 'authorname')

class ChatSerializer(serializers.ModelSerializer):
    class Meta:
        model= Chat
        fields= ('id','texter')

class ChatTextSerializer(serializers.ModelSerializer):
    class Meta:
        model= ChatText
        fields= ('id','body')

class AddPostSerializer(serializers.Serializer):
    body= serializers.CharField(max_length= 2000)
    post_type= serializers.CharField(max_length= 20)
    car_type= serializers.CharField(max_length= 200)

class AddCommentSerializer(serializers.Serializer):
    body= serializers.CharField(max_length= 2000)

class AddReplySerializer(serializers.Serializer):
    body= serializers.CharField(max_length= 2000)

class AddChatTextSerializer(serializers.Serializer):
    texter= serializers.CharField(max_length= 200)
    body= serializers.CharField(max_length= 2000)

class VoteSerializer(serializers.ModelSerializer):
    id= serializers.IntegerField()
    class Meta:
        model= Post
        fields= ('id',)

from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Post

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'first_name', 'last_name')

class PostSerializer(serializers.ModelSerializer):
    author = UserSerializer(read_only=True)
    
    class Meta:
        model = Post
        fields = ('id', 'title', 'content', 'image', 'author', 'created_at', 'updated_at')
        read_only_fields = ('author', 'created_at', 'updated_at')

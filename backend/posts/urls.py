from django.contrib import admin
from django.urls import path, include
from . import views

urlpatterns = [
    path('create/', views.create_post, name='create post'),
    path('posts/', views.get_posts)
]

from django.urls import path,re_path
from . import views

urlpatterns = [
    
    # path('search',views.index),    
    # path('register', views.index),
    # path('community', views.index),
    # path('profile', views.index),
    # path('comments', views.index),
    path('', views.index),
]

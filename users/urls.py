from django.urls import path
from django.conf.urls.static import static
from django.conf import settings

from . import views
from .views import RegisterUserView, LoginUserView, LogoutUserView, GetProfile
from .views import GetUserPosts, GetCurrentUser, GetCurrentUserPosts, GetCommunityPosts
# from .views import  BanUserFromCommenting, BanUserFromPosting, UnbanUser
from .views import  GetUsername, UpdateDP, CsrfView, CurrentUserDP, FollowUser

class UpdateDPToken(UpdateDP):
    authentication_classes = ()

urlpatterns= [
    path("createuser",RegisterUserView.as_view(),name="registeruser"),
    path("login", LoginUserView.as_view(), name="login"),
    path("logout", LogoutUserView.as_view() , name="logout"),
    path("getuser", GetProfile.as_view(), name="get_user"),
    path("followuser", FollowUser.as_view(), name="follow_user"),
    path("getuserposts",GetUserPosts.as_view(), name="get_user_posts"),
    path("getcommunityposts",GetCommunityPosts.as_view(), name="get_community_posts"),
    path("getcurrentuser",GetCurrentUser.as_view(), name="get_current_user"),
    path("getcurrentuserposts",GetCurrentUserPosts.as_view(), name="get_current_user_posts"),
    # path("banuserfromposting", BanUserFromPosting.as_view(), name="banuserfromposting"),
    # path("banuserfromcommenting", BanUserFromCommenting.as_view(), name="banuserfromcommenting"),
    # path("unbanuser", UnbanUser.as_view(), name="unbanuser"),
    path("getusername", GetUsername.as_view(), name="getusername"),
    path("updatedp", UpdateDP.as_view(), name= "updatedp"),
    path("getcsrf", CsrfView.as_view(), name= "getcsrf"),
    path("getcurrentdp", CurrentUserDP.as_view(), name= "getcurrentdp")
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
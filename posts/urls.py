from django.urls import path
from django.conf.urls.static import static
from django.conf import settings

from . import views
from .views import PostView, AddPostView, AddCommentView, AddReplyView
from .views import GetPost, GetComment, GetReply, GetReportedPosts, GetReportedComments
from .views import ReportPost, ReportComment ,UpdatePostView, DeleteCommentView, DeletePostView, GetPostComments, GetCommentReplies
from .views import AddChatTextView, GetChatTexts, GetCurrentUserChats, GetChat
from .views import AddNotificationView, GetCurrentUserNotifications

urlpatterns= [
    path("allposts",PostView.as_view(),name="posts"),
    path("addpost",AddPostView.as_view(), name="add_post"),
    path("updatepost",UpdatePostView.as_view(), name="update_post"),
    path("deletepost",DeletePostView.as_view(), name="delete_post"),
    path("addcomment",AddCommentView.as_view(), name="add_comment"),
    path("deletecomment",DeleteCommentView.as_view(), name="delete_comment"),
    path("addreply", AddReplyView.as_view(), name="add_reply"),
    path("addnotification", AddNotificationView.as_view(), name="add_notification"),
    path("getpost", GetPost.as_view(), name="get_post"),
    path("getcomment",GetComment.as_view(), name="get_comment"),
    path("getreportedposts", GetReportedPosts.as_view(), name="get_reported_posts"),
    path("getreportedcomments",GetReportedComments.as_view(), name="get_reported_comments"),
    path("getreply",GetReply.as_view(),name="get_reply"),
    path("reportpost", ReportPost.as_view(), name="report_post"),
    path("reportcomment",ReportComment.as_view(), name="report_comment"),
    path("getpostcomments",GetPostComments.as_view(), name="post_comment"),
    path("getcommentreplies",GetCommentReplies.as_view(), name="comment_replies"),
    path("getcurrentuserchats",GetCurrentUserChats.as_view(), name="get_current_user_chats"),
    path("getcurrentusernotifications",GetCurrentUserNotifications.as_view(), name="get_current_user_notifications"),
    path("getchattexts",GetChatTexts.as_view(), name="chat_texts"),
    path("getchat",GetChat.as_view(), name="get_chat"),
    path("addchattext",AddChatTextView.as_view(), name="add_chat_text")
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
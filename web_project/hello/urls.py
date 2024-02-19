# books/urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter

from hello import views


router = DefaultRouter()
router.register('books', views.BooksViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
from rest_framework import viewsets

from hello.models import Books
from hello.serializer import BooksSerializer


class BooksViewSet(viewsets.ModelViewSet):
    queryset = Books.objects.all()
    serializer_class = BooksSerializer
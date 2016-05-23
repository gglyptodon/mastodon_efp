import datetime
from haystack import indexes
from .models import Gene


class GeneIndex(indexes.SearchIndex, indexes.Indexable):
    text = indexes.CharField(document=True, use_template=True) # annotation
    
    def get_model(self):
        return Gene
    def index_queryset(self, using=None):
        return self.get_model().objects.all()



from django.conf.urls import url

from . import views

urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'^sgjson/(?P<id>[a-zA-Z0-9]+)/$', views.sgjson, name='sgjson'),
    url(r'^mgjson/(?P<id>[a-zA-Z0-9]+)/$', views.mgjson, name='mgjson'),

    url(r'^sgindex/$', views.sgindex, name='sgindex'),
    url(r'^mgindex/$', views.mgindex, name='mgindex'),
    url(r'^genes/$', views.genes, name='genes'),
    url(r'^geneindex/$', views.gene_index, name='geneindex'),
    url(r'^table/$', views.table, name='table'),
    url(r'^efp/(?P<id>[a-zA-Z0-9_.]+)/$', views.efp, name='efp'),
]
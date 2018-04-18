from django.conf.urls import url
from . import views

urlpatterns = [
    url(r'^$', views.index),
    url(r'^list/', views.get_list),
    url(r'^switch', views.change_is_complete),
    url(r'^delete', views.delete_item),
    url(r'^add', views.add_item)
]

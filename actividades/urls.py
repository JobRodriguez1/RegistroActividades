from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from actividades.views import *
from . import views

urlpatterns = [
    path('', inicio.as_view(), name="inicio"),
    path('registrarLog', registrar, name="registrarLog"),

] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)

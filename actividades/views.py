from django.shortcuts import render, redirect
from django.views import View
from flask import Flask, request
import datetime
from django.http import HttpResponse

# Create your views here.
class inicio(View):
    def get(self,request):
        return render(request,'inicio.html')



def registrar(request):
    if request.method == 'GET':
        accion = request.GET.get('accion', '')
        log_evento(accion)
        return HttpResponse('Registro exitoso')
    else:
        return HttpResponse('Método de solicitud no permitido')

def log_evento(accion):
    fecha_hora = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    log = f"{fecha_hora} - {accion}\n"

    with open('registros.txt', 'a') as archivo:
        archivo.write(log)

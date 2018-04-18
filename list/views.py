from django.shortcuts import render
from django.http import JsonResponse
from .models import TodoItem


def index(request):
    return render(request, 'index.html')


def get_list(request):
    list = [{'id': x.id, 'isComplete': x.is_complete, 'text': x.text} for x in TodoItem.objects.all()]
    return JsonResponse({'list': list}, safe=False)


def add_item(request):
    item = TodoItem(text=request.GET.get('text'))
    item.save()
    return JsonResponse({'dict': {'id': item.id, 'isComplete': False, 'text': item.text}}, safe=False)


def delete_item(request):
    item = TodoItem.objects.get(id=request.GET.get('id'))
    item.delete()
    return JsonResponse({'res': 'OK'}, safe=False)


def change_is_complete(request):
    item = TodoItem.objects.get(id=request.GET.get('id'))
    item.is_complete = not item.is_complete
    item.save()
    return JsonResponse({'res': 'OK'}, safe=False)

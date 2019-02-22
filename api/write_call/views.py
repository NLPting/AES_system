from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponse, JsonResponse
import json

# Create your views here.
    
@csrf_exempt
def write_call(request):
    if request.method == "GET":
        if request.body:
            import requests
            API_URL = 'http://writeahead.nlpweb.org/'
            query = API_URL + query
            r = requests.get(query)
            print(r.text)
            return r.text
            #return JsonResponse(response, safe=False)
        else:
            return HttpResponse("Your request body is empty.")
    else:
        return HttpResponse("Please use GET.")

    


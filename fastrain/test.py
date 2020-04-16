import json
from django.views import View
from django.http  import JsonResponse
from .models      import Users


class MainView(View):
    def post(self, requset):
        data = json.loads(request.body)
        Users(
              name     = data['name'],
              email    = data['email'],
							password = data['password']
        ).save()
        
        return JsonResponse({'message':'SUCCESS'}, status=200)

    def get(self, request):
		return JsonResponse({"Hello":"World"}, status=200)
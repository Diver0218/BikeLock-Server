from django.shortcuts import render
import json
from django.views.generic import TemplateView
from django.http import JsonResponse
from datetime import datetime
from .models import GPSData
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from django.contrib.auth.decorators import login_required


@method_decorator(csrf_exempt, name='dispatch')
class GPS(TemplateView):
    
    def post(self, request):
        try:
            
            # Use this for Authentication
            # if not request.user.is_authenticated:
            #     raise Exception("Not authenticated")
            
            data_raw = request.body.decode()
            if data_raw.strip():
                data = json.loads(data_raw)
            else:
                raise Exception("No data")
            latitude = data.get('latitude')
            longitude = data.get('longitude')
            timestamp = data.get('timestamp')
            datetime.strptime(timestamp, '%Y-%m-%d %H:%M:%S')
            
            gpsdata = GPSData(latitude=latitude, longitude=longitude, timestamp=timestamp)
            gpsdata.save()

            return JsonResponse({'status': 'success'}, status=200)
        except Exception as e:
            status = 400
            if str(e) == "Not authenticated":
                status = 401
            return JsonResponse({'error': str(e)}, status=status)

        
@login_required(login_url='/auth/login')
def gps_history_view(request):
    gps_data_objects = GPSData.objects.all().order_by('-timestamp')
    return render(request, 'GPSData/gps_history.html', {'gps_data':gps_data_objects})
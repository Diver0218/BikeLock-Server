from LockAuth.models import Token
import datetime

def tidy_up_db():
    now_time = datetime.datetime.now(datetime.timezone.utc).astimezone()
    Token.objects.filter(timestamp__lt=now_time - datetime.timedelta(minutes=1)).delete()
    
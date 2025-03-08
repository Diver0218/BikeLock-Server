from LockAuth.models import Token

def authenticate(tokenSecret):
    tokens = Token.objects.filter(tokenSecret=tokenSecret)
    if len(tokens) == 0:
        return False
    else:
        return True
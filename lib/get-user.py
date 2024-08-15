import sys
import win32api
import win32security

def get_username_from_token(token):
    try:
        handle = int(token, 16)  # need to convert from Hex / base 16
        win32security.ImpersonateLoggedOnUser(handle)
        user = win32api.GetUserName()
        win32security.RevertToSelf()  # undo impersonation
        win32api.CloseHandle(handle)  # don't leak resources, need to close the handle!
        return user
    except Exception as e:
        return f"Error: {str(e)}"

if __name__ == "__main__":
    if len(sys.argv) > 1:
        token = sys.argv[1]
        user = get_username_from_token(token)
        print(user)
    else:
        print("No token provided")

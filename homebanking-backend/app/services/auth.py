from app.controllers.ctrl_auth import login as ctrl_login

def login(db, numerodni=None, password=None):
    class Body:
        def __init__(self, username, password):
            self.username = username
            self.password = password
    body = Body(username=numerodni, password=password)
    conn = db.connection()
    return ctrl_login(conn, body)
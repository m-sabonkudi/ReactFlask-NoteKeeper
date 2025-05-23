from flask import Flask, render_template, abort, request, redirect, url_for, flash, session, jsonify, send_file
from flask_wtf import CSRFProtect
from flask_login import login_user, LoginManager, current_user, logout_user, login_required
import uuid
from flask_sqlalchemy import SQLAlchemy
from flask_login import UserMixin
from datetime import datetime, timezone
from urllib.parse import urlencode
import uuid
from sqlalchemy.dialects.postgresql import UUID

db = SQLAlchemy()


app = Flask(__name__)
app.config['SECRET_KEY'] = '8BYkEfBA6O6zWlSihBXox7C0sKR6b'
# csrf = CSRFProtect(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///final.db'
db.init_app(app)

manager = LoginManager(app)

class User(db.Model, UserMixin):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(250), nullable=False, unique=True)
    name = db.Column(db.String(250), nullable=False)
    password = db.Column(db.String(150), nullable=False)
    
    notes = db.relationship('Note', backref='user',
                              lazy=True, cascade='all, delete-orphan')


class Note(db.Model):
    __tablename__ = 'notes'
    id = db.Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    title = db.Column(db.String(200), nullable=False)
    content = db.Column(db.String(250), nullable=False, unique=True)

    user_id = db.Column(db.Integer, db.ForeignKey('users.id', ondelete='CASCADE'), nullable=False)

    def to_dict(self):
        return {
            "id": self.id,
            "title": self.title,
            "content": self.content,
        }



with app.app_context():
    db.create_all()


@manager.user_loader
def load_user(idn):
    return db.get_or_404(User, idn)



@app.route('/')
def home():
    return "Hello"

@app.post('/api/login')
def login():
    email = request.form.get("email")
    password = request.form.get("password")
    print(email, password)
    existing = User.query.filter_by(email=email).first()
    if not existing:
        return jsonify({'text': "User doesn't exist"}), 400
    if existing.password != password:
        return jsonify({'text': 'Wrong password'}), 400
    
    login_user(existing)
    return jsonify({"text": "Successful"}), 200


@app.post('/api/register')
def register():
    name = request.form.get("name")
    email = request.form.get("email")
    password = request.form.get("password")
    print(name, email, password)

    existing = User.query.filter_by(email=email).first()
    if existing:
        return jsonify({"text": "User already exists"}), 400
    
    else:
        new_user = User(
            email=email,
            name=name,
            password=password
        )
        db.session.add(new_user)
        db.session.commit()
        login_user(new_user)
        return jsonify({"text": "Successful"}), 200
    

@app.post("/api/add-note")
def add_note():
    print('addedeeded')
    response = request.get_json()
    print(response)
    title = response['title']
    content = response['content']
    identifier = response['id']

    new_note = Note(
        title=title,
        content=content,
        user_id=current_user.id
    )
    db.session.add(new_note)
    db.session.commit()
    return jsonify({"text": "Successful"}), 200


@app.delete("/api/delete-note")
def delete_note():
    note_id = request.args.get("note_id")
    if not note_id:
        return jsonify({"text": "Note ID missing"}), 403
    note_id = uuid.UUID(note_id)
    note = Note.query.filter_by(id=note_id).first()
    if not note:
        return jsonify({"text": "Note doesn't exist."}), 404
    if note.user_id != current_user.id:
        return jsonify({"text": "You didn't make this note."}), 403
    db.session.delete(note)
    db.session.commit()
    return jsonify({"text": "Successful"}), 200


@app.get("/api/get-notes")
def get_notes():
    notes = Note.query.filter_by(user_id=current_user.id).all()
    return jsonify([note.to_dict() for note in notes])


@app.get('/api/logged_status')
def logged_status():
    return jsonify({"logged_in": current_user.is_authenticated})


@app.get("/api/logout")
def logout():
    logout_user()
    return redirect('/register')

if __name__ == "__main__":
    app.run(port=4000, debug=True)
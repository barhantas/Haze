#Haze

Music Discover Platform that connected with Spotify Web API.Simply ypu can follow other people,share and discover 30 sec. previews of musics.





------------------------------------------------------
DB Connection Settings

DATABASES = {
    'default': {
        # Add 'postgresql_psycopg2', 'mysql', 'sqlite3' or 'oracle'.
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'NAME': 'apollo',
        'USER': 'postgres',
        'PASSWORD': '12345',
        'HOST': 'localhost',
        'PORT': '5432',
    },
}

pip install requirements.txt

python manage.py makemigrations
python manage.py migrate


in staticfiles directory ->

npm install
npm start 

#For Dev Watch Mode#
npm run dev
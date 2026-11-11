"""Automated tests never connect to the developer's real services."""
import os

os.environ['DATABASE_URL'] = ''
os.environ['BARO_API_KEY'] = ''

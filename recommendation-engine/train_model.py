import pandas as pd
import joblib
from sklearn.feature_extraction.text import TfidfVectorizer

DATA_PATH = 'data/resources.csv'
MODEL_PATH = 'models/recommender.pkl'

resources = pd.read_csv(DATA_PATH)
resources['text'] = resources[['title','author','category','department','course_code','keywords','description']].fillna('').agg(' '.join, axis=1)
vectorizer = TfidfVectorizer(stop_words='english')
matrix = vectorizer.fit_transform(resources['text'])
joblib.dump({'resources': resources, 'vectorizer': vectorizer, 'matrix': matrix}, MODEL_PATH)
print('Recommendation model saved to', MODEL_PATH)

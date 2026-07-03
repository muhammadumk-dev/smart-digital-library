import sys
import joblib
from sklearn.metrics.pairwise import cosine_similarity

MODEL_PATH = 'models/recommender.pkl'

def recommend(query, limit=5):
    model = joblib.load(MODEL_PATH)
    q_vec = model['vectorizer'].transform([query])
    scores = cosine_similarity(q_vec, model['matrix']).flatten()
    top = scores.argsort()[::-1][:limit]
    return model['resources'].iloc[top][['id','title','category','department','course_code']].to_dict('records')

if __name__ == '__main__':
    query = ' '.join(sys.argv[1:]) or 'software engineering system design'
    for item in recommend(query):
        print(item)

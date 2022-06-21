from flask import Flask, redirect, url_for, request, render_template, Response, jsonify, redirect

app = Flask(__name__)


@app.route('/', methods=['GET'])
def index():
    """
    Render the main page
    """
    return render_template('index.html')


@app.route('/about', methods=['GET'])
def about():
    """
    Render the about page
    """
    return render_template('about.html')


@app.route('/gender', methods=['GET'])
def gender():
    """
    Render the gender page
    """
    return render_template('gender.html')


@app.route('/emotion', methods=['GET'])
def emotion():
    """
    Render the emotion page
    """
    return render_template('emotion.html')


@app.route('/gender/predict', methods=['GET', 'POST'])
def gender_predict():
    '''
    predict function to predict the image
    Api hits this function when someone clicks submit.
    '''
    if request.method == 'POST':
        return jsonify(result="Gender")
    return None


@app.route('/emotion/predict', methods=['GET', 'POST'])
def emotion_predict():
    '''
    predict function to predict the image
    Api hits this function when someone clicks submit.
    '''
    if request.method == 'POST':
        return jsonify(result="Emotion")
    return None


if __name__ == '__main__':
    app.run(debug=True)

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


if __name__ == '__main__':
    app.run(debug=True)

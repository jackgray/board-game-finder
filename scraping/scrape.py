import requests
from bs4 import BeautifulSoup
import json

def scrape_game_data(url):
    response = requests.get(url)
    soup = BeautifulSoup(response.text, 'html.parser')
    
    games = []

    # Replace 'game_container' with the actual class name or tag where the game information is contained.
    for game_container in soup.find_all(class_='game_container'):
        game = {}

        # Replace 'game_name' with the actual class name or tag where the game name is.
        game['name'] = game_container.find(class_='game_name').text

        # Replace 'game_description' with the actual class name or tag where the game description is.
        game['description'] = game_container.find(class_='game_description').text

        # Replace 'game_genres' with the actual class name or tag where the game genres are.
        game['genres'] = [genre.text for genre in game_container.find(class_='game_genres').find_all('a')]

        # ... continue this pattern for all fields in your schema...
        
        games.append(game)

    return games

def main():
    # Replace 'url' with the URL of the website you want to scrape.
    url = 'https://www.example.com/games'
    games = scrape_game_data(url)

    with open('games.json', 'w') as f:
        json.dump(games, f, ensure_ascii=False, indent=4)

if __name__ == '__main__':
    main()

from bs4 import BeautifulSoup
import requests
import people_also_ask
from pprint import pprint

headers = {
    'User-agent':
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.67 Safari/537.36'
}

html = requests.get('https://www.google.com/search?q="What+is+the+age+of+donald+trump?', headers=headers)
soup = BeautifulSoup(html.text, 'html.parser')

answer = soup.select_one('.DI6Ufb').text
print(answer)

from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.action_chains import ActionChains
import time

chrome_options = Options()
chrome_options.add_argument("--headless")
chrome_options.add_argument("--no-sandbox")
chrome_options.add_argument("--disable-dev-shm-usage")
chrome_options.add_argument('log-level=3')

cService = Service(executable_path='chromedriver.exe')
driver = webdriver.Chrome(service=cService, options=chrome_options)

def people_also_ask(url):
    driver.get(url)
    time.sleep(3)  
    
    questions = driver.find_elements(By.XPATH, "//div[@jsname='yEVEwb']")
    
    all_span_texts = []  
    
    for div in questions:
        try:
            div.click()
            time.sleep(1)
            
            span_elements = div.find_elements(By.TAG_NAME, 'span')
            for span in span_elements:
                text = span.text.strip()
                if text and text not in all_span_texts:
                    all_span_texts.append(text)
                    
        except Exception as e:
            print(f"Error clicking or extracting from div/span: {e}")

    return all_span_texts

url = 'https://www.google.com/search?q=trump+vs+hillary'

results = people_also_ask(url)
print(results[5:10])  

driver.quit()

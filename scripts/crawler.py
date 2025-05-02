from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time
import os
import csv
chrome_driver_path = r"C:\new1\gs24-front\scripts\chromedriver.exe"
service = Service(chrome_driver_path)
driver = webdriver.Chrome(service=service)

url = 'https://portal.kresg.co.kr/communication/term.do?pg=1&con=15&title='
driver.get(url)

WebDriverWait(driver, 15).until(
    EC.presence_of_element_located((By.CSS_SELECTOR, 'button.content'))
)

# 임시로 강제 대기
# 1. 페이지 로드 후 전체 버튼 먼저 클릭
time.sleep(2)  # 페이지 약간 기다림
driver.find_element(By.CSS_SELECTOR, 'button.all').click()
print("✅ 전체 버튼 클릭 완료")
time.sleep(2)  # 항목이 로딩되도록 대기

# 2. 나머지 크롤링 코드 이어서 실행

# content 버튼을 기준으로 다시 시도
items = driver.find_elements(By.CSS_SELECTOR, 'div.term_list-wrap > ul > li')
print(f"{len(items)}개 항목 찾음")


json_path = "terms.json"
if os.path.exists(json_path):
    os.remove(json_path)
    print("🗑 기존 terms.json 삭제 완료")
all_terms = []

for page in range(1, 35):  # 1부터 34페이지까지
  time.sleep(1)  # 페이지 약간 기다림
  url = f"https://portal.kresg.co.kr/communication/term.do?pg={page}&con=&title="
    
  driver.get(url)
  # content 버튼을 기준으로 다시 시도
  items = driver.find_elements(By.CSS_SELECTOR, 'div.term_list-wrap > ul > li')
  print(f"{len(items)}개 항목 찾음")
  print(f"\n📄 {page}페이지 크롤링 시작")

  for i in range(len(items)):
    try:
      items = driver.find_elements(By.CSS_SELECTOR, 'div.term_list-wrap > ul > li')
      item = items[i]

     # 버튼 클릭
      button = item.find_element(By.CSS_SELECTOR, 'div.content_title > button.content')
      driver.execute_script("arguments[0].click();", button)
      print(f"✅ {i + 1}번째 항목 클릭 완료")

      # strong 태그에서 제목 추출
      strong = item.find_element(By.CSS_SELECTOR, 'div.content_detail > strong').text.strip()
      time.sleep(0.5) 
      # 모든 <p> 추출해서 줄바꿈으로 이어붙이기
      detail = item.find_element(By.CSS_SELECTOR, 'div.content_detail > p').text.strip()

      # 태그 (없다면 빈 리스트)
      tag_elements = item.find_elements(By.CSS_SELECTOR, 'div.content_title > span.tag_box a')
      tags = [tag.text.strip() for tag in tag_elements if tag.text.strip()]

            # ✅ JSON용 dict에 담기
   
      all_terms.append({
      "term": strong,
      "content": detail,
      "tags": tags
})

    except Exception as e:
      print(f'오류 발생: {e}')
      continue
    print(f"\n제목: {strong}\n내용:\n{detail}\n태그:{tags}\n")

driver.quit()
print("🎉 모든 페이지 크롤링 완료")

import csv
import json
with open("all_terms.json", "w", encoding="utf-8") as f:
    

  with open("all_terms.csv", "w", newline="", encoding="utf-8-sig") as f:
    writer = csv.writer(f)
    writer.writerow(["제목", "내용", "태그"])  # 헤더

    for term in all_terms:
        writer.writerow([
            term["term"],
            term["content"],
            ", ".join(term["tags"])  # 태그는 리스트이므로 문자열로 합침
        ])

print("✅ CSV 저장 완료: all_terms.csv")
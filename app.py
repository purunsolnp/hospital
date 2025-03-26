import os
import time
import pandas as pd
import requests
from flask import Flask, render_template, jsonify
from dotenv import load_dotenv

# ✅ 환경 변수 로드 (카카오 API 키 저장)
load_dotenv()

app = Flask(__name__)
app.config['SEND_FILE_MAX_AGE_DEFAULT'] = 0
app.config['TEMPLATES_AUTO_RELOAD'] = True

# ✅ 카카오 맵 API 키 가져오기
KAKAO_MAP_API_KEY = os.getenv("KAKAO_MAP_API_KEY")
@app.route("/")
@app.route("/index")
def index():
    return render_template("index.html", kakao_api_key=KAKAO_MAP_API_KEY)

# ✅ Google Sheets (진료 과목 데이터)
TREATMENTS_SHEET_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vSCHZ39MpwAIRrR3105kynomb07GKYM0t31Zd7OVMoEmKXFWpFCnDYwVWlN3d3p_FRTFoeVXn6rCtFW/pub?output=csv"
NOTICES_SHEET_URL = "https://docs.google.com/spreadsheets/d/1UbfL8PgO-KtRy7RqsQeNhixLTRFUnUiOFmaGmu0IV7w/export?format=csv"
ABOUT_SHEET_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vRiIgp6dbHk8qo97dzxQjkJUFfmz0530dxVl6NPaAnDe9gybXgg70BFC9C0DQU35cIRqPWsQstyPJDw/pub?output=csv"
@app.route("/get_treatments")
def get_treatments():
    try:
        timestamp = int(time.time())  # 현재 시간을 타임스탬프로 추가
        df = pd.read_csv(f"{TREATMENTS_SHEET_URL}&_={timestamp}")  # 캐싱 방지
        treatments = df.to_dict(orient="records")
        return jsonify(treatments)
    except Exception as e:
        return jsonify({"error": str(e)})


# ✅ 진료과목 페이지 (HTML 로드)
@app.route("/treatments")
def treatments():
    return render_template("treatments.html")

@app.route("/guide") 
def guide():
    return render_template("treatment_guide.html")

@app.route('/privacy-policy')
def privacy_policy():
    return render_template('privacy_policy.html')

@app.route("/laws") 
def laws():
    return render_template("laws.html")
    
@app.route("/notices")
def notice_list():
    df = pd.read_csv(NOTICES_SHEET_URL)
    df["날짜"] = pd.to_datetime(df["날짜"], errors="coerce")
    df["상단고정"] = df["상단고정"].fillna(False).astype(bool)

    # ✅ 상단 고정 공지를 먼저 정렬한 후, 날짜순 정렬
    df = df.sort_values(by=["상단고정", "날짜"], ascending=[False, False])

    notices = df.to_dict(orient="records")
    return render_template("notices_list.html", notices=notices)

@app.route("/notices/<int:notice_id>")
def notice_detail(notice_id):
    df = pd.read_csv(NOTICES_SHEET_URL)
    try:
        row = df[df["ID"] == notice_id].iloc[0]
    except IndexError:
        abort(404)

    notice = {
        "id": int(row["ID"]),
        "제목": row["제목"],
        "내용": row["내용"],
        "날짜": pd.to_datetime(row["날짜"], errors="coerce").strftime('%Y-%m-%d') if pd.notnull(row["날짜"]) else ""
    }
    return render_template("notice_detail.html", notice=notice)


@app.route("/calendar")
def calendar_view():
    df = pd.read_csv(NOTICES_SHEET_URL)
    df["날짜"] = pd.to_datetime(df["날짜"], errors="coerce")
    df["종료일"] = pd.to_datetime(df.get("종료일", ""), errors="coerce")

    색상맵 = {
        "휴진": "#ff6b6b",
        "학회": "#4dabf7",
        "단축진료": "#ffa94d",
        "기타": "#ccc"
    }

    events = []
    for _, row in df.iterrows():
        # ✅ NaN 여부 체크하고 기본값 대체
        category = row.get("카테고리")
        if pd.isna(category) or str(category).strip() == "":
            category = "기타"
        else:
            category = str(category).strip()

        doctor = row.get("의사명")
        if pd.isna(doctor):
            doctor = ""
        else:
            doctor = str(doctor).strip()

        title_base = row.get("제목")
        if pd.isna(title_base) or str(title_base).strip() == "":
            title_base = "일정"
        else:
            title_base = str(title_base).strip()

        title_prefix = f"{doctor} " if doctor else ""
        title = f"{title_prefix}{category}: {title_base}"

        event = {
            "title": title,
            "start": row["날짜"].strftime("%Y-%m-%d"),
            "allDay": True,
            "color": 색상맵.get(category, 색상맵["기타"])
        }

        if pd.notnull(row["종료일"]):
            event["end"] = row["종료일"].strftime("%Y-%m-%d")

        events.append(event)

    return render_template("calendar.html", events=events)

@app.route("/about")
def about():
    SHEET_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vRiIgp6dbHk8qo97dzxQjkJUFfmz0530dxVl6NPaAnDe9gybXgg70BFC9C0DQU35cIRqPWsQstyPJDw/pub?output=csv"  # 정확한 URL 사용

    try:
        df = pd.read_csv(SHEET_URL)
    except Exception as e:
        return f"⚠️ Google Sheets 데이터를 불러오는 중 오류 발생: {str(e)}"

    # 컬럼명 정리 (공백 제거)
    df.columns = df.columns.str.strip()

    # 컬럼 존재 여부 확인
    required_columns = ['이름', '직책', 'Docs링크']
    if not all(col in df.columns for col in required_columns):
        return f"⚠️ 시트에 필수 컬럼이 없습니다. 필요한 컬럼: {required_columns}"

    # ✅ 중복 데이터 제거
    df = df.drop_duplicates(subset=["이름", "직책", "Docs링크"])

    # ✅ 결측값 제거
    df = df.dropna(subset=required_columns)

    doctors = df.to_dict(orient="records")
    return render_template("about_dynamic.html", doctors=doctors)
# ✅ `app.run(debug=True)`는 main 함수 밖에서 실행되면 안됨.
if __name__ == "__main__":
    app.run(debug=True)# Google Docs의 퍼블릭 HTML 가져오기

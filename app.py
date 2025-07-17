import os
import time
import pandas as pd
import requests
from flask import Flask, render_template, jsonify, abort
from dotenv import load_dotenv
import re

# ✅ 환경 변수 로드 (카카오 API 키 저장)
load_dotenv()

app = Flask(__name__)
app.config['SEND_FILE_MAX_AGE_DEFAULT'] = 0
app.config['TEMPLATES_AUTO_RELOAD'] = True

# ✅ 카카오 맵 API 키 가져오기
KAKAO_MAP_API_KEY = os.getenv("KAKAO_MAP_API_KEY")

# ✅ Google Sheets (공지사항 데이터)
NOTICES_SHEET_URL = "https://docs.google.com/spreadsheets/d/1UbfL8PgO-KtRy7RqsQeNhixLTRFUnUiOFmaGmu0IV7w/export?format=csv"

# ✅ Google Sheets 구조 예시
# | ID | 제목 | 내용 | 날짜 | 종료일 | 반복 | 요일 | 카테고리 | 공지노출 | 의사명 |
def get_notices_data():
    """Google Sheets에서 공지사항 데이터를 안전하게 가져오는 함수"""
    try:
        df = pd.read_csv(NOTICES_SHEET_URL)
        # 빈 DataFrame 체크
        if df.empty:
            print("⚠️ Google Sheets에서 빈 데이터를 받았습니다.")
            return pd.DataFrame()
        # 필수 컬럼 체크 (ID, 제목, 날짜는 없어도 에러 없이 동작)
        # 빈 행 제거 (모든 컬럼이 NaN인 행)
        df = df.dropna(how='all')
        if df.empty:
            print("⚠️ 모든 행이 비어있어 데이터가 없습니다.")
            return pd.DataFrame()
        print(f"✅ 성공적으로 {len(df)}개 행의 데이터를 로드했습니다.")
        return df
    except Exception as e:
        print(f"❌ Google Sheets 데이터 로드 중 에러: {e}")
        return pd.DataFrame()

def clean_notice_content(content):
    if not isinstance(content, str):
        return content
    # 2개 이상의 연속된 줄바꿈을 하나로
    return re.sub(r'(\n\s*){2,}', '\n', content)

@app.route("/")
@app.route("/index")
def index():
    return render_template("index.html", kakao_api_key=KAKAO_MAP_API_KEY)

# ✅ 진료과목 페이지 (정적 HTML)
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
    df = get_notices_data()
    if df.empty:
        return render_template("notices_list.html", notices=[])
    try:
        # 공지노출 컬럼이 있으면 TRUE/비어있음만 노출, FALSE/N/0 등은 제외
        if "공지노출" in df.columns:
            df = df[(df["공지노출"].isna()) | (df["공지노출"].astype(str).str.upper().isin(["TRUE", "", "Y", "YES", "1"]))]
        # 상단고정 컬럼이 있으면 처리, 없으면 False로 설정
        if "상단고정" in df.columns:
            df["상단고정"] = df["상단고정"].fillna(False).astype(bool)
        else:
            df["상단고정"] = False
        # ID가 없는 경우를 대비해 안전하게 처리
        if "ID" in df.columns:
            # ID가 숫자가 아니면 변환, 결측치는 큰 값으로 대체
            df["ID"] = pd.to_numeric(df["ID"], errors="coerce")
            df["ID"] = df["ID"].fillna(9999999)
        else:
            df["ID"] = 9999999
        # 정렬: 상단고정(True 먼저), 그 다음 ID 오름차순
        df = df.sort_values(by=["상단고정", "ID"], ascending=[False, True])
        notices = []
        for _, row in df.iterrows():
            notice = row.to_dict()
            # 날짜가 있으면 문자열로 변환
            if "날짜" in row and pd.notnull(row["날짜"]):
                try:
                    date_obj = pd.to_datetime(row["날짜"], errors="coerce")
                    if pd.notnull(date_obj):
                        notice["날짜"] = date_obj.strftime('%Y-%m-%d')
                    else:
                        notice["날짜"] = ""
                except:
                    notice["날짜"] = str(row["날짜"])
            else:
                notice["날짜"] = ""
            # 본문 내용 전처리
            if "내용" in notice and pd.notnull(notice["내용"]):
                notice["내용"] = clean_notice_content(str(notice["내용"]))
            notices.append(notice)
        return render_template("notices_list.html", notices=notices)
    except Exception as e:
        print(f"❌ 공지사항 목록 처리 중 에러: {e}")
        return render_template("notices_list.html", notices=[])

@app.route("/notices/<int:notice_id>")
def notice_detail(notice_id):
    df = get_notices_data()
    
    if df.empty:
        abort(404)
    
    try:
        # 해당 ID 찾기
        matching_rows = df[df["ID"] == notice_id]
        if matching_rows.empty:
            abort(404)
            
        row = matching_rows.iloc[0]
        
        # 날짜 처리
        date_str = ""
        if pd.notnull(row["날짜"]):
            try:
                date_obj = pd.to_datetime(row["날짜"], errors="coerce")
                if pd.notnull(date_obj):
                    date_str = date_obj.strftime('%Y-%m-%d')
            except:
                date_str = ""

        notice = {
            "id": int(row["ID"]),
            "제목": str(row["제목"]) if pd.notnull(row["제목"]) else "제목 없음",
            "내용": clean_notice_content(str(row["내용"])) if "내용" in row and pd.notnull(row["내용"]) else "",
            "날짜": date_str
        }
        return render_template("notice_detail.html", notice=notice)
        
    except Exception as e:
        print(f"❌ 공지사항 상세 처리 중 에러: {e}")
        abort(404)

@app.route("/calendar")
def calendar_view():
    import datetime
    df = get_notices_data()
    if df.empty:
        return render_template("calendar.html", events=[])
    try:
        # 날짜/종료일 변환
        if "날짜" in df.columns:
            df["날짜"] = pd.to_datetime(df["날짜"], errors="coerce")
        else:
            df["날짜"] = pd.NaT
        if "종료일" in df.columns:
            df["종료일"] = pd.to_datetime(df["종료일"], errors="coerce")
        else:
            df["종료일"] = pd.NaT
        색상맵 = {"휴진": "#ff6b6b", "학회": "#4dabf7", "단축진료": "#ffa94d", "진료": "#4dabf7", "기타": "#ccc"}
        events = []
        today = datetime.date.today()
        for _, row in df.iterrows():
            반복 = str(row.get("반복", "")).strip()
            요일 = str(row.get("요일", "")).strip()
            category = str(row.get("카테고리", "")).strip() if not pd.isna(row.get("카테고리")) else "기타"
            doctor = str(row.get("의사명", "")).strip() if not pd.isna(row.get("의사명")) else ""
            title_base = str(row.get("제목", "")).strip() if not pd.isna(row.get("제목")) else "일정"
            title_prefix = f"{doctor} " if doctor else ""
            title = f"{title_prefix}{category}: {title_base}"

            # 예외일 처리
            exception_dates = []
            if "예외일" in row and pd.notnull(row["예외일"]):
                exception_dates = [d.strip() for d in str(row["예외일"]).split(",") if d.strip()]
                # 문자열을 date로 변환 (형식 오류는 무시)
                parsed_exceptions = []
                for d in exception_dates:
                    try:
                        parsed_exceptions.append(datetime.datetime.strptime(d, "%Y-%m-%d").date())
                    except Exception:
                        pass
                exception_dates = parsed_exceptions

            # 매주 반복
            if 반복 in ["매주", "WEEKLY"] and 요일:
                weekday_map = {"월요일":0, "화요일":1, "수요일":2, "목요일":3, "금요일":4, "토요일":5, "일요일":6}
                weekday_num = weekday_map.get(요일)
                if weekday_num is not None:
                    d = row["날짜"].date() if pd.notnull(row["날짜"]) else today
                    end_date = row["종료일"].date() if pd.notnull(row["종료일"]) else datetime.date(2099, 1, 1)
                    while d <= end_date:
                        if d.weekday() == weekday_num and d not in exception_dates:
                            events.append({
                                "title": title,
                                "start": d.strftime("%Y-%m-%d"),
                                "allDay": True,
                                "color": 색상맵.get(category, 색상맵["기타"])
                            })
                        d += datetime.timedelta(days=1)
                continue
            # 매년 반복
            if 반복 in ["매년", "YEARLY"] and pd.notnull(row["날짜"]):
                start_date = row["날짜"].date()
                end_date = row["종료일"].date() if pd.notnull(row["종료일"]) else datetime.date(2099, 1, 1)
                d = start_date
                while d <= end_date:
                    if d not in exception_dates:
                        events.append({
                            "title": title,
                            "start": d.strftime("%Y-%m-%d"),
                            "allDay": True,
                            "color": 색상맵.get(category, 색상맵["기타"])
                        })
                    try:
                        d = d.replace(year=d.year + 1)
                    except ValueError:
                        # 2월 29일 등 윤년 예외 처리
                        d = d.replace(month=3, day=1, year=d.year + 1)
                continue
            # 매월 반복
            if 반복 in ["매월", "MONTHLY"] and pd.notnull(row["날짜"]):
                start_date = row["날짜"].date()
                end_date = row["종료일"].date() if pd.notnull(row["종료일"]) else datetime.date(2099, 1, 1)
                d = start_date
                while d <= end_date:
                    if d not in exception_dates:
                        events.append({
                            "title": title,
                            "start": d.strftime("%Y-%m-%d"),
                            "allDay": True,
                            "color": 색상맵.get(category, 색상맵["기타"])
                        })
                    # 다음 달로 이동
                    year = d.year + (d.month // 12)
                    month = d.month % 12 + 1
                    day = min(d.day, [31,29 if year%4==0 and (year%100!=0 or year%400==0) else 28,31,30,31,30,31,31,30,31,30,31][month-1])
                    try:
                        d = datetime.date(year, month, day)
                    except ValueError:
                        d = datetime.date(year, month, 1)
                continue
            # 날짜 기반 이벤트
            if pd.notnull(row["날짜"]):
                event = {
                    "title": title,
                    "start": row["날짜"].strftime("%Y-%m-%d"),
                    "allDay": True,
                    "color": 색상맵.get(category, 색상맵["기타"])
                }
                if pd.notnull(row["종료일"]):
                    end_date = row["종료일"] + pd.Timedelta(days=1)
                    event["end"] = end_date.strftime("%Y-%m-%d")
                events.append(event)
        return render_template("calendar.html", events=events)
    except Exception as e:
        print(f"❌ 달력 처리 중 에러: {e}")
        return render_template("calendar.html", events=[])

@app.route("/about")
def about():
    return render_template("about_dynamic.html")

# ✅ `app.run(debug=True)`는 main 함수 밖에서 실행되면 안됨.
if __name__ == "__main__":
    app.run(debug=True)

# Pathfinder H (패스파인더 H)

벤처캐피털 패스파인더 H 공식 웹사이트 프로토타입.

## 파일 구조

```
pathfinderh/
├── index.html              # 진입점
├── css/
│   └── style.css           # 전체 스타일시트
├── js/
│   └── app.js              # 인터랙션 스크립트
├── assets/
│   └── images/             # 이미지 파일 (image_01.jpg ~ image_27.png)
├── README.md
├── .gitignore
└── favicon.ico             # (별도 추가 필요)
```

## 주요 섹션

| ID     | 섹션명        | 설명 |
|--------|--------------|------|
| sTop   | Hero         | 3슬라이드 자동 캐러셀 |
| s1     | Company      | 회사 소개 + 핵심 지표 카운트업 |
| s2     | Stewardship  | 수탁자 책임 코드 팝업 |
| s3     | Fund         | 운용 펀드 (2페이지 페이지네이션) |
| s4     | People       | 팀 소개 (3페이지 페이지네이션) |
| s6     | Portfolio    | 포트폴리오 기업 (2페이지 페이지네이션) |
| s5     | Contact      | 카카오맵 + 찾아오시는 길 + 푸터 |

## 기능

- **히어로 캐러셀**: 8초 자동 슬라이드, 진행 바 인디케이터
- **KR / EN 언어 전환**: `data-ko` / `data-en` 속성 기반
- **핵심 지표 카운트업**: IntersectionObserver 트리거
- **수탁자 책임 코드 모달**: 오버레이 팝업, ESC 닫기
- **네비게이션 스무스 스크롤**: 고정 nav 오프셋(72px) 적용
- **펀드 / 인물 / 포트폴리오 페이지네이션**: 각각 독립 상태 관리

## 웹 호스팅

정적 파일만으로 구성되어 있어 별도 서버 없이 배포 가능합니다.

### GitHub Pages
```bash
git init
git add .
git commit -m "initial commit"
git branch -M main
git remote add origin https://github.com/{username}/{repo}.git
git push -u origin main
# GitHub 저장소 Settings → Pages → Branch: main / root 선택
```

### Netlify / Vercel
저장소 연결 후 빌드 명령어 없이 배포 가능 (정적 사이트).

## 이미지 교체

`assets/images/` 폴더의 파일명은 HTML에서 직접 참조됩니다.  
실제 이미지로 교체할 때는 동일한 파일명으로 덮어쓰거나 HTML 내 경로를 수정하세요.

| 파일 | 용도 추정 |
|------|---------|
| image_01.jpg | 로고 |
| image_02~04.jpg | 히어로 슬라이드 배경 |
| image_05~15.jpg | 인물 사진 (People 섹션) |
| image_16~27.png | 포트폴리오 기업 로고 |

## 외부 의존성

- Google Fonts (Noto Serif KR, Noto Sans KR, Playfair Display) — CDN
- 카카오맵 iframe — 인터넷 연결 필요

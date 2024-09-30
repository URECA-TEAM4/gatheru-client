# Gather to U - Client

This is the client-side code for **Gather to U**, built using React.js. This project is part of the larger [URECA TEAM4 project](https://github.com/URECA-TEAM4). The backend repository can be found [here](https://github.com/URECA-TEAM4/gatheru-server).

## 프로젝트 기획 배경과 기대 효과

기존 슬랙이나 카카오톡을 통해 인원을 모집할 때 여러 프로젝트에 대한 글이나 분산된 정보들을 한 눈에 파악하기 어렵다는 문제를 해결하기 위해 만들어진 유레카의 인원 모집 및 커뮤니티 문화 형성 플랫폼입니다. 정보 분산과 가독성의 문제를 해결하고 누구나 쉽고 빠르게 인원을 구할 수 있습니다. 다양한 활동을 더욱 쉽게 열거나 참여할 수 있을 뿐만 아니라 모든 유레카 캠퍼스가 이 서비스를 통해 더욱 활발한 개발 커뮤니티 문화에 기여할 수 있습니다.

## 주요 기능

- 메인 페이지 (모집 글 리스트로 보기)
- 캘린더 페이지
- 모각코 맵 (지도로 모각코 장소 보기) 페이지
- 게시 글 상세보기 페이지 : 신청하기, 신청 취소하기, 댓글 달기
- 모집 글 쓰기
- 마이 페이지 : 내가 쓴 글 보기, 수정, 삭제
- 신청자 추가/삭제 알림 기능

## 미리보기

![alt text](<Screenshot 2024-09-30 at 5.36.28 PM.png>)
![alt text](<Screenshot 2024-09-30 at 5.38.15 PM.png>)
![alt text](<Screenshot 2024-09-30 at 5.38.24 PM.png>)

## Installation

### Steps

1. Clone the repository:

   ```bash
   git clone https://github.com/URECA-TEAM4/gatheru-client.git
   cd gatheru-client
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up the following environment variables in a `.env` file.

   ```bash
   VITE_KAKAO_MAP_API_KEY=e34d6f325fc7a21661f707af74a3bc93
   ```

## Usage

To run the client-side application in development mode:

```bash
npm start
```

## Branch / PR Name Syntax Guideline

- feat(페이지 경로 또는 컴포넌트): 새로운 기능 추가 또는 기능 업데이트
- fix(페이지 경로 또는 컴포넌트): 버그 또는 에러 수정
- style(페이지 경로 또는 컴포넌트): 코드 포맷팅, 코드 오타, 함수명 수정 등 스타일 수정
- refactor(페이지 경로 또는 컴포넌트): 코드 리팩토링(똑같은 기능인데 코드만 개선)
- file(페이지 경로 또는 컴포넌트): 파일 이동 또는 제거, 파일명 변경
- design(페이지 경로 또는 컴포넌트): 디자인, 문장 수정
- comment(페이지 경로 또는 컴포넌트): 주석 수정 및 삭제
- chore: 빌드 수정, 패키지 추가, 환경변수 설정
- docs: 문서 수정, 블로그 포스트 추가
- hotfix: 핫픽스 수정

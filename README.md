# 외워VOCA

- 🗓 기간: 2022.12.12 ~ 2022.12.23 (2주)
- 내가 외우고 싶은 단어들을 입력하고 저장하는 단어장 애플리케이션으로, 순수 바닐라자바스크립트를 이용한 SPA

![외워VOCA](https://user-images.githubusercontent.com/76897813/210952651-e30e6755-f928-4d77-833d-3e1491260e25.gif)

# 🛠 기술 스택

<img src="https://img.shields.io/badge/html5-E34F26?style=for-the-badge&logo=html5&logoColor=white">
<img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=CSS3&logoColor=white">
<img src="https://img.shields.io/badge/CSSModules-000000?style=for-the-badge&logo=CSSModules&logoColor=white">
<img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=JavaScript&logoColor=white">
<img src="https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=Express&logoColor=white">
<img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=Vite&logoColor=white">

# 👭 참여 인원 및 구현 기능

<table>
  <thead>
    <tr>
      <th align="center">박선우</th>
      <th align="center">이재린</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td align="center">
        <a href="https://github.com/parkseonup">@parkseonup</a>
      </td>
      <td align="center">
        <a href="https://github.com/leejaelll">@leejaelll</a>
      </td>
    </tr>
    <tr>
      <td align="center">
        <a target="_blank" rel="noopener noreferrer nofollow" href="https://avatars.githubusercontent.com/parkseonup">
          <img src="https://avatars.githubusercontent.com/parkseonup" width="100" style="max-width: 100%;">
        </a>
      </td>
      <td align="center">
        <a target="_blank" rel="noopener noreferrer nofollow" href="https://avatars.githubusercontent.com/leejaelll">
          <img src="https://avatars.githubusercontent.com/leejaelll" width="100" style="max-width: 100%;">
        </a>
      </td>
    </tr>
    <tr>
      <td>
        <ul>
          <li>디자인</li>
          <li>라우터</li>
          <li>로그인/회원가입</li>
          <li>단어장 상세페이지</li>
        </ul>
      </td>
      <td>
        <ul>
          <li>Vite 환경 설정</li>
          <li>diff 알고리즘</li>
          <li>단어장 목록</li>
          <li>네비게이션</li>
        </ul>
      </td>
    </tr>
  </tbody>
</table>

# 🌊 User Flow

<img width="1756" alt="userflow" src="https://user-images.githubusercontent.com/76897813/210955033-fdbae2b2-2f14-4788-89e6-c3b65cd19157.png">

# 📚 주요 기능

## 로그인

- 작성하고 있는 이메일, 패스워드 input의 유효성을 검사해서 안내문구 출력
- 가입된 회원인지 체크하여 회원이면 로그인 토큰 발급
- 로그인 페이지에서 로그인 정보가 없을 경우 토스터 출력
- 회원가입 버튼 클릭시 회원가입 페이지로 이동

## 회원가입

- 작성하고 있는 이메일, 유저이름, 패스워드, 패스워드 확인 input의 유효성을 검사해서 안내문구 출력
- 가입된 회원이 아닌지 체크하여 새로운 회원으로 등록
- 회원가입 페이지에서 이미 가입된 회원일 경우 토스터 출력
- 로그인 버튼 클릭시 로그인 페이지로 이동

## 단어장 목록

- 로그인한 회원의 정보(회원 이름, 등록한 단어 개수)와 저장한 단어장 목록을 출력
- 기존의 단어장을 삭제하는 버튼
- 단어장을 삭제할 건지 한번더 확인하는 팝업 모달 생성
- - 버튼 클릭시 새로운 단어장을 생성하고 단어장 페이지로 이동

## 단어장 상세 페이지

- 단어장의 제목, 설명, 단어를 작성시 자동 저장
- - 버튼 클릭시 새로운 단어 추가
- x 버튼 클릭시 단어 삭제
- 전체, 단어만, 뜻만 이라는 버튼 클릭시 단어장을 보여주는 view 변경

## 네비게이션

- 로그아웃 버튼 클릭시 발급됐던 로그인 토큰 삭제 후 로그인 페이지로 이동
- 단어장 목록 버튼 클릭시 단어장 목록 페이지로 이동

# 회고

회고 및 트러블 슈팅에 대한 자세한 내용이 궁금하시면 [여기](https://hilarious-budget-76c.notion.site/46422dda10ce404f80c5f9f5ff8a47fb)를 클릭해주세요.

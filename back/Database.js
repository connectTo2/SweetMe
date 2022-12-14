// userId와 wordId는 생성된 시간까지의 밀리초를 저장.
// Date.parse(new Date()) 형식.

const usersInfo = [
  {
    userId: 0,
    email: 'dumdum1@naver.com',
    name: '코카콜라맛있다',
    password: '111111',
    voca: [
      {
        vocaId: '1670999143000',
        title: '토익 영단어 모음',
        vocaDescription: '12월 토익 800점을 위한 단어 모음집!',
        words: [
          { wordId: '1670999151000', word: 'retrospect', wordDescription: '회고' },
          { wordId: '1670999192000', word: 'mother', wordDescription: '어머니' },
          { wordId: '1670999193000', word: 'father', wordDescription: '아버지' },
          { wordId: '1670999194000', word: 'one', wordDescription: '1' },
          { wordId: '1670999195000', word: 'two', wordDescription: '2' },
          { wordId: '1670999196000', word: 'three', wordDescription: '3' },
          { wordId: '1670999197000', word: 'four', wordDescription: '4' },
          { wordId: '1670999198000', word: 'five', wordDescription: '5' },
          { wordId: '1670999101000', word: 'six', wordDescription: '6' },
          { wordId: '1670999111000', word: 'seven', wordDescription: '7' },
          { wordId: '1670999121000', word: 'eight', wordDescription: '8' },
          { wordId: '1670999131000', word: 'nine', wordDescription: '9' },
          { wordId: '1670999141000', word: 'ten', wordDescription: '10' },
          { wordId: '1670999151000', word: 'eleven', wordDescription: '11' },
        ],
      },
      {
        vocaId: '1670999351000',
        title: '경선식 영어 암기!',
        vocaDescription: '가볍게 자주 읽을 수 있는 단어들 모음',
        words: [
          { wordId: '1671199151000', word: 'retrospect', wordDescription: '회고' },
          { wordId: '1671299191000', word: 'mother', wordDescription: '어머니' },
          { wordId: '1671399191000', word: 'father', wordDescription: '아버지' },
        ],
      },
    ],
    vocaCount: 17,
  },
  {
    userId: 1,
    email: 'dumdum2@naver.com',
    name: '마이크재리슨',
    password: '222222',
    voca: [],
    vocaCount: 0,
  },
  {
    userId: 2,
    email: 'dumdum3@naver.com',
    name: '긔여니',
    password: '333333',
    voca: [],
    vocaCount: 0,
  },
];

module.exports = usersInfo;

/* eslint-disable import/no-extraneous-dependencies */
import axios from 'axios';

/** 서버에서 user 정보 받아오는 fetchData 메서드 생성 -> 받아온 user 정보를 state 프로퍼티에 저장 */
const fetchData = async () => {
  const { data: userInfo } = await axios.get('/user');
  this.state.userInfo = userInfo;
};

export default fetchData;

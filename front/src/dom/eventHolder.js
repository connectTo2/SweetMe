/**
 * 이벤트 핸들러가 중복 등록되지 않도록 등록할 이벤트 핸들러에 관련된 정보를 객체로 받아서 eventHolder 배열에 저장함.
 * - type: 이벤트 타입
 * - selector: 이벤트 호출자
 * - handler: 이벤트 핸들러
 * 추후 중복된 이벤트가 있는지 체크하는 로직 구현 (Component.js -> holdEvent 메서드)
 * @type { [{type: string, selector: string, handler: e => void}] }
 */
const eventHolder = [];

export default eventHolder;

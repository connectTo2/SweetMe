const signinSchema = {
  email: {
    value: '',
    error: '올바른 이메일 형식이 아닙니다.',
    dirty: false,
    get valid() {
      // prettier-ignore
      // eslint-disable-next-line max-len
      return /^[0-9|a-z|A-Z]([-_.]?[0-9|a-z|A-Z])*@[0-9|a-z|A-Z]([-_.]?[0-9|a-z|A-Z])*.[a-z|A-Z]{2,3}$/.test(this.value);
    },
  },
  password: {
    value: '',
    error: '6자리 이상의 문자를 입력해주세요.',
    dirty: false,
    get valid() {
      return this.value.length >= 6;
    },
  },
  get valid() {
    return this.email.valid && this.password.valid;
  },
};

const signupSchema = {
  ...signinSchema,
  userName: {
    value: '',
    error: '1자리 이상의 문자를 입력해주세요.',
    dirty: false,
    get valid() {
      return this.value.length >= 1;
    },
  },
  confirmPassword: {
    value: '',
    error: '비밀번호가 일치하지 않습니다.',
    dirty: false,
    get valid() {
      return this.value === signupSchema.password.value;
    },
  },
  get valid() {
    return this.email.valid && this.userName.valid && this.password.valid && this.confirmPassword.valid;
  },
};

export { signinSchema, signupSchema };

import { reactive } from "vue";

/** 密码正则（密码格式应为8-18位数字、字母、符号的任意两种组合） */
export const REGEXP_PWD =
  /^(?![0-9]+$)(?![a-z]+$)(?![A-Z]+$)(?!([^(0-9a-zA-Z)]|[()])+$)(?!^.*[\u4E00-\u9FA5].*$)([^(0-9a-zA-Z)]|[()]|[a-z]|[A-Z]|[0-9]){8,18}$/;

// /^(?![0-9]+$)(?![a-z]+$)(?![A-Z]+$)(?!([^(0-9a-zA-Z)]|[()])+$)
/**账号正则 格式为5-15位的数字或字母*/
export const REGEXP_ACC = /^[0-9a-zA-Z]{5,15}$/;

export const REGEXP_USER = /^[\w]{2,10}$/; 

const validatePass = (rule, value, callback) => {
  if (value === "") {
    callback(new Error("请输入密码"));
  } else if (!REGEXP_PWD.test(value)) {
    callback(
      new Error("密码格式应为8-18位数字、字母、符号的任意两种以上组合")
    );
  } else {
    callback();
  }
}

const validateAcc =  (rule, value, callback) => {
  if (value === "") {
    callback(new Error("请输入账号"));
  } else if (!REGEXP_ACC.test(value)) {
    callback(
      new Error("账号格式应为包含数字或者字母的5-15位字符串")
    );
  } else {
    callback();
  }
}

const validateUser = (rule, value, callback) => {
  if (value === "") {
    callback(new Error("请输入用户名"));
  } else if (!REGEXP_USER.test(value)) {
    callback(
      new Error("用户名格式应为包含数字或字母或字符串的2-10位字符串")
    );
  } else {
    callback();
  }
}


/** 登录校验 */
const loginRules = reactive({
  password: [
    {
      validator: validatePass,
      trigger: "blur"
    }
  ],
  account: [
    {
      validator: validateAcc,
      trigger: "blur",
    }
  ],
});

const registRules = reactive({
  password: [
    {
      validator: validatePass,
      trigger: "blur"
    }
  ],
  account: [
    {
      validator: validateAcc,
      trigger: "blur",
    }
  ],
  username: [
    {
      validator: validateUser,
      trigger: "blur",
    }
  ],
  corporationCode: [
    { required: true, message: '请输入公司码', trigger: 'blur' },
  ]
});

const userRules = reactive({
  password: [
    {
      validator: validatePass,
      trigger: "blur"
    }
  ],
  name: [
    {
      validator: validateUser,
      trigger: "blur",
    }
  ],
})
export { loginRules, registRules, userRules };
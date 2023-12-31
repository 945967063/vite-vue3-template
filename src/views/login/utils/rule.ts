import { reactive } from 'vue';
import type { FormRules } from 'element-plus';
import i18n from '@/i18n/index';

const t = i18n.global.t;
/** 密码正则（密码格式应为8-18位数字、字母、符号的任意两种组合） */
export const REGEXP_PWD =
  /^(?![0-9]+$)(?![a-z]+$)(?![A-Z]+$)(?!([^(0-9a-zA-Z)]|[()])+$)(?!^.*[\u4E00-\u9FA5].*$)([^(0-9a-zA-Z)]|[()]|[a-z]|[A-Z]|[0-9]){8,18}$/;

/** 登录校验 */
export const loginRules = reactive<FormRules>({
  passWord: [
    {
      validator: (_rule, value, callback) => {
        if (value === '') {
          callback(new Error(t('login.loginPassword')));
        } else if (!REGEXP_PWD.test(value)) {
          callback(new Error(t('login.loginPasswordCheck')));
        } else {
          callback();
        }
      },
      trigger: 'blur',
    },
  ],
});

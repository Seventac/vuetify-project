// 单个验证规则
export type RuleType = 'required' | 'maxlength' | 'custom';
export interface RuleProp {
  type: RuleType;
  message: string;
  maxlength?: number;
  validator?: (value: string) => boolean;
}

// 验证规则组合
export type RulesProp = RuleProp[];

// 单个input的验证器
export const validateInput = {
  // 是否必填
  required: (value: string, rule?: RuleProp) => {
    return value.trim() !== '';
  },
  // 最大长度
  maxlength: (value: string, rule: RuleProp) => {
    if (rule.maxlength) {
      return value.length <= rule.maxlength;
    }
    return true;
  },
  // 自定义验证器
  custom: (value: string, rule: RuleProp) => {
    if (rule.validator) {
      return rule.validator(value);
    }
    return true;
  },
};

// 验证器处理程序
export const handlerValidateInput = (value: string, rule: RuleProp) => {
  return validateInput[rule.type](value, rule);
};

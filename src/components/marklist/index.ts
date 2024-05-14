import {RulesProp} from '@/baseComponents/input/index'

// 单个书签
export interface MarkProps {
  icon?: string;
  title: string;
  targetUrl: string;
  explain?: string;
}

// 书签列表
export type MarkListProps = MarkProps[];

// 操作书签的类型
export type HandleMarkType = 'add' | 'update';

// 书签相关操作数据
export interface MarkState {
  handleType: HandleMarkType;
  defaultImg: string;
  currentMark: number;
}

// 弹窗相关操作数据
export interface DialogState {
  title: string;
  icon: string;
  targetUrl: string;
  explain: string;
}

// 弹窗表单相关操作数据
export interface DialogFormState {
  targetUrlRules: RulesProp;
  titleRules: RulesProp;
  iconRules: RulesProp;
  isShowAddMarkDialog: boolean;
  loading1: boolean;
  loading2: boolean;
}

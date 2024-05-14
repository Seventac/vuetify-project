import {MarkProps} from '@/components/marklist/index';
import {ComputedRef} from 'vue';
import {RulesProp} from '@/baseComponents/input/index';

// 单个标签
export interface LabelsProps {
  title: string;
  marks: MarkProps[];
}

// 操作标签的类型
export type HandleLabelType = 'add' | 'update';

// 标签相关操作数据
export interface LabelState {
  handleType: HandleLabelType;
  currentClickLabel: number;
  currentHoverLabel: number;
  dialogTitle: ComputedRef;
}

// 弹窗相关操作数据
export interface DialogState {
  isShowLabelDialog: boolean;
  labelTitle: string;
  rules: RulesProp;
}

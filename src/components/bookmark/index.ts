import { LabelsProps } from '@/components/labelList/index';
import data from '@/components/bookmark/data';
// 标签列表
export type LabelListProps = LabelsProps[];

// 初始数据
export const initData: any = data;

// 数据类型
export interface BookmarkState {
  warblerData: LabelListProps;
  editMode: boolean;
  motto: string;
}

const mottoList = [
  '凡所有相，皆为虚妄。若见诸相非相，即见如来',
  '不取于相，如如不动',
  '万法皆空，因果不空',
  '悲凉才是人生常态，快乐才是意外',
];

export const getMotto = () => {
  const random = Math.floor(Math.random() * mottoList.length);
  return mottoList[random];
};

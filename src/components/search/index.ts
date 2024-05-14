export type SearchType = 'baidu' | 'biying' | 'google' | 'fanyi';

export interface IconData {
  icon: string;
  title: string;
  type: SearchType;
}

export type IconDataList = IconData[];

export const initData: IconDataList = [
  {
    icon: '&#xe668;',
    title: '百度搜索',
    type: 'baidu',
  },
  {
    icon: '&#xe600;',
    title: '必应搜索',
    type: 'biying',
  },
  {
    icon: '&#xe606;',
    title: '谷歌搜索',
    type: 'google',
  },
  {
    icon: '&#xe602;',
    title: '百度翻译',
    type: 'fanyi',
  },
];

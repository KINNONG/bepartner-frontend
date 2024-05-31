export const UserSex: {
  [key: number]: string
} = {
  0: '保密',
  1: '男',
  2: '女',
}

export interface StoreUser {
  uid: string
  nickname: string
  username: string
  avatar: string
  phone: string
  sex: number
  desc: string
  birthday: string
  profession: string
}

export interface UserType {
  id: number;
  username: string;
  userAccount: string;
  avatarUrl?: string;
  profile?: string;
  gender: number;
  phone: string;
  email: string;
  userStatus: number;
  userRole: number;
  planetCode: string;
  tags: string;
  createTime: Date;
}

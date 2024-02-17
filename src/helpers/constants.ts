import { IUser } from "../interfaces";
import { v4 as uuidv4 } from 'uuid';

export const users: IUser[] = [
  {
    id: uuidv4(),
    fname: 'Abebe',
    lname: 'Kebede',
    phoneNumber: '09xxxxxx',
    email: 'abekebe@gmail.com',
    createdAt: new Date()
  },
  {
    id: uuidv4(),
    fname: 'Abebe',
    lname: 'Kebede',
    phoneNumber: '09xxxxxx',
    email: 'abekebe@gmail.com',
    createdAt: new Date()
  },
  {
    id: uuidv4(),
    fname: 'Abebe',
    lname: 'Kebede',
    phoneNumber: '09xxxxxx',
    email: 'abekebe@gmail.com',
    createdAt: new Date()
  }
]

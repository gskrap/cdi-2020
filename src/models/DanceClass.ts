import {Group} from './Group';
import {User} from './User';

export interface DanceClass {
  created_at: string,
  end_time: string,
  groups: Group[],
  id: number,
  location_id: number,
  name: string,
  notes: string,
  start_time: string,
  teachers: User[],
}

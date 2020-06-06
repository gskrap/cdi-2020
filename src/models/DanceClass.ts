import {Group} from './Group';
import {Location} from './Location';
import {User} from '@ionic/cli';

export interface DanceClass {
  created_at: string,
  end_time: string,
  groups: Group[],
  id: number,
  location: Location,
  location_id: number,
  name: string,
  notes: string,
  secondary_teacher: User,
  secondary_teacher_id: number,
  start_time: string,
  teacher: User,
  teacher_id: number,
  updated_at: string,
}

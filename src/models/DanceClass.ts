import {StudentGroup} from './StudentGroup';
import {User} from './User';
import {DanceClassLocation} from './DanceClassLocation';

export interface DanceClass {
  created_at: string,
  end_time: string,
  groups: StudentGroup[],
  id: number,
  location_id: number,
  location: DanceClassLocation,
  name: string,
  notes: string,
  start_time: string,
  teachers: User[],
}

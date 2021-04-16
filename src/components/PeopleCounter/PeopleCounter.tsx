import s from './PeopleCounter.scss';
import UserScreen from '../UserScreen/UserScreen';
import { h } from 'preact';

const PeopleCounter = () => {
  return (
    <div className={s.Wrapper}>
      <UserScreen />
    </div>
  );
};

export default PeopleCounter;

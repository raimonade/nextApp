import React from 'react';
import s from './PeopleCounter.module.scss';
import UserScreen from '../UserScreen/UserScreen';

const PeopleCounter = () => {
  return (
    <div className={s.Wrapper}>
      <UserScreen />
    </div>
  );
};

export default PeopleCounter;

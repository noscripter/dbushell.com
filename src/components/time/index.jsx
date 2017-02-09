import React, {PropTypes} from 'react';
import moment from 'moment';

const Time = props => {
  const time = moment(props.date);
  const attr = {
    className: 'time',
    dateTime: time.toISOString()
  };
  return (
    <time {...attr}>
      {time.format('dddd')} <b>{time.format('D')} <abbr title={time.format('MMMM')}>{time.format('MMM')}</abbr> {time.format('Y')}</b>
    </time>
  );
};

Time.propTypes = {
  date: PropTypes.number
};

export default Time;

import moment from 'moment';

export const formatDate = (date: string) => moment(date).format('MMMM Do, YYYY');

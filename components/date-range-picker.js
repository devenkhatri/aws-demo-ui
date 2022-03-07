import { DatePicker, message } from 'antd';
import moment from 'moment';

const DateRangePicker = () => {
    const { RangePicker } = DatePicker;

    function onChange(dates, dateStrings) {
        console.log('From: ', dates[0], ', to: ', dates[1]);
        console.log('From: ', dateStrings[0], ', to: ', dateStrings[1]);
        message.info('From: ', dateStrings[0], ', to: ', dateStrings[1]);
    }

    return (
        <RangePicker
            ranges={{
                Today: [moment(), moment()],
                'This Month': [moment().startOf('month'), moment().endOf('month')],
            }}
            onChange={onChange}
        />
    );
}

export default DateRangePicker;
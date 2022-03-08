import { Collapse, Space } from 'antd';
import DateRangePicker from './date-range-picker';
import LinkButton from './link-button';


const SearchPanel = () => {
    const { Panel } = Collapse;
    return (
        <Collapse defaultActiveKey={['1']} expandIconPosition={'right'}>
            <Panel header="Search the data" key="1">
                <DateRangePicker />
                <div className='flex justify-end w-full'>
                    <Space>
                        <LinkButton variant="outline">Reset</LinkButton>
                        <LinkButton>Search</LinkButton>
                    </Space>
                </div>
            </Panel>
        </Collapse>
    );
}

export default SearchPanel;
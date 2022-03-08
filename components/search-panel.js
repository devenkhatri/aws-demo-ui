import { Collapse, Space, InputNumber, Input } from 'antd';
import DateRangePicker from './date-range-picker';
import LinkButton from './link-button';


const SearchPanel = () => {
    const { Panel } = Collapse;
    return (
        <Collapse defaultActiveKey={['1']} expandIconPosition={'right'}>
            <Panel header="Search Criteria" key="1">
                <Space direction="vertical" className='md:w-1/4'>
                        <InputNumber placeholder="Account No" style={{ width: '100%' }} />
                        <Input placeholder="Account Name" />
                        <DateRangePicker />
                </Space>
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
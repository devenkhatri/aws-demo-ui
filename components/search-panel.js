import { Collapse, Space, InputNumber, Input, Divider } from 'antd';
import DateRangePicker from './date-range-picker';
import Button from './button';
import { useGlobalState, setSearchQuery, setSearchResult, resetSearch, setLoading } from '../components/global-state'
import { useState } from 'react';

const SearchPanel = () => {
    const { Panel } = Collapse;

    const [searchKeyword, setSearchKeyword] = useState();
    const [searchAccountNo, setSearchAccountNo] = useState();
    const [searchAccountName, setSearchAccountName] = useState();

    const [searchQuery] = useGlobalState('searchQuery');

    const doSearch = (e) => {
        setLoading(true);
        e.preventDefault();
        let query = searchKeyword;
        if (!searchKeyword) {
            if (searchAccountNo) query += 'AccountNo:' + searchAccountNo
            if (searchAccountName) query += 'AccountName:' + searchAccountName
        }
        if(!query) {setLoading(false);return;}
        const apiURL = '/api/search?q=' + query;
        fetch(apiURL)
            .then(res => res.json())
            .then(json => {
                setSearchQuery(query);
                setSearchResult(json);
                if (query || json) setLoading(false);
            })
    }
    const doReset = () => {
        setSearchKeyword("")
        setSearchAccountNo();
        setSearchAccountName();
        resetSearch();
    }
    return (
        <Collapse defaultActiveKey={['1']} expandIconPosition={'right'}>
            <Panel header="Search Criteria" key="1" className='text-center'>
                <form>
                    <Space direction="vertical" className='md:w-1/4 w-full text-left'>
                        <Input placeholder="Search Keyword" className='w-full' value={searchKeyword} onChange={(e) => setSearchKeyword(e.target.value)} />
                        <Divider>OR</Divider>
                        <InputNumber placeholder="Account No" style={{ width: '100%', height: '100%' }} value={searchAccountNo} onChange={(e) => setSearchAccountNo(e)} />
                        <Input placeholder="Account Name" value={searchAccountName} onChange={(e) => setSearchAccountName(e.target.value)} />
                        <DateRangePicker />
                    </Space>

                    <div className='flex justify-end w-full'>
                        <Space>
                            <Button variant="outline" onClick={doReset}>Reset</Button>
                            <Button type="submit" onClick={doSearch}>Search</Button>
                        </Space>
                    </div>
                </form>
            </Panel>
        </Collapse>
    );
}

export default SearchPanel;
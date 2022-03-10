import { Collapse, Space, InputNumber, Input, Divider } from 'antd';
import DateRangePicker from './date-range-picker';
import Button from './button';
import {useGlobalState, setSearchQuery, setSearchResult, resetSearch} from '../components/global-state'
import { useState } from 'react';
import useSearch from '../lib/useSearch';

const SearchPanel = () => {
    const { Panel } = Collapse;
    
    const [searchKeyword, setSearchKeyword] = useState();
    const [searchAccountNo, setSearchAccountNo] = useState();
    const [searchAccountName, setSearchAccountName] = useState();
    
    const [searchQuery] = useGlobalState('searchQuery');
    const {result, isLoading} = useSearch({
        q : searchQuery,
      });

    const doSearch = () => {        
        let query = searchKeyword;
        if(!searchKeyword) {
            if(searchAccountNo) query += 'AccountNo:'+searchAccountNo
            if(searchAccountName) query += 'AccountName:'+searchAccountName
        }
        setSearchQuery(query);
        setSearchResult(result);
    }
    const doReset = () => {
        setSearchKeyword("")
        setSearchQuery("");  
        setSearchAccountNo();
        setSearchAccountName();
        setSearchResult([]);
    }
    return (
        <Collapse defaultActiveKey={['1']} expandIconPosition={'right'}>
            <Panel header="Search Criteria" key="1" className='text-center'>
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
                        <Button onClick={doSearch}>Search</Button>
                    </Space>
                </div>
            </Panel>
        </Collapse>
    );
}

export default SearchPanel;
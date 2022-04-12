import { Collapse, Space, InputNumber, Input, Divider, DatePicker } from 'antd';
import moment from 'moment';
import { useGlobalState, setSearchQuery, setSearchResult, resetSearch, setLoading } from '../components/global-state'
import React, { useState } from 'react';
import { Button, Flex } from '@aws-amplify/ui-react';
import sendRequest from './utils/send-request';

const SearchPanel = () => {
    const { Panel } = Collapse;
    const { RangePicker } = DatePicker;

    const [searchKeyword, setSearchKeyword] = useState();
    const [searchAccountNo, setSearchAccountNo] = useState();
    const [searchAccountName, setSearchAccountName] = useState();
    const [searchStatementDateFrom, setSearchStatementDateFrom] = useState();
    const [searchStatementDateTo, setSearchStatementDateTo] = useState();

    const [searchQuery] = useGlobalState('searchQuery');

    const doSearch = (e) => {
        setLoading(true);
        e.preventDefault();
        let query = searchKeyword;
        if (!searchKeyword) {
            query = "";
            if (searchAccountNo) query += 'AccountNo:' + searchAccountNo
            if (searchAccountName) query += 'AccountName:' + searchAccountName
            if (searchStatementDateFrom) query += 'StatementDate:' + searchStatementDateFrom
        }
        if (!query) { setLoading(false); return; }
        const apiURL = process.env.GATSBY_SEARCH_API_URL + query;

        try {
            fetch(apiURL)
                .then(res => res.json())
                .then(json => {
                    setSearchQuery(query);
                    console.log("****** API Result", json)
                    setSearchResult(json);
                    if (query || json) setLoading(false);
                })
        } catch (error) {
            console.log("****** API Error", error);
            setLoading(false);
        }
    }
    const doReset = () => {
        setSearchKeyword("")
        setSearchAccountNo();
        setSearchAccountName();
        resetSearch();
    }

    function onDateChange(dates, dateStrings) {
        setSearchStatementDateFrom(dateStrings[0])
        setSearchStatementDateTo(dateStrings[1])
        // console.log('From: ', dates[0], ', to: ', dates[1]);
        console.log('From: ', dateStrings[0], ', to: ', dateStrings[1]);
    }
    return (
        <Collapse defaultActiveKey={['1']} expandIconPosition={'right'}>
            <Panel header="Search Criteria" key="1" className='text-center'>
                <Flex justifyContent={'center'}>
                    <form>
                        <Space direction="vertical" className='md:w-1/4 w-full text-left'>
                            <Input placeholder="Search Keyword" className='w-full' value={searchKeyword} onChange={(e) => setSearchKeyword(e.target.value)} />
                            <Divider>OR</Divider>
                            <InputNumber placeholder="Account No" style={{ width: '100%', height: '100%' }} value={searchAccountNo} onChange={(e) => setSearchAccountNo(e)} />
                            <Input placeholder="Account Name" value={searchAccountName} onChange={(e) => setSearchAccountName(e.target.value)} />
                            <RangePicker
                                format={'DD/MM/YYYY'}
                                ranges={{
                                    Today: [moment(), moment()],
                                    'This Month': [moment().startOf('month'), moment().endOf('month')],
                                }}
                                onChange={onDateChange}
                            />
                        </Space>

                        <Flex justifyContent="center" paddingTop="1rem">
                            <Space>
                                <Button onClick={doReset}>Reset</Button>
                                <Button variation='primary' type="submit" onClick={doSearch}>Search</Button>
                            </Space>
                        </Flex>
                    </form>
                </Flex>
            </Panel>
        </Collapse>
    );
}

export default SearchPanel;
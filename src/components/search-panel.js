import { Collapse, Space, InputNumber, Input, Divider, DatePicker } from 'antd';
import moment from 'moment';
import { useGlobalState, setSearchQuery, setSearchResult, resetSearch, setLoading } from '../components/global-state'
import React, { useState } from 'react';
import { Button, Flex } from '@aws-amplify/ui-react';
import axios from 'axios';


const SearchPanel = () => {
    const { Panel } = Collapse;
    const { RangePicker } = DatePicker;

    const [searchKeyword, setSearchKeyword] = useState();
    const [searchAccountNo, setSearchAccountNo] = useState();
    const [searchAccountName, setSearchAccountName] = useState();
    const [searchStatementDateFrom, setSearchStatementDateFrom] = useState();
    const [searchStatementDateTo, setSearchStatementDateTo] = useState();

    const [searchQuery] = useGlobalState('searchQuery');
    const [currentUser] = useGlobalState('currentUser');

    // console.log("******* currentUser", currentUser && currentUser.signInUserSession.accessToken.jwtToken, (await Auth.currentSession()).getAccessToken().getJwtToken())
    console.log("******* currentUser", currentUser && currentUser.signInUserSession.accessToken.jwtToken)

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
        console.log("****** API URL", apiURL)
        try {
            axios.get(apiURL)
                .then((response) => {
                    console.log('****** API Response', response)
                    setSearchQuery(query);
                    setSearchResult(response.data);
                    if (query || response.status) setLoading(false);
                })
                .catch((error) => {
                    console.log('****** API Error', error)
                    setLoading(false);
                });
            // const APIName = 'Heartbeat';
            // const URL = '/';
            // const options = {
            //     headers: { "Content-Type": "application/json" },
            //     response: true
            // };
            // API.get(APIName, URL, options)
            //     .then((response) => {
            //         console.log('****** API Response', response)
            //         return response
            //     })
            //     .catch((error) => {
            //         console.log('****** API Error', error)
            //         return error
            //     })

            // const options = {
            //     headers: { 
            //         "Content-Type": "application/json" 
            //         // "x-api-key": currentUser && currentUser.signInUserSession.accessToken.jwtToken
            //     },
            //     // mode: 'no-cors',
            //     method: "GET"
            // };
            // fetch(apiURL, options)
            //     .then(res => { console.log("****** API Response", res); res.json(); })
            //     .then(json => {
            //         setSearchQuery(query);
            //         console.log("****** API Result", json)
            //         setSearchResult(json);
            //         if (query || json) setLoading(false);
            //     })
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
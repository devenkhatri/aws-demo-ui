import { Collapse, Space, InputNumber, Input, Divider, DatePicker } from 'antd';
import moment from 'moment';
import { useGlobalState, setSearchQuery, setSearchResult, resetSearch, setLoading } from '../components/global-state'
import React, { useEffect, useState } from 'react';
import { Alert, Button, Flex, View } from '@aws-amplify/ui-react';
import axios from 'axios';


const SearchPanel = () => {
    const { Panel } = Collapse;
    const { RangePicker } = DatePicker;

    const [searchKeyword, setSearchKeyword] = useState();
    const [searchAccountNo, setSearchAccountNo] = useState();
    const [searchAccountName, setSearchAccountName] = useState();
    const [searchStatementDateFrom, setSearchStatementDateFrom] = useState();
    const [searchStatementDateTo, setSearchStatementDateTo] = useState();

    const [currentUser] = useGlobalState('currentUser');

    const [userToken, setUserToken] = useState();

    const [errorMessage, setErrorMessage] = useState();

    useEffect(() => {
        //getting logged-in user token
        setUserToken(currentUser && currentUser.signInUserSession.getIdToken().getJwtToken())
    }, []);

    const doSearch = (e) => {
        setErrorMessage();
        setLoading(true);
        e.preventDefault();
        let query = "search=" + searchKeyword;
        if (!searchKeyword) {
            query = "";
            if (searchAccountNo) query += 'AccountNumber=' + searchAccountNo
            if (query && searchAccountName) query += '&'
            if (searchAccountName) query += 'AccountName=' + searchAccountName
            if (query && searchStatementDateFrom) query += '&'
            if (searchStatementDateFrom) query += 'FromDate=' + searchStatementDateFrom
            if (query && searchStatementDateTo) query += '&'
            if (searchStatementDateTo) query += 'ToDate=' + searchStatementDateTo
        }
        if (!query) { setLoading(false); setErrorMessage("No Input Provided !!"); return; }
        const apiURL = process.env.GATSBY_SEARCH_API_URL + "?" + query;
        console.log("****** API URL", apiURL)
        try {
            const config = {
                headers: {
                    'Authorization': userToken
                }
            };
            axios.get(apiURL, config)
                .then((response) => {
                    console.log('****** API Response', response)
                    setSearchQuery(query);
                    setSearchResult(response.data);
                    if (query || response.status) setLoading(false);
                })
                .catch((error) => {
                    console.log('****** API Error', error)
                    setErrorMessage(`${error}`);
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
            setErrorMessage(`${error}`);
            setLoading(false);
        }
    }
    const doReset = () => {
        setErrorMessage();
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

                        <View paddingTop="1rem">
                            {errorMessage &&
                                <Alert variation="error">
                                    {errorMessage}
                                </Alert>
                            }
                        </View>

                    </form>
                </Flex>
            </Panel>
        </Collapse>
    );
}

export default SearchPanel;
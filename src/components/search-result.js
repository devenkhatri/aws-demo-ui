import { Table } from 'antd';
import { useGlobalState } from '../components/global-state'
import Highlighter from "react-highlight-words";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Flex } from '@aws-amplify/ui-react';

const SearchResult = () => {
    const [searchResult] = useGlobalState('searchResult');
    const [searchQuery] = useGlobalState('searchQuery');
    const [loading] = useGlobalState('loading');
    const [currentUser] = useGlobalState('currentUser');
    const [userToken, setUserToken] = useState();
    useEffect(() => {
        //getting logged-in user token
        setUserToken(currentUser && currentUser.signInUserSession.getIdToken().getJwtToken())
    }, []);

    const downloadFile = (docId) => {
        const apiURL = process.env.GATSBY_GETDOCUMENT_API_URL + docId + '&lob=LOB1';
        const config = {
            headers: {
                'Authorization': userToken,
                'Accept': 'application/pdf'
            },
            responseType: 'arraybuffer'
            // responseType: 'blob'
        };
        axios.get(apiURL, config)
            .then((response) => {
                console.log('****** GETDDOC API Response', response)
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', docId);
                document.body.appendChild(link);
                link.click();
            })
            .catch((error) => {
                console.log('****** GETDDOC API Error', error)
            });
    }

    const highlightText = (str) => {
        return (
            <Highlighter
                // highlightClassName="YourHighlightClass"
                searchWords={[searchQuery]}
                autoEscape={true}
                textToHighlight={str}
            />
        );
    }

    const columns = [
        {
            title: 'Account Name',
            dataIndex: 'account_name',
            key: 'account_name',
            sorter: (a, b) => a.account_name.length - b.account_name.length,
            render: (text) => highlightText(text),
        },
        {
            title: 'Account No',
            dataIndex: 'account_no',
            key: 'account_no',
            sorter: (a, b) => a.account_no - b.account_no,
            // render: (text) => <div dangerouslySetInnerHTML={{ __html: text }}></div>,
            render: (text) => highlightText(text),
        },
        {
            title: 'Statement Date',
            dataIndex: 'statement_date',
            key: 'statement_date',
            //   sorter: (a, b) => a.address.length - b.address.length,
            responsive: ['md'],
            render: (text) => highlightText(text),
        },
        {
            title: 'Document',
            key: 'document_name',
            dataIndex: 'document_name',
            render: (text, record) => (
                <a onClick={() => downloadFile(record.key)}>{highlightText(text)}</a>
              ),
        },
        {
            title: 'Product Type',
            dataIndex: 'product_type',
            key: 'product_type',
            responsive: ['md'],
            render: (text) => highlightText(text),
        },
        // {
        //     title: 'Search Score',
        //     dataIndex: 'score',
        //     key: 'score',
        //     responsive: ['md'],
        //     sorter: (a, b) => a.score - b.score,
        //     render: (text) => <div dangerouslySetInnerHTML={{ __html: text }}></div>,
        // },
    ];

    const data = [];
    searchResult && searchResult.hits?.hits.map((item) => {
        data.push({
            key: item._id,
            account_name: item._source.AccountName?.S,
            account_no: item._source.AccountNumber?.S,
            statement_date: item._source.StatementDate?.S,
            document_name: item._source.Name?.S,
            product_type: item._source.ProductType?.S,
            score: item._score,
        });
    })
    console.log("********* searchResult", searchResult)
    console.log("****** data", data)

    return (
        <Flex paddingTop={'1rem'} direction="column">
            {/* <center>
                <h2>Result(s) for <em>'{searchQuery}'</em></h2>
            </center> */}
            <Table
                columns={columns}
                dataSource={data}
                className="w-full"
                loading={loading}
                pagination={{
                    position: ['bottomCenter'],
                    showSizeChanger: true,
                    showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
                }}

            />
        </Flex>

    );
}

export default SearchResult;

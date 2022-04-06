import { Table } from 'antd';
import { useGlobalState } from '../components/global-state'
import Highlighter from "react-highlight-words";
import React from 'react';
import { Flex } from '@aws-amplify/ui-react';

const SearchResult = () => {
    const [searchResult] = useGlobalState('searchResult');
    const [searchQuery] = useGlobalState('searchQuery');
    const [loading] = useGlobalState('loading');

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
            title: 'Document ID',
            key: 'document_id',
            dataIndex: 'document_id',
            render: (text) => <a target="_top" href={`/api/get-document?docid=${text}`}>{highlightText(text)}</a>,
        },
        {
            title: 'Search Score',
            dataIndex: 'score',
            key: 'score',
            responsive: ['md'],
            sorter: (a, b) => a.score - b.score,
            render: (text) => <div dangerouslySetInnerHTML={{ __html: text }}></div>,
        },
    ];

    const data = [];
    searchResult && searchResult.hits?.hits.map((item) => {
        data.push({
            key: item._id,
            account_name: item._source.AccountName.S,
            account_no: item._source.AccountNumber.S,
            statement_date: item._source.StatementDate.S,
            document_id: item._source.DocumentId.S,
            score: item._score,
        });
    })

    return (
        <Flex paddingTop={'1rem'} direction="column">
            <center>
                <h2>Result(s) for <em>'{searchQuery}'</em></h2>
            </center>
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
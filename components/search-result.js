import { Table } from 'antd';
import { useGlobalState } from '../components/global-state'

const SearchResult = () => {
    const [searchResult] = useGlobalState('searchResult');
    const [searchQuery] = useGlobalState('searchQuery');
    const [loading] = useGlobalState('loading');

    console.log("***** searchResult", searchResult)

    const columns = [
        {
            title: 'Account Name',
            dataIndex: 'account_name',
            key: 'account_name',
            sorter: (a, b) => a.account_name.length - b.account_name.length,
            render: (text) => <div dangerouslySetInnerHTML={{ __html: text }}></div>,
        },
        {
            title: 'Account No',
            dataIndex: 'account_no',
            key: 'account_no',
            sorter: (a, b) => a.account_no - b.account_no,
            render: (text) => <div dangerouslySetInnerHTML={{ __html: text }}></div>,
        },
        {
            title: 'Statement Date',
            dataIndex: 'statement_date',
            key: 'statement_date',
            //   sorter: (a, b) => a.address.length - b.address.length,
            responsive: ['md'],
            render: (text) => <div dangerouslySetInnerHTML={{ __html: text }}></div>,
        },
        {
            title: 'Document ID',
            key: 'document_id',
            dataIndex: 'document_id',
            render: (text) => <a target="_top" href={`/api/get-document?docid=${text}`}><div dangerouslySetInnerHTML={{ __html: text }}></div></a>,
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
        <div>
            <center>
                <h2>Found <em>{searchResult?.hits?.total?.value || 0}</em> result(s) for <em>'{searchQuery}'</em></h2>
            </center>
            <Table
                columns={columns}
                dataSource={data}
                className="w-full"
                pagination={{ pageSize: 2 }}
            />
        </div>

    );
}

export default SearchResult;
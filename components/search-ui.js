import React from "react";
import { Table } from "antd";
import AppSearchAPIConnector from "@elastic/search-ui-app-search-connector";

import {
    ErrorBoundary,
    Facet,
    SearchProvider,
    SearchBox,
    Results,
    PagingInfo,
    ResultsPerPage,
    Paging,
    Sorting,
    WithSearch
} from "@elastic/react-search-ui";
import { Layout } from "@elastic/react-search-ui-views";
import "@elastic/react-search-ui-views/lib/styles/styles.css";

import {
    buildAutocompleteQueryConfig,
    buildFacetConfigFromConfig,
    buildSearchOptionsFromConfig,
    buildSortOptionsFromConfig,
    getConfig,
    getFacetFields
} from "../config/config-helper";

const { hostIdentifier, searchKey, endpointBase, engineName } = getConfig();
const connector = new AppSearchAPIConnector({
    searchKey,
    engineName,
    hostIdentifier,
    endpointBase
});
const config = {
    searchQuery: {
        facets: buildFacetConfigFromConfig(),
        ...buildSearchOptionsFromConfig()
    },
    autocompleteQuery: buildAutocompleteQueryConfig(),
    apiConnector: connector,
    alwaysSearchOnInitialLoad: false,
    initialState: {
        resultsPerPage: 10, // Request State
      },
};

const SearchUI = () => {
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
    ];

    const data = [];
    return (
        // <SearchProvider config={config}>
        //   <WithSearch mapContextToProps={({ wasSearched }) => ({ wasSearched })}>
        //     {({ wasSearched }) => {
        //       return (
        //         <div className="App">
        //           <ErrorBoundary>
        //             <Layout
        //               header={<SearchBox autocompleteSuggestions={true} />}
        //               sideContent={
        //                 <div>
        //                   {wasSearched && (
        //                     <Sorting
        //                       label={"Sort by"}
        //                       sortOptions={buildSortOptionsFromConfig()}
        //                     />
        //                   )}
        //                   {getFacetFields().map(field => (
        //                     <Facet key={field} field={field} label={field} />
        //                   ))}
        //                 </div>
        //               }
        //               bodyContent={
        //                 <Results
        //                   titleField={getConfig().titleField}
        //                   urlField={getConfig().urlField}
        //                   thumbnailField={getConfig().thumbnailField}
        //                   shouldTrackClickThrough={true}
        //                 />
        //               }
        //               bodyHeader={
        //                 <React.Fragment>
        //                   {wasSearched && <PagingInfo />}
        //                   {wasSearched && <ResultsPerPage />}
        //                 </React.Fragment>
        //               }
        //               bodyFooter={<Paging />}
        //             />
        //           </ErrorBoundary>
        //         </div>
        //       );
        //     }}
        //   </WithSearch>
        // </SearchProvider>

        <SearchProvider config={config} resultsPerPage={10}>
            <WithSearch
                mapContextToProps={({ searchTerm, setSearchTerm, results }) => ({
                    searchTerm,
                    setSearchTerm,
                    results
                })}
            >
                {({ searchTerm, setSearchTerm, results }) => {
                    data = [];
                    results.map((item) => {
                        data.push({
                            key: item.id.raw,
                            account_name: item.account_name.snippet,
                            account_no: item.account_no.snippet,
                            statement_date: item.statement_date.snippet,
                            document_id: item.document_id.snippet,
                        });
                    })
                    // console.log("**** results", results, data)
                    return (
                        <div className="h-screen relative search-results p-4">
                            <ErrorBoundary>
                            <SearchBox
                                className="z-50"
                                autocompleteSuggestions={{
                                    sectionTitle: "Suggested Queries"
                                }} />
                            <div className="flex justify-center p-4">
                                <PagingInfo />
                                {/* <ResultsPerPage /> */}
                            </div>
                            <div className="flex justify-center w-full">
                            <Table
                                columns={columns}
                                dataSource={data}
                                pagination={{ pageSize: 20 }}
                                className="w-full"
                            />
                            </div>
                            <div className="flex justify-center p-4">
                                <Paging />
                            </div>
                            </ErrorBoundary>
                        </div>
                    );
                }}
            </WithSearch>
        </SearchProvider>
    );
}

export default SearchUI;
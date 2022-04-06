import * as React from "react"
import SearchResult from "../components/search-result";
import SearchPanel from '../components/search-panel';

import Layout from "../components/layout"
import Seo from "../components/seo"

const IndexPage = () => (
  <Layout>
    <Seo title="Home" />
    <div className="px-4 md:px-6 md:py-4 py-2">        
              <SearchPanel />
            </div>
            <div className="px-4 md:px-6">
              <SearchResult />
            </div>
  </Layout>
)

export default IndexPage;

import React, { useEffect, useState } from 'react';
import NewsItem from './NewsItem'
import InfiniteScroll from "react-infinite-scroll-component"
import PropTypes from 'prop-types'
const News = (props) => {

    const [articles, setArticles] = useState([])
    const [page, setPage] = useState(1)
    const [totalResults, setTotalResults] = useState(0)
    const[loading,setLoading]=useState(true)
    const capLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    const updateNews = async () => {
        props.setProgress(10);
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
        setLoading(true)
        let data = await fetch(url);
        props.setProgress(60);
        let parsedData = await data.json();
        setArticles(articles.concat(parsedData.articles));
        setTotalResults(parsedData.totalResults);
        setLoading(true)
        props.setProgress(100);
    }
    useEffect(() => {
        updateNews();
        document.title = `${capLetter(props.category)}-NewsDaily`;
       //eslint-disable-next-line
    }, [])
    const fetchMoreData = async() => {
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page+1}&pageSize=${props.pageSize}`;
        setPage(page+1)
        let data = await fetch(url);
        let parsedData = await data.json();
        setArticles(articles.concat(parsedData.articles));
        setTotalResults(parsedData.totalResults);
    
    };
    return (
        <>
            <h1 className="text-center " style={{ margin: '90px 0px' }}><strong>NewsDaily-Top Headlines on {capLetter(props.category)}</strong></h1>
            <InfiniteScroll
                dataLength={articles.length}
                next={fetchMoreData}
                hasMore={articles.length !== totalResults}
                loader={<h4>Loading...</h4>}>
                <div className="container">
                    <div className="row ">
                        {articles.map((element) => {
                            return <div className="col-md-4" key={element.url}>
                                <NewsItem title={element.title ? element.title.slice(0, 75) : ""}
                                    description={element.description?element.description.slice(0, 95) : "" }
                                    imageUrl={element.urlToImage} source={element.source.name} newsUrl={element.url} author={element.author} date={element.publishedAt} />
                            </div>
                        })}
                    </div></div>
            </InfiniteScroll>
        </>
    )
}
News.defaultProps = {
    country: 'in',
    pageSize: 8,
    category: 'general'
}
News.propsTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
}
export default News
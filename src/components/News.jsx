import React, { useState, useEffect } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {
  const [articles, setArticles] = useState([]);
  const [page, setPage] = useState(1);

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  document.title = `OG-NEWS | ${capitalizeFirstLetter(props.category)}`;

  useEffect(() => {
    props.setProgress(30);
    fetchMoreData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchMoreData = async () => {
    let newsapi = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&language=en&apiKey=${props.apiKey}&pageSize=${props.pageSize}&page=${page}`;

    let data = await fetch(newsapi);
    let parsedData = await data.json();

    if (page === 1) {
      setArticles(parsedData.articles);
    } else {
      setArticles((prevArticles) => [...prevArticles, ...parsedData.articles]);
    }

    setPage((prevPage) => prevPage + 1);
    props.setProgress(100);
  };

  return (
    <>
      <h1 className="text-center" style={{margin: '5rem 0 1rem 0'}}>
        OG-NEWS | {capitalizeFirstLetter(props.category)} Headlines
      </h1>

      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length < 90} // 100 is the maximum number of articles that can be fetched from the API
        loader={<Spinner />}
      >
        <div className="container my-3">
          <div className="row">
            {articles.map((element, index) => {
              return (
                <div className="col-md-4" key={index}>
                  <NewsItem
                    title={element.title}
                    desc={
                      element.description
                        ? element.description.slice(0, 88)
                        : element.description
                    }
                    url={element.url}
                    img={
                      element.urlToImage ? element.urlToImage : "./default.png"
                    }
                    author={element.author}
                    date={element.publishedAt}
                    source={element.source}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </InfiniteScroll>
    </>
  );
};

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
  language: PropTypes.string,
};

News.defaultProps = {
  country: "in",
  pageSize: 9,
  category: "general",
};

export default News;

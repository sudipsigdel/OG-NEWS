import React, { useState, useEffect } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";

const News = (props) => {

  const articles = [];
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  useEffect(() => {
    const fetchData = async () => {
      let newsapi = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&language=en&apiKey=700e4bb9e0734eb2bfbdd4628dc349fa&pageSize=${props.pageSize}&page=${page}`;

      setLoading(true);
      let data = await fetch(newsapi);
      let parsedData = await data.json();
      setTotalResults(parsedData.totalResults);
      setLoading(false);
    };

    fetchData();
  }, [props.country, props.category, props.pageSize, page]);

  const handlePreviousClick = async () => {
    let newsapi = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&language=en&apiKey=700e4bb9e0734eb2bfbdd4628dc349fa&pageSize=${props.pageSize}&page=${page - 1}`;

    setLoading(true);
    let data = await fetch(newsapi);
    let parsedData = await data.json(); // eslint-disable-line
    setPage(page - 1);
    setLoading(false);
  };

  const handleNextClick = async () => {
    let newsapi = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&language=en&apiKey=700e4bb9e0734eb2bfbdd4628dc349fa&pageSize=${props.pageSize}&page=${page + 1}`;

    setLoading(true);
    let data = await fetch(newsapi);
    let parsedData = await data.json(); // eslint-disable-line
    setPage(page + 1);
    setLoading(false);
  };

  return (
    <>
      <h1 className="text-center mt-5 mb-5">
        {capitalizeFirstLetter(props.category)} | OG-NEWS
      </h1>

      {loading && <Spinner />}

      <div className="container my-3">
        <div className="row">
          {!loading &&
            articles.map((element) => {
              return (
                <div className="col-md-4" key={element.url}>
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

          <div
            className="container d-flex justify-content-between mt-4"
            role="group"
            aria-label="Basic example"
          >
            <button
              type="button"
              disabled={page <= 1}
              className="btn btn-dark"
              onClick={handlePreviousClick}
            >
              &larr; Previous
            </button>

            <p>
              {page} of {Math.ceil(totalResults / props.pageSize)}
            </p>

            <button
              type="button"
              disabled={page + 1 > Math.ceil(totalResults / props.pageSize)}
              className="btn btn-dark"
              onClick={handleNextClick}
            >
              Next &rarr;
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default News;
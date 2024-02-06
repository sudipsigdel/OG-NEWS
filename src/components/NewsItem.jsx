import React from "react";

const NewsItem = (props) => {
  let { title, desc, url, img, author, date, source } = props;
  return (
    <div className="card my-2">
      <div className="card-body">
        <span className="badge rounded-pill bg-danger mb-2">
          {source && source.name}
        </span>

        <img
          src={img}
          alt=""
          style={{ height: "12rem", width: "100%", objectFit: "cover" }}
        />

        <div className="container d-flex justify-content-between mt-4">
          <p className="muted-text">
            <small>
              <i className="fas fa-user"></i> {author ? author : `Unknown`}
            </small>
          </p>

          <p className="muted-text">
            <small>
              <i className="fas fa-clock"></i>{" "}
              {date ? new Date(date).toDateString() : `Unknown`}
            </small>
          </p>
        </div>

        <h5 className="card-title">{title}</h5>

        <p className="card-text">{desc}...</p>
        <a
          href={url}
          target="_blank"
          rel="noreferrer"
          className="btn btn-sm btn-dark"
        >
          Read more
        </a>
      </div>
    </div>
  );
};

export default NewsItem;

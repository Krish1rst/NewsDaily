import React from 'react'

const NewsItem = (props) => {
  let { title, description, imageUrl, newsUrl, author, date, source } = props;
  return (
    <div className="container my-2">
      <div className="card " >
        <div style={{ display: 'flex', justifyContent: 'flex-end', position: 'absolute', right: '0' }}><span className="badge rounded-pill bg-danger"  >
          {source}
        </span></div>
        <img src={!imageUrl ? "https://upload.wikimedia.org/wikipedia/commons/e/ea/Spring_Lake%2C_New_Jersey_Beach_at_Sunrise.jpg" : imageUrl} className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title">{title}... </h5>
          <p className="card-text"> {description}</p>
          <p className="card-text"><small className=" text-primary">By {!author ? "Unknown" : author} on {new Date(date).toGMTString()} </small></p>
          <a rel="noreferrer" href={newsUrl} target="_blank" className="btn btn-sm btn-primary">Read More....</a>
        </div>
      </div>
    </div>
  )
}

export default NewsItem



//destructuring see js concept
//rce
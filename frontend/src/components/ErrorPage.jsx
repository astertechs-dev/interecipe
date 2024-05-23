import React from 'react';

const ErrorPage = ({ errorCode }) => (
  <div className="text-center mt-5">
    <h1>{errorCode} Error</h1>
    <p>Something went wrong.</p>
  </div>
);

export default ErrorPage;

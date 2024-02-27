import React from "react";
import { Result } from "antd";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <Result
      status="404"
      title="404"
      subTitle="Данной страницы не существует :("
      extra={<Link to={"/"}>Back Home</Link>}
    />
  );
}

export default NotFound;

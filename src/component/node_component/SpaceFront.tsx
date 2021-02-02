import React from "react";
import { Col } from "react-bootstrap";

function SpaceFront(props: { depth: number }): JSX.Element {
    return <Col lg="auto" className="px-0 mx-0" style={{ width: (props.depth * 20).toString() + "px" }} />;
}

export default SpaceFront;

import React, { Component, ReactElement } from 'react';
import { withRouter } from "react-router-dom";
import Router from './Router/Router';
import { RouteComponentProps, StaticContext } from "react-router";
import styles from "./App.scss";

const App = (props: RouteComponentProps<any, any>) => {
  return (
    <div className={styles.appBar}>
        {/*kankna*/}
        <Router {...props} />
    </div>
  )
}
export default withRouter(App);

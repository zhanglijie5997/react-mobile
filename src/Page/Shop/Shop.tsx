import React, { Component } from 'react'

export default class Shop extends Component {
    constructor(props: any) {
        super(props);
    }
    public UNSAFE_componentWillMount() {}
    public componentDidMount() {}
    public componentWillUnmount(){}
    public componentDidUpdate() {}
    public getSnapshotBeforeUpdate() {}
    // 老版本中的UNSAFE_componentWillReceiveProps 强制去比较两个参数, 不让用户根据this.props 去比较，
    // 防止自身状态变得不可预测
    public getDerivedStateFromProps() {}
    public UNSAFE_componentWillReceiveProps(props: any, nextProps: any) {
        console.log(props, nextProps);
    }

    public render() {
        return (
            <div>
               text 
            </div>
        )
    }
}

import '../styles/globals.css'
import MainLayout from "../components/layouts/main/MainLayout";
import App from "next/app";
import React, { Component } from 'react';


class WebasystAnalytics extends App {

    constructor(props) {
        super();
    }

    static async getInitialProps({Component, ctx, reduxStore}) {

        let pageProps = Component.getInitialProps ? await Component.getInitialProps(ctx) : {};

        return pageProps;

    }

    render() {
        const { Component, pageProps } = this.props;

        return (
            <MainLayout props={this.props}>
                <Component {...this.props} />
            </MainLayout>
        )
    }
}
export default WebasystAnalytics;

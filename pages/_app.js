import '../styles/globals.scss'
import MainLayout from "../components/layouts/main/MainLayout";
import App from "next/app";
import React, { Component } from 'react';
import Router from "next/router";
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

//Binding events.
Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

class WebasystAnalytics extends App {

    constructor(props) {
        super();
    }

    static async getInitialProps({Component, ctx}) {

        return  Component.getInitialProps ? await Component.getInitialProps(ctx) : {};

    }

    render() {
        const { Component } = this.props;

        return (
            <MainLayout props={this.props}>
                <Component {...this.props} />
            </MainLayout>
        )
    }
}
export default WebasystAnalytics;

import React from 'react';
import { connect } from 'dva';

import MainLayout from '../components/MainLayout/MainLayout';

function IndexPage({ location }){
    return (
        <MainLayout location={location} >
            <div>
                <h1>Yay! Welcome to dva!</h1>
                <div>
                    <ul>
                        <li>To get started, edit <code>src/index.js</code> and save to reload.</li>
                        <li><a href="https://github.com/dvajs/dva-docs/blob/master/v1/en-us/getting-started.md">Gettting Started</a></li>
                    </ul>
                </div>
            </div>
        </MainLayout>
    )
}

IndexPage.propTypes ={};

export default connect()(IndexPage);
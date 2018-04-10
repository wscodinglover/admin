import React from "react";
import { connect } from "dva";

import UsersComponent from "../components/Users/Users";
import MainLayout from "../components/MainLayout/MainLayout";

// function Users({ location }){
//     return(
//         <MainLayout location={location} >
//             <div>
//                 <UsersComponent />
//             </div>
//         </MainLayout>
//     );
// }

class Users extends React.Component{
    constructor(props){
        super(props)
        this.state={}
    }

    componentWillMount(){
        const { dispatch } = this.props;
        dispatch({type: "users/reload"})
    }

    render () {
        return (
            <MainLayout location={location} >
                <div>
                    <UsersComponent />
                </div>
            </MainLayout>
        )
    }
}

export default connect()(Users);
import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import {
    LOGIN_REQUEST,
    USERNAME_MODIFY,
    PASSWORD_MODIFY,
} from '../reduxactions';

function Login(props) {
    const { username, password, loginresult, onUsernameEndre, onPasswordEndre, onSendLogin } = props;
    if (loginresult.success) {
        return (<Redirect to="/oldalbum/" />);
    }

    return (
        <div className="Login">
            <header>
                <div className="pb-2 mt-4 mb-2 border-bottom bg-light">
                    <h1>Handleregistrering login</h1>
                    <p id="messagebanner"></p>
                </div>
            </header>
            <div className="container">
                <form onSubmit={e => { e.preventDefault(); }}>
                    <div className="form-group row">
                        <label htmlFor="username" className="col-form-label col-3 mr-2">Username:</label>
                        <div className="col-8">
                            <input id="username" className="form-control" type="text" name="username" value={username} onChange={e => onUsernameEndre(e.target.value)} />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="password" className="col-form-label col-3 mr-2">Password:</label>
                        <div className="col-8">
                            <input id="password" className="form-control" type="password" name="password" value={password} onChange={e => onPasswordEndre(e.target.value)}/>
                        </div>
                    </div>
                    <div className="form-group row">
                        <div className="offset-xs-3 col-xs-9">
                            <input className="btn btn-primary" type="submit" value="Login" onClick={() => onSendLogin(username, password)}/>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

function mapStateToProps(state) {
    const login = state.login || {};
    const { username, password, loginresult } = login;
    return {
        username,
        password,
        loginresult,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        onUsernameEndre: (username) => dispatch(USERNAME_MODIFY(username)),
        onPasswordEndre: (password) => dispatch(PASSWORD_MODIFY(password)),
        onSendLogin: (username, password) => dispatch(LOGIN_REQUEST({ username, password })),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
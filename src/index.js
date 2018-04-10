import dva from 'dva';

// import './index.css';
import { browserHistory } from "dva/router";
import createLoading from "dva-loading";
import { message } from "antd";
import './index.html';

const ERROR_MSG_DURATION = 3; //3秒

// 1. Initialize
const app = dva({
    history:browserHistory,
    onError(e) {
        message.error(e.message,ERROR_MSG_DURATION);
    }
});

// 2. Plugins
app.use(createLoading());

// 3. Model
// app.model(require('./models/example').default);

// 4. Router
// app.router(require('./router').default);
app.router(require('./router'));

// 5. Start
app.start('#root');

import React from 'react';
import { connect } from 'dva';
import { Table, Pagination, Popconfirm, Button, Input  } from 'antd';
import { routerRedux } from 'dva/router';
// import styles from './Users.css';
import { PAGE_SIZE } from '../../constants';
import UserModal from './UserModal';

const Search = Input.Search;

function Users({ dispatch, list: dataSource, loading, total, page: current }) {
  const deleteHandler = (id) => {
    dispatch({
      type: 'users/remove',
      payload: id,
    });
  }

  const editHandler = (id, values) => {
    dispatch({
      type: 'users/patch',
      payload: { id, values },
    });
  }

  const createHandler = (values) => {
    dispatch({
      type: 'users/create',
      payload: values,
    });
  }

  const searchHandler = (id) => {
    dispatch({
      type: 'users/search',
      payload: id,
    });
  }

  const reloadHandler = () => {
    dispatch({
      type: 'users/reload',
    });
  }

  const pageChangeHandler = (page) => {
    dispatch(
      routerRedux.push({
        pathname: '/users',
        query: { page },
      })
    );
  }

  const columns = [
    {
      title: 'Id',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: text => <a href="">{text}</a>,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Website',
      dataIndex: 'website',
      key: 'website',
    },
    {
      title: 'Operation',
      key: 'operation',
      render: (text, record) => (
        <span >
          <UserModal record={record} onOk={editHandler.bind(null, record.id)}>
            <a>Edit</a>
          </UserModal>
          <Popconfirm title="Confirm to delete?" onConfirm={deleteHandler.bind(null, record.id)}>
            <a style={{ marginLeft: '10px' }} href="">Delete</a>
          </Popconfirm>
        </span>
      ),
    },
  ];

  	// 定义分页对象
  const pagination = {
    total,
    current,
    pageSize: 5,
    onChange (value) {pageChangeHandler(value)},
  };
  
  return (
    <div>
      <div>
        <div style={{ margin: '20px' }}>
          <UserModal record={{}} onOk={createHandler}>
            <Button type="primary">Create User</Button>
          </UserModal>
          <span style={{ marginLeft: '20px',fontSize: '20px' }}>id :
            <Search
              placeholder="input search id"
              onSearch={value => searchHandler(value)}
              style={{ width: 200 }}
            />
          </span>
          <Button style={{ marginLeft: '20px' }} type="primary" onClick={reloadHandler}>All</Button>
        </div>
        <Table
          columns={columns}
          dataSource={dataSource}
          loading={loading}
          rowKey={record => record.id}
          pagination={pagination}
        />

      </div>
    </div>
  );
}

function mapStateToProps(state) {
  const { list, total, page } = state.users;
  return {
    loading: state.loading.models.users,
    list,
    total,
    page,
  };
}

export default connect(mapStateToProps)(Users);

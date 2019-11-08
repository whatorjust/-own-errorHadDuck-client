import React from 'react';
import { Layout } from 'antd';
import './sign.css';
import WrappedRegistrationForm from './SignupForm';

const { Header, Footer, Content } = Layout;

export default function Signup(props) {
  return (
    <div>
      <Layout>
        <Header>Header</Header>
        <Content>
          <WrappedRegistrationForm />
        </Content>
        <Footer>Footer</Footer>
      </Layout>
    </div>
  );
}

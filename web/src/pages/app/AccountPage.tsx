import React, { Fragment, useEffect, useState } from 'react';
import styled from 'styled-components';
import { useUserStore } from '../../store';
import moment from 'moment';
import axios from 'axios';
import { BASE_URL } from '../../config';
import useWindowDimensions from '../../hooks/useWindowDimensions';
import FormUpdateUser from '../../components/FormUpdateUser';
import ReactModal from 'react-modal';
import './styles/account.css';
import { Field, Formik, Form } from 'formik';
import { showToast } from '../../utils/funcUtils';

const Wrapper = styled.div`
  min-height: 100vh;
  // display: flex;
  justify-content: center;
  background: black;
`;

const CoverImage = styled.div`
  background-image: url(https://149695847.v2.pressablecdn.com/wp-content/uploads/2019/04/ntflxx.png);
  height: 250px;
  background-size: cover;
  background-position: 50% 0;
  position: relative;
  // background: red;
  width: 100%;
`;

const RowInfor = ({ left, right, top }: any) => {
  return (
    <div
      style={{
        display: 'flex',
        marginTop: top,
        width: 350,
        justifyContent: 'space-between',
      }}
    >
      <h3
        style={{
          color: '#eaeaea',
          fontWeight: 400,
          fontSize: 16,
          width: 200,
        }}
      >
        {left}
      </h3>
      <h3 style={{ color: 'white', fontWeight: 600, fontSize: 16 }}>{right}</h3>
    </div>
  );
};

function AccountPage() {
  const user = useUserStore((state) => state.user);
  const updateUserData = useUserStore((state) => state.updateUserData);

  const [visible, setVisible] = useState(false);
  const { width } = useWindowDimensions();

  const getData = async () => {
    axios
      .get(`${BASE_URL}user`, {
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem('token')!)}`,
        },
      })
      .then((res) => {
        console.log(res);
        // setListFilm(res.data.data);
      });
  };

  const onSubmit = (values: any) => {
    const { name, dob } = values;
    axios
      .put(`${BASE_URL}user`, { name, dob, email: user.email })
      .then((res) => {
        showToast(res.data.message)
        updateUserData({...user, dob, name})
        setVisible(false)
        // setListFilm(res.data.data);
      });
  };

  useEffect(() => {
    getData();
  });

  return (
    <Wrapper>
      <CoverImage />
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          width,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <h3 style={{ color: 'white', marginTop: 20, fontSize: 30 }}>
          {user.name}
        </h3>
        <RowInfor
          left={'H???ng th??nh vi??n:'}
          right={user?.rank || 'Ch??a c???p nh???t'}
          top={40}
        />
        <RowInfor
          left={'Email:'}
          right={user?.email || 'Ch??a c???p nh???t'}
          top={25}
        />
        <RowInfor
          left={'Ng??y sinh:'}
          right={user?.dob ? user.dob : 'Ch??a c???p nh???t'}
          top={25}
        />
        <h3
          onClick={() => setVisible(true)}
          style={{ color: 'white', cursor: 'pointer', marginTop: 40 }}
        >
          S???a th??ng tin
        </h3>
      </div>
      <ReactModal
        isOpen={visible}
        onRequestClose={() => setVisible(false)}
        className={'modal-update'}
        overlayClassName={'modal-update__overlay'}
      >
        <h3 style={{ color: 'white' }}>C???p nh???t th??ng tin</h3>
        <Formik initialValues={{ name: '', dob: '' }} onSubmit={onSubmit}>
          <Form className="login-form">
            <Field
              id="name"
              name="name"
              placeholder="Nh???p t??n"
              className={'login-form__input'}
            />

            <Field
              id="dob"
              name="dob"
              placeholder="Nh???p ng??y sinh"
              className={'login-form__input'}
            />
            <button className="login-form__submit-button" type="submit">
              Ti???p t???c
            </button>
          </Form>
        </Formik>
      </ReactModal>
    </Wrapper>
  );
}

export default AccountPage;

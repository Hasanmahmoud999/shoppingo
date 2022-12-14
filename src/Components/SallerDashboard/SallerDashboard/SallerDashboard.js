import React, { useState, useEffect } from 'react';
import SideNavbar from '../../AddProduct/SideNavbar/SideNavbar';
import BarChart2 from '../SallerDashboard/BarChar';
import { AddShoppingCart, Favorite, Star } from '@mui/icons-material';
import { Route, Link, useNavigate } from 'react-router-dom';
import { TopNavbar, Content } from '../../AddProduct/Home/AddProductCss';
import { Container } from '../../Profile/ProfileInfoCss';
import HeaderImage from '../../Profile/HeaderImage';
import { IconButton } from '@mui/material';
import { InnerContainer } from '../../Dashboard/DashboardCss';
import {
  PaymentsContainer,
  Paragraph,
  Input,
  InputContainer,
  FormContainer,
} from '../../InsertPaymentPage/InsertPaymentcss';
import {
  ProduactSection,
  TopProductSection,
  ProductContainer,
  AddButton,
  PaymentsInfo,
} from './SallerDashboardCss';
// import ProductCard from '../ProductCard/ProductCard';
import { useSelector } from 'react-redux';
import axios from 'axios';
import NotePopup, { showPopupNote } from '../../PopUp/NotePopup';
import styled from 'styled-components';
import AddProduct from '../../AddProduct/Home/AddProduct';

export const SellerButton = styled.button`
  background: #f4c444;
  color: #11324d;
  border: none;
  border-radius: 12px;
  width: 45%;
  &:hover {
    color: #f4c444;
    background: #11324d;
  }
`;

// let sellerpayment=[];
function SellerDashboard() {
  const navigate = useNavigate();

  const defaultbar = {
    1: {
      numOfSellesPerMonth: 0,
      paymentsValueInMonth: 1000,
    },
    2: {
      numOfSellesPerMonth: 0,
      paymentsValueInMonth: 1000,
    },
    3: {
      numOfSellesPerMonth: 0,
      paymentsValueInMonth: 1000,
    },
    4: {
      numOfSellesPerMonth: 0,
      paymentsValueInMonth: 1000,
    },
    5: {
      numOfSellesPerMonth: 0,
      paymentsValueInMonth: 1000,
    },
    6: {
      numOfSellesPerMonth: 0,
      paymentsValueInMonth: 1000,
    },
    7: {
      numOfSellesPerMonth: 0,
      paymentsValueInMonth: 1000,
    },
    8: {
      numOfSellesPerMonth: 0,
      paymentsValueInMonth: 1000,
    },
    9: {
      numOfSellesPerMonth: 0,
      paymentsValueInMonth: 1000,
    },
    10: {
      numOfSellesPerMonth: 0,
      paymentsValueInMonth: 1000,
    },
    11: {
      numOfSellesPerMonth: 0,
      paymentsValueInMonth: 1000,
    },
    12: {
      numOfSellesPerMonth: 0,
      paymentsValueInMonth: 1000,
    },
  };

  const route = useNavigate();
  const user = useSelector((state) => state.user);
  const token = localStorage.getItem('userToken');
  const [totalIncomeShop, setTotalIncomeShop] = useState();
  const [NumberOfSelles, setNumberOfSelles] = useState();
  const [monthsInfo, setMonthesInfo] = useState({});
  const [sellerProducts, setSellerProducts] = useState([]);
  const [image, setImage] = useState();
  const [errMsg, setErrMsg] = useState('');

  useEffect(() => {
    if (user.user.imageUrl.length > 1) {
      setImage(`https://shoppingoapi.vercel.app/${user.user.imageUrl}`);
    } else {
      setImage(require('../../../Images/Default.jpg'));
    }
  });

  useEffect(() => {
    axios
      .get('https://shoppingoapi.vercel.app/managment/getSellerDash', {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        setNumberOfSelles(res.data.numOfProductsells);
        setSellerProducts(res.data.sellerProducts);
        setMonthesInfo(res.data.monthsIfno);
        setTotalIncomeShop(res.data.totalIncomeShop);
      })
      .catch((err) => {
        // console.log(err)
        if (!err.response) {
          setErrMsg(<h4>No Server Response</h4>);
          showPopupNote();
        } else if (
          err.response.status !== 200 &&
          err.response.status !== 201 &&
          err.response.data.message
        ) {
          setErrMsg(<h4>{err.response.data.message}</h4>);
          showPopupNote();
        } else if (
          err.response.status !== 200 &&
          err.response.status !== 201 &&
          !err.response.data.message
        ) {
          setErrMsg(<h4>{err.message}</h4>);
          showPopupNote();
        } else {
          setErrMsg(<h4>Failed</h4>);
          showPopupNote();
        }
      });
  }, []);

  // console.log(sellerProducts);
  function DeleteProduct(productId) {
    // console.log(productId);

    axios
      .get(`https://shoppingoapi.vercel.app/shop/deleteProduct/${productId}`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        window.location.reload(false);
      })
      .catch((err) => {
        // console.log(err)
        if (!err.response) {
          setErrMsg(<h4>No Server Response</h4>);
          showPopupNote();
        } else if (
          err.response.status !== 200 &&
          err.response.status !== 201 &&
          err.response.data.message
        ) {
          setErrMsg(<h4>{err.response.data.message}</h4>);
          showPopupNote();
        } else if (
          err.response.status !== 200 &&
          err.response.status !== 201 &&
          !err.response.data.message
        ) {
          setErrMsg(<h4>{err.message}</h4>);
          showPopupNote();
        } else {
          setErrMsg(<h4>Failed</h4>);
          showPopupNote();
        }
      });
  }

  const toUpdateProduct = (id) => {
    navigate('/AddProduct', { state: { id: id, fromdash: true } });
  };

  return (
    <Container>
      <NotePopup msg={errMsg} color="red" />
      <SideNavbar />
      <InnerContainer>
        <TopNavbar style={{ justifyContent: 'end' }}>
          <div
            style={{
              display: 'flex',
              paddingTop: '10px',
              paddingRight: '10px',
              height: '100%',
            }}
          >
            <Link to="/Favourite">
              <IconButton
                onClick={() => {
                  Route('/Favourite');
                }}
                style={{ color: '#6B7AA1' }}
              >
                <Favorite />
              </IconButton>
            </Link>

            <Link to="/ShoppingCard">
              <IconButton
                onClick={() => {
                  Route('/ShoppingCard');
                }}
                style={{ color: '#6B7AA1' }}
              >
                <AddShoppingCart />
              </IconButton>
            </Link>

            <div style={{ marginTop: '7px', fontSize: '15px' }}>
              Hello , {user.user.name}
            </div>

            <HeaderImage image={image} />
          </div>
        </TopNavbar>
        <Content style={{ marginTop: '15px', flexDirection: 'column' }}>
          <PaymentsContainer
            style={{ marginBottom: '30PX', justifyContent: 'space-evenly' }}
          >
            <PaymentsInfo>
              <Paragraph style={{ fontSize: '25px' }}>
                Total Income From Shoppingo
              </Paragraph>
              <Paragraph>{totalIncomeShop}</Paragraph>
            </PaymentsInfo>

            <PaymentsInfo>
              <Paragraph style={{ fontSize: '25px' }}>
                number of user buy from seller
              </Paragraph>
              <Paragraph>{NumberOfSelles} user </Paragraph>
            </PaymentsInfo>
          </PaymentsContainer>

          <div
            style={{
              width: '100%',
              borderBottom: '1px solid',
              borderTop: '1px solid',
              marginTop: '20px',
              padding: '20px 0px',
            }}
          >
            {Object.keys(monthsInfo).length ? (
              <BarChart2 monthsInfo={monthsInfo} />
            ) : (
              <BarChart2 monthsInfo={defaultbar} />
            )}
          </div>

          <ProduactSection>
            <div
              style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'flex-end',
              }}
            >
              <AddButton
                onClick={() => {
                  route('/AddProduct', { state: { fromdash: false } });
                }}
              >
                Add more product
              </AddButton>
            </div>
            <TopProductSection>
              <h1 style={{ color: '#11324D', fontWeight: '400' }}>
                Product You Have In Site
              </h1>
            </TopProductSection>
            <ProductContainer>
              {sellerProducts.length ? (
                sellerProducts.map((props, index) => (
                  //  return<ProductCard productCateg={props.productCateg} imgUrl={props.imgUrl} newPrice={props.newPrice} key={index}/>
                  <div
                    className="card"
                    style={{
                      width: '250px',
                      marginInline: '10px',
                      height: '350px',
                      marginBottom: '20px',
                      paddingBottom: '20px',
                      borderRadius: '20px',
                      boxShadow: '5px 5px 5px 5px rgba(0,0,0,0.25)',
                    }}
                    key={index}
                  >
                    <div
                      style={{
                        height: '300px',
                        maxHeight: '300px',
                        overflow: 'hidden',
                      }}
                    >
                      <img
                        src={`https://shoppingoapi.vercel.app/${props.imgUrl}`}
                        alt="product img"
                        className="card-img-top"
                        style={{
                          borderRadius: '20px',
                          width: '100%',
                          height: '100%',
                        }}
                      />
                    </div>

                    <h4 className="text-center" style={{ color: '#0D065E' }}>
                      {props.productCateg}
                    </h4>

                    <h5 className="text-center" style={{ color: '#7D6A06' }}>
                      {props.newPrice}
                    </h5>

                    <div
                      style={{
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'space-around',
                      }}
                    >
                      <SellerButton
                        onClick={() => {
                          DeleteProduct(props.productId);
                        }}
                      >
                        {' '}
                        Delete{' '}
                      </SellerButton>
                      <SellerButton
                        onClick={() => {
                          toUpdateProduct(props.productId);
                        }}
                      >
                        {' '}
                        Update{' '}
                      </SellerButton>
                    </div>
                  </div>
                ))
              ) : (
                <div style={{ fontSize: '30px' }}>
                  Waiting For Get Products...
                </div>
              )}
            </ProductContainer>
          </ProduactSection>
        </Content>
      </InnerContainer>
    </Container>
  );
}

export default SellerDashboard;

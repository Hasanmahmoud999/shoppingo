import React, { useEffect, useState } from 'react';
import './Shoppingcardbody.css';
import Navbar from '../../../Components/Home/Navbar/Navbar';
import Removebutton from '../RemoveButton/Removebutton';
import Oneitem from '../OneItem/Oneitem.js';
import { useNavigate } from 'react-router';
import axios from 'axios';
import NotePopup, { showPopupNote } from '../../PopUp/NotePopup';

function Shoppingcardbody(props) {
  const route = useNavigate();
  const token = localStorage.getItem('userToken');
  const [errMsg, setErrMsg] = useState();
  const [cartItems, setCartItems] = useState([]);

  //***************Get cards****************/

  useEffect(() => {
    let isRequested = false;

    axios
      .get('https://shoppingoapi.vercel.app/cart/getCart', {
        headers: {
          authorization: `bearer ${token}`,
        },
      })
      .then((res) => {
        if (!isRequested) {
          setCartItems(res.data.cartItems);
        }
      })
      .catch((err) => {
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

    return () => {
      isRequested = true;
    };
  }, []);

  //***********Add Card To Payment*************/

  const addToPayment = (e) => {
    axios
      .get('https://shoppingoapi.vercel.app/cart/addCartToPayments', {
        headers: {
          authorization: `bearer ${token}`,
        },
      })
      .then((res) => {
        route('/Mangment/Payments');
      })
      .catch((err) => {
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
  };

  //***************Remove All*******************/

  const removeAll = (e) => {
    cartItems.map((one) => {
      axios
        .post(
          'https://shoppingoapi.vercel.app/cart/deleteFromCart',
          {
            id: one.id,
          },
          {
            headers: {
              authorization: `bearer ${token}`,
            },
          }
        )
        .then((res) => {
          // console.log(res.data)
        })
        .catch((err) => {
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
    });

    setCartItems([]);
  };

  //*******************************************/

  return (
    <div className="back-shoppingcard">
      <Navbar />

      <NotePopup msg={errMsg} color="red" />

      <h1
        style={{ textAlign: 'center', color: '#0E1D51', paddingBlock: '30px' }}
      >
        {' '}
        My Shopping Card
      </h1>

      <Removebutton removeAll={removeAll} />

      <div className="main-line">
        <h5>Photo</h5>
        <h5 style={{ marginLeft: '45px' }}>Location</h5>
        <h5>Color</h5>
        <h5 style={{ marginRight: '25px' }}>Size</h5>
        <h5 style={{ marginRight: '20px' }}>Quantity</h5>
        <h5 style={{ marginLeft: '25px' }}>Price</h5>
        <h5>Remove</h5>
      </div>

      <div className="items">
        {
          cartItems.length
            ? cartItems.map((one, index) => {
                return (
                  <Oneitem
                    key={index}
                    img={one.img}
                    name={one.name}
                    color={one.color[0]}
                    size={one.size[0]}
                    price={one.price}
                    qty={one.qty}
                    p_id={one._id}
                    i_id={one.id}
                    setCartItems={setCartItems}
                    setErrMsg={setErrMsg}
                    showPopupNote={showPopupNote}
                  />
                );
              })
            : ''
          // <h6 style={{fontStyle:'bold',fontSize:'20px',color:'#0E1D51',textAlign:'center'}}>Loading ...</h6>
        }
      </div>

      <div className="total">
        Total&nbsp;&nbsp;&nbsp;
        {cartItems.length
          ? cartItems.reduce((total, one) => {
              return total + one.price * one.qty;
            }, 0)
          : '0'}{' '}
        s.p
      </div>

      <div className="con-btn">
        <button
          type="button"
          className="continue-confirm-btn"
          onClick={addToPayment}
        >
          Confirm Payment
        </button>

        <button
          onClick={() => {
            route('/Shop');
          }}
          type="button"
          className="continue-confirm-btn"
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
}

export default Shoppingcardbody;

import React, { useState, useEffect, useCallback } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import HomeIcon from "@material-ui/icons/Home";
import { Box } from "@material-ui/core";
import DrawerExample from "../../components/DrawerForm/DrawerForm";
import FooterGrid from "../../components/Footer/Footer";
import NavAppBar from "../../components/Navbar/Navbar";
import axios from "axios";
import NoPlacedOrdersDelivery from "../EmptyPages/NoPlacedOrdersDelivery";
import { useStyles } from "./Cart.style";
import {
  fetchUserCartDeatails,
  incrementCartItem,
  decrementCartItem,
  removeCartItem,
  handleCartPlaceOrder,
} from "../../services/CartService";

import { useDispatch, useSelector } from "react-redux";
import { addFoodToCart, removeFoodFromCart, removeFoodItem } from "../../store/cart-actions";
export default function Cart(props) {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const classes = useStyles();
  const [drawer, setDrawer] = useState(false);
  const [address, setAddress] = useState(null);
  // const [restaurant, setRestaurant] = useState({});

  const token = localStorage.getItem("token");

  const headers = {
    // "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };

  let totalValue = 0;

  useEffect(() => {}, []);

  const handleDrawer = () => {
    if (drawer === true) setDrawer(false);
    else setDrawer(true);
  };

  const handleSubmit = (addData, e) => {
    e.preventDefault();
    setAddress(addData);
    setDrawer(false);
  };

  //Place order method
  const handlePlaceOrder = async (address) => {
    const res = await handleCartPlaceOrder(address);
    props.history.push("/myorders");
  };

  //increment data
  const handleIncrement = (currentItem) => {
    const data = {
      foodId: currentItem.foodItem._id,
      restaurantId: cart.restaurantDetails.restaurantId,
    };
    dispatch(addFoodToCart(data));
    // await incrementCartItem(data);
  };

  const handleDecrement = async (currentItem) => {
    const data = {
      foodId: currentItem.foodItem._id,
    };

    dispatch(removeFoodFromCart(data));
    // await decrementCartItem(data);
  };

  const removeItem = async (currentItem) => {
    const data = {
      foodId: currentItem.foodItem._id,
    };
    dispatch(removeFoodItem(data))
    // const res = await removeCartItem(data);
  };
  //Drawer Calling Const
  const drawerTag = (
    <DrawerExample
      open={drawer}
      close={handleDrawer}
      css={classes.drawerTransition}
      onSubmitData={handleSubmit}
      address={address}
      setAddress={setAddress}
    />
  );

  return (
    <div className={classes.root}>
      <NavAppBar />
      {cart.cartFoodList?.length > 0 ? (
        <Container maxWidth="lg">
          <Grid container spacing={2}>
            <Grid item xs={8} lg={8}>
              <Paper className={classes.paper}>
                {/* first card */}
                {cart.cartFoodList?.map((item) => {
                  return (
                    <>
                      <Card
                        className={classes.cardstyle}
                        variant="outlined"
                        key={item._id}
                      >
                        <div className={classes.details}>
                          <CardContent className={classes.content}>
                            <Typography component="h5" variant="h5">
                              {item.foodItem.foodName}
                            </Typography>
                            <Typography
                              variant="subtitle1"
                              color="textSecondary"
                              noWrap
                            >
                              {item.foodItem.foodDescription}
                            </Typography>
                            <Typography
                              variant="subtitle1"
                              color="textSecondary"
                            >
                              Rs. {item.foodItem.foodPrice}
                            </Typography>
                          </CardContent>

                          <Box display="flex" flexDirection="row">
                            <Button
                              className={classes.addTocart}
                              variant="contained"
                              onClick={() => {
                                removeItem(item);
                              }}
                            >
                              Remove Item
                            </Button>

                            <div className={classes.displayCounters}>
                              <div
                                className={classes.counter}
                                onClick={() => handleDecrement(item)}
                              >
                                -
                              </div>

                              <div className={classes.quantity}>
                                <b>{item.quantity}</b>
                              </div>
                              <div
                                className={classes.counter}
                                onClick={() => handleIncrement(item)}
                              >
                                +
                              </div>
                            </div>
                          </Box>
                        </div>

                        <CardMedia
                          justify="flex-end"
                          className={classes.cover}
                          image={item.foodItem.foodImage}
                          title="Item order"
                        />
                      </Card>
                    </>
                  );
                })}

                <b>
                  <hr />
                  <Grid item container justify="flex-end">
                    <Typography variant="h5">
                      <b>Total Price:{cart.totalAmount} </b>
                    </Typography>
                  </Grid>
                </b>
              </Paper>
            </Grid>
            {/* Add Address section */}
            <Grid item xs={4}>
              <Paper className={classes.paperAddress}>
                <Box
                  className={classes.addressContainer}
                  component="div"
                  display="flex"
                  flexDirection="column"
                >
                  <Box
                    className={classes.locationIconContainer}
                    component="div"
                  >
                    <LocationOnIcon
                      className={classes.locationIcon}
                    ></LocationOnIcon>

                    {address ? (
                      <>
                        <div className={classes.addressDisplay}>
                          <HomeIcon /> {address.streetAddress},
                          {address.landmark},{address.area} , {address.city},{" "}
                          {address.zip},{address.state}, {address.country}.
                        </div>
                        <hr /> <p>Total Amount: {cart.totalAmount}</p>
                      </>
                    ) : null}
                  </Box>
                  <Box
                    className={classes.addAddressButtonContainer}
                    component="div"
                  >
                    {!address ? (
                      <Button
                        className={classes.addAddressButton}
                        variant="outlined"
                        onClick={() => {
                          // nextStep();
                          handleDrawer();
                        }}
                      >
                        Proceed to checkout
                      </Button>
                    ) : (
                      <Button
                        className={classes.addAddressButton}
                        variant="outlined"
                        onClick={() => handlePlaceOrder(address)}
                      >
                        Place Order
                      </Button>
                    )}
                    {drawer === true ? drawerTag : null}
                  </Box>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      ) : (
        <>
          <Container spacing={3} className={classes.noOrderImage}>
            <Grid
              container
              spacing={3}
              direction="column"
              alignItems="center"
              justify="center"
            >
              <Grid item xs={12} sm={12} md={12} lg={12}>
                <NoPlacedOrdersDelivery />
                <h3>Empty Cart!!</h3>
              </Grid>
            </Grid>
          </Container>
        </>
      )}

      <FooterGrid />
    </div>
  );
}

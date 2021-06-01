import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { Route, Link } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import { shadows } from "@material-ui/system";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import EditIcon from "@material-ui/icons/Edit";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { useMediaQuery } from "react-responsive";
import axios from "axios";
import { useStyles } from "./MyProfile.style";

import { useDispatch, useSelector } from "react-redux";
import { updateProfile } from "../../store/user-actions";

export default function MyProfile() {
  const profile = useSelector((state) => state.user.profile);
  const role = useSelector((state) => state.user.role);
  const deliveryExecutive = useSelector(
    (state) => state.user.deliveryExecutive
  );
  const dispatch = useDispatch();
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [data, setData] = useState();
  const token = localStorage.getItem("token");
  // const [userdetails, setUserDetails] = useState({});

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const updateProfileHandler = async () => {
    const updateData = {
      firstName: data.firstName,
      lastName: data.lastName,
      mobileNumber: data.mobileNumber,
    };
    if (role == "DE") {
      updateData.deliveryExecutiveLocation = {
        streetAddress: data.streetAddress,
        landmark: data.landmark,
        area: data.area,
        city: data.city,
        zip: data.zip,
        state: data.state,
        country: data.country,
        vehicleNumber: data.vehicleNumber,
      };
      updateData.vehicleNumber = data.vehicleNumber;
    }

    dispatch(updateProfile(updateData));
    handleClose();
  };

  useEffect(() => {
    if (role == "DE") {
      setData((data) => ({
        ...data,
        streetAddress:
          deliveryExecutive?.deliveryExecutiveLocation?.streetAddress,
        landmark: deliveryExecutive?.deliveryExecutiveLocation?.landmark,
        area: deliveryExecutive?.deliveryExecutiveLocation?.area,
        city: deliveryExecutive?.deliveryExecutiveLocation?.city,
        zip: deliveryExecutive?.deliveryExecutiveLocation?.zip,
        state: deliveryExecutive?.deliveryExecutiveLocation?.state,
        country: deliveryExecutive?.deliveryExecutiveLocation?.country,
        vehicleNumber: deliveryExecutive?.vehicleNumber,
      }));
    }
    setData((data) => ({
      ...data,
      firstName: profile?.firstName,
      lastName: profile?.lastName,
      mobileNumber: profile?.mobileNumber,
      gender: profile?.gender,
    }));
  }, []);

  //Onchange for every input element.
  const handleChange = (event) => {
    event.persist();
    const key = event.target.name;
    const value = event.target.value;
    setData((inputs) => ({
      ...inputs,
      [key]: value,
    }));
  };

  return (
    <div className={classes.root}>
      <Container>
        <Paper className={classes.paper}>
          <Grid container spacing={3}>
            <Grid item sm={12} xs={12} lg={12} md={12}>
              <div className={classes.editicon}>
                {data?.gender == "male" ? (
                  <Avatar
                    alt="Remy Sharp"
                    variant="circular"
                    className={classes.avatarImage}
                    src="https://cdn4.vectorstock.com/i/1000x1000/44/58/happy-redhead-boy-face-avatar-little-child-male-vector-24014458.jpg"
                  />
                ) : (
                  <Avatar
                    alt="Remy Sharp"
                    className={classes.avatarImage}
                    src="https://cdn5.vectorstock.com/i/1000x1000/73/04/female-avatar-profile-icon-round-woman-face-vector-18307304.jpg"
                  />
                )}
                <EditIcon className={classes.edit} onClick={handleClickOpen} />
              </div>
            </Grid>

            <Dialog
              open={open}
              onClose={handleClose}
              aria-labelledby="form-dialog-title"
            >
              <DialogTitle className={classes.editHeading}>
                Edit Details
              </DialogTitle>

              <DialogContent>
                <TextField
                  margin="dense"
                  name="firstName"
                  // label="First Name"
                  type="text"
                  value={data?.firstName}
                  fullWidth
                  onChange={handleChange}
                />
                <TextField
                  margin="dense"
                  name="lastName"
                  label="Last Name"
                  type="text"
                  value={data?.lastName}
                  fullWidth
                  onChange={handleChange}
                />
                <TextField
                  margin="dense"
                  name="mobileNumber"
                  label="Mobile Number"
                  type="number"
                  value={data?.mobileNumber}
                  fullWidth
                  onChange={handleChange}
                />
                {role == "DE" ? (
                  <>
                    <TextField
                      margin="dense"
                      name="vehicleNumber"
                      label="Vehicle Number"
                      type="text"
                      value={data?.vehicleNumber}
                      onChange={handleChange}
                      fullWidth
                    />
                    <TextField
                      margin="dense"
                      name="streetAddress"
                      label="Street Address"
                      type="text"
                      value={data?.streetAddress}
                      onChange={handleChange}
                      fullWidth
                    />
                    <TextField
                      margin="dense"
                      name="landmark"
                      label="Landmark"
                      type="text"
                      value={data?.landmark}
                      onChange={handleChange}
                      fullWidth
                    />

                    <TextField
                      margin="dense"
                      name="area"
                      label="Area"
                      type="text"
                      value={data?.area}
                      onChange={handleChange}
                      fullWidth
                    />
                    <TextField
                      margin="dense"
                      name="city"
                      label="City"
                      type="text"
                      value={data?.city}
                      onChange={handleChange}
                      fullWidth
                    />
                    <TextField
                      margin="dense"
                      name="state"
                      label="State"
                      type="text"
                      value={data?.state}
                      onChange={handleChange}
                      fullWidth
                    />
                    <TextField
                      margin="dense"
                      name="country"
                      label="Country"
                      type="text"
                      value={data?.country}
                      onChange={handleChange}
                      fullWidth
                    />
                  </>
                ) : (
                  <></>
                )}
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose} color="primary">
                  Cancel
                </Button>
                <Button onClick={updateProfileHandler} color="primary">
                  Update
                </Button>
              </DialogActions>
            </Dialog>

            <Grid
              item
              sm={6}
              xs={6}
              lg={6}
              md={6}
              className={classes.detailedText}
            >
              <div>
                <div className={classes.fields}>Name</div>
                <div className={classes.fields}>Email Id</div>
                <div className={classes.fields}>Mobile Number</div>

                {role == "DE" ? (
                  <>
                    <div className={classes.fields}>Vehicle Number</div>
                    <div className={classes.fields}>Street Address</div>
                    <div className={classes.fields}>LandMark</div>
                    <div className={classes.fields}>Area</div>
                    <div className={classes.fields}>City</div>
                    <div className={classes.fields}>State</div>
                    <div className={classes.fields}>Country</div>
                    <div className={classes.fields}>Zip</div>
                  </>
                ) : null}
              </div>
            </Grid>

            <Grid
              item
              sm={6}
              xs={6}
              lg={6}
              md={6}
              className={classes.detailedText}
            >
              <div>
                <div className={classes.fields}>
                  {" "}
                  {profile?.firstName} {profile?.lastName}{" "}
                </div>
                <div className={classes.fields}>{profile?.email}</div>
                <div className={classes.fields}> {profile?.mobileNumber}</div>

                {role == "DE" ? (
                  <>
                    <div className={classes.fields}>
                      {" "}
                      {deliveryExecutive?.vehicleNumber}{" "}
                    </div>
                    <div className={classes.fields}>
                      {
                        deliveryExecutive?.deliveryExecutiveLocation
                          ?.streetAddress
                      }{" "}
                    </div>
                    <div className={classes.fields}>
                      {deliveryExecutive?.deliveryExecutiveLocation?.landmark}{" "}
                    </div>
                    <div className={classes.fields}>
                      {deliveryExecutive?.deliveryExecutiveLocation?.area}
                    </div>
                    <div className={classes.fields}>
                      {deliveryExecutive?.deliveryExecutiveLocation?.city}
                    </div>
                    <div className={classes.fields}>
                      {deliveryExecutive?.deliveryExecutiveLocation?.state}
                    </div>

                    <div className={classes.fields}>
                      {deliveryExecutive?.deliveryExecutiveLocation?.country}
                    </div>

                    <div className={classes.fields}>
                      {deliveryExecutive?.deliveryExecutiveLocation?.zip}
                    </div>
                  </>
                ) : null}
              </div>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </div>
  );
}

import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { withRouter } from "react-router-dom";
import "./styles.scss";

import { useSelector } from "react-redux";
import countryList from "../../utils/country";
import FormSelect from "../Forms/FormSelect";
import { signUpUserStart } from "./../../redux/User/user.actions";
import AuthWrapper from "./../AuthWrapper";
import Button from "./../Forms/Button";
import FormInput from "./../Forms/FormInput";

const mapState = ({ user }) => ({
  currentUser: user.currentUser,
  userErr: user.userErr,
});

const INITIAL_STATE_ARRAY_FIRST_INDEX = {
  name: "",
  value: "",
};

const SignupComponent = (props) => {
  const { currentUser, userErr } = useSelector(mapState);
  const dispatch = useDispatch();
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("");
  const [region, setRegion] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const shortCountryList = [INITIAL_STATE_ARRAY_FIRST_INDEX].concat(
    countryList.map((country) => {
      return { name: country.countryName, value: country.countryShortCode };
    })
  );

  const [regionsList, setRegionsList] = useState([]);

  useEffect(() => {
    if (currentUser) {
      resetForm();
      props.history.push("/");
    }
  }, [currentUser]);

  useEffect(() => {
    if (Array.isArray(userErr) && userErr.length > 0) {
      setErrors(userErr);
    }
  }, [userErr]);

  useEffect(() => {
    if (!country || country === undefined) {
      setRegion("");
      setRegionsList([INITIAL_STATE_ARRAY_FIRST_INDEX]);
      return;
    }

    const selectedCountry = countryList.find(
      (c) => c.countryShortCode === country
    );

    if (selectedCountry) {
      const countryObjIndex = countryList.filter(
        (c) => c.countryShortCode === country
      );

      const regions = countryObjIndex[0].regions;

      setRegionsList(regions);
    } else {
      setRegionsList([INITIAL_STATE_ARRAY_FIRST_INDEX]);
    }
  }, [country]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    dispatch(
      signUpUserStart({
        displayName,
        email,
        phone,
        country,
        region,
        password,
        confirmPassword,
      })
    );
  };

  const resetForm = () => {
    setDisplayName("");
    setEmail("");
    setPhone("");
    setCountry("");
    setRegion("");
    setPassword("");
    setConfirmPassword("");
    setErrors([]);
  };

  const configAuthWrapper = {
    headline: "Signup",
  };

  return (
    <AuthWrapper {...configAuthWrapper}>
      <div className="formWrap">
        {errors.length > 0 && (
          <ul>
            {errors.map((err, index) => {
              return <li key={index}> {err} </li>;
            })}
          </ul>
        )}
        <form onSubmit={handleFormSubmit}>
          <FormInput
            type="text"
            name="displayName"
            value={displayName}
            placeholder="Full name"
            handleChange={(e) => setDisplayName(e.target.value)}
            required
          />

          <FormInput
            type="text"
            name="email"
            value={email}
            placeholder="Email"
            handleChange={(e) => setEmail(e.target.value)}
            required
          />

          <FormInput
            type="phone"
            name="phone"
            value={phone}
            placeholder="Phone"
            handleChange={(e) => setPhone(e.target.value)}
            required
          />

          <FormInput
            type="password"
            name="password"
            value={password}
            placeholder="Password"
            handleChange={(e) => setPassword(e.target.value)}
            required
          />

          <FormSelect
            label="Country"
            options={shortCountryList}
            value={country}
            placeholder="Country"
            handleChange={(e) => setCountry(e.target.value)}
            required
          />

          <FormSelect
            label="Region/Province/State"
            options={regionsList}
            value={region}
            placeholder="Region/Province/State"
            handleChange={(e) => setRegion(e.target.value)}
            required
          />

          <FormInput
            type="password"
            name="confirmPassword"
            value={confirmPassword}
            placeholder="Confirm Password"
            handleChange={(e) => setConfirmPassword(e.target.value)}
            required
          />

          <Button type="submit">Register</Button>
        </form>
      </div>
    </AuthWrapper>
  );
};

export default withRouter(SignupComponent);

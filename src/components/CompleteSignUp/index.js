import { useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { completeGoogleSignInStart } from "./../../redux/User/user.actions";

import "./styles.scss";

const mapState = ({ user }) => ({
  currentUser: user.currentUser,
  userErr: user.userErr ?? null,
});

const INITIAL_STATE_ARRAY_FIRST_INDEX = {
  name: "",
  value: "",
};

const CompleteSignUpComponent = (props) => {
  const { currentUser, userErr } = useSelector(mapState);
  const history = useHistory();
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("");
  const [region, setRegion] = useState("");
  const [currency, setCurrency] = useState("cad");
  const [errors, setErrors] = useState([]);
  const shortCountryList = [INITIAL_STATE_ARRAY_FIRST_INDEX].concat(
    countryList.map((country) => {
      return { name: country.countryName, value: country.countryShortCode };
    })
  );
  const [regionsList, setRegionsList] = useState([]);

  if (!currentUser) {
    setErrors("We were unable to sign in thru your provider.");
    history.push("/");
  }

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
    const additionalData = {
      phone,
      country,
      region,
    };

    const userCredentialsAndProfile = { user, additionalData };
    dispatch(completeGoogleSignInStart(userCredentialsAndProfile));

    resetForm();
  };

  const resetForm = () => {
    setPhone("");
    setCountry("");
    setRegion("");
    setErrors([]);
  };

  const configAuthWrapper = {
    headline: "Complete Signup",
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
            type="phone"
            name="phone"
            value={phone}
            placeholder="Phone"
            handleChange={(e) => setPhone(e.target.value)}
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

          <Button type="submit">Submit</Button>
        </form>
      </div>
    </AuthWrapper>
  );
};
export default CompleteSignUpComponent;

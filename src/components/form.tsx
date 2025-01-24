import "../App.css";
import { Form, Formik, Field } from "formik";
import { addCookie } from "../helpers/cookies";
import { openCheckout } from "../helpers/stripe";
import { useEffect, useState, useRef } from "react";
import committeeData from "../helpers/committees.json";

export default function CandyForm({ setError, setStatus }) {
  const [organs, setOrgans] = useState([""]);
  const [committees, setCommittees] = useState([""]);
  const [selectedOrgan, setSelectedOrgan] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setOrgans(["Select an organ", ...Object.keys(committeeData)]);
  }, []);

  return (
    <Formik
      initialValues={{
        name: "",
        message: "",
        amount: 1,
        organ: "Select an organ",
        committee: "",
        email: "",
      }}
      onSubmit={(values) => {
        //save cookie before redirecting to checkout
        addCookie(
          values.name,
          values.amount,
          values.message,
          values.email,
          values.organ,
          values.committee
        );
        openCheckout(values.amount).then((response) => {
          if (response.error) {
            setError(response.error);
          }
        });
        /*addCandygram({
          To: values.name,
          Amount: values.amount,
          Message: values.message,
          Organ: values.organ,
          Committee: values.committee,
          timestamp: new Date().valueOf(),
          Email: values.email,
        });*/
        //setStatus(1);
      }}
      validateOnBlur
      validate={(values) => {
        let errors = {
          name: "",
          email: "",
          amount: "",
          message: "",
          organ: "",
        };
        if (!values.name) {
          errors.name = "Required";
        } else if (values.name.length > 50) {
          errors.name = "Must be 50 characters or less";
        } else if (!values.email) {
          errors.email = "Required";
        } else if (
          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
        ) {
          errors.email = "Invalid email address";
        } else if (!values.amount) {
          errors.amount = "Required";
        } else if (values.amount < 1) {
          errors.amount = "You must send at least one candygram";
        } else if (values.message.length > 500) {
          errors.message = "Must be 500 characters or less";
        } else if (values.organ !== "" && !organs.includes(values.organ)) {
          errors.organ = "Invalid organ";
        } else if (values.organ === "Select an organ") {
          setSelectedOrgan(null);
        } else if (values.organ !== selectedOrgan) {
          setCommittees([values.organ].map((committee) => committee.name));
          setSelectedOrgan(values.organ);
        }
        //TODO: Add profanity filter on message field
        //checks if all fields are valid, if so, clears errors to allow submission
        if (
          !errors.name &&
          !errors.email &&
          !errors.amount &&
          !errors.message
        ) {
          errors = {};
        }
        return errors;
      }}
    >
      {({ errors }) => (
        <Form className="form">
          <h1>Send a Candygram</h1>
          <label htmlFor="name">Name</label>
          <Field
            id="name"
            name="name"
            placeholder="Jane Doe"
            className={errors.name ? "errorInput" : ""}
          />
          {errors.name && <div className="error">{errors.name}</div>}

          <label htmlFor="amount">Amount</label>
          <Field
            id="amount"
            name="amount"
            placeholder="Amount"
            className={errors.amount ? "errorInput" : ""}
          />
          {errors.amount && <div className="error">{errors.amount}</div>}

          <label htmlFor="message">Message</label>
          <Field
            id="message"
            name="message"
            placeholder="Have a great time at NAIMUN!"
            className={errors.message ? "errorInput" : ""}
          />
          {errors.message && <div className="error">{errors.message}</div>}

          <label htmlFor="email">Email (yours)</label>
          <Field
            id="email"
            name="email"
            placeholder="phil@modelun.org"
            className={errors.email ? "errorInput" : ""}
          />
          {errors.email && <div className="error">{errors.email}</div>}

          <label htmlFor="organ">Organ</label>
          <Field
            as="select"
            id="organ"
            name="organ"
            className={errors.organ ? "errorInput" : ""}
          >
            {organs.map((organ) => (
              <option value={organ}>{organ}</option>
            ))}
          </Field>
          {errors.organ && <div className="error">{errors.organ}</div>}

          {selectedOrgan && (
            <>
              <label htmlFor="committee">Committee</label>
              <Field
                as="select"
                id="committee"
                name="committee"
                placeholder="Committee"
              >
                {committees.length === 0 && (
                  <option value="">Select an organ</option>
                )}
                {committees.map((committee) => (
                  <option value={committee}>{committee}</option>
                ))}
              </Field>
            </>
          )}

          <button type="submit">Order</button>
        </Form>
      )}
    </Formik>
  );
}

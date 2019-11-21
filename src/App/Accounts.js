import React from "react";
import AccountCard from "./AccountCard";
import Button from "@material-ui/core/Button";
import PlaidLink from "react-plaid-link";
import { functions } from "../firebase";

export default function Accounts(props) {
  const handleOnSuccess = (token, metadata) => {
    console.log(token, metadata);
    console.log(props.user);
    //Exchange Token
    const getToken = functions.httpsCallable("exchangeToken");
    getToken({ token: token });
  };
  const handleOnExit = () => {
    // handle the case when your user exits Link
  };

  const addAccount = () => {
    //Save Account Access and Item to db
  };

  return (
    <div>
      <PlaidLink
        clientName="Your app name"
        env="sandbox"
        product={["auth", "transactions"]}
        publicKey="1b29ff6476cba215f6542447539724"
        onExit={handleOnExit}
        onSuccess={handleOnSuccess}
        style={{ width: 100 }}
      >
        Add Account
      </PlaidLink>
      Accounts
      <AccountCard />
    </div>
  );
}

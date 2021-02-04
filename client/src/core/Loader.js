import React from "react";
import LoadingOverlay from "react-loading-overlay";
import BounceLoader from "react-spinners/BounceLoader";
import ReactLoading from "react-loading";
export default function Loader() {
  return (
    <LoadingOverlay
      active={true}
      spinner={
        <ReactLoading type="spokes" color="white" height={100} width={100} />
      }
    ></LoadingOverlay>
  );
}

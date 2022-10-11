import React from 'react'
import { css } from '@emotion/react'
import RiseLoader from "react-spinners/ClipLoader";

//css
const override: CSSProperties = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
};
const Loadingcomponent = () => {
    return (

        <RiseLoader color='red' loading={true} css={override} />
    )
}
export default Loadingcomponent;
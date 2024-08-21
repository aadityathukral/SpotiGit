// TODO

import { ReactElement } from "react";

type ButtonProps = {
  text: string;
  color: string;
  onClick: () => void;
};

const Button = (props: ButtonProps): ReactElement => {
  return (
    <>
      <button onClick={props.onClick} className={props.color}>
        {props.text}
      </button>
    </>
  );
};

export default Button;

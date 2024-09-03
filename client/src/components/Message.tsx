// TBD
import { ReactElement } from "react";

const Message = (props: { children: string }): ReactElement => {
  return (
    <>
      <h1 className="text-red-500 text-5xl">{props.children}</h1>
    </>
  );
};

export default Message;

import React, { ButtonHTMLAttributes, HTMLAttributes, ReactNode } from "react";
import useLongPress from "./use-long-press";

interface Props extends HTMLAttributes<HTMLButtonElement> {
  longPress: () => void;
}

export const ButtonWrapper = ({ longPress, ...rest }: Props) => {
  const longPressCallback = useLongPress(longPress, 500);
  return <button {...longPressCallback} {...rest} />;
};

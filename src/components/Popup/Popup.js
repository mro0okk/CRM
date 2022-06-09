import popup from "./popup.module.less";
import cn from "classnames";
import { useRef, useState } from "react";
import { ClickOutside } from "../../hooks";

const Popup = ({
  children,
  content = <></>,
  className,
  popupClassName,
  disabled = false,
}) => {
  const ref = useRef();
  const [visible, setVisible] = useState(false);

  ClickOutside(ref, () => setVisible(false));

  return (
    <div className={cn(popup["container"], className)} ref={ref}>
      <div onClick={() => setVisible((val) => !val)}>{children}</div>
      <div
        className={cn(
          popup["popup"],
          !disabled && visible && popup["visible"],
          popupClassName
        )}
      >
        {content}
      </div>
    </div>
  );
};

export default Popup;

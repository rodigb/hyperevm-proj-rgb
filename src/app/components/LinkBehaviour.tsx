"use client";

import * as React from "react";
import NextLink, { LinkProps as NextLinkProps } from "next/link";

type Props = Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href"> &
  NextLinkProps & {
    href: NextLinkProps["href"];
  };

const LinkBehavior = React.forwardRef<HTMLAnchorElement, Props>(
  function LinkBehavior(props, ref) {
    const { href, ...other } = props;
    return <NextLink ref={ref} href={href} {...other} />;
  },
);

export default LinkBehavior;

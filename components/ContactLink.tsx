"use client";

import type { AnchorHTMLAttributes, ReactNode } from "react";
import { trackContact, type Placement } from "@/lib/analytics";

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & {
  children: ReactNode;
  kind: "whatsapp" | "phone";
  placement: Placement;
};

export function ContactLink({ children, kind, placement, ...props }: Props) {
  return <a {...props} onClick={() => trackContact(`${kind}_click`, placement)}>{children}</a>;
}
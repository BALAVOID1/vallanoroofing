"use client";

import { useEffect, useState } from "react";
import { ContactLink } from "./ContactLink";
import { siteConfig, whatsappHref } from "@/lib/site-config";

export function MobileContactBar() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const hero = document.querySelector(".hero");
    if (!hero) return;
    const update = () => setVisible(hero.getBoundingClientRect().bottom <= 0);
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);
  return <div className="mobile-contact" data-visible={visible} aria-hidden={!visible}><ContactLink href={whatsappHref()} target="_blank" rel="noopener noreferrer" tabIndex={visible ? 0 : -1} kind="whatsapp" placement="mobile_bar">WhatsApp</ContactLink><ContactLink href={siteConfig.phoneHref} tabIndex={visible ? 0 : -1} kind="phone" placement="mobile_bar">Call</ContactLink></div>;
}
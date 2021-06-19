import React, { FC, useRef, useState, useEffect } from "react";
import { LocalizedLink, useLocalization } from "gatsby-theme-i18n";
import blogicon from "@iconify-icons/carbon/blog";
import { Icon } from "@iconify/react";
import Logo from "./Logo";
import { DarkModeSwitch } from "react-toggle-dark-mode";
import useDarkMode from "use-dark-mode";
import translateIcon from "@iconify-icons/mdi/translate";
import accountIcon from "@iconify-icons/mdi/account-outline";
import { useClickOutside } from "@miyauci/react-click-outside";
import { ifElseFn } from "fonction";

const TheHeader: FC<{ originalPath: string }> = ({ originalPath }) => {
  const { locale } = useLocalization();

  const { value, toggle } = useDarkMode(undefined, {
    classNameDark: "dark",
    classNameLight: "light",
  });

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const ref = useRef<HTMLUListElement>(null);
  const [isShow, changeShow] = useState(false);
  const toggleShow = ifElseFn(
    () => isShow,
    () => changeShow(false),
    () => changeShow(true)
  );

  useClickOutside(ref, () => changeShow(false), "mousedown" as any);
  const isActive = (path: string): boolean => originalPath === path;

  return (
    <header
      className="
      fixed
      md:sticky
      md:top-0
      md:bottom-auto
      md:drop-shadow
      md:mx-auto
      md:border-none
      w-full
      z-50
      bottom-0
      light:bg-gray-50
      dark:bg-gray-900
      border-t
    "
    >
      <div
        className="container max-w-8xl p-3 md:py-6 mx-auto items-center
    justify-between flex"
      >
        <span className="flex items-center space-x-4 md:space-x-10">
          <Logo />

          <LocalizedLink
            to="/"
            language={locale}
            className={`p-2 md:p-2 space-x-2 md:px-3 flex rounded-full md:px-3 border ${
              isActive("/")
                ? "bg-gradient-to-br from-purple-800 via-pink-500 to-amber-500 text-white"
                : ""
            }`}
          >
            <Icon className="w-7 h-7" icon={accountIcon} />
            <span className={originalPath === "/" ? "" : "hidden md:inline"}>
              About
            </span>
          </LocalizedLink>

          <LocalizedLink
            to="/posts"
            language={locale}
            className={`p-2 md:p-2 space-x-2 md:px-3 flex rounded-full md:px-3 border ${
              isActive("/posts/")
                ? "bg-gradient-to-br from-purple-800 via-pink-500 to-amber-500 text-white"
                : ""
            }`}
          >
            <Icon className="w-7 h-7" icon={blogicon} />
            <span
              className={originalPath === "/posts/" ? "" : "hidden md:inline"}
            >
              Blog
            </span>
          </LocalizedLink>
        </span>

        <div className="flex space-x-4 md:space-x-8">
          <div className="relative flex items-center">
            <button className="flex" onClick={toggleShow}>
              <Icon className="w-8 h-8" icon={translateIcon} />
            </button>

            {isShow && (
              <ul
                ref={ref}
                className="
          absolute
          rounded-md
          light:bg-white
          dark:bg-gray-800
          mt-2
          right-0
          bottom-10
          shadow
          text-lg
          md:(bottom-auto)
          md:top-8
          hover:shadow-md
          p-3
        "
              >
                <li>
                  <LocalizedLink to={originalPath} language="ja">
                    日本語
                  </LocalizedLink>
                </li>

                <li>
                  <LocalizedLink to={originalPath} language="en">
                    Englush
                  </LocalizedLink>
                </li>
              </ul>
            )}
          </div>

          {isClient ? (
            <DarkModeSwitch checked={value} onChange={toggle} size={30} />
          ) : (
            <span className="w-30px h-30px" />
          )}
        </div>
      </div>
    </header>
  );
};

export default TheHeader;

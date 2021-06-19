import React, { FC } from "react";
import npm from "@iconify-icons/mdi/npm-variant";
import github from "@iconify-icons/mdi/github";
import twitter from "@iconify-icons/mdi/twitter";
import { Icon } from "@iconify/react";
const TheFooter: FC = () => {
  return (
    <footer className="px-2 py-12 mb-18 md:mb-auto">
      <div className="m-auto container sm:px-6 flex-col-reverse items-center md:flex-row flex md:justify-between">
        <span className="text-sm text-gray-600">
          {new Date().getFullYear()} ©Tomoki Miyauci
        </span>

        <div className="flex flex-col text-gray-600 md:flex-row items-center md:space-x-7">
          <div className="my-4 space-x-4">
            <a
              href="https://www.npmjs.com/~miyauci"
              target="_blank"
              className="transition duration-200 hover:text-red-500"
            >
              <Icon icon={npm} className="w-8 h-8" />
            </a>

            <a
              href="https://twitter.com/tomoki_miyauci"
              target="_blank"
              className="transition duration-200 hover:text-blue-400"
            >
              <Icon icon={twitter} className="w-8 h-8" />
            </a>

            <a
              href="https://github.com/TomokiMiyauci"
              target="_blank"
              className="transition duration-200 hover:text-purple-600"
            >
              <Icon icon={github} className="w-8 h-8" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default TheFooter;

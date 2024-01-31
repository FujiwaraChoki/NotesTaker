import Link from "next/link";

import { useState } from "react";
import { useRouter } from "next/router";
import { Disclosure } from "@headlessui/react";
import { MicrophoneIcon } from "@heroicons/react/20/solid";
import { Bars3Icon, XMarkIcon, XCircleIcon } from "@heroicons/react/24/outline";

const Navbar = () => {
  const router = useRouter();

  const [isRecording, setIsRecording] = useState(false);

  const startRecording = async () => {
    setIsRecording(true);

    const response = await fetch(
      process.env.NEXT_PUBLIC_API_URL + "/api/notes",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: "start",
        }),
      }
    );

    const data = await response.json();
    console.log(data);
    setIsRecording(false);
  };

  const stopRecording = async () => {
    setIsRecording(false);

    const response = await fetch(
      process.env.NEXT_PUBLIC_API_URL + "/api/notes",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: "stop",
        }),
      }
    );

    const data = await response.json();
    console.log(data);
  };

  return (
    <Disclosure as="nav" className="bg-white shadow">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 justify-between">
              <div className="flex">
                <div className="-ml-2 mr-2 flex items-center md:hidden">
                  <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
                <div
                  onClick={() => {
                    router.push("/");
                  }}
                  className="flex flex-shrink-0 items-center cursor-pointer"
                >
                  <img
                    className="block h-8 w-auto lg:hidden"
                    src="https://64.media.tumblr.com/20ab53ba82cea0fe54a808e9f38ba476/245530516260c944-1b/s1280x1920/81c17e369f5fd5c8e32a1bd59b2dd9c3c0fa08fd.pnj"
                    alt="Osaka lol"
                  />
                  <img
                    className="hidden h-8 w-auto lg:block"
                    src="https://64.media.tumblr.com/20ab53ba82cea0fe54a808e9f38ba476/245530516260c944-1b/s1280x1920/81c17e369f5fd5c8e32a1bd59b2dd9c3c0fa08fd.pnj"
                    alt="Osaka LOL"
                  />
                </div>
                <div className="hidden md:ml-6 md:flex md:space-x-8">
                  <Link
                    href="/"
                    className="inline-flex items-center border-b-2 border-blue-500 px-1 pt-1 text-sm font-medium text-gray-900"
                  >
                    See Summaries
                  </Link>
                </div>
              </div>
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  {isRecording ? (
                    <button
                      type="button"
                      onClick={stopRecording}
                      className="relative inline-flex items-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                    >
                      <XCircleIcon
                        className="-ml-1 mr-2 h-5 w-5"
                        aria-hidden="true"
                      />
                      <span>Stop</span>
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={startRecording}
                      className="relative inline-flex items-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                      <MicrophoneIcon
                        className="-ml-1 mr-2 h-5 w-5"
                        aria-hidden="true"
                      />
                      <span>Record</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="md:hidden">
            <div className="space-y-1 pt-2 pb-3">
              {/* Current: "bg-blue-50 border-blue-500 text-blue-700", Default: "border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700" */}
              <Disclosure.Button
                as="a"
                href="/"
                className="block border-l-4 border-blue-500 bg-blue-50 py-2 pl-3 pr-4 text-base font-medium text-blue-700 sm:pl-5 sm:pr-6"
              >
                See Summaries
              </Disclosure.Button>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

export default Navbar;

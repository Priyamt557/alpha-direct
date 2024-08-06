import { Fragment, useEffect, useState } from 'react';
import { Dialog, Transition, Disclosure } from '@headlessui/react';
import {
  Bars3Icon,
  ChevronDownIcon,
  XMarkIcon,
  FolderPlusIcon,
} from '@heroicons/react/24/outline';
import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { AdminNavigations, AgentNavigations } from './utilities/helpers';



function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function Example({ type, LogoutUser }) {
  const navigate = useNavigate()
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const getUrlPath = () => {
    const path = location.pathname;
    return path
  }

  const navigation = type === 'agent' ? AgentNavigations(getUrlPath) : AdminNavigations(getUrlPath)



  return (
    <div>
      {/* Dynamic sidebar for mobile */}
      <Transition.Root show={sidebarOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-50 lg:hidden"
          onClose={setSidebarOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-900/80" />
          </Transition.Child>

          <div className="fixed inset-0 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
                <Transition.Child
                  as={Fragment}
                  enter="ease-in-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in-out duration-300"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                    <button
                      type="button"
                      className="-m-2.5 p-2.5"
                      onClick={() => setSidebarOpen(false)}
                    >
                      <span className="sr-only">Close sidebar</span>
                      <XMarkIcon
                        className="h-5 w-5 text-white font-bold"
                        aria-hidden="true"
                      />
                    </button>
                  </div>
                </Transition.Child>
                <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white px-6 pb-2">
                  <div className="flex flex-col items-start pt-4 px-2">
                    <h1 className="text-3xl font-bold  text-first font-['TTNormsProBold']">
                      Motiv<span className="text-alpha-secondary">Agent</span>
                    </h1>
                    <div className="flex items-end w-3/4 justify-end pe-2">
                      <img
                        src={require('../assets/images/alphadirect_logo2.png')}
                        alt="Logo"
                        className="w-20"
                      />
                    </div>
                  </div>
                  <nav className="flex flex-1 flex-col">
                    <ul role="list" className="flex flex-1 flex-col gap-y-7">
                      <li>
                        <ul role="list" className="-mx-2 space-y-1">
                          {navigation.map((item) => (
                            <li key={item.name}>
                              {!item.children ? (
                                <Link
                                  key={item.name}
                                  to={item.href}
                                  className={classNames(
                                    item.current
                                      ? 'bg-gray-color2 font-bold'
                                      : 'hover:bg-gray-color2 font-bold',
                                    'group flex gap-x-2 rounded-lg px-4 py-2 text-sm leading-6 font-semibold text-first font-["TTNormsProRegular"]'
                                  )}
                                  onClick={() => {
                                    !item.children ? setSidebarOpen(false) : '';
                                    item.name === 'Logout' ? LogoutUser() : null
                                  }
                                  }
                                >
                                  <item.icon
                                    className={classNames(
                                      'h-5 w-5 shrink-0 text-first'
                                    )}
                                    aria-hidden="true"
                                  />
                                  {item.name}
                                  {item.count ? (
                                    <span
                                      className="ml-auto w-6 min-w-max whitespace-nowrap rounded-full bg-red-600 p-1 text-center text-xs font-bold leading-5 text-white"
                                      aria-hidden="true"
                                    >
                                      {item.count}
                                    </span>
                                  ) : null}
                                </Link>
                              ) : (
                                <Disclosure as="div">
                                  {({ open }) => (
                                    <>

                                      <Disclosure.Button
                                        className={classNames(
                                          item.current
                                            ? 'bg-gray-color2 font-bold'
                                            : 'hover:bg-gray-color2 font-bold',
                                          'flex items-center w-full text-left rounded-lg px-4 py-2 gap-x-2 text-sm leading-6 font-semibold text-gray-700'
                                        )}
                                        onClick={() =>
                                          !item.children
                                            ? setSidebarOpen(false)
                                            : ''
                                        }
                                      >
                                        <item.icon
                                          className="h-5 w-5 shrink-0 text-first"
                                          aria-hidden="true"
                                        />
                                        {item.name}
                                        <ChevronDownIcon
                                          className={classNames(
                                            open ? 'rotate-180' : '',
                                            'ml-auto h-5 w-5 shrink-0 text-first font-semibold'
                                          )}
                                          aria-hidden="true"
                                        />
                                      </Disclosure.Button>
                                      <Disclosure.Panel
                                        // defaultOpen={true}
                                        as="ul"
                                        className="mt-1 px-2"
                                      >
                                        {item.children.map((subItem) => (
                                          <li key={subItem.name}>
                                            <Disclosure.Button
                                              as={Link}
                                              to={subItem.href}
                                              className={classNames(
                                                subItem.current
                                                  ? 'bg-gray-color2 font-bold'
                                                  : 'hover:bg-gray-color2 font-bold',
                                                'block rounded-lg py-2 pr-2 pl-9 text-sm leading-6 text-first font-semibold'
                                              )}
                                              onClick={() =>
                                                setSidebarOpen(false)
                                              }
                                            >
                                              {subItem.name}
                                            </Disclosure.Button>
                                          </li>
                                        ))}
                                      </Disclosure.Panel>
                                    </>
                                  )}
                                </Disclosure>
                              )}
                            </li>
                          ))}
                        </ul>
                      </li>
                      {type === 'agent' && <li className=" mt-auto gap-x-6">
                        <button onClick={(e) => {
                          e.preventDefault()
                          navigate('add-policy')
                        }} className={`flex items-center border-2 border-blue-600 bg-blue-600 hover:bg-blue-700 text-white gap-x-3 font-bold rounded-xl py-4 px-4 w-full font-["TTNormsProRegular"]`}>
                          <FolderPlusIcon
                            className={classNames(
                              'h-5 w-5 shrink-0 text-white'
                            )}
                          />
                          LET'S SELL!
                        </button>
                      </li>}
                    </ul>
                  </nav>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      {/* Static sidebar for desktop */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-[250px] lg:flex-col">
        <div className="flex grow flex-col gap-y-5 overflow-y-auto px-6 py-6">
          <div className="flex flex-col items-start">
            <h1 className="text-4xl font-bold  text-first font-['TTNormsProBold']">
              Motiv<span className="text-alpha-secondary">Agent</span>
            </h1>
            <div className="flex items-end w-full justify-end pe-2">
              <img
                src={require('../assets/images/alphadirect_logo2.png')}
                alt="Logo"
                className="w-20"
              />
            </div>
          </div>
          <nav className="flex flex-1 flex-col">
            <ul role="list" className="flex flex-1 flex-col gap-y-7">
              <li>
                <ul role="list" className="-mx-2 space-y-1">
                  {navigation.map((item) => (
                    <li key={item.name}>
                      {!item.children ? (
                        <Link
                          onClick={(e) => {
                            if (item.name === 'Logout') {
                              e.preventDefault()
                              LogoutUser()
                            }
                          }}
                          to={item.href}
                          className={classNames(
                            item.current
                              ? 'bg-gray-color2 font-bold'
                              : 'hover:bg-gray-color2 font-bold',
                            'group flex gap-x-2 rounded-lg px-4 py-2 text-sm leading-6 font-semibold text-first font-["TTNormsProRegular"]'
                          )}
                        >
                          <item.icon
                            className={classNames(
                              item.current ? '' : '',
                              'h-5 w-5 shrink-0 text-first'
                            )}
                            aria-hidden="true"
                          />
                          {item.name}
                          {item.count ? (
                            <span
                              className="ml-auto w-6 min-w-max whitespace-nowrap rounded-full bg-red-600 p-1 text-center text-xs font-bold leading-5 text-white"
                              aria-hidden="true"
                            >
                              {item.count}
                            </span>
                          ) : null}
                        </Link>
                      ) : (
                        <Disclosure defaultOpen={getUrlPath().includes("/additional-info") ? true : false} as="div">
                          {({ open }) => (
                            <>

                              <Disclosure.Button

                                onClick={() => {
                                  navigate(item?.href)

                                }}
                                style={{ backgroundColor: item.current ? '#F3F3F3' : 'transparent' }}
                                className={classNames(

                                  item.current
                                    ? 'bg-gray-color2 font-bold'
                                    : 'hover:bg-gray-color2 font-bold',
                                  'flex items-center w-full text-left rounded-lg px-4 py-2 gap-x-2 text-sm leading-6 font-semibold font-["TTNormsProRegular"] text - gray - 700'
                                )}
                              >
                                <item.icon
                                  className="h-5 w-5 shrink-0 text-first"
                                  aria-hidden="true"
                                />
                                {item.name}
                                <ChevronDownIcon
                                  className={classNames(
                                    open ? 'rotate-180' : '',
                                    'ml-auto h-5 w-5 shrink-0 text-first font-semibold'
                                  )}
                                  aria-hidden="true"
                                />
                              </Disclosure.Button>
                              <Disclosure.Panel as="ul" className="mt-1 px-2">
                                {item.children.map((subItem) => (
                                  <li key={subItem.name}>
                                    <Disclosure.Button
                                      as="a"
                                      // href={subItem.href}
                                      onClick={(e) => {
                                        e.preventDefault()
                                        navigate(subItem?.href)
                                      }}
                                      className={classNames(
                                        subItem.current
                                          ? 'bg-gray-color2 font-bold'
                                          : 'hover:bg-gray-color2 font-bold',
                                        'block rounded-lg py-2 pr-2 pl-9 text-sm leading-6 text-first font-semibold'
                                      )}
                                    >
                                      {subItem.name}
                                    </Disclosure.Button>
                                  </li>
                                ))}
                              </Disclosure.Panel>
                            </>
                          )}
                        </Disclosure>
                      )}
                    </li>
                  ))}
                </ul>
              </li>
              {type === 'agent' && <li className=" mt-auto gap-x-6">
                <button onClick={(e) => {
                  e.preventDefault()
                  navigate('add-policy')
                }} className={`flex items-center ${getUrlPath() === '/add-policy' ? "border-2 border-blue-600 text-blue-600 hover:bg-blue-100" : "bg-blue-600 hover:bg-blue-500 text-white"}     text-xs  gap-x-3 font-bold rounded-xl py-4 px-4 w-full font-["TTNormsProRegular"]`}>
                  <FolderPlusIcon
                    className={classNames(`h-5 w-5 shrink-0 ${getUrlPath() === '/add-policy' ? "text-blue-600" : " text-white"}`)}
                  />
                  LET'S SELL!
                </button>
              </li>}
            </ul>
          </nav>
        </div>
      </div>

      {/* Sticky Header with Current Navigation Name */}
      <div className="sticky top-0 z-40 flex items-center gap-x-6 px-4 py-3 shadow-sm sm:px-6 lg:hidden bg-[#484780]">
        <button
          type="button"
          className="-m-2.5 px-2.5 text-gray-700 font-bold lg:hidden"
          onClick={() => setSidebarOpen(true)}
        >
          <span className="sr-only">Open sidebar</span>
          <Bars3Icon
            className="h-12 w-8 text-white font-bold"
            aria-hidden="true"
          />
        </button>
        <div className="flex-1 text-sm font-semibold text-center leading-6 text-gray-900 -ms-8">
          <h1 className="text-2xl font-semibold text-white font-['TTNormsProBold']">
            Motiv<span className="text-alpha-secondary">Agent</span>
          </h1>
        </div>
      </div>
      <div className="lg:pl-[250px]">
        <Outlet />
      </div>
    </div >
  );
}

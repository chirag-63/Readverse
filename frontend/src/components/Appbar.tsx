import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import appLogo from '../assets/logo/readverse-logo.png'
import { Link } from 'react-router-dom';

const currentPath = window.location.pathname;

const navigation = [
  { name: 'Feed', href: '/feed', current: currentPath === '/feed' },
  { name: 'Create', href: '/create', current: currentPath === '/create' }
]

function classNames(...classes: string[]): string {
  return classes.filter(Boolean).join(' ')
}

export default function Appbar() {

  const signoutHandler = () => {
    localStorage.removeItem('token')
  }

  return (
    <Disclosure as="nav" className="bg-gray-200 fixed top-0 left-0 right-0 z-50">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            {/* Mobile menu button*/}
            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-black hover:bg-gray-300 hover:text-black focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-200">
              <span className="absolute -inset-0.5" />
              <span className="sr-only">Open main menu</span>
              <Bars3Icon aria-hidden="true" className="block h-6 w-6 group-data-[open]:hidden" />
              <XMarkIcon aria-hidden="true" className="hidden h-6 w-6 group-data-[open]:block" />
            </DisclosureButton>
          </div>
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex flex-shrink-0 items-center">
              <Link to={'/feed'}>
                <img
                  alt="readverse logo"
                  src={appLogo}
                  className="h-10 w-auto mt-1"
                />
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex items-center">
              <div className="flex space-x-4">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    aria-current={item.current ? 'page' : undefined}
                    className={classNames(
                      item.current ? 'text-black font-bold border-b-2 border-gray-800' : 'text-gray-800  hover:text-black',
                      'px-3 py-1 mt-[9px] text-lg font-medium',
                    )}
                  >
                    {item.name}
                  </a>
                ))}
              </div>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <button
              type="button"
              className="relative rounded-full p-1 text-gray-800 hover:bg-gray-300 focus:outline-none focus:ring-1 focus:ring-white focus:ring-offset-1 focus:ring-offset-gray-600"
            >
              <span className="absolute -inset-1.5" />
              <span className="sr-only">View notifications</span>
              {/* <BellIcon aria-hidden="true" className="h-6 w-6" /> */}
            </button>

            {/* Profile dropdown */}
            <Menu as="div" className="relative ml-3">
              <div>
                <MenuButton className="relative flex rounded-full bg-gray-200 text-sm focus:outline-none focus:ring-1 focus:ring-white focus:ring-offset-1 focus:ring-offset-gray-200">
                  <span className="absolute -inset-1.5" />
                  <span className="sr-only">Open user menu</span>
                  <img
                    alt="user profile"
                    src="https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png"
                    className="h-8 w-8 rounded-full"
                  />
                </MenuButton>
              </div>
              <MenuItems
                transition
                className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
              >
                <MenuItem>
                  <a href="/profile" className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-200">
                    Profile
                  </a>
                </MenuItem>
                <MenuItem>
                  <a onClick={signoutHandler} href="/" className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-200">
                    Sign out
                  </a>
                </MenuItem>
              </MenuItems>
            </Menu>
          </div>
        </div>
      </div>

      <DisclosurePanel className="sm:hidden">
        <div className="space-y-1 px-2 pb-3 pt-2">
          {navigation.map((item) => (
            <DisclosureButton
              key={item.name}
              as="a"
              href={item.href}
              aria-current={item.current ? 'page' : undefined}
              className={classNames(
                item.current ? 'bg-gray-200 text-black font-extrabold text-[16px]' : 'text-gray-800 hover:bg-gray-300 hover:text-black',
                'block rounded-md px-3 py-2 text-base font-medium',
              )}
            >
              {item.name}
            </DisclosureButton>
          ))}
        </div>
      </DisclosurePanel>
    </Disclosure>
  )
}
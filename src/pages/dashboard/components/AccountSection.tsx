import { Menu, Popover, Transition } from '@headlessui/react';
import { accountAtom } from '@src/atoms/account';
import { userAtom } from '@src/atoms/user';
import { AccountImage, Card } from '@src/components';
import Icon from '@src/components/ui/Icon';
import Notification from '@src/components/ui/Notification';
import AccountContext from '@src/context/AccountContext';
import { useAuth } from '@src/hooks';
import { useAccount } from '@src/hooks/account';
import {
  Fragment,
  FunctionComponent,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import { useRecoilState } from 'recoil';

type AccountBodyItemProps = {
  className?: string;
};
const AccountBodyItem: FunctionComponent<AccountBodyItemProps> = ({
  children,
  className,
}) => {
  return (
    <div
      className={`flex justify-between items-center py-4 text-sm px-3 ${className}`}
    >
      {children}
    </div>
  );
};

const AccountSection: FunctionComponent<{ account: any }> = () => {
  const [userState, setUserState] = useRecoilState(userAtom);
  const [account, setAccount] = useRecoilState(accountAtom);
  const [showNotification, setShowNotification] = useState(false);

  const [houses, setHouses] = useState<Record<string, any>>({});
  useEffect(() => {
    const parsedHouses = userState?.casas.reduce((r: any, a) => {
      r[`${a.tmvNomcor}`] = [...(r[`${a.tmvNomcor}`] || []), a];
      return r;
    }, {});

    setHouses(parsedHouses);
    if (userState?.casas.length !== 0) {
      setAccount(userState.casas[0]);
    }
  }, [userState]);

  const handleOnClose = () => {
    setShowNotification(false);
  };

  const handleAccountChange = (item: any) => {
    setAccount(item);
    setShowNotification(true);
    setTimeout(() => {
      setShowNotification(false);
    }, 2000);
  };
  return (
    <Card>
      <Notification
        message="Se ha cambiado la cuenta"
        title="Cambio de cuenta"
        type="success"
        open={showNotification}
        onClose={() => handleOnClose()}
      />
      <div className="flex flex-col -m-3 divide-y">
        <Menu as="div" className="relative inline-block text-left">
          <Menu.Button className="w-full p-4 text-sm font-medium rounded-md bg-opacity-20 hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
            <div className="flex">
              <div className="flex-auto text-left">
                <p className="text-sm text-neutral-500">Cuenta</p>
                <p className="font-bold text-primary">{account.tmvNomcor}</p>
              </div>
              <Icon className="text-neutral-500">expand_more</Icon>
              <div className="flex items-center justify-center">
                {/* <button className="flex">
                    <div>
                      <span className="w-5 h-5 material-icons text-neutral-500">
                        expand_more
                      </span>
                    </div>
                  </button> */}
              </div>
            </div>

            {/* <ChevronDownIcon
              className="w-5 h-5 ml-2 -mr-1 text-violet-200 hover:text-violet-100"
              aria-hidden="true"
            /> */}
          </Menu.Button>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute right-0 w-full mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="px-1 py-1 ">
                {Object.keys(houses || {}).map((casa) => (
                  <Menu.Item key={casa} disabled>
                    {({ active }) => (
                      <Popover className="relative">
                        {({ open }) => (
                          <>
                            <Popover.Button
                              className={`${
                                active
                                  ? 'bg-violet-500 text-white'
                                  : 'text-gray-900'
                              } group flex rounded-md items-center w-full p-4 text-sm`}
                            >
                              <span>{casa}</span>
                              <Icon
                                className={`${open ? '' : 'text-opacity-70'}
                                ml-2 h-5 w-5 text-orange-300 group-hover:text-opacity-80 transition ease-in-out duration-150`}
                                aria-hidden="true"
                              >
                                chevron_down
                              </Icon>
                            </Popover.Button>
                            <Transition
                              as={Fragment}
                              enter="transition ease-out duration-200"
                              enterFrom="opacity-0 translate-y-1"
                              enterTo="opacity-100 translate-y-0"
                              leave="transition ease-in duration-150"
                              leaveFrom="opacity-100 translate-y-0"
                              leaveTo="opacity-0 translate-y-1"
                            >
                              <Popover.Panel className="absolute top-0 z-10 w-64 transform -translate-x-1/2 -left-32 sm:px-0">
                                <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                                  <div className="relative flex gap-2 p-2 bg-white">
                                    {houses[casa].map(
                                      (item: any, index: any) => (
                                        <button
                                          key={index}
                                          className="flex items-center w-full p-2 transition duration-150 ease-in-out rounded-lg hover:bg-secondary-500 hover:text-white focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                                          onClick={() => {
                                            handleAccountChange(item);
                                          }}
                                        >
                                          {/* <div className="flex items-center justify-center flex-shrink-0 w-10 h-10 text-white sm:h-12 sm:w-12">
                                                          <item.icon aria-hidden="true" />
                                                        </div> */}
                                          <p className="text-sm font-medium">
                                            {item.cte}-{item.tcta}
                                            {item.cta}
                                          </p>
                                        </button>
                                      )
                                    )}
                                  </div>
                                </div>
                              </Popover.Panel>
                            </Transition>
                          </>
                        )}
                      </Popover>
                    )}
                  </Menu.Item>
                ))}
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
      <div className="flex flex-col -m-3 divide-y">
        {/* Account Header */}

        {/* Account Body */}
        <AccountBodyItem>
          <span className="text-neutral-500">Estado</span>
          <span className="text-semantic-success">Activo</span>
        </AccountBodyItem>
        <AccountBodyItem>
          <span className="text-neutral-500">Saldo inicial</span>
          <span className="font-bold text-neutral-500">$50,000,000.00</span>
        </AccountBodyItem>
        <AccountBodyItem className="text-base rounded-md bg-neutral-700">
          {/* <div className="flex items-center justify-between px-3 py-4 rounded-md text-md"> */}
          <span className="font-bold text-neutral-500">Saldo final</span>
          <span className="font-bold text-neutral-500">$1,450,000.00</span>
          {/* </div> */}
        </AccountBodyItem>
      </div>
    </Card>
  );
};

export default AccountSection;

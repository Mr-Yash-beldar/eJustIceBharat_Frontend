import React, { useEffect, useRef, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import SidebarLinkGroup from './SidebarLinkGroup';
import { useAuth } from '../../context/AuthProvider';

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (arg: boolean) => void;
}

const Sidebar = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {
  const { role } = useAuth();
  const location = useLocation();
  const { pathname } = location;

  const trigger = useRef<any>(null);
  const sidebar = useRef<any>(null);

  const storedSidebarExpanded = localStorage.getItem('sidebar-expanded');
  const [sidebarExpanded, setSidebarExpanded] = useState(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === 'true',
  );

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebarOpen ||
        sidebar.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setSidebarOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }: KeyboardEvent) => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  });

  useEffect(() => {
    localStorage.setItem('sidebar-expanded', sidebarExpanded.toString());
    if (sidebarExpanded) {
      document.querySelector('body')?.classList.add('sidebar-expanded');
    } else {
      document.querySelector('body')?.classList.remove('sidebar-expanded');
    }
  }, [sidebarExpanded]);

  return (
    <aside
      ref={sidebar}
      className={`absolute left-0 top-0 z-9999 flex h-screen w-72.5 flex-col overflow-y-hidden bg-black duration-300 ease-linear dark:bg-boxdark lg:static lg:translate-x-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
        {/* <!-- Sidebar Menu --> */}
        <nav className="mt-5 py-4 px-4 lg:mt-9 lg:px-6">
          {/* <!-- Menu Group --> */}
          <div>
            <h3 className="mb-4 ml-4 text-sm font-semibold text-bodydark2">
              MENU
            </h3>

            {role === 'litigant' && (
              <ul className="mb-6 flex flex-col gap-1.5">
                <li>
                  <NavLink
                    to="/dashboard/LitigantHome"
                    className={({ isActive }) =>
                      `group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out ${
                        isActive ? 'bg-graydark dark:bg-meta-4' : ''
                      } hover:bg-graydark dark:hover:bg-meta-4`
                    }
                  >
                    <svg
                      className="fill-current"
                      width="18"
                      height="18"
                      viewBox="0 0 18 18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M6.10322 0.956299H2.53135C1.5751 0.956299 0.787598 1.7438 0.787598 2.70005V6.27192C0.787598 7.22817 1.5751 8.01567 2.53135 8.01567H6.10322C7.05947 8.01567 7.84697 7.22817 7.84697 6.27192V2.72817C7.8751 1.7438 7.0876 0.956299 6.10322 0.956299ZM6.60947 6.30005C6.60947 6.5813 6.38447 6.8063 6.10322 6.8063H2.53135C2.2501 6.8063 2.0251 6.5813 2.0251 6.30005V2.72817C2.0251 2.44692 2.2501 2.22192 2.53135 2.22192H6.10322C6.38447 2.22192 6.60947 2.44692 6.60947 2.72817V6.30005Z"
                        fill=""
                      />
                      <path
                        d="M15.4689 0.956299H11.8971C10.9408 0.956299 10.1533 1.7438 10.1533 2.70005V6.27192C10.1533 7.22817 10.9408 8.01567 11.8971 8.01567H15.4689C16.4252 8.01567 17.2127 7.22817 17.2127 6.27192V2.72817C17.2127 1.7438 16.4252 0.956299 15.4689 0.956299ZM15.9752 6.30005C15.9752 6.5813 15.7502 6.8063 15.4689 6.8063H11.8971C11.6158 6.8063 11.3908 6.5813 11.3908 6.30005V2.72817C11.3908 2.44692 11.6158 2.22192 11.8971 2.22192H15.4689C15.7502 2.22192 15.9752 2.44692 15.9752 2.72817V6.30005Z"
                        fill=""
                      />
                      <path
                        d="M6.10322 9.92822H2.53135C1.5751 9.92822 0.787598 10.7157 0.787598 11.672V15.2438C0.787598 16.2001 1.5751 16.9876 2.53135 16.9876H6.10322C7.05947 16.9876 7.84697 16.2001 7.84697 15.2438V11.7001C7.8751 10.7157 7.0876 9.92822 6.10322 9.92822ZM6.60947 15.272C6.60947 15.5532 6.38447 15.7782 6.10322 15.7782H2.53135C2.2501 15.7782 2.0251 15.5532 2.0251 15.272V11.7001C2.0251 11.4188 2.2501 11.1938 2.53135 11.1938H6.10322C6.38447 11.1938 6.60947 11.4188 6.60947 11.7001V15.272Z"
                        fill=""
                      />
                      <path
                        d="M15.4689 9.92822H11.8971C10.9408 9.92822 10.1533 10.7157 10.1533 11.672V15.2438C10.1533 16.2001 10.9408 16.9876 11.8971 16.9876H15.4689C16.4252 16.9876 17.2127 16.2001 17.2127 15.2438V11.7001C17.2127 10.7157 16.4252 9.92822 15.4689 9.92822ZM15.9752 15.272C15.9752 15.5532 15.7502 15.7782 15.4689 15.7782H11.8971C11.6158 15.7782 11.3908 15.5532 11.3908 15.272V11.7001C11.3908 11.4188 11.6158 11.1938 11.8971 11.1938H15.4689C15.7502 11.1938 15.9752 11.4188 15.9752 11.7001V15.272Z"
                        fill=""
                      />
                    </svg>
                    Home
                  </NavLink>
                </li>
                {/* <!-- Menu Item CompleteProfile --> */}
                <li>
                  <NavLink
                    to="/dashboard/CompleteProfile"
                    className={({ isActive }) =>
                      `group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out ${
                        isActive ? 'bg-graydark dark:bg-meta-4' : ''
                      } hover:bg-graydark dark:hover:bg-meta-4`
                    }
                  >
                    <svg
                      className="fill-current"
                      width="22"
                      height="22"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12 2C9.243 2 7 4.243 7 7C7 9.757 9.243 12 12 12C14.757 12 17 9.757 17 7C17 4.243 14.757 2 12 2ZM12 10C10.346 10 9 8.654 9 7C9 5.346 10.346 4 12 4C13.654 4 15 5.346 15 7C15 8.654 13.654 10 12 10Z"
                        fill=""
                      />
                      <path
                        d="M12 14C9.34784 14 6.8043 15.0536 5 16.8787V19C5 19.5523 5.44772 20 6 20H18C18.5523 20 19 19.5523 19 19V16.8787C17.1957 15.0536 14.6522 14 12 14ZM7 18V17.3639C8.47121 16.0334 10.1981 15.3333 12 15.3333C13.8019 15.3333 15.5288 16.0334 17 17.3639V18H7Z"
                        fill=""
                      />
                    </svg>
                    Complete Profile
                  </NavLink>
                </li>

                {/* <!-- Menu Item AddCase --> */}

                <li>
                  <NavLink
                    to="/dashboard/addCase"
                    className={({ isActive }) =>
                      `group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out ${
                        isActive ? 'bg-graydark dark:bg-meta-4' : ''
                      } hover:bg-graydark dark:hover:bg-meta-4`
                    }
                  >
                    <svg
                      className="fill-current"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M20 4H18V2H6v2H4C2.9 2 2 2.9 2 4v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zM20 20H4V8h16v12zm-10-5h2v-2h2v-2h-2v-2h-2v2h-2v2h2v2z"
                        fill="currentColor"
                      />
                    </svg>
                    Add Case
                  </NavLink>
                </li>

                {/* <!-- Menu Item viewCase --> */}
                <li>
                  <NavLink
                    to="/dashboard/viewCase"
                    className={({ isActive }) =>
                      `group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out ${
                        isActive ? 'bg-graydark dark:bg-meta-4' : ''
                      } hover:bg-graydark dark:hover:bg-meta-4`
                    }
                  >
                    <svg
                      className="fill-current"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12 4.5C6.48 4.5 2 12 2 12s4.48 7.5 10 7.5 10-7.5 10-7.5-4.48-7.5-10-7.5zm0 12c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z"
                        fill="currentColor"
                      />
                    </svg>
                    View Cases
                  </NavLink>
                </li>

                {/* <!-- Menu Item FindAdvocate --> */}
                <li>
                  <NavLink
                    to="/dashboard/FindAdvocates"
                    className={({ isActive }) =>
                      `group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out ${
                        isActive ? 'bg-graydark dark:bg-meta-4' : ''
                      } hover:bg-graydark dark:hover:bg-meta-4`
                    }
                  >
                    <svg
                      className="fill-current"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M20.707 13.293a1 1 0 00-1.414 0l-5.086 5.086-1.414-1.414 5.086-5.086a1 1 0 10-1.414-1.414l-5.086 5.086-4.243-4.243 5.086-5.086a1 1 0 10-1.414-1.414L7.414 9.414 6 8 10.586 3.414a2 2 0 112.828 2.828L11.414 8l4.586 4.586a2 2 0 112.828 2.828l-2.121 2.121a1 1 0 001.414 1.414l2.121-2.121a2 2 0 000-2.828z"
                        fill="currentColor"
                      />
                      <rect
                        width="20"
                        height="2"
                        x="2"
                        y="20"
                        rx="1"
                        fill="currentColor"
                      />
                    </svg>
                    Find Advocates
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to="/chart"
                    className={({ isActive }) =>
                      `group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out ${
                        isActive ? 'bg-graydark dark:bg-meta-4' : ''
                      } hover:bg-graydark dark:hover:bg-meta-4`
                    }
                  >
                    <svg
                      className="fill-current"
                      width="18"
                      height="19"
                      viewBox="0 0 18 19"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clipPath="url(#clip0_130_9801)">
                        <path
                          d="M10.8563 0.55835C10.5188 0.55835 10.2095 0.8396 10.2095 1.20522V6.83022C10.2095 7.16773 10.4907 7.4771 10.8563 7.4771H16.8751C17.0438 7.4771 17.2126 7.39272 17.3251 7.28022C17.4376 7.1396 17.4938 6.97085 17.4938 6.8021C17.2688 3.28647 14.3438 0.55835 10.8563 0.55835ZM11.4751 6.15522V1.8521C13.8095 2.13335 15.6938 3.8771 16.1438 6.18335H11.4751V6.15522Z"
                          fill=""
                        />
                        <path
                          d="M15.3845 8.7427H9.1126V2.69582C9.1126 2.35832 8.83135 2.07707 8.49385 2.07707C8.40947 2.07707 8.3251 2.07707 8.24072 2.07707C3.96572 2.04895 0.506348 5.53645 0.506348 9.81145C0.506348 14.0864 3.99385 17.5739 8.26885 17.5739C12.5438 17.5739 16.0313 14.0864 16.0313 9.81145C16.0313 9.6427 16.0313 9.47395 16.0032 9.33332C16.0032 8.99582 15.722 8.7427 15.3845 8.7427ZM8.26885 16.3083C4.66885 16.3083 1.77197 13.4114 1.77197 9.81145C1.77197 6.3802 4.47197 3.53957 7.8751 3.3427V9.36145C7.8751 9.69895 8.15635 10.0083 8.52197 10.0083H14.7938C14.6813 13.4958 11.7845 16.3083 8.26885 16.3083Z"
                          fill=""
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_130_9801">
                          <rect
                            width="18"
                            height="18"
                            fill="white"
                            transform="translate(0 0.052124)"
                          />
                        </clipPath>
                      </defs>
                    </svg>
                    Contact Advocate
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to="/chart"
                    className={({ isActive }) =>
                      `group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out ${
                        isActive ? 'bg-graydark dark:bg-meta-4' : ''
                      } hover:bg-graydark dark:hover:bg-meta-4`
                    }
                  >
                    <svg
                      className="fill-current"
                      width="18"
                      height="19"
                      viewBox="0 0 18 19"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M9 1.5C6.23858 1.5 4 3.73858 4 6.5V8.92439C4 10.1439 3.625 11.1879 2.875 12.0146L2.10765 12.8559C1.42016 13.6387 1.9137 14.75 2.94491 14.75H15.0551C16.0863 14.75 16.5798 13.6387 15.8924 12.8559L15.125 12.0146C14.375 11.1879 14 10.1439 14 8.92439V6.5C14 3.73858 11.7614 1.5 9 1.5ZM6.81818 15.75C6.81818 16.9926 7.82554 18 9.06818 18C10.3108 18 11.3182 16.9926 11.3182 15.75H6.81818Z"
                        fill="currentColor"
                      />
                    </svg>
                    Notifications
                  </NavLink>
                </li>

                {/* <!-- Menu Item CompleteProfile --> */}
                <li>
                  <NavLink
                    to="/dashboard/preTrial"
                    className={({ isActive }) =>
                      `group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out ${
                        isActive ? 'bg-graydark dark:bg-meta-4' : ''
                      } hover:bg-graydark dark:hover:bg-meta-4`
                    }
                  >
                    <svg
                      className="fill-current"
                      width="18"
                      height="19"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M19 9C19 11.21 17.21 13 15 13H9C6.79 13 5 11.21 5 9V8C5 5.79 6.79 4 9 4H15C17.21 4 19 5.79 19 8V9ZM21 19H18C18 16.79 16.21 15 14 15H10C7.79 15 6 16.79 6 19H3C1.34 19 0 20.34 0 22H24C24 20.34 22.66 19 21 19Z"
                        fill=""
                      />
                    </svg>
                    PreTrial Conferencing
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to="/dashboard/payFees"
                    className={({ isActive }) =>
                      `group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out ${
                        isActive ? 'bg-graydark dark:bg-meta-4' : ''
                      } hover:bg-graydark dark:hover:bg-meta-4`
                    }
                  >
                    <svg
                      className="fill-current"
                      width="18"
                      height="19"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M19 6H5C3.9 6 3 6.9 3 8V20c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zM5 4h14c2.21 0 4 1.79 4 4v12c0 2.21-1.79 4-4 4H5c-2.21 0-4-1.79-4-4V8c0-2.21 1.79-4 4-4zM12 17h6v2h-6v-2zm-8 0h6v2H4v-2z"
                        fill="currentColor"
                      />
                      <path
                        d="M16 10H8c-.55 0-1 .45-1 1s.45 1 1 1h8c.55 0 1-.45 1-1s-.45-1-1-1z"
                        fill="currentColor"
                      />
                    </svg>
                    Pay Fees
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to="/dashboard/feedbackAdvocate"
                    className={({ isActive }) =>
                      `group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out ${
                        isActive ? 'bg-graydark dark:bg-meta-4' : ''
                      } hover:bg-graydark dark:hover:bg-meta-4`
                    }
                  >
                    {/* New Feedback Icon */}
                    <svg
                      className="fill-current"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12 3C6.48 3 2 6.99 2 12c0 2.71 1.13 5.16 3 6.93V21c0 .4.24.76.61.92.13.05.27.08.4.08.26 0 .52-.1.71-.29L9.83 18.5c.69.13 1.4.2 2.17.2 5.52 0 10-3.99 10-9s-4.48-9-10-9zm-3 11h6c.55 0 1-.45 1-1s-.45-1-1-1H9c-.55 0-1 .45-1 1s.45 1 1 1zm0-4h6c.55 0 1-.45 1-1s-.45-1-1-1H9c-.55 0-1 .45-1 1s.45 1 1 1z"
                        fill="currentColor"
                      />
                    </svg>
                    FeedBack Advocates
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to="/auth/signin"
                    className={({ isActive }) =>
                      `group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out ${
                        isActive ? 'bg-graydark dark:bg-meta-4' : ''
                      } hover:bg-graydark dark:hover:bg-meta-4`
                    }
                  >
                    <svg
                      className="fill-current"
                      width="22"
                      height="22"
                      viewBox="0 0 22 22"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M15.5375 0.618744H11.6531C10.7594 0.618744 10.0031 1.37499 10.0031 2.26874V4.64062C10.0031 5.05312 10.3469 5.39687 10.7594 5.39687C11.1719 5.39687 11.55 5.05312 11.55 4.64062V2.23437C11.55 2.16562 11.5844 2.13124 11.6531 2.13124H15.5375C16.3625 2.13124 17.0156 2.78437 17.0156 3.60937V18.3562C17.0156 19.1812 16.3625 19.8344 15.5375 19.8344H11.6531C11.5844 19.8344 11.55 19.8 11.55 19.7312V17.3594C11.55 16.9469 11.2062 16.6031 10.7594 16.6031C10.3125 16.6031 10.0031 16.9469 10.0031 17.3594V19.7312C10.0031 20.625 10.7594 21.3812 11.6531 21.3812H15.5375C17.2219 21.3812 18.5625 20.0062 18.5625 18.3562V3.64374C18.5625 1.95937 17.1875 0.618744 15.5375 0.618744Z"
                        fill=""
                      />
                      <path
                        d="M6.05001 11.7563H12.2031C12.6156 11.7563 12.9594 11.4125 12.9594 11C12.9594 10.5875 12.6156 10.2438 12.2031 10.2438H6.08439L8.21564 8.07813C8.52501 7.76875 8.52501 7.2875 8.21564 6.97812C7.90626 6.66875 7.42501 6.66875 7.11564 6.97812L3.67814 10.4844C3.36876 10.7938 3.36876 11.275 3.67814 11.5844L7.11564 15.0906C7.25314 15.2281 7.45939 15.3312 7.66564 15.3312C7.87189 15.3312 8.04376 15.2625 8.21564 15.125C8.52501 14.8156 8.52501 14.3344 8.21564 14.025L6.05001 11.7563Z"
                        fill=""
                      />
                    </svg>
                    Log Out
                  </NavLink>
                </li>
              </ul>
            )}

            {role === 'advocate' && (
              <ul className="mb-6 flex flex-col gap-1.5">
                <li>
                  <NavLink
                    to="/dashboard/AdvocateCompleteProfile"
                    className={({ isActive }) =>
                      `group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out ${
                        isActive ? 'bg-graydark dark:bg-meta-4' : ''
                      } hover:bg-graydark dark:hover:bg-meta-4`
                    }
                  >
                    <svg
                      className="fill-current"
                      width="22"
                      height="22"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12 2C9.243 2 7 4.243 7 7C7 9.757 9.243 12 12 12C14.757 12 17 9.757 17 7C17 4.243 14.757 2 12 2ZM12 10C10.346 10 9 8.654 9 7C9 5.346 10.346 4 12 4C13.654 4 15 5.346 15 7C15 8.654 13.654 10 12 10Z"
                        fill=""
                      />
                      <path
                        d="M12 14C9.34784 14 6.8043 15.0536 5 16.8787V19C5 19.5523 5.44772 20 6 20H18C18.5523 20 19 19.5523 19 19V16.8787C17.1957 15.0536 14.6522 14 12 14ZM7 18V17.3639C8.47121 16.0334 10.1981 15.3333 12 15.3333C13.8019 15.3333 15.5288 16.0334 17 17.3639V18H7Z"
                        fill=""
                      />
                    </svg>
                    Complete Profile
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to="/dashboard/requestedCases"
                    className={({ isActive }) =>
                      `group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out ${
                        isActive ? 'bg-graydark dark:bg-meta-4' : ''
                      } hover:bg-graydark dark:hover:bg-meta-4`
                    }
                  >
                    <svg
                      className="fill-current"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M20 4H4C2.9 4 2 4.9 2 6v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 2v.01L12 13 4 6.01V6h16zM4 18V8.74l7.29 6.54a1 1 0 0 0 1.42 0L20 8.74V18H4z"
                        fill="currentColor"
                      />
                      <circle cx="19" cy="7" r="3" fill="currentColor" />
                    </svg>
                    Requested Cases
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to="/dashboard/ViewMyAcceptedCases"
                    className={({ isActive }) =>
                      `group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out ${
                        isActive ? 'bg-graydark dark:bg-meta-4' : ''
                      } hover:bg-graydark dark:hover:bg-meta-4`
                    }
                  >
                    <svg
                      className="fill-current"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M10 4H4C2.9 4 2 4.9 2 6v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z"
                        fill="currentColor"
                      />
                    </svg>
                    View My Cases
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to="/chart"
                    className={({ isActive }) =>
                      `group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out ${
                        isActive ? 'bg-graydark dark:bg-meta-4' : ''
                      } hover:bg-graydark dark:hover:bg-meta-4`
                    }
                  >
                    <svg
                      className="fill-current"
                      width="18"
                      height="19"
                      viewBox="0 0 18 19"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M9 1.5C6.23858 1.5 4 3.73858 4 6.5V8.92439C4 10.1439 3.625 11.1879 2.875 12.0146L2.10765 12.8559C1.42016 13.6387 1.9137 14.75 2.94491 14.75H15.0551C16.0863 14.75 16.5798 13.6387 15.8924 12.8559L15.125 12.0146C14.375 11.1879 14 10.1439 14 8.92439V6.5C14 3.73858 11.7614 1.5 9 1.5ZM6.81818 15.75C6.81818 16.9926 7.82554 18 9.06818 18C10.3108 18 11.3182 16.9926 11.3182 15.75H6.81818Z"
                        fill="currentColor"
                      />
                    </svg>
                    Notifications
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to="/dashboard/preTrial"
                    className={({ isActive }) =>
                      `group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out ${
                        isActive ? 'bg-graydark dark:bg-meta-4' : ''
                      } hover:bg-graydark dark:hover:bg-meta-4`
                    }
                  >
                    <svg
                      className="fill-current"
                      width="18"
                      height="19"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M19 9C19 11.21 17.21 13 15 13H9C6.79 13 5 11.21 5 9V8C5 5.79 6.79 4 9 4H15C17.21 4 19 5.79 19 8V9ZM21 19H18C18 16.79 16.21 15 14 15H10C7.79 15 6 16.79 6 19H3C1.34 19 0 20.34 0 22H24C24 20.34 22.66 19 21 19Z"
                        fill=""
                      />
                    </svg>
                    PreTrial Conferencing
                  </NavLink>
                </li>
              </ul>
            )}
          </div>

          <ul className="mb-6 flex flex-col gap-1.5">
            {/* <!-- Menu Item Auth Pages --> */}
            <SidebarLinkGroup
              activeCondition={
                pathname === '/auth' || pathname.includes('auth')
              }
            >
              {(handleClick, open) => {
                return (
                  <React.Fragment>
                    <NavLink
                      to="#"
                      className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                        (pathname === '/auth' || pathname.includes('auth')) &&
                        'bg-graydark dark:bg-meta-4'
                      }`}
                      onClick={(e) => {
                        e.preventDefault();
                        sidebarExpanded
                          ? handleClick()
                          : setSidebarExpanded(true);
                      }}
                    >
                      <svg
                        className="fill-current"
                        width="18"
                        height="19"
                        viewBox="0 0 18 19"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g clipPath="url(#clip0_130_9814)">
                          <path
                            d="M12.7127 0.55835H9.53457C8.80332 0.55835 8.18457 1.1771 8.18457 1.90835V3.84897C8.18457 4.18647 8.46582 4.46772 8.80332 4.46772C9.14082 4.46772 9.45019 4.18647 9.45019 3.84897V1.88022C9.45019 1.82397 9.47832 1.79585 9.53457 1.79585H12.7127C13.3877 1.79585 13.9221 2.33022 13.9221 3.00522V15.0709C13.9221 15.7459 13.3877 16.2802 12.7127 16.2802H9.53457C9.47832 16.2802 9.45019 16.2521 9.45019 16.1959V14.2552C9.45019 13.9177 9.16894 13.6365 8.80332 13.6365C8.43769 13.6365 8.18457 13.9177 8.18457 14.2552V16.1959C8.18457 16.9271 8.80332 17.5459 9.53457 17.5459H12.7127C14.0908 17.5459 15.1877 16.4209 15.1877 15.0709V3.03335C15.1877 1.65522 14.0627 0.55835 12.7127 0.55835Z"
                            fill=""
                          />
                          <path
                            d="M10.4346 8.60205L7.62207 5.7333C7.36895 5.48018 6.97519 5.48018 6.72207 5.7333C6.46895 5.98643 6.46895 6.38018 6.72207 6.6333L8.46582 8.40518H3.45957C3.12207 8.40518 2.84082 8.68643 2.84082 9.02393C2.84082 9.36143 3.12207 9.64268 3.45957 9.64268H8.49395L6.72207 11.4427C6.46895 11.6958 6.46895 12.0896 6.72207 12.3427C6.83457 12.4552 7.00332 12.5114 7.17207 12.5114C7.34082 12.5114 7.50957 12.4552 7.62207 12.3145L10.4346 9.4458C10.6877 9.24893 10.6877 8.85518 10.4346 8.60205Z"
                            fill=""
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_130_9814">
                            <rect
                              width="18"
                              height="18"
                              fill="white"
                              transform="translate(0 0.052124)"
                            />
                          </clipPath>
                        </defs>
                      </svg>
                      Authentication
                      <svg
                        className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current ${
                          open && 'rotate-180'
                        }`}
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M4.41107 6.9107C4.73651 6.58527 5.26414 6.58527 5.58958 6.9107L10.0003 11.3214L14.4111 6.91071C14.7365 6.58527 15.2641 6.58527 15.5896 6.91071C15.915 7.23614 15.915 7.76378 15.5896 8.08922L10.5896 13.0892C10.2641 13.4147 9.73651 13.4147 9.41107 13.0892L4.41107 8.08922C4.08563 7.76378 4.08563 7.23614 4.41107 6.9107Z"
                          fill=""
                        />
                      </svg>
                    </NavLink>
                    {/* <!-- Dropdown Menu Start --> */}
                    <div
                      className={`translate transform overflow-hidden ${
                        !open && 'hidden'
                      }`}
                    >
                      <ul className="mt-4 mb-5.5 flex flex-col gap-2.5 pl-6">
                        <li>
                          <NavLink
                            to="/auth/signin"
                            className={({ isActive }) =>
                              'group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ' +
                              (isActive && '!text-white')
                            }
                          >
                            Sign In
                          </NavLink>
                        </li>
                        <li>
                          <NavLink
                            to="/auth/signup"
                            className={({ isActive }) =>
                              'group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ' +
                              (isActive && '!text-white')
                            }
                          >
                            Sign Up
                          </NavLink>
                        </li>
                      </ul>
                    </div>
                    {/* <!-- Dropdown Menu End --> */}
                  </React.Fragment>
                );
              }}
            </SidebarLinkGroup>
            {/* <!-- Menu Item Auth Pages --> */}
          </ul>
        </nav>
        {/* <!-- Sidebar Menu --> */}
      </div>
    </aside>
  );
};

export default Sidebar;

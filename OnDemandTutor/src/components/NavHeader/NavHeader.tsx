import { useMutation } from '@tanstack/react-query';
import { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authApi } from '../../api/auth.api';
import { path } from '../../constant/path';
import { AppContext } from '../../context/app.context';
import { clearLS, getProfileFromLS } from '../../utils/auth';
import userImage from '../../assets/img/user.svg';
import Popover from '../Popover/Popover';

export default function NavHeader() {
  const { isAuthenticated, setIsAuthenticated, refreshToken, profile, setProfile } = useContext(AppContext);
  const navigate = useNavigate();
  const user = getProfileFromLS();

  useEffect(() => {
    const profile = localStorage.getItem('profile');
    const access_token = localStorage.getItem('access_token');
    const refresh_token = localStorage.getItem('refresh_token');

    if (profile && access_token && refresh_token) {
      const user = JSON.parse(profile);
      setProfile(user);
      setIsAuthenticated(true);
    }
  }, [setIsAuthenticated, setProfile]);

  const logoutMutation = useMutation({
    mutationFn: (body:any) => authApi.logoutAccount(body)
  });

  const handleLogout = () => {
    logoutMutation.mutate(
      { refresh_token: refreshToken },
      {
        onSuccess: () => {
          navigate(path.login);
          clearLS();
          setProfile(null);
          setIsAuthenticated(false);
        }
      }
    );
  };

  return (
    <div className='container'>
      <div className='flex justify-end gap-5'>
        {isAuthenticated && (
          <div className='flex justify-center text-center'>
            {user && (user.roles === 'admin' || user.roles === 'Mod') ? (
              <div>
                <Link to={user.roles === 'admin' ? path.Admin.admin : path.Moderator.mod}>
                  <button className='btn btn-primary shadow-md rounded-md p-3 hover:bg-pink-500'>
                    {user.roles === 'admin' ? 'Admin' : 'Mod'}
                  </button>
                </Link>
              </div>
            ) : (
              <div>
                <div>Số dư: {user.accountBalance !== null ? user.accountBalance : 0} VNĐ</div>
              </div>
            )}
          </div>
        )}
        {isAuthenticated && (
          <Popover
            className='flex items-center  hover:text-pink-400 cursor-pointer'
            renderPopover={
              <div className='shadow-md rounded-sm border border-gray-200'>
                <Link
                  to={path.user}
                  className='block py-3 px-4 hover:bg-slate-100 bg-white hover:text-cyan-500 w-full text-left'
                >
                  Tài khoản của tôi
                </Link>
                <Link
                  to='/'
                  className='block py-3 px-4 hover:bg-slate-100 bg-white hover:text-cyan-500 w-full text-left'
                >
                  Đơn Mua
                </Link>
<Link
                  to='/deposit'
                  className='block py-3 px-4 hover:bg-slate-100 bg-white hover:text-cyan-500 w-full text-left'
                >
                  Nạp tiền
                </Link>
                {profile?.roles === 'Dieu hanh vien' && (
                  <Link
                    to={path.Moderator.mod}
                    className='block py-3 px-4 hover:bg-slate-100 bg-white hover:text-cyan-500 w-full text-left'
                  >
                    thông báo
                  </Link>
                )}
                <Link
                  to={path.studentViewRequestList}
                  className='block py-3 px-4 hover:bg-slate-100 bg-white hover:text-cyan-500 w-full text-left'
                >
                  Xem đơn của bạn(Học Sinh)
                </Link>
                <Link
                  to={path.home}
                  className='block py-3 px-4 hover:bg-slate-100 bg-white hover:text-cyan-500 w-full text-left'
                >
                  Xem đơn của bạn(Tutor)
                </Link>
                <button
                  onClick={handleLogout}
                  className='block py-3 px-4 hover:bg-slate-100 bg-white hover:text-cyan-500 w-full text-left'
                >
                  Đăng xuất
                </button>
              </div>
            }
          >
            <div className='w-5 h-5 mr-2 flex-shink-0'>
              <img
                src={profile?.avatar ? profile.avatar : userImage}
                alt='avatar'
                className='h-full w-full rounded-full object-cover'
              />
            </div>
            <div className='text-black hover:text-pink-400'>
              {profile?.fullName}
            </div>
          </Popover>
        )}
        {!isAuthenticated && (
          <div className='flex items-center ml-[2rem]'>
            <Link
              to={path.login}
              className='transition duration-150 ease-in-out border-black border-2 px-2 py-2 rounded-lg hover:bg-gray-200 mr-1 '
            >
              Đăng Nhập
            </Link>
            <div className='border-r-[1px] border-r-white/40 h-4' />
            <Link
              to={path.register}
              className='bg-pink-500 border-black border-2 px-2 py-2 rounded-lg hover:bg-pink-400'
            >
              Đăng kí
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
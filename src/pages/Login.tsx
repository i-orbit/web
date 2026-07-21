import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginWithConflictRetry } from '@/services/auth';
import loginBg from '@/assets/images/login3.jpg';
import logo from '@/assets/images/logo.png';

interface FormErrors {
  loginName?: string;
  password?: string;
}

export default function Login() {
  const navigate = useNavigate();

  const [loginName, setLoginName] = useState('');
  const [password, setPassword] = useState('');
  const [captcha, setCaptcha] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [serverError, setServerError] = useState('');

  function validate(): FormErrors {
    const errs: FormErrors = {};
    if (!loginName.trim()) {
      errs.loginName = '请输入用户名';
    }
    if (!password) {
      errs.password = '请输入密码';
    }
    return errs;
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setServerError('');

    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});

    setLoading(true);
    try {
      await loginWithConflictRetry({
        loginName: loginName.trim(),
        password,
        platform: 'WEB',
        forcedReplacement: 0,
        rememberMe: rememberMe ? 1 : 0,
      });
      navigate('/', { replace: true });
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } }; message?: string };
      setServerError(err?.response?.data?.message || err?.message || '登录失败，请重试');
    } finally {
      setLoading(false);
    }
  }

  const inputClass = (field: keyof FormErrors) =>
      `w-full rounded-xl border bg-white px-4 py-3 text-sm outline-none transition-all duration-200 ${
          errors[field]
              ? 'border-red-300 bg-red-50/30 focus:border-red-400 focus:ring-4 focus:ring-red-50'
              : 'border-gray-200 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-50 hover:border-gray-300'
      }`;

  return (
      <div className="flex h-screen overflow-hidden">
        {/* Left — Brand panel */}
        <div className="relative hidden w-[42%] lg:flex flex-col justify-between overflow-hidden select-none">
          <img
              src={loginBg}
              alt=""
              className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/85 via-indigo-800/70 to-slate-900/80" />

          {/* Top logo */}
          <div className="relative mx-14 mt-14 flex items-center gap-3.5">
            <img src={logo} alt="Orbit" className="h-12 w-12 object-contain" />
            <span className="text-3xl font-extrabold tracking-wider text-white/90">ORBIT</span>
          </div>

          {/* Center brand text */}
          <div className="relative mb-20 px-14">
            <h1 className="text-[2.65rem] font-bold leading-tight tracking-tight text-white">
              连接万物
              <br />
              智驭未来
            </h1>
            <p className="mt-6 max-w-sm text-[15px] leading-relaxed text-indigo-100/90">
              一站式智慧互联运营管理系统，以数据为纽带、以智能为引擎，助力企业构建全域数字化运营体系，实现业务协同与高效决策。
            </p>

            {/* Decorative dots */}
            <div className="mt-10 flex gap-3">
              <div className="h-1.5 w-8 rounded-full bg-white/60" />
              <div className="h-1.5 w-1.5 rounded-full bg-white/30" />
              <div className="h-1.5 w-1.5 rounded-full bg-white/30" />
            </div>
          </div>

          {/* Bottom subtle gradient bar */}
          <div className="relative h-1 w-full bg-gradient-to-r from-indigo-400/40 via-white/20 to-transparent" />
        </div>

        {/* Right — Form panel */}
        <div className="flex w-full items-center justify-center bg-gradient-to-br from-slate-50 via-white to-indigo-50/30 px-6 lg:w-[58%]">
          {/* Background decorative blobs */}
          <div className="pointer-events-none absolute right-[20%] top-[10%] h-64 w-64 rounded-full bg-indigo-100/40 blur-3xl" />
          <div className="pointer-events-none absolute right-[40%] bottom-[15%] h-48 w-48 rounded-full bg-amber-50/60 blur-3xl" />

          <div className="relative w-full max-w-140">
            {/* Form card */}
            <div className="rounded-2xl bg-white p-8 shadow-[0_8px_40px_rgb(0,0,0,0.07)] ring-1 ring-gray-900/5 select-none">
              {/* Header */}
              <div className="mb-8">
                <div className="inline-flex items-center gap-2 rounded-full bg-indigo-50 px-4 py-1.5 text-xs font-medium text-indigo-600">
                  <span className="inline-block h-1.5 w-1.5 rounded-full bg-indigo-500" />
                  欢迎回来
                </div>
                <h2 className="mt-4 text-3xl font-bold tracking-tight text-gray-900">账号登录</h2>
                <p className="mt-2 text-sm leading-relaxed text-gray-500">
                  请输入您的账号信息以继续访问系统
                </p>
              </div>

              {/* Server error */}
              {serverError && (
                  <div className="mb-6 flex items-center gap-3 rounded-2xl border border-red-100 bg-red-50/80 px-5 py-3.5 text-sm text-red-700 backdrop-blur">
                    <svg className="h-5 w-5 shrink-0 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M12 3l9.66 16.5H2.34L12 3z" />
                    </svg>
                    <span>{serverError}</span>
                  </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                {/* Username */}
                <div>
                  <label htmlFor="loginName" className="mb-2 block text-sm font-medium text-gray-700">
                    用户名
                  </label>
                  <div className="relative">
                    <svg
                        className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                      <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                    <input
                        id="loginName"
                        type="text"
                        value={loginName}
                        onChange={(e) => setLoginName(e.target.value)}
                        className={`${inputClass('loginName')} pl-11`}
                        placeholder="请输入用户名"
                        autoComplete="username"
                    />
                  </div>
                  {errors.loginName && (
                      <p className="mt-1.5 text-xs text-red-500">{errors.loginName}</p>
                  )}
                </div>

                {/* Password */}
                <div>
                  <label htmlFor="password" className="mb-2 block text-sm font-medium text-gray-700">
                    密码
                  </label>
                  <div className="relative">
                    <svg
                        className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                      <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                      />
                    </svg>
                    <input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className={`${inputClass('password')} pl-11`}
                        placeholder="请输入密码"
                        autoComplete="current-password"
                    />
                  </div>
                  {errors.password && (
                      <p className="mt-1.5 text-xs text-red-500">{errors.password}</p>
                  )}
                </div>

                {/* Captcha */}
                <div>
                  <label htmlFor="captcha" className="mb-2 block text-sm font-medium text-gray-700">
                    验证码
                  </label>
                  <div className="flex gap-3">
                    <div className="relative flex-1">
                      <svg
                          className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                      >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                        />
                      </svg>
                      <input
                          id="captcha"
                          type="text"
                          value={captcha}
                          onChange={(e) => setCaptcha(e.target.value)}
                          className={`${inputClass('loginName')} pl-11`}
                          placeholder="请输入验证码"
                          maxLength={6}
                      />
                    </div>
                    <div className="flex h-[46px] w-[120px] items-center justify-center rounded-xl border border-dashed border-gray-200 bg-gray-50 text-xs text-gray-400">
                      验证码图片
                    </div>
                    <button
                        type="button"
                        className="shrink-0 text-sm font-medium text-indigo-600 transition-colors hover:text-indigo-500 cursor-pointer"
                    >
                      刷新
                    </button>
                  </div>
                </div>

                {/* Remember me */}
                <div className="flex items-center justify-between pt-1">
                  <label className="flex items-center gap-2.5 cursor-pointer">
                    <input
                        type="checkbox"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                        className="h-4 w-4 rounded-md border-gray-300 text-indigo-600 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-0"
                    />
                    <span className="text-sm text-gray-600">记住我</span>
                  </label>
                </div>

                {/* Submit */}
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full cursor-pointer rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-500 px-5 py-3 text-sm font-semibold text-white shadow-[0_4px_14px_rgba(79,70,229,0.3)] transition-all duration-200 hover:shadow-[0_6px_20px_rgba(79,70,229,0.4)] hover:-translate-y-0.5 active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0 disabled:hover:shadow-[0_4px_14px_rgba(79,70,229,0.3)]"
                >
                  {loading ? (
                      <span className="inline-flex items-center gap-2">
                    <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                      <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                      />
                      <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                      />
                    </svg>
                    登录中...
                  </span>
                  ) : (
                      '登 录'
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
  );
}

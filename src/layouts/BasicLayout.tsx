import { useState } from 'react';
import { Outlet, NavLink } from 'react-router-dom';

const NAV_ITEMS = [
  { to: '/', label: 'Dashboard', icon: '📊' },
];

export default function BasicLayout() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside
        className={`flex flex-col bg-slate-800 text-slate-300 transition-all duration-300 ${
          collapsed ? 'w-16' : 'w-56'
        }`}
      >
        <div className="flex h-14 items-center justify-between px-4 border-b border-slate-700">
          {!collapsed && <span className="text-lg font-bold text-white">Orbit</span>}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="text-slate-400 hover:text-white cursor-pointer"
          >
            {collapsed ? '▶' : '◀'}
          </button>
        </div>
        <nav className="flex-1 p-2">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-md mb-1 transition-colors ${
                  isActive
                    ? 'bg-indigo-600 text-white'
                    : 'text-slate-300 hover:bg-slate-700 hover:text-white'
                }`
              }
            >
              <span className="text-lg">{item.icon}</span>
              {!collapsed && <span>{item.label}</span>}
            </NavLink>
          ))}
        </nav>
      </aside>

      {/* Main */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Header */}
        <header className="flex h-14 items-center justify-between bg-white px-6 shadow-sm border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800">Orbit Admin</h2>
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-500">admin</span>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

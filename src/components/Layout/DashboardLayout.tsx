import { ReactNode, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import {
  LogOut,
  Menu,
  X,
  Drill,
  Factory,
  ClipboardCheck,
  ShoppingCart,
  BarChart3,
  Users,
  Bell,
  Settings,
  Truck,
  Clock,
  Camera,
  Package,
  Fuel,
  Shield,
  ChevronDown,
  ChevronRight,
  Home,
  FileText,
  List,
  Wallet,
  Zap,
  LucideIcon
} from 'lucide-react';

interface DashboardLayoutProps {
  children: ReactNode;
}

interface MenuItem {
  name: string;
  icon: LucideIcon;
  href?: string;
  roles: string[];
  children?: MenuItem[];
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const { user, signOut } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [expandedMenus, setExpandedMenus] = useState<string[]>([]);

  const navigation: MenuItem[] = user?.role === 'director' ? [
    { name: 'Dashboard', icon: Home, href: '#dashboard', roles: ['director'] },
    {
      name: 'Operations',
      icon: Factory,
      roles: ['director'],
      children: [
        { name: 'Drilling', icon: Drill, href: '#drilling', roles: ['director'] },
        { name: 'Blasting', icon: Factory, href: '#blasting', roles: ['director'] },
        { name: 'Breaking/Loading', icon: ClipboardCheck, href: '#loading', roles: ['director'] },
        { name: 'Transport', icon: Truck, href: '#transport', roles: ['director'] },
        { name: 'JCB Operations', icon: Truck, href: '#jcb-operations', roles: ['director'] },
      ]
    },
    {
      name: 'Workforce',
      icon: Users,
      roles: ['director'],
      children: [
        { name: 'Attendance', icon: Clock, href: '#attendance', roles: ['director'] },
        { name: 'Photos/Videos', icon: Camera, href: '#media', roles: ['director'] },
      ]
    },
    {
      name: 'Resources',
      icon: Package,
      roles: ['director'],
      children: [
        { name: 'Inventory', icon: Package, href: '#inventory', roles: ['director'] },
        { name: 'Fuel', icon: Fuel, href: '#fuel', roles: ['director'] },
        { name: 'Safety', icon: Shield, href: '#safety', roles: ['director'] },
      ]
    },
    {
      name: 'Crusher Production',
      icon: Factory,
      href: '#crusher-production',
      roles: ['director', 'crusher_manager', 'manager']
    },
    {
      name: 'EB Reports',
      icon: Zap,
      href: '#eb-reports',
      roles: ['director', 'crusher_manager', 'manager']
    },
    {
      name: 'Sales & Customers',
      icon: ShoppingCart,
      roles: ['director'],
      children: [
        { name: 'Sales', icon: ShoppingCart, href: '#sales', roles: ['director'] },
        { name: 'Customers', icon: Users, href: '#customers', roles: ['director'] },
      ]
    },
    {
      name: 'Permits',
      icon: FileText,
      roles: ['director'],
      children: [
        { name: 'New Permit', icon: FileText, href: '#new-permit', roles: ['director'] }
      ]
    },
    { name: 'Accounts', icon: Wallet, href: '#accounts', roles: ['director'] },
    { name: 'Dispatch List', icon: List, href: '#dispatch-payment', roles: ['director'] },
    { name: 'Stock Management', icon: Package, href: '#stock-management', roles: ['director'] },
    { name: 'User Management', icon: Users, href: '#user-management', roles: ['director'] },
    { name: 'Reports', icon: BarChart3, href: '#reports', roles: ['director'] },
  ] : [
    { name: 'Dashboard', icon: BarChart3, href: '#dashboard', roles: ['contractor', 'crusher_manager', 'manager', 'sales'] },
    { name: 'Drilling', icon: Drill, href: '#drilling', roles: ['contractor', 'manager'] },
    { name: 'Blasting', icon: Factory, href: '#blasting', roles: ['contractor', 'manager'] },
    { name: 'Breaking/Loading', icon: ClipboardCheck, href: '#loading', roles: ['contractor', 'manager'] },
    { name: 'Transport', icon: Truck, href: '#transport', roles: ['contractor', 'manager'] },
    { name: 'Attendance', icon: Clock, href: '#attendance', roles: ['contractor', 'manager'] },
    { name: 'Photos/Videos', icon: Camera, href: '#media', roles: ['contractor', 'manager'] },
    { name: 'Inventory', icon: Package, href: '#inventory', roles: ['contractor', 'manager'] },
    { name: 'Fuel', icon: Fuel, href: '#fuel', roles: ['contractor', 'manager'] },
    { name: 'Safety', icon: Shield, href: '#safety', roles: ['contractor', 'manager'] },
    {
      name: 'Crusher Production',
      icon: Factory,
      href: '#crusher-production',
      roles: ['crusher_manager', 'manager']
    },
    {
      name: 'EB Reports',
      icon: Zap,
      href: '#eb-reports',
      roles: ['crusher_manager', 'manager']
    },
    { name: 'Sales', icon: ShoppingCart, href: '#sales', roles: ['sales', 'manager'] },
    { name: 'Customers', icon: Users, href: '#customers', roles: ['sales', 'manager'] },
    { name: 'Approvals', icon: ClipboardCheck, href: '#approvals', roles: ['manager'] },
    { name: 'Reports', icon: BarChart3, href: '#reports', roles: ['manager'] },
  ];

  const filteredNavigation = navigation.filter(item =>
    user?.role && item.roles.includes(user.role)
  );

  const toggleMenu = (menuName: string) => {
    console.log('Toggling menu:', menuName);
    setExpandedMenus(prev => {
      const newMenus = prev.includes(menuName)
        ? prev.filter(name => name !== menuName)
        : [...prev, menuName];
      console.log('New menu state:', newMenus);
      return newMenus;
    });
  };

  const handleNavigation = (e: React.MouseEvent, href?: string) => {
    e.preventDefault();
    console.log('Navigation clicked:', href);
    if (href) {
      window.location.hash = href;
      setSidebarOpen(false);
    }
  };

  const renderMenuItem = (item: MenuItem, level: number = 0) => {
    const hasChildren = item.children && item.children.length > 0;
    const isExpanded = expandedMenus.includes(item.name);

    if (hasChildren) {
      return (
        <div key={item.name}>
          <button
            onClick={() => toggleMenu(item.name)}
            className={`w-full flex items-center justify-between gap-3 px-4 py-3 text-slate-300 hover:bg-slate-800 hover:text-white rounded-lg transition-colors ${level > 0 ? 'pl-8' : ''
              }`}
          >
            <div className="flex items-center gap-3">
              <item.icon className="w-5 h-5" />
              <span>{item.name}</span>
            </div>
            {isExpanded ? (
              <ChevronDown className="w-4 h-4" />
            ) : (
              <ChevronRight className="w-4 h-4" />
            )}
          </button>
          {isExpanded && (
            <div className="mt-1 space-y-1">
              {item.children?.map(child => renderMenuItem(child, level + 1))}
            </div>
          )}
        </div>
      );
    }

    return (
      <a
        key={item.name}
        href={item.href}
        onClick={(e) => {
          console.log('Link clicked:', item.href);
          handleNavigation(e, item.href);
        }}
        className={`flex items-center gap-3 px-4 py-3 text-slate-300 hover:bg-slate-800 hover:text-white rounded-lg transition-colors ${level > 0 ? 'pl-12' : ''
          }`}
      >
        <item.icon className="w-5 h-5" />
        <span>{item.name}</span>
      </a>
    );
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className={`fixed inset-0 bg-slate-900/50 z-40 lg:hidden ${sidebarOpen ? 'block' : 'hidden'}`} onClick={() => setSidebarOpen(false)} />

      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-slate-900 transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex items-center justify-between h-16 px-6 border-b border-slate-800">
          <h1 className="text-xl font-bold text-white">Quarry ERP</h1>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-white">
            <X className="w-6 h-6" />
          </button>
        </div>

        <nav className="p-4 space-y-1 pb-24 overflow-y-auto h-[calc(100vh-4rem)]">
          {filteredNavigation.map((item) => renderMenuItem(item))}
        </nav>
      </aside>

      <div className="lg:pl-64">
        <header className="sticky top-0 z-30 bg-white border-b border-slate-200">
          <div className="flex items-center justify-between h-16 px-4 lg:px-8">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 text-slate-600 hover:text-slate-900"
            >
              <Menu className="w-6 h-6" />
            </button>

            <div className="flex-1" />

            <div className="flex items-center gap-4">
              <button className="relative p-2 text-slate-600 hover:text-slate-900">
                <Bell className="w-6 h-6" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
              </button>
              <button className="p-2 text-slate-600 hover:text-slate-900">
                <Settings className="w-6 h-6" />
              </button>

              <div className="h-8 w-px bg-slate-200" />

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-white font-semibold">
                  {user?.full_name?.charAt(0).toUpperCase()}
                </div>
                <div className="hidden md:block">
                  <p className="text-sm font-medium text-slate-900">{user?.full_name}</p>
                  <p className="text-xs text-slate-600 capitalize">{user?.role?.replace('_', ' ')}</p>
                </div>
              </div>

              <button
                onClick={signOut}
                className="flex items-center gap-2 px-4 py-2 text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden md:inline">Sign Out</span>
              </button>
            </div>
          </div>
        </header>

        <main className="p-4 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}

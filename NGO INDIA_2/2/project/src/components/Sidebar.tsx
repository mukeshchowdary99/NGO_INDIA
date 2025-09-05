import React from 'react';
import { 
  Home, Users, DollarSign, FolderOpen, Network, 
  UserCheck, FileText, Settings, LogOut, Bell,
  ChevronRight, Heart
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { ActiveModule } from './Dashboard';

interface SidebarProps {
  activeModule: ActiveModule;
  setActiveModule: (module: ActiveModule) => void;
}

export function Sidebar({ activeModule, setActiveModule }: SidebarProps) {
  const { user, logout } = useAuth();

  const getMenuItems = () => {
    const baseItems = [
      { id: 'dashboard', label: 'Dashboard', icon: Home, available: true },
      { id: 'donors', label: 'Donor Management', icon: Users, available: ['staff', 'leadership'].includes(user?.role || '') },
      { id: 'finances', label: 'Financial Tracking', icon: DollarSign, available: ['staff', 'leadership'].includes(user?.role || '') },
      { id: 'projects', label: 'Project Monitoring', icon: FolderOpen, available: true },
      { id: 'collaboration', label: 'Collaboration Hub', icon: Network, available: true },
      { id: 'hr', label: 'HR Management', icon: UserCheck, available: user?.role === 'leadership' },
      { id: 'reports', label: 'Reports', icon: FileText, available: ['staff', 'leadership'].includes(user?.role || '') },
      { id: 'settings', label: 'Settings', icon: Settings, available: true }
    ];

    return baseItems.filter(item => item.available);
  };

  const menuItems = getMenuItems();

  return (
    <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-start gap-3">
          <img src="/ngo india logo.png" alt="NGO INDIA Logo" className="w-10 h-10 rounded-lg" />
          {/* Removed text logo, keep only image */}
        </div>
      </div>

      {/* User Profile */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <img
            src={user?.avatar || `https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=40&h=40&dpr=1`}
            alt={user?.name}
            className="w-10 h-10 rounded-full object-cover"
          />
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900">{user?.name}</h3>
            <p className="text-sm text-gray-500">{user?.position}</p>
          </div>
          <Bell className="w-5 h-5 text-gray-400" />
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <div className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeModule === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => setActiveModule(item.id as ActiveModule)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                  isActive 
                    ? 'bg-orange-50 text-orange-600 border border-orange-200' 
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
                {isActive && <ChevronRight className="w-4 h-4 ml-auto" />}
              </button>
            );
          })}
        </div>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200">
        <button
          onClick={logout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
        >
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </div>
  );
}
import React, { useState } from 'react';
import { Sidebar } from './Sidebar';
import { StaffDashboard } from './dashboards/StaffDashboard';
import { LeadershipDashboard } from './dashboards/LeadershipDashboard';
import { EmployeeDashboard } from './dashboards/EmployeeDashboard';
import { DonorManagement } from './modules/DonorManagement';
import { FinancialTracking } from './modules/FinancialTracking';
import { ProjectMonitoring } from './modules/ProjectMonitoring';
import { CollaborationHub } from './modules/CollaborationHub';
import { HRManagement } from './modules/HRManagement';
import { Settings } from './modules/Settings';
import { Reports } from './modules/Reports';
import { useAuth } from '../contexts/AuthContext';

export type ActiveModule = 
  | 'dashboard' 
  | 'donors' 
  | 'finances' 
  | 'projects' 
  | 'collaboration' 
  | 'hr' 
  | 'reports' 
  | 'settings';

export function Dashboard() {
  const { user } = useAuth();
  const [activeModule, setActiveModule] = useState<ActiveModule>('dashboard');

  const renderContent = () => {
    switch (activeModule) {
      case 'dashboard':
        switch (user?.role) {
          case 'staff':
            return <StaffDashboard />;
          case 'leadership':
            return <LeadershipDashboard />;
          case 'employee':
            return <EmployeeDashboard />;
          default:
            return <StaffDashboard />;
        }
      case 'donors':
        return <DonorManagement />;
      case 'finances':
        return <FinancialTracking />;
      case 'projects':
        return <ProjectMonitoring />;
      case 'collaboration':
        return <CollaborationHub />;
      case 'hr':
        return <HRManagement />;
      case 'reports':
        return <Reports />;
      case 'settings':
        return <Settings />;
      default:
        return <div className="p-8 text-center text-gray-500">Module under development</div>;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar activeModule={activeModule} setActiveModule={setActiveModule} />
      <main className="flex-1 overflow-y-auto">
        {renderContent()}
      </main>
    </div>
  );
}
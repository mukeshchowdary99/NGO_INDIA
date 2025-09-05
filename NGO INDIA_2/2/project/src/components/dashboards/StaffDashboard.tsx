import React from 'react';
import { 
  TrendingUp, DollarSign, Users, FolderOpen, 
  AlertCircle, CheckCircle, Clock, Target,
  ArrowUpRight, ArrowDownRight
} from 'lucide-react';
import { useDashboard } from '../../contexts/DashboardContext';

export function StaffDashboard() {
  const { donations, projects, expenses, tasks } = useDashboard();

  const totalDonations = donations.reduce((sum, d) => sum + d.amount, 0);
  const totalExpenses = expenses.reduce((sum, e) => sum + e.amount, 0);
  const activeProjects = projects.filter(p => p.status === 'active').length;
  const completedTasks = tasks.filter(t => t.status === 'completed').length;

  const stats = [
    {
      label: 'Total Donations',
      value: `₹${(totalDonations / 100000).toFixed(1)}L`,
      change: '+12%',
      trend: 'up',
      icon: DollarSign,
      color: 'text-green-600'
    },
    {
      label: 'Active Projects',
      value: activeProjects.toString(),
      change: '+2',
      trend: 'up',
      icon: FolderOpen,
      color: 'text-blue-600'
    },
    {
      label: 'Total Expenses',
      value: `₹${(totalExpenses / 100000).toFixed(1)}L`,
      change: '-8%',
      trend: 'down',
      icon: TrendingUp,
      color: 'text-orange-600'
    },
    {
      label: 'Tasks Completed',
      value: completedTasks.toString(),
      change: '+5',
      trend: 'up',
      icon: CheckCircle,
      color: 'text-purple-600'
    }
  ];

  const recentActivities = [
    {
      type: 'donation',
      message: 'New donation received from Tata Foundation',
      amount: '₹5,00,000',
      time: '2 hours ago',
      status: 'success'
    },
    {
      type: 'expense',
      message: 'Medical equipment purchase approved',
      amount: '₹1,20,000',
      time: '4 hours ago',
      status: 'pending'
    },
    {
      type: 'task',
      message: 'Q1 Impact Report completed',
      amount: '',
      time: '6 hours ago',
      status: 'completed'
    }
  ];

  return (
    <div className="p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Director Dashboard</h1>
        <p className="text-gray-600">Monitor donations, expenses, and project progress</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg bg-gray-50 ${stat.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div className={`flex items-center gap-1 text-sm ${
                  stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {stat.trend === 'up' ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                  {stat.change}
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</h3>
              <p className="text-gray-600">{stat.label}</p>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Activities */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="p-6 border-b border-gray-100">
              <h2 className="text-xl font-semibold text-gray-900">Recent Activities</h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <div key={index} className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                    <div className={`p-2 rounded-full ${
                      activity.status === 'success' ? 'bg-green-100 text-green-600' :
                      activity.status === 'pending' ? 'bg-yellow-100 text-yellow-600' :
                      'bg-blue-100 text-blue-600'
                    }`}>
                      {activity.status === 'success' ? <CheckCircle className="w-4 h-4" /> :
                       activity.status === 'pending' ? <Clock className="w-4 h-4" /> :
                       <Target className="w-4 h-4" />}
                    </div>
                    <div className="flex-1">
                      <p className="text-gray-900 font-medium">{activity.message}</p>
                      <div className="flex items-center justify-between mt-1">
                        <span className="text-sm text-gray-500">{activity.time}</span>
                        {activity.amount && (
                          <span className="text-sm font-semibold text-gray-900">{activity.amount}</span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="p-6 border-b border-gray-100">
              <h2 className="text-xl font-semibold text-gray-900">Quick Actions</h2>
            </div>
            <div className="p-6">
              <div className="space-y-3">
                <button className="w-full bg-orange-500 text-white py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors">
                  Add New Donation
                </button>
                <button className="w-full bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors">
                  Record Expense
                </button>
                <button className="w-full bg-green-500 text-white py-3 rounded-lg font-semibold hover:bg-green-600 transition-colors">
                  Update Project
                </button>
                <button className="w-full border border-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors">
                  Generate Report
                </button>
              </div>
            </div>
          </div>

          {/* Alerts */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="p-6 border-b border-gray-100">
              <h2 className="text-xl font-semibold text-gray-900">Alerts</h2>
            </div>
            <div className="p-6">
              <div className="space-y-3">
                <div className="flex items-start gap-3 p-3 bg-yellow-50 rounded-lg">
                  <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-yellow-800">Budget Alert</p>
                    <p className="text-sm text-yellow-700">Healthcare Initiative is 80% of budget</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                  <Clock className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-blue-800">Task Due</p>
                    <p className="text-sm text-blue-700">Q1 Impact Report due in 3 days</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Project Overview */}
      <div className="mt-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-xl font-semibold text-gray-900">Active Projects</h2>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project) => (
                <div key={project.id} className="border border-gray-200 rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-gray-900">{project.name}</h3>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      project.status === 'active' ? 'bg-green-100 text-green-800' :
                      project.status === 'completed' ? 'bg-blue-100 text-blue-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {project.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">{project.description}</p>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Progress</span>
                      <span className="font-medium">{project.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-orange-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${project.progress}%` }}
                      />
                    </div>
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>₹{(project.spent / 100000).toFixed(1)}L spent</span>
                      <span>₹{(project.budget / 100000).toFixed(1)}L budget</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
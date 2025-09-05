import React, { useState } from 'react';
import { 
  FileText, Download, Calendar, Filter, TrendingUp, 
  DollarSign, Users, Target, BarChart3, PieChart,
  Eye, Share2, Mail, Printer, RefreshCw, Clock
} from 'lucide-react';
import { useDashboard } from '../../contexts/DashboardContext';

export function Reports() {
  const { donations, projects, expenses } = useDashboard();
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [selectedReport, setSelectedReport] = useState('overview');
  const [isGenerating, setIsGenerating] = useState(false);

  const reportTypes = [
    {
      id: 'overview',
      title: 'Overview Report',
      description: 'Comprehensive summary of all activities',
      icon: BarChart3,
      color: 'text-blue-600'
    },
    {
      id: 'financial',
      title: 'Financial Report',
      description: 'Donations, expenses, and budget analysis',
      icon: DollarSign,
      color: 'text-green-600'
    },
    {
      id: 'projects',
      title: 'Project Report',
      description: 'Project progress and impact metrics',
      icon: Target,
      color: 'text-orange-600'
    },
    {
      id: 'donors',
      title: 'Donor Report',
      description: 'Donor engagement and contribution analysis',
      icon: Users,
      color: 'text-purple-600'
    },
    {
      id: 'impact',
      title: 'Impact Report',
      description: 'Beneficiary outcomes and success stories',
      icon: TrendingUp,
      color: 'text-red-600'
    }
  ];

  const recentReports = [
    {
      id: '1',
      title: 'Q4 2024 Financial Summary',
      type: 'Financial',
      generatedDate: '2025-01-15',
      size: '2.4 MB',
      status: 'Ready'
    },
    {
      id: '2',
      title: 'December Impact Assessment',
      type: 'Impact',
      generatedDate: '2025-01-10',
      size: '1.8 MB',
      status: 'Ready'
    },
    {
      id: '3',
      title: 'Project Progress - Education Initiative',
      type: 'Project',
      generatedDate: '2025-01-08',
      size: '3.2 MB',
      status: 'Ready'
    },
    {
      id: '4',
      title: 'Donor Engagement Analysis',
      type: 'Donor',
      generatedDate: '2025-01-05',
      size: '1.5 MB',
      status: 'Processing'
    }
  ];

  const generateReport = async () => {
    setIsGenerating(true);
    // Simulate report generation
    await new Promise(resolve => setTimeout(resolve, 3000));
    setIsGenerating(false);
  };

  const renderOverviewReport = () => {
    const totalDonations = donations.reduce((sum, d) => sum + d.amount, 0);
    const totalExpenses = expenses.reduce((sum, e) => sum + e.amount, 0);
    const activeProjects = projects.filter(p => p.status === 'active').length;

    return (
      <div className="space-y-6">
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-green-50">
                <DollarSign className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">₹{(totalDonations / 100000).toFixed(1)}L</h3>
                <p className="text-gray-600">Total Donations</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-red-50">
                <TrendingUp className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">₹{(totalExpenses / 100000).toFixed(1)}L</h3>
                <p className="text-gray-600">Total Expenses</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-blue-50">
                <Target className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">{activeProjects}</h3>
                <p className="text-gray-600">Active Projects</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-purple-50">
                <Users className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">50,000+</h3>
                <p className="text-gray-600">Lives Impacted</p>
              </div>
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Donation Trends</h3>
            <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
              <div className="text-center">
                <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-500">Chart visualization would appear here</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Expense Distribution</h3>
            <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
              <div className="text-center">
                <PieChart className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-500">Pie chart visualization would appear here</p>
              </div>
            </div>
          </div>
        </div>

        {/* Project Performance */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Project Performance</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Project</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Budget</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Spent</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Progress</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Status</th>
                </tr>
              </thead>
              <tbody>
                {projects.map((project) => (
                  <tr key={project.id} className="border-b border-gray-100">
                    <td className="py-3 px-4 font-medium text-gray-900">{project.name}</td>
                    <td className="py-3 px-4 text-gray-700">₹{(project.budget / 100000).toFixed(1)}L</td>
                    <td className="py-3 px-4 text-gray-700">₹{(project.spent / 100000).toFixed(1)}L</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-16 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-orange-500 h-2 rounded-full"
                            style={{ width: `${project.progress}%` }}
                          />
                        </div>
                        <span className="text-sm font-medium">{project.progress}%</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        project.status === 'active' ? 'bg-green-100 text-green-800' :
                        project.status === 'completed' ? 'bg-blue-100 text-blue-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {project.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };

  const renderFinancialReport = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Income Summary</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Total Donations</span>
              <span className="font-semibold">₹{(donations.reduce((sum, d) => sum + d.amount, 0) / 100000).toFixed(1)}L</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Recurring Donations</span>
              <span className="font-semibold">₹{(donations.filter(d => d.type === 'recurring').reduce((sum, d) => sum + d.amount, 0) / 100000).toFixed(1)}L</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">One-time Donations</span>
              <span className="font-semibold">₹{(donations.filter(d => d.type === 'one-time').reduce((sum, d) => sum + d.amount, 0) / 100000).toFixed(1)}L</span>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Expense Summary</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Program Materials</span>
              <span className="font-semibold">₹{(expenses.filter(e => e.category === 'Program Materials').reduce((sum, e) => sum + e.amount, 0) / 1000).toFixed(0)}K</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Equipment</span>
              <span className="font-semibold">₹{(expenses.filter(e => e.category === 'Equipment').reduce((sum, e) => sum + e.amount, 0) / 1000).toFixed(0)}K</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Travel</span>
              <span className="font-semibold">₹{(expenses.filter(e => e.category === 'Travel').reduce((sum, e) => sum + e.amount, 0) / 1000).toFixed(0)}K</span>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Financial Health</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Net Balance</span>
              <span className="font-semibold text-green-600">₹{((donations.reduce((sum, d) => sum + d.amount, 0) - expenses.reduce((sum, e) => sum + e.amount, 0)) / 100000).toFixed(1)}L</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Burn Rate</span>
              <span className="font-semibold">₹{(expenses.reduce((sum, e) => sum + e.amount, 0) / 30 / 1000).toFixed(1)}K/day</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Efficiency Ratio</span>
              <span className="font-semibold">92%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Reports & Analytics</h1>
            <p className="text-gray-600">Generate comprehensive reports and analyze organizational performance</p>
          </div>
          <div className="flex items-center gap-3">
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            >
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="quarter">This Quarter</option>
              <option value="year">This Year</option>
              <option value="custom">Custom Range</option>
            </select>
            <button
              onClick={generateReport}
              disabled={isGenerating}
              className="bg-orange-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors flex items-center gap-2 disabled:opacity-50"
            >
              {isGenerating ? (
                <>
                  <RefreshCw className="w-5 h-5 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <FileText className="w-5 h-5" />
                  Generate Report
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Report Types Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Report Types</h2>
            <nav className="space-y-2">
              {reportTypes.map((report) => {
                const Icon = report.icon;
                return (
                  <button
                    key={report.id}
                    onClick={() => setSelectedReport(report.id)}
                    className={`w-full flex items-start gap-3 p-3 rounded-lg text-left transition-colors ${
                      selectedReport === report.id
                        ? 'bg-orange-50 text-orange-600 border border-orange-200'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <Icon className={`w-5 h-5 mt-0.5 ${report.color}`} />
                    <div>
                      <h3 className="font-medium">{report.title}</h3>
                      <p className="text-xs text-gray-500 mt-1">{report.description}</p>
                    </div>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Recent Reports */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mt-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Reports</h2>
            <div className="space-y-3">
              {recentReports.map((report) => (
                <div key={report.id} className="p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-medium text-gray-900 text-sm">{report.title}</h4>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      report.status === 'Ready' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {report.status}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>{report.type} • {report.size}</span>
                    <span>{report.generatedDate}</span>
                  </div>
                  {report.status === 'Ready' && (
                    <div className="flex items-center gap-2 mt-2">
                      <button className="text-orange-600 hover:text-orange-700 text-xs font-medium">
                        <Eye className="w-3 h-3 inline mr-1" />
                        View
                      </button>
                      <button className="text-blue-600 hover:text-blue-700 text-xs font-medium">
                        <Download className="w-3 h-3 inline mr-1" />
                        Download
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100">
            {/* Report Header */}
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">
                    {reportTypes.find(r => r.id === selectedReport)?.title}
                  </h2>
                  <p className="text-gray-600 mt-1">
                    {reportTypes.find(r => r.id === selectedReport)?.description}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                    <Share2 className="w-5 h-5" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                    <Mail className="w-5 h-5" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                    <Printer className="w-5 h-5" />
                  </button>
                  <button className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors flex items-center gap-2">
                    <Download className="w-4 h-4" />
                    Export
                  </button>
                </div>
              </div>
            </div>

            {/* Report Content */}
            <div className="p-6">
              {selectedReport === 'overview' && renderOverviewReport()}
              {selectedReport === 'financial' && renderFinancialReport()}
              {selectedReport === 'projects' && (
                <div className="text-center py-12">
                  <Target className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Project Report</h3>
                  <p className="text-gray-600">Detailed project analysis and progress tracking</p>
                </div>
              )}
              {selectedReport === 'donors' && (
                <div className="text-center py-12">
                  <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Donor Report</h3>
                  <p className="text-gray-600">Comprehensive donor engagement and contribution analysis</p>
                </div>
              )}
              {selectedReport === 'impact' && (
                <div className="text-center py-12">
                  <TrendingUp className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Impact Report</h3>
                  <p className="text-gray-600">Beneficiary outcomes and success story documentation</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
import React, { useState } from 'react';
import { 
  Settings as SettingsIcon, User, Bell, Shield, Palette, 
  Globe, Database, Mail, Phone, MapPin, Save,
  Eye, EyeOff, Camera, Upload, Download, Trash2,
  Key, Lock, Smartphone, Monitor, Moon, Sun
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

export function Settings() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [showPassword, setShowPassword] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    sms: false,
    donations: true,
    projects: true,
    reports: false
  });

  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: user?.address || '',
    organization: user?.organization || '',
    position: user?.position || '',
    bio: '',
    website: '',
    linkedin: '',
    twitter: ''
  });

  const [securityData, setSecurityData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    twoFactor: false
  });

  const [organizationData, setOrganizationData] = useState({
    name: 'NGO INDIA',
    tagline: 'Empowering Communities',
    description: 'Dedicated to creating sustainable change through education, healthcare, and community development programs across rural India.',
    address: 'New Delhi, India',
    phone: '+91 11 4567 8900',
    email: 'info@ngoindia.org',
    website: 'https://ngoindia.org',
    registrationNumber: 'NGO/2020/001234',
    taxId: 'AAACN1234A'
  });

  const handleProfileUpdate = () => {
    // Handle profile update
    console.log('Profile updated:', profileData);
  };

  const handlePasswordChange = () => {
    if (securityData.newPassword !== securityData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    // Handle password change
    console.log('Password changed');
  };

  const handleNotificationChange = (key: string, value: boolean) => {
    setNotifications(prev => ({ ...prev, [key]: value }));
  };

  const renderProfileTab = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Profile Information</h3>
        
        {/* Profile Picture */}
        <div className="flex items-center gap-6 mb-6">
          <div className="relative">
            <img
              src={user?.avatar || 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1'}
              alt="Profile"
              className="w-20 h-20 rounded-full object-cover"
            />
            <button className="absolute -bottom-2 -right-2 bg-orange-500 text-white p-2 rounded-full hover:bg-orange-600 transition-colors">
              <Camera className="w-4 h-4" />
            </button>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900">{user?.name}</h4>
            <p className="text-gray-600">{user?.position}</p>
            <button className="text-orange-600 hover:text-orange-700 text-sm font-medium mt-1">
              Change Photo
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
            <input
              type="text"
              value={profileData.name}
              onChange={(e) => setProfileData({...profileData, name: e.target.value})}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
            <input
              type="email"
              value={profileData.email}
              onChange={(e) => setProfileData({...profileData, email: e.target.value})}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
            <input
              type="tel"
              value={profileData.phone}
              onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Position</label>
            <input
              type="text"
              value={profileData.position}
              onChange={(e) => setProfileData({...profileData, position: e.target.value})}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>
        </div>

        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
          <textarea
            value={profileData.address}
            onChange={(e) => setProfileData({...profileData, address: e.target.value})}
            rows={3}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          />
        </div>

        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
          <textarea
            value={profileData.bio}
            onChange={(e) => setProfileData({...profileData, bio: e.target.value})}
            rows={4}
            placeholder="Tell us about yourself..."
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          />
        </div>

        <div className="flex justify-end mt-6">
          <button
            onClick={handleProfileUpdate}
            className="bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition-colors flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );

  const renderSecurityTab = () => (
    <div className="space-y-6">
      {/* Password Change */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Change Password</h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Current Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={securityData.currentPassword}
                onChange={(e) => setSecurityData({...securityData, currentPassword: e.target.value})}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-transparent pr-12"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
            <input
              type="password"
              value={securityData.newPassword}
              onChange={(e) => setSecurityData({...securityData, newPassword: e.target.value})}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Confirm New Password</label>
            <input
              type="password"
              value={securityData.confirmPassword}
              onChange={(e) => setSecurityData({...securityData, confirmPassword: e.target.value})}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>
        </div>

        <div className="flex justify-end mt-6">
          <button
            onClick={handlePasswordChange}
            className="bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition-colors flex items-center gap-2"
          >
            <Lock className="w-4 h-4" />
            Update Password
          </button>
        </div>
      </div>

      {/* Two-Factor Authentication */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Two-Factor Authentication</h3>
        
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-medium text-gray-900">Enable 2FA</h4>
            <p className="text-sm text-gray-600">Add an extra layer of security to your account</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={securityData.twoFactor}
              onChange={(e) => setSecurityData({...securityData, twoFactor: e.target.checked})}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
          </label>
        </div>
      </div>

      {/* Active Sessions */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Active Sessions</h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-3">
              <Monitor className="w-5 h-5 text-gray-600" />
              <div>
                <p className="font-medium text-gray-900">Current Session</p>
                <p className="text-sm text-gray-600">Chrome on Windows • New Delhi, India</p>
              </div>
            </div>
            <span className="text-sm text-green-600 font-medium">Active</span>
          </div>
          
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-3">
              <Smartphone className="w-5 h-5 text-gray-600" />
              <div>
                <p className="font-medium text-gray-900">Mobile Device</p>
                <p className="text-sm text-gray-600">Safari on iPhone • 2 hours ago</p>
              </div>
            </div>
            <button className="text-sm text-red-600 hover:text-red-700 font-medium">
              Revoke
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderNotificationsTab = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Notification Preferences</h3>
        
        <div className="space-y-6">
          <div>
            <h4 className="font-medium text-gray-900 mb-4">Communication Channels</h4>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">Email Notifications</p>
                  <p className="text-sm text-gray-600">Receive updates via email</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={notifications.email}
                    onChange={(e) => handleNotificationChange('email', e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
                </label>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">Push Notifications</p>
                  <p className="text-sm text-gray-600">Receive browser notifications</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={notifications.push}
                    onChange={(e) => handleNotificationChange('push', e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
                </label>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">SMS Notifications</p>
                  <p className="text-sm text-gray-600">Receive text messages</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={notifications.sms}
                    onChange={(e) => handleNotificationChange('sms', e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
                </label>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-medium text-gray-900 mb-4">Content Preferences</h4>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">Donation Updates</p>
                  <p className="text-sm text-gray-600">New donations and funding updates</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={notifications.donations}
                    onChange={(e) => handleNotificationChange('donations', e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
                </label>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">Project Updates</p>
                  <p className="text-sm text-gray-600">Progress and milestone notifications</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={notifications.projects}
                    onChange={(e) => handleNotificationChange('projects', e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
                </label>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">Weekly Reports</p>
                  <p className="text-sm text-gray-600">Summary reports and analytics</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={notifications.reports}
                    onChange={(e) => handleNotificationChange('reports', e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderOrganizationTab = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Organization Information</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Organization Name</label>
            <input
              type="text"
              value={organizationData.name}
              onChange={(e) => setOrganizationData({...organizationData, name: e.target.value})}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Tagline</label>
            <input
              type="text"
              value={organizationData.tagline}
              onChange={(e) => setOrganizationData({...organizationData, tagline: e.target.value})}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
            <input
              type="tel"
              value={organizationData.phone}
              onChange={(e) => setOrganizationData({...organizationData, phone: e.target.value})}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input
              type="email"
              value={organizationData.email}
              onChange={(e) => setOrganizationData({...organizationData, email: e.target.value})}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Registration Number</label>
            <input
              type="text"
              value={organizationData.registrationNumber}
              onChange={(e) => setOrganizationData({...organizationData, registrationNumber: e.target.value})}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Tax ID</label>
            <input
              type="text"
              value={organizationData.taxId}
              onChange={(e) => setOrganizationData({...organizationData, taxId: e.target.value})}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>
        </div>

        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
          <textarea
            value={organizationData.description}
            onChange={(e) => setOrganizationData({...organizationData, description: e.target.value})}
            rows={4}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          />
        </div>

        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
          <textarea
            value={organizationData.address}
            onChange={(e) => setOrganizationData({...organizationData, address: e.target.value})}
            rows={3}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          />
        </div>

        <div className="flex justify-end mt-6">
          <button className="bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition-colors flex items-center gap-2">
            <Save className="w-4 h-4" />
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );

  const renderPreferencesTab = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Display Preferences</h3>
        
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900">Dark Mode</p>
              <p className="text-sm text-gray-600">Switch to dark theme</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={isDarkMode}
                onChange={(e) => setIsDarkMode(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
            </label>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Language</label>
            <select className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-transparent">
              <option value="en">English</option>
              <option value="hi">Hindi</option>
              <option value="bn">Bengali</option>
              <option value="ta">Tamil</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Timezone</label>
            <select className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-transparent">
              <option value="Asia/Kolkata">India Standard Time (IST)</option>
              <option value="UTC">UTC</option>
              <option value="America/New_York">Eastern Time</option>
              <option value="Europe/London">Greenwich Mean Time</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Date Format</label>
            <select className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-transparent">
              <option value="DD/MM/YYYY">DD/MM/YYYY</option>
              <option value="MM/DD/YYYY">MM/DD/YYYY</option>
              <option value="YYYY-MM-DD">YYYY-MM-DD</option>
            </select>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Data Management</h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <p className="font-medium text-gray-900">Export Data</p>
              <p className="text-sm text-gray-600">Download your account data</p>
            </div>
            <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2">
              <Download className="w-4 h-4" />
              Export
            </button>
          </div>
          
          <div className="flex items-center justify-between p-4 bg-red-50 rounded-lg">
            <div>
              <p className="font-medium text-red-900">Delete Account</p>
              <p className="text-sm text-red-600">Permanently delete your account and data</p>
            </div>
            <button className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors flex items-center gap-2">
              <Trash2 className="w-4 h-4" />
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'organization', label: 'Organization', icon: Globe },
    { id: 'preferences', label: 'Preferences', icon: Palette }
  ];

  return (
    <div className="p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Settings</h1>
        <p className="text-gray-600">Manage your account preferences and organization settings</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
            <nav className="space-y-2">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                      activeTab === tab.id
                        ? 'bg-orange-50 text-orange-600 border border-orange-200'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{tab.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Content */}
        <div className="lg:col-span-3">
          {activeTab === 'profile' && renderProfileTab()}
          {activeTab === 'security' && renderSecurityTab()}
          {activeTab === 'notifications' && renderNotificationsTab()}
          {activeTab === 'organization' && renderOrganizationTab()}
          {activeTab === 'preferences' && renderPreferencesTab()}
        </div>
      </div>
    </div>
  );
}
import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'staff' | 'leadership' | 'employee';
  avatar?: string;
  department?: string;
  position?: string;
  phone?: string;
  address?: string;
  organization?: string;
  experience?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (userData: RegisterData) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
  role: 'staff' | 'leadership' | 'employee';
  phone: string;
  address: string;
  organization?: string;
  experience?: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Store registered users in localStorage for demo purposes
const getStoredUsers = (): User[] => {
  const stored = localStorage.getItem('ngo_users');
  return stored ? JSON.parse(stored) : [];
};

const storeUsers = (users: User[]) => {
  localStorage.setItem('ngo_users', JSON.stringify(users));
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const users = getStoredUsers();
    const foundUser = users.find(u => u.email === email);
    if (foundUser) {
      setUser(foundUser);
      setIsLoading(false);
      return true;
    }
    
    setIsLoading(false);
    return false;
  };

  const register = async (userData: RegisterData): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const users = getStoredUsers();
      
      // Check if user already exists
      if (users.find(u => u.email === userData.email)) {
        setIsLoading(false);
        return false;
      }
      
      // Create new user
      const newUser: User = {
        id: Date.now().toString(),
        name: userData.name,
        email: userData.email,
        role: userData.role,
        phone: userData.phone,
        address: userData.address,
        organization: userData.organization,
        experience: userData.experience,
        department: userData.role === 'staff' ? 'Program Management' : 
                   userData.role === 'leadership' ? 'Executive' : 'Field Operations',
        position: userData.role === 'staff' ? 'Director' : 
                 userData.role === 'leadership' ? 'Executive Director' : 'Employee',
        avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1'
      };
      
      const updatedUsers = [...users, newUser];
      storeUsers(updatedUsers);
      
      // Auto-login the new user
      setUser(newUser);
      setIsLoading(false);
      return true;
    } catch (error) {
      setIsLoading(false);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
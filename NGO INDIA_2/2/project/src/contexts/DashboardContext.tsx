import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface Donation {
  id: string;
  donor: string;
  amount: number;
  date: string;
  project: string;
  type: 'one-time' | 'recurring';
  status: 'completed' | 'pending' | 'failed';
}

export interface Project {
  id: string;
  name: string;
  budget: number;
  spent: number;
  progress: number;
  status: 'active' | 'completed' | 'on-hold';
  startDate: string;
  endDate: string;
  description: string;
}

export interface Expense {
  id: string;
  description: string;
  amount: number;
  category: string;
  date: string;
  project: string;
  status: 'approved' | 'pending' | 'rejected';
}

export interface Task {
  id: string;
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  status: 'pending' | 'in-progress' | 'completed';
  assignee: string;
  dueDate: string;
  project: string;
}

interface DashboardContextType {
  donations: Donation[];
  projects: Project[];
  expenses: Expense[];
  tasks: Task[];
  updateTask: (id: string, updates: Partial<Task>) => void;
  addExpense: (expense: Omit<Expense, 'id'>) => void;
}

const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

const mockDonations: Donation[] = [
  {
    id: '1',
    donor: 'Tata Foundation',
    amount: 500000,
    date: '2025-01-15',
    project: 'Education for All',
    type: 'one-time',
    status: 'completed'
  },
  {
    id: '2',
    donor: 'Infosys Foundation',
    amount: 250000,
    date: '2025-01-10',
    project: 'Healthcare Initiative',
    type: 'recurring',
    status: 'completed'
  },
  {
    id: '3',
    donor: 'Azim Premji Foundation',
    amount: 750000,
    date: '2025-01-08',
    project: 'Rural Development',
    type: 'one-time',
    status: 'pending'
  }
];

const mockProjects: Project[] = [
  {
    id: '1',
    name: 'Education for All',
    budget: 2000000,
    spent: 1200000,
    progress: 65,
    status: 'active',
    startDate: '2024-06-01',
    endDate: '2025-05-31',
    description: 'Providing quality education to underprivileged children across rural India'
  },
  {
    id: '2',
    name: 'Healthcare Initiative',
    budget: 1500000,
    spent: 800000,
    progress: 45,
    status: 'active',
    startDate: '2024-08-01',
    endDate: '2025-07-31',
    description: 'Mobile healthcare units serving remote communities'
  },
  {
    id: '3',
    name: 'Rural Development',
    budget: 3000000,
    spent: 2100000,
    progress: 80,
    status: 'active',
    startDate: '2024-01-01',
    endDate: '2025-12-31',
    description: 'Infrastructure development and livelihood programs'
  }
];

const mockExpenses: Expense[] = [
  {
    id: '1',
    description: 'Educational materials and supplies',
    amount: 45000,
    category: 'Program Materials',
    date: '2025-01-14',
    project: 'Education for All',
    status: 'approved'
  },
  {
    id: '2',
    description: 'Medical equipment purchase',
    amount: 120000,
    category: 'Equipment',
    date: '2025-01-12',
    project: 'Healthcare Initiative',
    status: 'pending'
  },
  {
    id: '3',
    description: 'Transportation costs',
    amount: 25000,
    category: 'Travel',
    date: '2025-01-10',
    project: 'Rural Development',
    status: 'approved'
  }
];

const mockTasks: Task[] = [
  {
    id: '1',
    title: 'Complete Q1 Impact Report',
    description: 'Compile and analyze data from all active projects for quarterly report',
    priority: 'high',
    status: 'in-progress',
    assignee: 'Priya Sharma',
    dueDate: '2025-01-20',
    project: 'Education for All'
  },
  {
    id: '2',
    title: 'Donor Meeting Preparation',
    description: 'Prepare presentation materials for upcoming donor meeting',
    priority: 'medium',
    status: 'pending',
    assignee: 'Rajesh Kumar',
    dueDate: '2025-01-18',
    project: 'Healthcare Initiative'
  },
  {
    id: '3',
    title: 'Field Survey Completion',
    description: 'Complete beneficiary satisfaction survey in assigned villages',
    priority: 'medium',
    status: 'completed',
    assignee: 'Anita Patel',
    dueDate: '2025-01-15',
    project: 'Rural Development'
  }
];

export function DashboardProvider({ children }: { children: ReactNode }) {
  const [donations] = useState<Donation[]>(mockDonations);
  const [projects] = useState<Project[]>(mockProjects);
  const [expenses, setExpenses] = useState<Expense[]>(mockExpenses);
  const [tasks, setTasks] = useState<Task[]>(mockTasks);

  const updateTask = (id: string, updates: Partial<Task>) => {
    setTasks(prev => prev.map(task => 
      task.id === id ? { ...task, ...updates } : task
    ));
  };

  const addExpense = (expense: Omit<Expense, 'id'>) => {
    const newExpense: Expense = {
      ...expense,
      id: Date.now().toString()
    };
    setExpenses(prev => [newExpense, ...prev]);
  };

  return (
    <DashboardContext.Provider value={{
      donations,
      projects,
      expenses,
      tasks,
      updateTask,
      addExpense
    }}>
      {children}
    </DashboardContext.Provider>
  );
}

export function useDashboard() {
  const context = useContext(DashboardContext);
  if (context === undefined) {
    throw new Error('useDashboard must be used within a DashboardProvider');
  }
  return context;
}
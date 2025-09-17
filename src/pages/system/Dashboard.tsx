import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  Filler
} from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';
import { Chart } from 'react-chartjs-2';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  Filler
);

// 模拟数据
interface StatCard {
  title: string;
  value: number;
  unit: string;
  change: number;
  icon: string;
  color: string;
}

interface Activity {
  id: number;
  user: string;
  avatar: string;
  action: string;
  target: string;
  time: string;
}

// 系统资源使用数据接口
interface SystemResource {
  cpu: number[];
  memory: number[];
  disk: number[];
  network: number[];
  timestamps: string[];
}

// 系统性能数据接口
interface SystemPerformance {
  responseTime: number[];
  throughput: number[];
  errorRate: number[];
  timestamps: string[];
}

const Dashboard = () => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(true);
  const [systemResource, setSystemResource] = useState<SystemResource>({
    cpu: [],
    memory: [],
    disk: [],
    network: [],
    timestamps: []
  });
  const [systemPerformance, setSystemPerformance] = useState<SystemPerformance>({
    responseTime: [],
    throughput: [],
    errorRate: [],
    timestamps: []
  });
  
  // 模拟加载数据
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      
      // 模拟API延迟
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // 模拟系统资源数据
      const now = new Date();
      const timestamps = Array.from({ length: 24 }, (_, i) => {
        const time = new Date(now);
        time.setHours(now.getHours() - 23 + i);
        return time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      });
      
      // 生成更平滑的随机数据
      const generateSmoothData = (baseValue: number, variance: number, length: number) => {
        let lastValue = baseValue + (Math.random() * variance * 2 - variance);
        const result = [lastValue];
        
        for (let i = 1; i < length; i++) {
          // 每个新值都基于前一个值，变化幅度较小，确保平滑过渡
          const change = Math.random() * variance * 0.4 - variance * 0.2;
          let newValue = lastValue + change;
          
          // 保持在合理范围内
          newValue = Math.max(10, Math.min(90, newValue));
          result.push(newValue);
          lastValue = newValue;
        }
        
        return result;
      };
      
      // 设置系统资源数据 - 使用更平滑的数据
      setSystemResource({
        cpu: generateSmoothData(50, 15, 24),
        memory: generateSmoothData(65, 10, 24),
        disk: generateSmoothData(45, 12, 24),
        network: generateSmoothData(30, 18, 24),
        timestamps
      });
      
      // 生成性能数据 - 使用更合理的数据分布
      const responseTimeBase = 120; // 基础响应时间
      const responseTimeData = generateSmoothData(responseTimeBase, 80, 24).map(v => Math.round(v));
      
      const throughputBase = 400; // 基础吞吐量
      const throughputData = generateSmoothData(throughputBase, 150, 24).map(v => Math.round(v));
      
      const errorRateData = generateSmoothData(1, 0.8, 24).map(v => Math.min(5, Math.max(0, v)));
      
      // 设置系统性能数据
      setSystemPerformance({
        responseTime: responseTimeData,
        throughput: throughputData,
        errorRate: errorRateData,
        timestamps
      });
      
      setIsLoading(false);
    };
    
    // 生成随机数据
    const generateRandomData = (min: number, max: number, length: number) => {
      return Array.from({ length }, () => Math.floor(Math.random() * (max - min + 1)) + min);
    };
    
    fetchData();
  }, []);
  
  // 统计卡片数据
  const statCards: StatCard[] = [
    {
      title: t('system.dashboard.totalUsers'),
      value: 2458,
      unit: t('system.dashboard.statistics.users'),
      change: 12.5,
      icon: 'i-tabler-users',
      color: 'bg-primary text-primary-content'
    },
    {
      title: t('system.dashboard.activeUsers'),
      value: 384,
      unit: t('system.dashboard.statistics.users'),
      change: -5.2,
      icon: 'i-tabler-eye',
      color: 'bg-secondary text-secondary-content'
    },
    {
      title: t('system.dashboard.newUsers'),
      value: 126,
      unit: t('system.dashboard.statistics.users'),
      change: 8.3,
      icon: 'i-tabler-article',
      color: 'bg-accent text-accent-content'
    },
    {
      title: t('system.dashboard.systemAnnouncements'),
      value: 42,
      unit: '',
      change: 0,
      icon: 'i-tabler-bell',
      color: 'bg-info text-info-content'
    }
  ];
  
  // 最近活动数据
  const recentActivities: Activity[] = [
    {
      id: 1,
      user: '张三',
      avatar: '/images/user/header.jpg',
      action: '发布了新文章',
      target: '《如何优化系统性能》',
      time: '10分钟前'
    },
    {
      id: 2,
      user: '李四',
      avatar: '',
      action: '更新了用户资料',
      target: '个人信息',
      time: '30分钟前'
    },
    {
      id: 3,
      user: '王五',
      avatar: '',
      action: '删除了文章',
      target: '《测试文章》',
      time: '1小时前'
    },
    {
      id: 4,
      user: '赵六',
      avatar: '',
      action: '评论了文章',
      target: '《系统设计指南》',
      time: '2小时前'
    },
    {
      id: 5,
      user: '系统',
      avatar: '',
      action: '执行了备份',
      target: '数据库',
      time: '4小时前'
    }
  ];
  
  // 系统资源使用图表数据
  const resourceUsageData = {
    labels: systemResource.timestamps,
    datasets: [
      {
        label: t('system.dashboard.statistics.cpu'),
        data: systemResource.cpu,
        borderColor: 'rgb(59, 130, 246)', // blue-500
        backgroundColor: 'rgba(59, 130, 246, 0.5)',
        tension: 0.4,
        fill: false,
      },
      {
        label: t('system.dashboard.statistics.memory'),
        data: systemResource.memory,
        borderColor: 'rgb(16, 185, 129)', // green-500
        backgroundColor: 'rgba(16, 185, 129, 0.5)',
        tension: 0.4,
        fill: false,
      },
      {
        label: t('system.dashboard.statistics.disk'),
        data: systemResource.disk,
        borderColor: 'rgb(245, 158, 11)', // amber-500
        backgroundColor: 'rgba(245, 158, 11, 0.5)',
        tension: 0.4,
        fill: false,
      },
      {
        label: t('system.dashboard.statistics.network'),
        data: systemResource.network,
        borderColor: 'rgb(139, 92, 246)', // violet-500
        backgroundColor: 'rgba(139, 92, 246, 0.5)',
        tension: 0.4,
        fill: false,
      }
    ],
  };
  
  // 系统性能图表数据 - 分开为两个不同的数据集
  const responseTimeData = {
    labels: systemPerformance.timestamps,
    datasets: [
      {
        label: t('system.dashboard.statistics.responseTime'),
        data: systemPerformance.responseTime,
        borderColor: 'rgb(239, 68, 68)', // red-500
        backgroundColor: 'rgba(239, 68, 68, 0.5)',
        tension: 0.4,
        yAxisID: 'y',
      }
    ]
  };
  
  const throughputData = {
    labels: systemPerformance.timestamps,
    datasets: [
      {
        label: t('system.dashboard.statistics.throughput'),
        data: systemPerformance.throughput,
        backgroundColor: 'rgba(16, 185, 129, 0.7)', // green-500
        borderColor: 'rgb(16, 185, 129)',
        borderWidth: 1,
        barThickness: 6,
        maxBarThickness: 8
      }
    ]
  };
  
  const errorRateData = {
    labels: systemPerformance.timestamps,
    datasets: [
      {
        label: t('system.dashboard.statistics.errorRate'),
        data: systemPerformance.errorRate,
        borderColor: 'rgb(249, 115, 22)', // orange-500
        backgroundColor: 'rgba(249, 115, 22, 0.5)',
        borderDash: [5, 5],
        tension: 0.4,
      }
    ]
  };
  
  // 图表选项
  const lineChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          boxWidth: 15,
          padding: 10,
          font: {
            size: 11
          }
        }
      },
      title: {
        display: false,
      },
      tooltip: {
        mode: 'index' as const,
        intersect: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Percentage (%)',
          font: {
            size: 11
          }
        },
        min: 0,
        max: 100,
        ticks: {
          callback: (value: number) => `${value}%`,
          font: {
            size: 10
          },
          maxTicksLimit: 6
        },
        grid: {
          color: 'rgba(0, 0, 0, 0.05)'
        }
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          maxRotation: 0,
          autoSkip: true,
          maxTicksLimit: 12,
          font: {
            size: 9
          }
        }
      },
    },
    interaction: {
      mode: 'nearest' as const,
      axis: 'x' as const,
      intersect: false,
    },
    elements: {
      line: {
        tension: 0.4 // 增加平滑度
      },
      point: {
        radius: 0, // 隐藏点
        hoverRadius: 5 // 悬停时显示点
      }
    }
  };
  
  const mixedChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: false,
      },
      tooltip: {
        mode: 'index' as const,
        intersect: false,
      },
    },
    scales: {
      y: {
        type: 'linear' as const,
        display: true,
        position: 'left' as const,
        title: {
          display: true,
          text: 'Response Time (ms)',
        },
        min: 0,
      },
      y1: {
        type: 'linear' as const,
        display: true,
        position: 'right' as const,
        title: {
          display: true,
          text: 'Throughput (req/s)',
        },
        min: 0,
        grid: {
          drawOnChartArea: false,
        },
      },
      y2: {
        type: 'linear' as const,
        display: true,
        position: 'right' as const,
        title: {
          display: true,
          text: 'Error Rate (%)',
        },
        min: 0,
        max: 10,
        grid: {
          drawOnChartArea: false,
        },
      },
    },
    interaction: {
      mode: 'index' as const,
      intersect: false,
    },
  };
  
  // 渲染统计卡片
  const renderStatCards = () => {
    return (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {statCards.map((card, index) => (
          <div key={index} className="overflow-hidden transition-all duration-300 rounded-lg shadow-md hover:shadow-lg">
            <div className={`p-4 ${card.color}`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium opacity-90">{card.title}</p>
                  <div className="flex items-baseline mt-1">
                    <p className="text-2xl font-semibold">{card.value.toLocaleString()}</p>
                    <p className="ml-1 text-sm opacity-80">{card.unit}</p>
                  </div>
                </div>
                <div className="p-3 rounded-full bg-white/10">
                  <span className={`${card.icon} w-6 h-6`}></span>
                </div>
              </div>
              <div className="flex items-center mt-3 text-xs">
                {card.change > 0 ? (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                    <span className="ml-1">增长 {card.change}%</span>
                  </>
                ) : card.change < 0 ? (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 17h8m0 0v-8m0 8l-8-8-4 4-6-6" />
                    </svg>
                    <span className="ml-1">下降 {Math.abs(card.change)}%</span>
                  </>
                ) : (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14" />
                    </svg>
                    <span className="ml-1">持平</span>
                  </>
                )}
                <span className="ml-1 opacity-80">{t('system.dashboard.vsLastWeek')}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };
  
  // 渲染图表
  const renderCharts = () => {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <div className="card bg-base-100 shadow-xl overflow-hidden border border-base-200">
          <div className="card-body p-5">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                {t('system.dashboard.statistics.resourceUsage')}
              </h2>
              <div className="badge badge-outline badge-primary">{t('system.dashboard.statistics.last24Hours')}</div>
            </div>
            <div className="h-[350px] bg-base-100/50 p-2 rounded-lg">
              <Line data={resourceUsageData} options={lineChartOptions} />
            </div>
          </div>
        </div>
        <div className="card bg-base-100 shadow-xl overflow-hidden border border-base-200">
          <div className="card-body p-5">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
                {t('system.dashboard.statistics.systemPerformance')}
              </h2>
              <div className="badge badge-outline badge-primary">{t('system.dashboard.statistics.last24Hours')}</div>
            </div>
            <div className="grid grid-cols-2 gap-4 h-[350px]">
              <div className="bg-base-100/50 p-3 rounded-lg h-[160px]">
                <h3 className="text-sm font-medium text-center mb-2 text-primary">{t('system.dashboard.statistics.responseTime')}</h3>
                <div className="h-[125px] overflow-hidden">
                  <Line data={responseTimeData} options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: { 
                      legend: { display: false },
                      tooltip: {
                        callbacks: {
                          label: (context: any) => `${context.parsed.y} ms`
                        }
                      }
                    },
                    scales: { 
                      y: { 
                        beginAtZero: true,
                        ticks: {
                          font: { size: 9 },
                          callback: (value: number) => `${value} ms`,
                          maxTicksLimit: 5
                        },
                        grid: {
                          color: 'rgba(0, 0, 0, 0.05)'
                        }
                      },
                      x: {
                        ticks: {
                          display: false
                        },
                        grid: {
                          display: false
                        }
                      }
                    },
                    elements: {
                      line: {
                        tension: 0.4,
                        borderWidth: 2
                      },
                      point: {
                        radius: 0,
                        hoverRadius: 4
                      }
                    }
                  }} />
                </div>
              </div>
              <div className="bg-base-100/50 p-3 rounded-lg h-[160px]">
                <h3 className="text-sm font-medium text-center mb-2 text-success">{t('system.dashboard.statistics.throughput')}</h3>
                <div className="h-[125px] overflow-hidden">
                  <Bar data={throughputData} options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: { 
                      legend: { display: false },
                      tooltip: {
                        callbacks: {
                          label: (context: any) => `${context.parsed.y} req/s`
                        }
                      }
                    },
                    scales: { 
                      y: { 
                        beginAtZero: true,
                        ticks: {
                          font: { size: 9 },
                          callback: (value: number) => `${value}`,
                          maxTicksLimit: 5
                        },
                        grid: {
                          color: 'rgba(0, 0, 0, 0.05)'
                        }
                      },
                      x: {
                        ticks: {
                          display: false
                        },
                        grid: {
                          display: false
                        }
                      }
                    }
                  }} />
                </div>
              </div>
              <div className="col-span-2 bg-base-100/50 p-3 rounded-lg h-[160px]">
                <h3 className="text-sm font-medium text-center mb-2 text-warning">{t('system.dashboard.statistics.errorRate')}</h3>
                <div className="h-[125px] overflow-hidden">
                  <Line data={errorRateData} options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: { 
                      legend: { display: false },
                      tooltip: {
                        callbacks: {
                          label: (context: any) => `${context.parsed.y.toFixed(2)}%`
                        }
                      }
                    },
                    scales: { 
                      y: { 
                        beginAtZero: true,
                        max: 5,
                        ticks: {
                          font: { size: 9 },
                          callback: (value: number) => `${value}%`,
                          maxTicksLimit: 5
                        },
                        grid: {
                          color: 'rgba(0, 0, 0, 0.05)'
                        }
                      },
                      x: {
                        ticks: {
                          font: { size: 8 },
                          maxTicksLimit: 12,
                          maxRotation: 0
                        },
                        grid: {
                          display: false
                        }
                      }
                    },
                    elements: {
                      line: {
                        tension: 0.4,
                        borderWidth: 2
                      },
                      point: {
                        radius: 0,
                        hoverRadius: 4
                      }
                    }
                  }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  // 渲染最近活动
  const renderRecentActivities = () => {
    return (
      <div className="card bg-base-100 shadow-lg">
        <div className="card-body">
          <div className="flex justify-between items-center mb-4">
            <h2 className="card-title">{t('system.dashboard.recentActivities')}</h2>
            <button className="btn btn-sm btn-ghost">{t('system.dashboard.viewMore')}</button>
          </div>
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-start space-x-3">
                <div className="avatar">
                  <div className="w-10 h-10 rounded-full bg-primary/10">
                    {activity.avatar ? (
                      <img src={activity.avatar} alt={activity.user} />
                    ) : (
                      <div className="flex items-center justify-center w-full h-full text-primary font-medium">
                        {activity.user[0]}
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center">
                    <span className="font-medium">{activity.user}</span>
                    <span className="mx-1 text-base-content/70">{activity.action}</span>
                    <span className="font-medium">{activity.target}</span>
                  </div>
                  <div className="text-sm text-base-content/60 mt-1">
                    {activity.time}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };
  
  // 渲染快捷操作
  const renderQuickActions = () => {
    return (
      <div className="card bg-base-100 shadow-lg">
        <div className="card-body">
          <h2 className="card-title mb-4">{t('system.dashboard.quickActions')}</h2>
          <div className="grid grid-cols-2 gap-3">
            <Link to="/system/users/create" className="btn btn-outline">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
              </svg>
              {t('system.dashboard.actions.addUser')}
            </Link>
            <Link to="/system/roles/create" className="btn btn-outline">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              {t('system.dashboard.actions.addRole')}
            </Link>
            <Link to="/system/departments/create" className="btn btn-outline">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              {t('system.dashboard.actions.addDepartment')}
            </Link>
            <Link to="/system/profile" className="btn btn-outline">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              {t('system.dashboard.actions.viewProfile')}
            </Link>
          </div>
        </div>
      </div>
    );
  };
  
  // 渲染系统公告
  const renderSystemAnnouncements = () => {
    return (
      <div className="card bg-base-100 shadow-lg">
        <div className="card-body">
          <div className="flex justify-between items-center mb-4">
            <h2 className="card-title">{t('system.dashboard.systemAnnouncements')}</h2>
            <button className="btn btn-sm btn-ghost">{t('system.dashboard.viewMore')}</button>
          </div>
          <div className="space-y-4">
            <div className="border-l-4 border-primary pl-3 py-1">
              <h3 className="font-medium">{t('system.dashboard.announcements.maintenance')}</h3>
              <p className="text-sm text-base-content/70">系统将于2023年12月31日晚上10点至次日凌晨2点进行维护，请提前做好准备。</p>
              <p className="text-xs text-base-content/50 mt-1">2023-12-25</p>
            </div>
            <div className="border-l-4 border-success pl-3 py-1">
              <h3 className="font-medium">{t('system.dashboard.announcements.update')}</h3>
              <p className="text-sm text-base-content/70">系统已更新至v2.0.5版本，新增了多项功能和优化，详情请查看更新日志。</p>
              <p className="text-xs text-base-content/50 mt-1">2023-12-20</p>
            </div>
            <div className="border-l-4 border-info pl-3 py-1">
              <h3 className="font-medium">{t('system.dashboard.announcements.welcome')}</h3>
              <p className="text-sm text-base-content/70">欢迎使用Laby管理系统，如有任何问题，请联系系统管理员。</p>
              <p className="text-xs text-base-content/50 mt-1">2023-12-15</p>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="flex flex-col items-center">
          <span className="loading loading-spinner loading-lg text-primary"></span>
          <p className="mt-4 text-base-content/70">{t('common.loading')}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">{t('system.dashboard.title')}</h1>
      
      {/* 统计卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="card bg-gradient-to-br from-red-800 to-red-900 text-white shadow-xl">
          <div className="card-body p-4">
            <div className="flex justify-between items-center">
              <h2 className="card-title text-lg">{t('system.dashboard.totalUsers')}</h2>
              <div className="p-2 bg-white/10 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
            </div>
            <div className="mt-2">
              <span className="text-3xl font-bold">{statCards[0].value.toLocaleString()}</span>
              <span className="ml-1 text-sm opacity-80">{t('system.dashboard.statistics.users')}</span>
            </div>
            <div className="mt-2">
              <span className="badge bg-green-500/20 text-green-300 border-green-500/30 gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
                </svg>
                +{statCards[0].change}%
              </span>
            </div>
          </div>
        </div>

        <div className="card bg-gradient-to-br from-rose-500 to-rose-700 text-white shadow-xl">
          <div className="card-body p-4">
            <div className="flex justify-between items-center">
              <h2 className="card-title text-lg">{t('system.dashboard.activeUsers')}</h2>
              <div className="p-2 bg-white/10 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
            </div>
            <div className="mt-2">
              <span className="text-3xl font-bold">{statCards[1].value.toLocaleString()}</span>
              <span className="ml-1 text-sm opacity-80">{t('system.dashboard.statistics.users')}</span>
            </div>
            <div className="mt-2">
              <span className="badge bg-red-500/20 text-red-300 border-red-500/30 gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
                {statCards[1].change}%
              </span>
            </div>
          </div>
        </div>

        <div className="card bg-gradient-to-br from-amber-500 to-amber-700 text-white shadow-xl">
          <div className="card-body p-4">
            <div className="flex justify-between items-center">
              <h2 className="card-title text-lg">{t('system.dashboard.newUsers')}</h2>
              <div className="p-2 bg-white/10 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                </svg>
              </div>
            </div>
            <div className="mt-2">
              <span className="text-3xl font-bold">{statCards[2].value.toLocaleString()}</span>
              <span className="ml-1 text-sm opacity-80">{t('system.dashboard.statistics.users')}</span>
            </div>
            <div className="mt-2">
              <span className="badge bg-green-500/20 text-green-300 border-green-500/30 gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
                </svg>
                +{statCards[2].change}%
              </span>
            </div>
          </div>
        </div>

        <div className="card bg-gradient-to-br from-teal-500 to-teal-700 text-white shadow-xl">
          <div className="card-body p-4">
            <div className="flex justify-between items-center">
              <h2 className="card-title text-lg">{t('system.dashboard.systemAnnouncements')}</h2>
              <div className="p-2 bg-white/10 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
              </div>
            </div>
            <div className="mt-2">
              <span className="text-3xl font-bold">{statCards[3].value.toLocaleString()}</span>
            </div>
            <div className="mt-2">
              <span className="text-xs opacity-70">{t('system.dashboard.viewMore')}</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* 图表 */}
      {renderCharts()}
      
      {/* 活动、操作和公告 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          {renderRecentActivities()}
        </div>
        <div>
          {renderQuickActions()}
          <div className="mt-6">
            {renderSystemAnnouncements()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 